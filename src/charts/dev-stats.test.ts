import { createChartScene } from '@tanstack/charts';
import { expect, test } from 'vitest';
import { hoursBar, reposPerYear } from './dev-stats';
import { topSlices, type Slice, type YearRepos } from '../data/dev-stats';

const languages: Slice[] = [
	{ name: 'TypeScript', hours: 2118 },
	{ name: 'JSON', hours: 225 },
	{ name: 'Other', hours: 273 },
];

const years: YearRepos[] = [
	{ year: 2021, repos: 19 },
	{ year: 2022, repos: 33 },
	{ year: 2026, repos: 33 },
];

interface RectLike {
	kind: string;
	width?: number;
	children?: readonly RectLike[];
	interaction?: unknown;
}

/** Painted bar widths, in draw order. Guides and grid lines carry no point. */
function barWidths(nodes: readonly unknown[]): number[] {
	const found: number[] = [];
	const walk = (children: readonly RectLike[]) => {
		for (const node of children) {
			if (node.kind === 'rect' && node.interaction) found.push(node.width ?? 0);
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

test('hours run along x and bar length tracks them', () => {
	const scene = createChartScene(hoursBar(languages, 'Hours', 2118), {
		width: 640,
		height: 260,
	});

	expect(scene.points).toHaveLength(languages.length);
	for (const [index, point] of scene.points.entries()) {
		expect(point.datum).toBe(languages[index]);
		expect(point.xValue).toBe(languages[index].hours);
	}

	// TypeScript is ~9.4x JSON, so its bar must be drawn ~9.4x longer. Bar
	// length, not the bar's end position, is what a reader compares.
	const [ts, json] = barWidths(scene.nodes);
	expect(ts / json).toBeCloseTo(2118 / 225, 1);
});

test('repositories per year keep one bar per year', () => {
	const scene = createChartScene(reposPerYear(years, 'Repositories'), {
		width: 420,
		height: 260,
	});

	expect(scene.points.map((point) => point.datum)).toEqual(years);
	expect(scene.points.map((point) => point.yValue)).toEqual([19, 33, 33]);

	// Equal counts must land at the same height even in different years.
	expect(scene.points[1].y).toBe(scene.points[2].y);
});

test('a shared domain stops a small chart rescaling to its own maximum', () => {
	const size = { width: 640, height: 260 };
	const ceiling = 2000;
	// Same label width in both, so only the domain can move the geometry.
	const alone: Slice[] = [{ name: 'A', hours: 1000 }];
	const alongside: Slice[] = [
		{ name: 'B', hours: 2000 },
		{ name: 'A', hours: 1000 },
	];

	const [soloBar] = barWidths(
		createChartScene(hoursBar(alone, 'Hours', ceiling), size).nodes,
	);
	const [, pairedBar] = barWidths(
		createChartScene(hoursBar(alongside, 'Hours', ceiling), size).nodes,
	);

	// 1,000 hours is 1,000 hours: half the axis in the chart that happens to
	// hold nothing bigger, and half the axis next to a bar twice its size.
	expect(soloBar).toBeCloseTo(pairedBar, 5);
});
