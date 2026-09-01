import { expect, test } from '@playwright/test';

/* The design variants navigate through the client router, so a hop must swap
   the page instead of reloading it, and the two things that live on <html> —
   the chosen language and, in variant 1, the theme — have to survive the swap.
   A stale marker on `window` is the cheapest proof no reload happened. */
const variants = [1, 2, 3, 4, 5, 6, 7] as const;

for (const n of variants) {
	test(`variant ${n} swaps instead of reloading`, async ({ page }) => {
		const errors: string[] = [];
		page.on('pageerror', (e) => errors.push(e.message));

		await page.goto(`/${n}`);
		await page.evaluate(() => {
			localStorage.setItem('vx-lang', 'ar');
			localStorage.setItem('qr-theme', 'dark');
		});
		await page.reload();
		await page.evaluate(() => ((window as never as { m: boolean }).m = true));

		for (const to of [`/${n}/projects`, `/${n}/work/aoun`, `/${n}`]) {
			await page.locator(`a[href="${to}"]`).first().click();
			await expect(page).toHaveURL(to);
			expect(
				await page.evaluate(() => (window as never as { m: boolean }).m),
			).toBe(true);
			await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
			await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
		}

		expect(errors).toEqual([]);
	});
}

/* Variant 1 is the only room with a theme switch, and `data-theme` is the one
   attribute the swap would otherwise drop. */
test('variant 1 keeps its theme across a swap', async ({ page }) => {
	await page.goto('/1');
	await page.evaluate(() => localStorage.setItem('qr-theme', 'dark'));
	await page.reload();
	await page.locator('a[href="/1/projects"]').first().click();
	await expect(page).toHaveURL('/1/projects');
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});
