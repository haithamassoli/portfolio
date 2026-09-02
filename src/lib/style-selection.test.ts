import { expect, test } from 'vitest';
import {
	drawStyle,
	fallbackStyleId,
	parseStyleState,
	selectStyle,
} from './style-selection';

test('style selection validates and exhausts a stable non-repeating bag', () => {
	const ids = [1, 2, 3];
	const day = '2026-09-01';
	const first = drawStyle(null, ids, day, () => 0);
	expect(selectStyle(first, ids, day)).toBe(first);

	const second = drawStyle(first, ids, day, () => 0);
	expect(selectStyle(first, ids, '2026-09-02', false, () => 0)).toEqual({
		...second,
		day: '2026-09-02',
	});
	const third = drawStyle(second, ids, day, () => 0);
	expect(new Set([first.current, second.current, third.current])).toEqual(
		new Set(ids),
	);

	const reshuffled = drawStyle(third, ids, day, () => 5);
	expect(reshuffled.current).not.toBe(third.current);
	expect(parseStyleState(JSON.stringify(reshuffled), ids)).toEqual(reshuffled);
	expect(parseStyleState(JSON.stringify(reshuffled), [...ids, 4])).toBeNull();
	expect(parseStyleState('{broken', ids)).toBeNull();
	expect(parseStyleState('{"version":1,"day":"nope"}', ids)).toBeNull();
	expect(fallbackStyleId(ids, 86_400_000 * 4 + 123)).toBe(2);
});
