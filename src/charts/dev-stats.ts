import { defineChart } from '@tanstack/charts';
import { barX, barY } from '@tanstack/charts/bar';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Slice, YearRepos } from '../data/dev-stats';

/* Bar length is the only encoding here, so colour carries nothing: one fill
   for every bar, every chart. It is the site's signal orange stepped down to
   sit inside the dark-surface lightness band. */
const FILL = '#f2571c';

/** Ink-2 panel, bone text, bone grid at the same weight as the page rules. */
const THEME = {
	foreground: '#f0ebe1',
	muted: '#9a9cbe',
	grid: 'rgba(240, 235, 225, 0.14)',
	background: '#1d2050',
	palette: [FILL],
} as const;

const whole = new Intl.NumberFormat('en-US');

/**
 * Hours against a category, laid out horizontally so long names like
 * "TypeScript" or "Claude Code" read straight rather than rotated. Rows
 * arrive pre-sorted, and a band scale runs top-down, so the largest is first.
 *
 * `maxHours` is passed in rather than inferred, and already rounded: the
 * language and editor charts measure the same hours, so the axis has to end
 * at the same number in both. Left to themselves they fit their own rows, and
 * `nice` would round the shared ceiling differently at each panel width.
 */
export function hoursBar(
	slices: readonly Slice[],
	axisLabel: string,
	maxHours: number,
) {
	return defineChart({
		marks: [
			barX(slices, {
				id: 'hours',
				x: 'hours',
				y: 'name',
				key: 'name',
				fill: FILL,
				radius: 4,
				maxThickness: 30,
				inset: 1,
			}),
		],
		scales: {
			x: {
				// An instance, not the factory: a factory would re-infer the domain
				// from this chart's own rows and undo the shared ceiling.
				scale: scaleLinear().domain([0, maxHours]),
				grid: true,
				axis: {
					label: axisLabel,
					ticks: { format: (value: number) => whole.format(value) },
				},
			},
			y: { scale: scaleBand, axis: { line: false } },
		},
		theme: THEME,
		focus: 'nearest',
		tooltip: {
			use: tooltip,
			items: [
				{ field: 'name', label: '' },
				{
					channel: 'x',
					label: axisLabel,
					text: (point) => whole.format(point.xValue),
				},
			],
		},
	});
}

/** Repositories created per year. Years are discrete counts, so bars. */
export function reposPerYear(years: readonly YearRepos[], axisLabel: string) {
	return defineChart({
		marks: [
			barY(years, {
				id: 'repos',
				x: (row: YearRepos) => String(row.year),
				y: 'repos',
				key: 'year',
				fill: FILL,
				radius: 4,
				maxThickness: 56,
				inset: 1,
			}),
		],
		scales: {
			x: { scale: scaleBand, axis: { line: false } },
			y: {
				scale: scaleLinear,
				nice: true,
				grid: true,
				axis: {
					label: axisLabel,
					ticks: { format: (value: number) => whole.format(value) },
				},
			},
		},
		theme: THEME,
		focus: 'nearest',
		tooltip: {
			use: tooltip,
			items: [
				// A year is a name, not a quantity: no thousands separator.
				{ id: 'year', label: '', text: (point) => String(point.datum.year) },
				{
					channel: 'y',
					label: axisLabel,
					text: (point) => whole.format(point.yValue),
				},
			],
		},
	});
}
