import { expect, test, vi } from 'vitest';

/**
 * The build calls two third-party APIs. When either is down the site still has
 * to come out, with the last recorded numbers and a flag saying so.
 */
test('a failed fetch falls back to the frozen numbers', async () => {
	vi.stubGlobal(
		'fetch',
		vi.fn(() => Promise.reject(new Error('offline'))),
	);
	vi.spyOn(console, 'warn').mockImplementation(() => {});

	// Imported here so the stub is in place before the module memoizes.
	const { devStats } = await import('./dev-stats');
	const stats = await devStats();

	expect(stats.stale).toBe(true);
	expect(stats.languages.length).toBeGreaterThan(0);
	expect(stats.totalHours).toBeGreaterThan(0);

	// The frozen calendar is a digit string, so it has to expand back into a
	// dated year or the heatmap silently renders nothing.
	expect(stats.days).toHaveLength(366);
	expect(stats.days[0].date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
	expect(stats.days.every((day) => day.level >= 0 && day.level <= 4)).toBe(
		true,
	);
	expect(stats.days).toEqual(
		[...stats.days].sort((a, b) => (a.date < b.date ? -1 : 1)),
	);

	vi.unstubAllGlobals();
});

/**
 * The one piece of this module that reads someone else's markup. It is
 * exported so it can be checked without a network, and the fixture below is
 * the shape GitHub actually serves: cells one weekday per row, so out of date
 * order, with the exact counts in separate <tool-tip> elements keyed by id.
 */
const cell = (id: string, date: string, level: number) =>
	`<td class="ContributionCalendar-day" id="${id}" data-date="${date}" data-level="${level}"></td>`;

const FIXTURE = [
	cell('contribution-day-component-0-0', '2025-01-05', 0),
	cell('contribution-day-component-0-1', '2025-01-12', 4),
	cell('contribution-day-component-1-0', '2025-01-06', 2),
	// No tool-tip: GitHub omits one for a day with nothing on it.
	cell('contribution-day-component-1-1', '2025-01-13', 0),
	'<tool-tip for="contribution-day-component-0-1" class="sr-only">1,204 contributions on January 12th.</tool-tip>',
	'<tool-tip for="contribution-day-component-1-0">2 contributions on January 6th.</tool-tip>',
	'<tool-tip for="contribution-day-component-0-0">No contributions on January 5th.</tool-tip>',
].join('');

test('the contribution calendar is parsed into dated, counted days', async () => {
	const { parseContributions } = await import('./dev-stats');
	const days = parseContributions(FIXTURE);

	// Sorted, whatever order the rows arrived in.
	expect(days.map((d) => d.date)).toEqual([
		'2025-01-05',
		'2025-01-06',
		'2025-01-12',
		'2025-01-13',
	]);
	// Thousands separators survive; "No contributions" is zero, not NaN.
	expect(days.map((d) => d.count)).toEqual([0, 2, 1204, 0]);
	expect(days.map((d) => d.level)).toEqual([0, 2, 4, 0]);
});

test('markup that no longer has day cells throws rather than rendering blank', async () => {
	const { parseContributions } = await import('./dev-stats');
	// The day GitHub renames the class, the frozen year should win.
	expect(() => parseContributions('<td class="Renamed-day"></td>')).toThrow();
});
