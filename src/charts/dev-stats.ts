import { defineChart } from '@tanstack/charts';
import { areaY } from '@tanstack/charts/area';
import { treemap } from '@tanstack/charts/hierarchy/treemap';
import { cell } from '@tanstack/charts/rect';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Day, Slice } from '../data/dev-stats';

/** Ink-2 panel, bone text, bone grid at the same weight as the page rules. */
const THEME = {
	foreground: '#f0ebe1',
	muted: '#9a9cbe',
	grid: 'rgba(240, 235, 225, 0.14)',
	background: '#1d2050',
} as const;

/* An empty day sits below the #1d2050 panel rather than above it: a light
   tint reads as a filled tile of another colour, the page ink reads as
   absence. Then four steps of the site's orange climbing out of the panel,
   monotone in lightness with every gap over 0.06, the dimmest still clearing
   2:1 so one quiet day does not read as blank either. */
const EMPTY = '#191c46';
const RAMP = ['#874131', '#bf4f36', '#f26546', '#ff8563'] as const;

/** Index is GitHub's own 0-4 bucket. Exported for the calendar's key. */
export const LEVEL_COLORS = [EMPTY, ...RAMP] as const;

/* Identity colours for the treemap. Four hues that hold
   apart under deuteranopia and protanopia on this surface, worst pair 11 ΔE
   across every combination rather than just neighbours. "Other" is a
   remainder rather than a thing, so it takes the neutral and never a hue. */
const OTHER = 'Other';
const IDENTITY = ['#f2571c', '#4c9b6d', '#387ee2', '#994869'] as const;
const NEUTRAL = '#6f7196';

/** Hues in fixed order, so a name keeps its colour as the rows change. */
export function identityColors(
	names: readonly string[],
): { name: string; color: string }[] {
	let hue = 0;
	return names.map((name) => ({
		name,
		color: name === OTHER ? NEUTRAL : IDENTITY[hue++ % IDENTITY.length],
	}));
}

function identityScale(names: readonly string[]) {
	const pairs = identityColors(names);
	return {
		domain: pairs.map((pair) => pair.name),
		range: pairs.map((pair) => pair.color),
	};
}

const whole = new Intl.NumberFormat('en-US');

const MONTHS = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

const monthOf = (date: string) => MONTHS[Number(date.slice(5, 7)) - 1] ?? '';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export interface Cell extends Day {
	/** Whole weeks since the first column, which is the column index. */
	week: number;
	/** 0 is Sunday, matching the calendar's own rows. */
	weekday: number;
}

/** Lays the year out as columns of weeks, the way the calendar reads. */
export function toCells(days: readonly Day[]): Cell[] {
	if (days.length === 0) return [];
	const DAY = 86_400_000;
	const first = Date.parse(`${days[0].date}T00:00:00Z`);
	// The first column is usually partial, so weeks count from its Sunday.
	const offset = new Date(first).getUTCDay();
	return days.map((day) => {
		const at = Date.parse(`${day.date}T00:00:00Z`);
		return {
			...day,
			week: Math.floor(((at - first) / DAY + offset) / 7),
			weekday: new Date(at).getUTCDay(),
		};
	});
}

/** First full column of each month, for the labels that run along the top. */
export function monthTicks(cells: readonly Cell[]): number[] {
	const seen = new Set<string>();
	const ticks: number[] = [];
	for (const cell of cells) {
		const month = cell.date.slice(0, 7);
		if (seen.has(month)) continue;
		seen.add(month);
		// A month starting late in a column belongs over the next one.
		ticks.push(cell.weekday > 3 ? cell.week + 1 : cell.week);
	}
	// The first month is a stub of a few days and has no column to label.
	return ticks.slice(1);
}

/**
 * A year of days, one square each, in columns of weeks. Colour is the only
 * encoding, and it runs on GitHub's own 0-4 buckets rather than a continuous
 * scale, because the buckets are what the source actually publishes.
 */
export function contributionCalendar(days: readonly Day[], dayLabel: string) {
	const cells = toCells(days);
	const ticks = monthTicks(cells);
	const monthAt = new Map(cells.map((cell) => [cell.week, monthOf(cell.date)]));

	return defineChart({
		marks: [
			cell(cells, {
				id: 'days',
				x: 'week',
				y: 'weekday',
				color: 'level',
				key: 'date',
				inset: 1,
				radius: 2,
			}),
		],
		scales: {
			x: {
				scale: scaleBand,
				side: 'top',
				axis: {
					line: false,
					ticks: {
						values: ticks,
						size: 0,
						format: (week: number) => monthAt.get(week) ?? '',
					},
				},
			},
			y: {
				scale: scaleBand,
				axis: {
					line: false,
					// Three labels is what fits; seven collide at this cell size.
					ticks: {
						values: [1, 3, 5],
						size: 0,
						format: (day: number) => WEEKDAYS[day] ?? '',
					},
				},
			},
		},
		color: { domain: [0, 1, 2, 3, 4], range: [...LEVEL_COLORS] },
		theme: THEME,
		focus: 'nearest',
		tooltip: {
			use: tooltip,
			items: [
				{ id: 'date', label: '', text: (point) => point.datum.date },
				{
					id: 'count',
					label: dayLabel,
					// Null only in the frozen copy, where exact counts are gone.
					text: (point) =>
						point.datum.count === null ? null : whole.format(point.datum.count),
				},
			],
		},
	});
}

interface Running extends Day {
	index: number;
	total: number;
}

/** Running total over the same year, so the flat stretches read as flat. */
export function cumulativeContributions(
	days: readonly Day[],
	axisLabel: string,
) {
	let carried = 0;
	const running: Running[] = days.map((day, index) => {
		carried += day.count ?? 0;
		return { ...day, index, total: carried };
	});

	// One label a quarter: twelve will not fit across half a row.
	const ticks = running
		.filter(
			(day) =>
				day.date.slice(8) === '01' && Number(day.date.slice(5, 7)) % 3 === 1,
		)
		.map((day) => day.index);

	return defineChart({
		marks: [
			areaY(running, {
				id: 'cumulative',
				x: 'index',
				y: 'total',
				// The dimmest step as the wash, the brightest as the line: a bright
				// fill over indigo goes mauve at every alpha that still reads as one.
				fill: RAMP[0],
				fillOpacity: 0.45,
				stroke: RAMP[3],
				strokeWidth: 2,
			}),
		],
		scales: {
			x: {
				scale: scaleLinear,
				axis: {
					line: false,
					ticks: {
						values: ticks,
						format: (index: number) => monthOf(running[index]?.date ?? ''),
					},
				},
			},
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
				{ id: 'date', label: '', text: (point) => point.datum.date },
				{
					channel: 'y',
					label: axisLabel,
					text: (point) => whole.format(point.yValue),
				},
			],
		},
	});
}

/**
 * Language share as area. A treemap earns its keep here because one language
 * takes three quarters of the total, and block size says that at a glance in
 * a way five bars on a shared axis do not.
 */
export function languageTreemap(slices: readonly Slice[], hoursLabel: string) {
	return defineChart({
		marks: [
			treemap(slices, {
				id: 'languages',
				// The flat form wants exactly one root; a path gives every language
				// the same implicit parent instead of making each one its own root.
				path: (slice: Slice) => `languages/${slice.name}`,
				value: (slice: Slice) => slice.hours,
				color: (node) => node.name,
				paddingInner: 2,
				radius: 4,
				label: (node) => node.name,
				labelFill: '#16183a',
				labelFontWeight: 600,
			}),
		],
		scales: { x: null, y: null },
		color: identityScale(slices.map((slice) => slice.name)),
		theme: THEME,
		focus: 'nearest',
		tooltip: {
			use: tooltip,
			items: [
				{ id: 'name', label: '', text: (point) => point.datum.name },
				{
					id: 'hours',
					label: hoursLabel,
					text: (point) => whole.format(point.datum.data?.hours ?? 0),
				},
			],
		},
	});
}
