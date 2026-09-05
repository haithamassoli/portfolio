import { expect, test } from '@playwright/test';

/* ---- Loom, the main design, at `/` ---- */

test('the loom weaves the name, or hands it to CSS', async ({ page }) => {
	await page.goto('/');
	const stage = page.locator('.hero__stage');
	await expect(stage).toHaveAttribute('data-loom', 'Haitham Assoli');
	/* Headless Chromium has WebGL through SwiftShader, so the canvas should
	   come up; if this machine has none, the h1 must stay visible instead. */
	const state = await stage
		.getAttribute('data-state', { timeout: 6000 })
		.catch(() => null);
	if (state === 'on') {
		await expect(stage.locator('canvas')).toBeVisible();
	} else {
		await expect(page.locator('.hero__name')).toBeVisible();
	}
	await expect(page.locator('.hero__name')).toHaveText('Haitham Assoli');
});

test('the main work page lists every project on six shelves', async ({
	page,
}) => {
	await page.goto('/work');
	await expect(page.locator('.entry')).toHaveCount(40);
	await expect(page.locator('.shelf')).toHaveCount(6);
});

test('the Jacquard card punches a row as its field is filled', async ({
	page,
}) => {
	await page.goto('/hire');
	const row = page.locator('[data-row="email"]');
	await expect(row).not.toHaveClass(/is-punched/);
	await page.getByLabel('Email').fill('not-an-email');
	await expect(row).not.toHaveClass(/is-punched/);
	await page.getByLabel('Email').fill('me@example.com');
	await expect(row).toHaveClass(/is-punched/);
});

/* ---- Signal, the former main design, now at /signal ---- */

test('the hero holds both scripts', async ({ page }) => {
	await page.goto('/signal');
	await expect(
		page.getByRole('heading', { name: 'Haitham Assoli' }),
	).toBeVisible();
	await expect(page.locator('.hero__field--mirror')).toContainText('هيثم');
});

test('switching language mirrors the page', async ({ page }) => {
	await page.goto('/signal');
	await page.getByRole('link', { name: /اقرأ بالعربية/ }).click();
	await expect(page).toHaveURL(/\/ar\/signal$/);
	await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
	// the nav must follow the language, not persist from the previous page
	await expect(page.locator('.links')).toContainText('الأعمال');
});

test('a project card opens its own page', async ({ page }) => {
	await page.goto('/signal');
	await page.locator('.card').first().click();
	await expect(page).toHaveURL(/\/signal\/work\/aoun$/);
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Aoun');
	await expect(
		page.getByRole('link', { name: 'Visit the site' }),
	).toBeVisible();
});

test('the hire form blocks an incomplete brief', async ({ page }) => {
	await page.goto('/signal/hire');
	await page.getByLabel('Email').fill('not-an-email');
	await expect(
		page.getByRole('alert').filter({ hasText: 'will not reach you' }),
	).toBeVisible();
	await expect(
		page.getByRole('button', { name: /Compose the email/i }),
	).toBeDisabled();
});

test('the work page lists every project, grouped', async ({ page }) => {
	await page.goto('/signal/work');
	await expect(page.getByRole('heading', { level: 1 })).toHaveText(
		'All projects',
	);
	await expect(page.locator('.card')).toHaveCount(40);
	await expect(page.locator('.group')).toHaveCount(6);
});
