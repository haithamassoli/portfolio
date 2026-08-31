/* --------------------------------------------------------------------------
   Where the hours actually went. WakaTime knows what I typed in; GitHub knows
   which days it landed on. Both are public, both are read once at build time.

   Server-only: this module fetches. Import it from `.astro` frontmatter and
   hand the plain result to the island, never from the island itself.
   -------------------------------------------------------------------------- */

const WAKATIME =
	'https://wakatime.com/api/v1/users/haithamassoli/stats/all_time';

/* The contribution calendar has no REST endpoint that works without a token.
   This one is public and returns the same fragment the profile page renders. */
const CONTRIBUTIONS = 'https://github.com/users/haithamassoli/contributions';

export interface Slice {
	name: string;
	hours: number;
}

export interface Day {
	/** ISO date, `YYYY-MM-DD`. */
	date: string;
	/** Exact contributions, or null when only the frozen levels are available. */
	count: number | null;
	/** GitHub's own 0-4 bucket. */
	level: number;
}

export interface DevStats {
	/** One year of days, oldest first. */
	days: Day[];
	/** Top languages by time typed, everything past the cut folded into one. */
	languages: Slice[];
	editors: Slice[];
	totalHours: number;
	contributions: number;
	currentStreak: number;
	activeDays: number;
	/** Set when a live fetch failed and the data below is the frozen copy. */
	stale: boolean;
}

/* The build must not depend on two third-party sources being up. When either
   fails we serve this instead: the same shape, frozen on the start date below.
   It is a typed literal rather than a JSON file so a change to `DevStats`
   cannot silently leave it behind.
   ponytail: hand-refreshed. Automate it when the numbers start looking wrong. */
const FROZEN_START = '2025-08-31';

/** One digit per day from `FROZEN_START`. Counts are not kept; levels are. */
const FROZEN_LEVELS =
	'0010100111100003201002221000100100000011001112101032222333121' +
	'1022022101011001042000020200002102000001110010112200011000011' +
	'0000110010000000001000001200133010012001112101210100100110141' +
	'0120441011121101111214110420001211100010000000001000010100000' +
	'0011001000000110001004014000002110000010110000011220110011000' +
	'1101110100110010010110100000001001000010000111110110100101124';

function frozenDays(): Day[] {
	const start = new Date(`${FROZEN_START}T00:00:00Z`);
	return [...FROZEN_LEVELS].map((digit, index) => {
		const day = new Date(start);
		day.setUTCDate(start.getUTCDate() + index);
		return {
			date: day.toISOString().slice(0, 10),
			count: null,
			level: Number(digit),
		};
	});
}

const FROZEN: DevStats = {
	days: frozenDays(),
	languages: [
		{ name: 'TypeScript', hours: 2118 },
		{ name: 'JSON', hours: 225 },
		{ name: 'Markdown', hours: 103 },
		{ name: 'Other', hours: 321 },
	],
	editors: [
		{ name: 'VS Code', hours: 2148 },
		{ name: 'Cursor', hours: 274 },
		{ name: 'Claude Code', hours: 221 },
		{ name: 'Other', hours: 124 },
	],
	totalHours: 2767,
	contributions: 992,
	currentStreak: 4,
	activeDays: 173,
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

/**
 * Pulls the day cells out of GitHub's calendar fragment. Each `<td>` carries
 * the date and the 0-4 bucket; the exact count lives in the screen-reader
 * tooltip that points back at the cell's id.
 *
 * Cells arrive one weekday per row, so they are out of date order until sorted.
 */
export function parseContributions(html: string): Day[] {
	const counts = new Map<string, number>();
	const tooltips =
		/<tool-tip[^>]*\bfor="(contribution-day-component-[\d-]+)"[^>]*>([^<]*)<\/tool-tip>/g;
	for (const match of html.matchAll(tooltips)) {
		const written = /^(\d[\d,]*) contribution/.exec(match[2]);
		counts.set(match[1], written ? Number(written[1].replace(/,/g, '')) : 0);
	}

	const days: Day[] = [];
	const cells = /<td\b[^>]*class="ContributionCalendar-day"[^>]*>/g;
	for (const [tag] of html.matchAll(cells)) {
		const attr = (name: string) =>
			new RegExp(`\\b${name}="([^"]+)"`).exec(tag)?.[1];
		const date = attr('data-date');
		const level = attr('data-level');
		if (date === undefined || level === undefined) continue;
		days.push({
			date,
			level: Number(level),
			count: counts.get(attr('id') ?? '') ?? 0,
		});
	}

	// Scraped markup: better to fall back to the frozen year than to render an
	// empty calendar the day GitHub renames a class.
	if (days.length === 0) throw new Error('no contribution cells found');
	return days.sort((a, b) => (a.date < b.date ? -1 : 1));
}

/** A day counts as active on its level, so the frozen copy still measures. */
const active = (day: Day) => (day.count ?? day.level) > 0;

/** Days shipped in an unbroken run up to the most recent one. */
export function currentStreak(days: readonly Day[]): number {
	let run = 0;
	for (let i = days.length - 1; i >= 0 && active(days[i]); i--) run++;
	return run;
}

async function text(url: string): Promise<string> {
	const response = await fetch(url, {
		headers: { 'x-requested-with': 'XMLHttpRequest' },
		signal: AbortSignal.timeout(15_000),
	});
	if (!response.ok) throw new Error(`${url} responded ${response.status}`);
	return response.text();
}

async function live(): Promise<DevStats> {
	const [wakaBody, calendarBody] = await Promise.all([
		text(WAKATIME),
		text(CONTRIBUTIONS),
	]);

	const waka = JSON.parse(wakaBody) as WakaStats;
	const days = parseContributions(calendarBody);

	return {
		days,
		languages: topSlices(waka.data.languages, 3),
		editors: topSlices(waka.data.editors, 3),
		totalHours: Math.round(waka.data.total_seconds / 3600),
		contributions: days.reduce((sum, day) => sum + (day.count ?? 0), 0),
		currentStreak: currentStreak(days),
		activeDays: days.filter(active).length,
		stale: false,
	};
}

let pending: Promise<DevStats> | undefined;

/** Fetched once per build, however many pages ask for it. */
export function devStats(): Promise<DevStats> {
	pending ??= live().catch((error) => {
		console.warn('[dev-stats] live fetch failed, serving frozen data:', error);
		return FROZEN;
	});
	return pending;
}
