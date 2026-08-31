import { expect, test } from '@playwright/test';

test('the hero holds both scripts', async ({ page }) => {
	await page.goto('/');
	await expect(
		page.getByRole('heading', { name: 'Haitham Assoli' }),
	).toBeVisible();
	await expect(page.locator('.hero__field--mirror')).toContainText('هيثم');
});

test('switching language mirrors the page', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('link', { name: /اقرأ بالعربية/ }).click();
	await expect(page).toHaveURL(/\/ar\/?$/);
	await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
	// the nav must follow the language, not persist from the previous page
	await expect(page.locator('.links')).toContainText('الأعمال');
});

test('a project card opens its own page', async ({ page }) => {
	await page.goto('/');
	await page.locator('.card').first().click();
	await expect(page).toHaveURL(/\/work\/aoun$/);
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Aoun');
	await expect(
		page.getByRole('link', { name: 'Visit the site' }),
	).toBeVisible();
});

test('the hire form blocks an incomplete brief', async ({ page }) => {
	await page.goto('/hire');
	await page.getByLabel('Email').fill('not-an-email');
	await expect(
		page.getByRole('alert').filter({ hasText: 'will not reach you' }),
	).toBeVisible();
	await expect(
		page.getByRole('button', { name: /Compose the email/i }),
	).toBeDisabled();
});
