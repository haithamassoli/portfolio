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
