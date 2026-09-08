import { expect, test } from '@playwright/test';

test('Orbit controls, client navigation, mobile RTL and reduced motion', async ({
	page,
}) => {
	const errors: string[] = [];
	page.on('pageerror', (error) => errors.push(error.message));
	await page.goto('/orbit');
	await expect(page.locator('.sculpture__torus path')).toHaveCount(80);
	const slider = page.getByRole('slider', { name: 'Give it a spin' });
	await slider.focus();
	await page.keyboard.press('ArrowRight');
	await expect(page.locator('output')).toHaveText('1°');
	await expect(page.locator('[data-sculpture]')).toHaveCSS('--angle', '1deg');
	await page.getByRole('button', { name: 'Pause motion' }).click();
	await expect(page.locator('orbit-motion')).toHaveAttribute('data-paused', '');
	await expect(page.locator('.sculpture__torus')).toHaveCSS(
		'animation-play-state',
		'paused',
	);
	await page.getByRole('button', { name: 'Resume motion' }).click();
	await expect(page.locator('orbit-motion')).not.toHaveAttribute('data-paused');

	// ClientRouter reinserts the element: controls must still work after returning.
	await page.getByRole('link', { name: 'Have something in mind?' }).click();
	await expect(page).toHaveURL(/\/orbit\/hire$/);
	await expect(page.locator('form[data-hire]')).toBeVisible();
	expect(
		await page
			.locator('form')
			.evaluate((form: HTMLFormElement) => form.checkValidity()),
	).toBe(false);
	await page.locator('.top .brand').click();
	await expect(slider).toBeVisible();
	await slider.focus();
	await page.keyboard.press('End');
	await expect(page.locator('output')).toHaveText('90°');

	await page.emulateMedia({ reducedMotion: 'reduce' });
	await expect(page.locator('.sculpture__torus')).toHaveCSS(
		'animation-name',
		'none',
	);
	await expect(
		page.getByRole('button', { name: 'Motion reduced' }),
	).toBeDisabled();
	await page.setViewportSize({ width: 375, height: 812 });
	await page.locator('[data-lang-link]').click();
	await expect(page).toHaveURL(/\/ar\/orbit$/);
	await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
	for (const path of ['', '/work', '/work/aoun', '/hire']) {
		await page.goto(`/ar/orbit${path}`);
		await expect(page.locator('h1')).toBeVisible();
		expect(
			await page.evaluate(
				() => document.documentElement.scrollWidth <= innerWidth,
			),
		).toBe(true);
	}
	expect(errors).toEqual([]);
});
