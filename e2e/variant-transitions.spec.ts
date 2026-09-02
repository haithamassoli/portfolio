import { expect, test, type Page } from '@playwright/test';

/* The design variants navigate through the client router, so a hop must swap
   the page instead of reloading it, and the two things that live on <html> —
   the chosen language and, in variant 1, the theme — have to survive the swap.
   A stale marker on `window` is the cheapest proof no reload happened. */
const variants = [1, 2, 3, 4, 5, 6, 7] as const;
const registered = [...variants, 8] as const;
const registry = registered.join(',');

async function seedStyle(page: Page, current: number, queue: number[]) {
	await page.evaluate(
		({ current, queue, registry }) => {
			const date = new Date();
			const pad = (n: number) => String(n).padStart(2, '0');
			localStorage.setItem(
				'vx-style',
				JSON.stringify({
					version: 1,
					registry,
					day: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
					current,
					queue,
				}),
			);
		},
		{ current, queue, registry },
	);
}

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

async function switchStyle(page: Page, tail: string) {
	await page.goto(`/1${tail}`);
	await seedStyle(page, 1, [2, 3, 4, 5, 6, 7, 8]);
	await page.reload();
	const button = page.locator('[data-style-switch]');
	await expect(button).toBeVisible();
	await button.click();
	await expect(page).toHaveURL(new RegExp(`/[2-7]${tail}/?$`));
}

for (const [name, tail] of [
	['home', ''],
	['projects', '/projects'],
	['hire', '/hire'],
	['project detail', '/work/aoun'],
] as const) {
	test(`style switch keeps the ${name} route`, async ({ page }) => {
		await switchStyle(page, tail);
	});
}

test('style switch keeps language, direction, and Quiet Room theme', async ({
	page,
}) => {
	await page.goto('/1');
	await page.evaluate(() => {
		localStorage.setItem('vx-lang', 'ar');
		localStorage.setItem('qr-theme', 'dark');
	});
	await seedStyle(page, 1, [2, 3, 4, 5, 6, 7, 8]);
	await page.reload();

	await page.locator('[data-style-switch]').click();
	await expect(page).toHaveURL(/\/[2-7]\/?$/);
	await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
	await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
	expect(
		await page.evaluate(() => [
			localStorage.getItem('vx-lang'),
			localStorage.getItem('qr-theme'),
		]),
	).toEqual(['ar', 'dark']);

	await page.goto('/1');
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('canonical entries keep their equivalent route and daily style', async ({
	page,
}) => {
	await page.addInitScript((registry) => {
		const date = new Date();
		const pad = (n: number) => String(n).padStart(2, '0');
		localStorage.setItem(
			'vx-style',
			JSON.stringify({
				version: 1,
				registry,
				day: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
				current: 3,
				queue: [1, 2, 4, 5, 6, 7, 8],
			}),
		);
	}, registry);

	for (const [entry, destination] of [
		['/', '/3'],
		['/work', '/3/projects'],
		['/hire', '/3/hire'],
		['/work/aoun', '/3/work/aoun'],
	] as const) {
		await page.goto(entry);
		await expect(page).toHaveURL(destination);
	}
});

test('blocked storage uses the same fallback style for the day', async ({
	page,
}) => {
	await page.addInitScript(() => {
		Storage.prototype.getItem = () => {
			throw new DOMException('blocked');
		};
		Storage.prototype.setItem = () => {
			throw new DOMException('blocked');
		};
	});
	await page.goto('/');
	expect(new URL(page.url()).pathname).toMatch(/^\/(?:[1-7])?$/);
	const first = page.url();
	await page.goto('/');
	await expect(page).toHaveURL(first);
});

test('Ink & Bone remains selectable when storage is blocked', async ({ page }) => {
	await page.addInitScript(() => {
		Storage.prototype.getItem = () => {
			throw new DOMException('blocked');
		};
		Storage.prototype.setItem = () => {
			throw new DOMException('blocked');
		};
	});
	await page.goto('/?style=8');
	await expect(page).toHaveURL('/');
	await expect(page.locator('[data-style-switch]')).toBeVisible();
});

test('English Ink & Bone clears a stale Arabic style preference', async ({
	page,
}) => {
	await page.addInitScript(() => localStorage.setItem('vx-lang', 'ar'));
	await page.goto('/?style=8');
	await page.locator('[data-style-switch]').click();
	await expect(page.locator('html')).toHaveAttribute('lang', 'en');
	await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
});

test('reduced motion switches without a root animation', async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.goto('/1');
	await seedStyle(page, 1, [2, 3, 4, 5, 6, 7, 8]);
	await page.reload();
	expect(
		await page.evaluate(
			() =>
				getComputedStyle(
					document.documentElement,
					'::view-transition-new(root)',
				).animationName,
		),
	).toBe('none');
	await page.locator('[data-style-switch]').click();
	await expect(page).toHaveURL(/\/[2-7]$/);
});

test('the switch can reveal every registered destination', async ({ page }) => {
	await page.goto('/1');
	for (const target of registered) {
		const current = target === 1 ? 2 : 1;
		await seedStyle(page, current, [
			target,
			...registered.filter((id) => id !== current && id !== target),
		]);
		await page.goto(`/${current}`);
		await page.locator('[data-style-switch]').click();
		await expect(page).toHaveURL(target === 8 ? '/' : `/${target}`);
	}
});

test('Ink & Bone stays available across its canonical route family', async ({
	page,
}) => {
	await page.goto('/?style=8');
	await expect(page).toHaveURL('/');
	await expect(page.locator('[data-style-switch]')).toBeVisible();
	for (const path of ['/work', '/hire', '/work/aoun']) {
		await page.goto(path);
		await expect(page).toHaveURL(path);
	}
	expect(
		await page.evaluate(() => JSON.parse(localStorage.getItem('vx-style')!)),
	).toMatchObject({
		registry,
		current: 8,
	});
});
