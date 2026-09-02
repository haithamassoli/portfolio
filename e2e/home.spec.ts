import { expect, test } from '@playwright/test';

test('the no-JavaScript fallback holds both scripts', async ({ browser }) => {
	const page = await browser.newPage({ javaScriptEnabled: false });
	await page.goto('/');
	await expect(
		page.getByRole('heading', { name: 'Haitham Assoli' }),
	).toBeVisible();
	await expect(page.locator('.hero__field--mirror')).toContainText('هيثم');
});

test('the Arabic entry keeps its language in the selected style', async ({
	page,
}) => {
	await page.goto('/ar');
	expect(new URL(page.url()).pathname).toMatch(/^\/(?:[1-7]|ar)\/?$/);
	await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
	await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
});

test('a fallback project card opens its canonical page', async ({
	browser,
}) => {
	const page = await browser.newPage({ javaScriptEnabled: false });
	await page.goto('/');
	await page.locator('.card').first().click();
	await expect(page).toHaveURL(/\/work\/aoun$/);
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Aoun');
	await expect(
		page.getByRole('link', { name: 'Visit the site' }),
	).toBeVisible();
});

test('the hire form blocks an incomplete brief', async ({ page }) => {
	await page.goto('/1/hire');
	const email = page.getByLabel('Email');
	await email.fill('not-an-email');
	expect(
		await email.evaluate((input: HTMLInputElement) => input.checkValidity()),
	).toBe(false);
	const url = page.url();
	await page.getByRole('button', { name: /Compose the email/i }).click();
	await expect(page).toHaveURL(url);
});

test('the fallback work page lists every project, grouped', async ({
	browser,
}) => {
	const page = await browser.newPage({ javaScriptEnabled: false });
	await page.goto('/work');
	await expect(page.getByRole('heading', { level: 1 })).toHaveText(
		'All projects',
	);
	await expect(page.locator('.card')).toHaveCount(39);
	await expect(page.locator('.group')).toHaveCount(6);
});
