import { createChartScene } from '@tanstack/charts';
import { expect, test } from 'vitest';
import {
	LEVEL_COLORS,
	contributionCalendar,
	cumulativeContributions,
	editorShare,
	monthTicks,
	toCells,
} from './dev-stats';
import { topSlices, type Day, type Slice } from '../data/dev-stats';

/** A run of days from a Sunday, so weekday 0 lines up with column 0. */
function year(levels: readonly number[], start = '2025-08-31'): Day[] {
	const from = new Date(`${start}T00:00:00Z`);
	return levels.map((level, index) => {
		const day = new Date(from);
		day.setUTCDate(from.getUTCDate() + index);
		return { date: day.toISOString().slice(0, 10), level, count: level };
	});
}

interface RectLike {
	kind: string;
	width?: number;
	style?: { fill?: string };
	children?: readonly RectLike[];
	interaction?: unknown;
}

/** Painted mark rects, in draw order. Guides and grid lines carry no point. */
function markRects(nodes: readonly unknown[]): RectLike[] {
	const found: RectLike[] = [];
	const walk = (children: readonly RectLike[]) => {
		for (const node of children) {
			if (node.kind === 'rect' && node.interaction) found.push(node);
			else if (node.children) walk(node.children);
		}
	};
	walk(nodes as readonly RectLike[]);
	return found;
}

test('the tail folds into a single Other row, largest first', () => {
	const folded = topSlices(
		[
			{ name: 'JSON', total_seconds: 7200 },
			{ name: 'TypeScript', total_seconds: 36_000 },
			{ name: 'CSS', total_seconds: 3600 },
			{ name: 'Rust', total_seconds: 1800 },
		],
		2,
	);

	expect(folded).toEqual([
		{ name: 'TypeScript', hours: 10 },
		{ name: 'JSON', hours: 2 },
		// 3600 + 1800 seconds, rounded.
		{ name: 'Other', hours: 2 },
	]);
});

test('a tail that rounds to zero hours adds no Other row', () => {
	const folded = topSlices(
		[
			{ name: 'TypeScript', total_seconds: 36_000 },
			{ name: 'Ignore', total_seconds: 60 },
		],
		1,
	);
	expect(folded).toEqual([{ name: 'TypeScript', hours: 10 }]);
});

test('days fall into weekday rows and weekly columns', () => {
	// Sixteen days from a Sunday: two full columns and a stub of two.
	const cells = toCells(year(Array(16).fill(1)));

	expect(cells.slice(0, 7).map((cell) => cell.week)).toEqual([
		0, 0, 0, 0, 0, 0, 0,
	]);
	expect(cells.slice(0, 7).map((cell) => cell.weekday)).toEqual([
		0, 1, 2, 3, 4, 5, 6,
	]);
	expect(cells[7]).toMatchObject({ week: 1, weekday: 0 });
	expect(cells[14].week).toBe(2);
});

test('a year starting mid-week still lands its first days in column zero', () => {
	// 2025-09-03 is a Wednesday: the first column holds only four days.
	const cells = toCells(year(Array(10).fill(0), '2025-09-03'));

	expect(cells[0]).toMatchObject({ week: 0, weekday: 3 });
	expect(cells[3]).toMatchObject({ week: 0, weekday: 6 });
	// Saturday ends the column, so the next day opens a new one.
	expect(cells[4]).toMatchObject({ week: 1, weekday: 0 });
});

test('month labels skip the opening stub and never repeat a column', () => {
	const cells = toCells(year(Array(120).fill(0)));
	const ticks = monthTicks(cells);

	// 120 days from 31 August touches Aug, Sep, Oct, Nov and Dec; the one-day
	// August stub gets no label.
	expect(ticks).toHaveLength(4);
	expect(new Set(ticks).size).toBe(ticks.length);
	expect(ticks).toEqual([...ticks].sort((a, b) => a - b));
});

test('every day gets a square, coloured by its own level', () => {
	const days = year([0, 1, 2, 3, 4, 0, 1]);
	const scene = createChartScene(contributionCalendar(days, 'Contributions'), {
		width: 900,
		height: 150,
	});

	const squares = markRects(scene.nodes);
	expect(squares).toHaveLength(days.length);
	expect(squares.map((square) => square.style?.fill)).toEqual(
		days.map((day) => LEVEL_COLORS[day.level]),
	);
});

test('the running total never falls', () => {
	const days = year([2, 0, 0, 5, 1, 0, 3]);
	const scene = createChartScene(
		cumulativeContributions(days, 'Contributions'),
		{ width: 420, height: 240 },
	);

	const totals = scene.points.map((point) => point.yValue);
	expect(totals).toEqual([2, 2, 2, 7, 8, 8, 11]);
});

test('the editor row is normalised, so segment width is share', () => {
	const editors: Slice[] = [
		{ name: 'VS Code', hours: 75 },
		{ name: 'Cursor', hours: 25 },
	];
	const scene = createChartScene(editorShare(editors, 'Hours'), {
		width: 900,
		height: 96,
	});

	const [first, second] = markRects(scene.nodes);
	// 75 against 25 in a row of any width: three to one.
	expect((first.width ?? 0) / (second.width ?? 0)).toBeCloseTo(3, 1);
});

test('Other takes the neutral, never one of the identity hues', () => {
	const editors: Slice[] = [
		{ name: 'VS Code', hours: 60 },
		{ name: 'Cursor', hours: 30 },
		{ name: 'Other', hours: 10 },
	];
	const scene = createChartScene(editorShare(editors, 'Hours'), {
		width: 900,
		height: 96,
	});

	const fills = markRects(scene.nodes).map((rect) => rect.style?.fill);
	expect(new Set(fills).size).toBe(3);
	// The remainder must not borrow the colour of a real editor.
	expect(fills[2]).not.toBe(fills[0]);
	expect(fills[2]).not.toBe(fills[1]);
});
