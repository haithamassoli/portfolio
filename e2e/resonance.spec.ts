import { expect, test } from '@playwright/test';

test('Resonance: sculpture controls, navigation, reduced motion and mobile Arabic', async ({
	page,
}) => {
	const errors: string[] = [];
	page.on('pageerror', (error) => errors.push(error.message));
	await page.goto('/resonance');
	await expect(page.locator('.ribbon path')).toHaveCount(72);
	await page.getByRole('button', { name: '02 Flow' }).click();
	await expect(page.locator('.sculpture')).toHaveAttribute('data-form', 'flow');
	await expect(page.locator('.flow')).toBeVisible();
	await expect(page.getByRole('button', { name: '01 Bloom' })).toHaveAttribute(
		'aria-pressed',
		'false',
	);
	await page.getByRole('button', { name: 'Pause motion' }).click();
	await expect(page.locator('.flow')).toHaveCSS(
		'animation-play-state',
		'paused',
	);
	await page.getByRole('button', { name: '01 Bloom' }).focus();
	await page.keyboard.press('Enter');
	await expect(page.locator('.ribbon')).toBeVisible();
	await expect(page.locator('.ribbon')).toHaveCSS(
		'animation-play-state',
		'paused',
	);
	await page.getByRole('button', { name: 'Resume motion' }).click();
	await expect(page.locator('resonance-motion')).not.toHaveAttribute(
		'data-still',
	);

	await page.getByRole('link', { name: 'Have an idea?' }).click();
	await expect(page).toHaveURL(/\/resonance\/hire$/);
	expect(
		await page
			.locator('form')
			.evaluate((form: HTMLFormElement) => form.checkValidity()),
	).toBe(false);
	await page.locator('.brand').click();
	await page.getByRole('button', { name: '02 Flow' }).click();
	await expect(page.locator('.sculpture')).toHaveAttribute('data-form', 'flow');

	await page.emulateMedia({ reducedMotion: 'reduce' });
	await expect(
		page.getByRole('button', { name: 'Motion reduced' }),
	).toBeDisabled();
	await expect(page.locator('.flow')).toHaveCSS('animation-name', 'none');
	await page.emulateMedia({ reducedMotion: 'no-preference' });
	await expect(
		page.getByRole('button', { name: 'Pause motion' }),
	).toBeEnabled();
	await page.setViewportSize({ width: 375, height: 812 });
	await page.locator('[data-lang-link]').click();
	await expect(page).toHaveURL(/\/ar\/resonance$/);
	await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
	await page.getByRole('button', { name: '02 تدفّق' }).click();
	await expect(page.locator('.sculpture')).toHaveAttribute('data-form', 'flow');
	for (const prefix of ['/resonance', '/ar/resonance']) {
		for (const path of ['', '/work', '/work/aoun', '/hire']) {
			await page.goto(prefix + path);
			await expect(page.locator('h1')).toBeVisible();
			expect(
				await page.evaluate(
					() => document.documentElement.scrollWidth <= innerWidth,
				),
			).toBe(true);
		}
	}
	expect(errors).toEqual([]);
});
