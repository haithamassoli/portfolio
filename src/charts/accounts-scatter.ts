import { defineChart, dot } from '@tanstack/charts';
import { colorLegend } from '@tanstack/charts/legend';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import { scaleSqrt } from 'd3-scale';
import { SEGMENTS, type Account } from '../data/accounts';

const usd = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	maximumFractionDigits: 0,
});

const percent = new Intl.NumberFormat('en-US', {
	style: 'percent',
	maximumFractionDigits: 1,
});

/** Ordered to match SEGMENTS so the legend and dots stay stable across edits. */
export const SEGMENT_COLORS = ['#2563eb', '#f97316', '#15803d'] as const;

/**
 * Revenue against retention, one dot per account. Seats are the third
 * quantity, mapped through a square-root scale so area — not radius — carries
 * the magnitude. Every dot keeps its `Account` row in `point.datum`.
 */
export function accountsScatter(accounts: readonly Account[]) {
	return defineChart({
		marks: [
			dot(accounts, {
				id: 'accounts',
				x: 'monthlyRevenue',
				y: 'retention',
				r: 'seats',
				rScale: { scale: () => scaleSqrt().range([5, 26]) },
				color: 'segment',
				key: 'id',
				fillOpacity: 0.72,
			}),
		],
		scales: {
			x: {
				scale: scaleLinear,
				nice: true,
				grid: true,
				axis: {
					label: 'Monthly revenue',
					ticks: { format: (value) => usd.format(value) },
				},
			},
			y: {
				scale: scaleLinear,
				nice: true,
				grid: true,
				axis: {
					label: 'Net revenue retention',
					ticks: { format: (value) => percent.format(value) },
				},
			},
		},
		color: {
			domain: [...SEGMENTS],
			range: [...SEGMENT_COLORS],
			legend: colorLegend({ label: 'Segment' }),
		},
		focus: 'nearest',
		tooltip: {
			use: tooltip,
			items: [
				{ field: 'name', label: 'Account' },
				{ field: 'segment', label: 'Segment' },
				{
					channel: 'x',
					label: 'Monthly revenue',
					text: (point) => usd.format(point.xValue),
				},
				{
					channel: 'y',
					label: 'Net revenue retention',
					text: (point) => percent.format(point.yValue),
				},
				{ field: 'seats', label: 'Seats' },
				{
					id: 'revenue-per-seat',
					label: 'Revenue per seat',
					text: (point) =>
						point.datum.seats > 0
							? usd.format(point.datum.monthlyRevenue / point.datum.seats)
							: null,
				},
			],
		},
	});
}

export function accountsScatterAriaLabel(accounts: readonly Account[]): string {
	return `Scatterplot of net revenue retention against monthly revenue for ${accounts.length} accounts, with each point sized by seat count and colored by segment.`;
}
