export const STYLE_STATE_KEY = 'vx-style';

export type StyleState = {
	version: 1;
	registry: string;
	day: string;
	current: number;
	queue: number[];
};

export function today(date = new Date()): string {
	const pad = (value: number) => String(value).padStart(2, '0');
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function fallbackStyleId(
	ids: readonly number[],
	now = Date.now(),
): number {
	return ids[Math.floor(now / 86_400_000) % ids.length]!;
}

export function parseStyleState(
	raw: string | null,
	ids: readonly number[],
): StyleState | null {
	try {
		const state: unknown = JSON.parse(raw ?? 'null');
		if (!state || typeof state !== 'object') return null;
		const { version, registry, day, current, queue } =
			state as Partial<StyleState>;
		if (
			version !== 1 ||
			registry !== ids.join(',') ||
			typeof day !== 'string' ||
			!/^\d{4}-\d{2}-\d{2}$/.test(day) ||
			today(new Date(`${day}T00:00:00`)) !== day ||
			typeof current !== 'number' ||
			!ids.includes(current) ||
			!Array.isArray(queue) ||
			queue.some(
				(id) => typeof id !== 'number' || !ids.includes(id) || id === current,
			) ||
			new Set(queue).size !== queue.length
		)
			return null;
		return { version, registry, day, current, queue };
	} catch {
		return null;
	}
}

function shuffle(ids: readonly number[], randomUint32: () => number): number[] {
	const queue = [...ids];
	for (let i = queue.length - 1; i > 0; i--) {
		const j = randomUint32() % (i + 1);
		[queue[i], queue[j]] = [queue[j]!, queue[i]!];
	}
	return queue;
}

const cryptoUint32 = () => crypto.getRandomValues(new Uint32Array(1))[0]!;

export function drawStyle(
	previous: StyleState | null,
	ids: readonly number[],
	day = today(),
	randomUint32 = cryptoUint32,
): StyleState {
	const queue = previous?.queue.length
		? [...previous.queue]
		: shuffle(ids, randomUint32);
	if (queue[0] === previous?.current && queue.length > 1) {
		[queue[0], queue[1]] = [queue[1]!, queue[0]!];
	}
	return {
		version: 1,
		registry: ids.join(','),
		day,
		current: queue.shift()!,
		queue,
	};
}

export function selectStyle(
	previous: StyleState | null,
	ids: readonly number[],
	day = today(),
	advance = false,
	randomUint32 = cryptoUint32,
): StyleState {
	return previous?.day === day && !advance
		? previous
		: drawStyle(previous, ids, day, randomUint32);
}
