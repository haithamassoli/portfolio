/* --------------------------------------------------------------------------
   Where the hours actually went. WakaTime knows what I typed in; GitHub knows
   what came out. Both are public JSON, both are read once at build time.

   Server-only: this module fetches. Import it from `.astro` frontmatter and
   hand the plain result to the island, never from the island itself.
   -------------------------------------------------------------------------- */

const WAKATIME =
	'https://wakatime.com/api/v1/users/haithamassoli/stats/all_time';
const GITHUB = 'https://api.github.com/users/haithamassoli/repos';

export interface Slice {
	name: string;
	hours: number;
}

export interface YearRepos {
	year: number;
	repos: number;
}

export interface DevStats {
	/** Top languages by time typed, everything past the cut folded into one. */
	languages: Slice[];
	editors: Slice[];
	/** Public non-fork repositories by the year they were created. */
	years: YearRepos[];
	totalHours: number;
	repoCount: number;
	/** Set when the live fetch failed and the numbers below are the frozen ones. */
	stale: boolean;
}

/* The build must not depend on two third-party APIs being up. When either one
   fails we serve this instead: the same numbers, frozen on the date below.
   It is a typed literal rather than a JSON file so a change to `DevStats`
   cannot silently leave it behind. Refresh it by pasting a fresh build's
   output; nothing breaks if it drifts by a few hours.
   ponytail: hand-refreshed. Automate it when the numbers start looking wrong. */
const FROZEN: DevStats = {
	languages: [
		{ name: 'TypeScript', hours: 2118 },
		{ name: 'JSON', hours: 225 },
		{ name: 'Markdown', hours: 103 },
		{ name: 'JavaScript', hours: 47 },
		{ name: 'Other', hours: 274 },
	],
	editors: [
		{ name: 'VS Code', hours: 2148 },
		{ name: 'Cursor', hours: 274 },
		{ name: 'Claude Code', hours: 221 },
		{ name: 'Other', hours: 124 },
	],
	years: [
		{ year: 2021, repos: 40 },
		{ year: 2022, repos: 33 },
		{ year: 2023, repos: 7 },
		{ year: 2024, repos: 9 },
		{ year: 2025, repos: 4 },
		{ year: 2026, repos: 36 },
	],
	totalHours: 2767,
	repoCount: 129,
	stale: true,
};

interface WakaSlice {
	name: string;
	total_seconds: number;
}

interface WakaStats {
	data: {
		total_seconds: number;
		languages: WakaSlice[];
		editors: WakaSlice[];
	};
}

interface GithubRepo {
	id: number;
	fork: boolean;
	created_at: string;
}

/** Top `keep` by hours, with the tail summed into a single "Other" row. */
export function topSlices(slices: readonly WakaSlice[], keep: number): Slice[] {
	const sorted = [...slices].sort((a, b) => b.total_seconds - a.total_seconds);
	const rest = sorted
		.slice(keep)
		.reduce((sum, slice) => sum + slice.total_seconds, 0);
	const top = sorted.slice(0, keep).map((slice) => ({
		name: slice.name,
		hours: Math.round(slice.total_seconds / 3600),
	}));
	const other = Math.round(rest / 3600);
	return other > 0 ? [...top, { name: 'Other', hours: other }] : top;
}

async function json<T>(url: string): Promise<T> {
	const response = await fetch(url, {
		headers: { accept: 'application/json' },
		signal: AbortSignal.timeout(15_000),
	});
	if (!response.ok) throw new Error(`${url} responded ${response.status}`);
	return (await response.json()) as T;
}

/** GitHub caps a page at 100. Two are enough today; the loop covers growth. */
async function allRepos(): Promise<GithubRepo[]> {
	const seen = new Map<number, GithubRepo>();
	for (let page = 1; page <= 5; page++) {
		const batch = await json<GithubRepo[]>(
			`${GITHUB}?per_page=100&page=${page}`,
		);
		for (const repo of batch) seen.set(repo.id, repo);
		if (batch.length < 100) break;
	}
	return [...seen.values()];
}

async function live(): Promise<DevStats> {
	const [waka, repos] = await Promise.all([
		json<WakaStats>(WAKATIME),
		allRepos(),
	]);

	const own = repos.filter((repo) => !repo.fork);
	const perYear = new Map<number, number>();
	for (const repo of own) {
		const year = new Date(repo.created_at).getUTCFullYear();
		perYear.set(year, (perYear.get(year) ?? 0) + 1);
	}

	return {
		languages: topSlices(waka.data.languages, 4),
		editors: topSlices(waka.data.editors, 3),
		years: [...perYear]
			.sort(([a], [b]) => a - b)
			.map(([year, count]) => ({ year, repos: count })),
		totalHours: Math.round(waka.data.total_seconds / 3600),
		repoCount: own.length,
		stale: false,
	};
}

let pending: Promise<DevStats> | undefined;

/** Fetched once per build, however many pages ask for it. */
export function devStats(): Promise<DevStats> {
	pending ??= live().catch((error) => {
		console.warn(
			'[dev-stats] live fetch failed, serving frozen numbers:',
			error,
		);
		return FROZEN;
	});
	return pending;
}
