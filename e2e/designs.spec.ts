import { expect, test, type Page } from '@playwright/test';

/* The seven non-main designs, by the id that is now in their URL. */
const designs = [
	'quiet-room',
	'shizukesa',
	'liquid-glass',
	'terminal',
	'bento',
	'night-reel',
	'playroom',
] as const;

const KEY = 'vx-design';
const read = (page: Page) =>
	page.evaluate(
		(k) => JSON.parse(localStorage.getItem(k) || 'null'),
		KEY,
	) as Promise<{ id: string; pinned: boolean; at: number } | null>;

test('a first visit stays on the main design', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveURL(/\/$/);
	await expect(page.locator('html')).toHaveAttribute('data-design', 'main');
	expect((await read(page))?.id).toBe('main');
});

test('a refresh does not reshuffle', async ({ page }) => {
	await page.goto('/?d=terminal');
	await expect(page).toHaveURL(/\/terminal$/);
	for (let i = 0; i < 3; i++) {
		await page.goto('/');
		await expect(page).toHaveURL(/\/terminal$/);
	}
});

test('a stale visit advances to a different design', async ({ page }) => {
	await page.goto('/');
	await page.evaluate((k) => {
		const v = JSON.parse(localStorage.getItem(k)!);
		v.at = 0; // five hours ago, as far as the policy is concerned
		localStorage.setItem(k, JSON.stringify(v));
	}, KEY);
	await page.goto('/');
	await expect(page).not.toHaveURL(/localhost:4321\/$/);
	expect((await read(page))?.id).not.toBe('main');
});

test('the gate keeps an Arabic visitor in Arabic', async ({ page }) => {
	await page.goto('/ar/?d=night-reel');
	await expect(page).toHaveURL(/\/ar\/night-reel$/);
	await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
	await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
});

for (const id of ['main', ...designs]) {
	const base = id === 'main' ? '' : `/${id}`;

	test(`${id}: the hero carries the switch, in both languages`, async ({
		page,
	}) => {
		for (const prefix of ['', '/ar']) {
			await page.goto(`${prefix}${base}` || '/');
			const sw = page.locator('a.dsw');
			await expect(sw).toHaveCount(1);
			await expect(sw).toBeVisible();
			await expect(sw).toContainText(/\d\d \/ 08/);

			/* Prominence, in the terms the designs can actually be held to: a
			   full-size target inside the opening section, next to that design's
			   own calls to action — not a pill in a corner. Several of these
			   heroes are taller than a screen by their own choice, so "above the
			   fold" is not the test; "in the hero, with the buttons" is. */
			const box = (await sw.boundingBox())!;
			expect(box.height).toBeGreaterThanOrEqual(48);
			expect(box.width).toBeGreaterThan(280);

			const place = await sw.evaluate((el) => {
				const y = (n: Element) => n.getBoundingClientRect().top + scrollY;
				/* The first visible h2 is where the hero ends and the page's
				   second thought begins. The switch has to be before it. */
				const h2 = [...document.querySelectorAll('h2')].find(
					(n) => (n as HTMLElement).offsetParent !== null,
				);
				return { sw: y(el), h2: h2 ? y(h2) : Infinity };
			});
			expect(place.sw).toBeLessThan(place.h2);

			// the retired corner switcher is gone everywhere
			await expect(page.locator('.sx')).toHaveCount(0);
		}
	});

	test(`${id}: every page renders in Arabic`, async ({ page }) => {
		const errors: string[] = [];
		page.on('pageerror', (e) => errors.push(e.message));
		for (const path of ['', '/work', '/work/aoun', '/hire']) {
			await page.goto(`/ar${base}${path}` || '/ar');
			await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
			await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
			await expect(page.locator('html')).toHaveAttribute('data-design', id);
		}
		expect(errors).toEqual([]);
	});
}

test('the switch walks the whole set and lands on the same page each time', async ({
	page,
}) => {
	await page.goto('/work/aoun');
	const seen: string[] = [];
	for (let i = 0; i < 8; i++) {
		seen.push((await page.locator('html').getAttribute('data-design'))!);
		await expect(page).toHaveURL(/\/work\/aoun$/);
		await page.locator('a.dsw').click();
		await page.waitForLoadState('load');
	}
	expect(new Set(seen).size).toBe(8);
	expect(seen[0]).toBe('main');
});

test('pressing the switch pins the choice, and the gallery unpins it', async ({
	page,
}) => {
	await page.goto('/');
	await page.locator('a.dsw').click();
	await page.waitForLoadState('load');
	const chosen = await page.locator('html').getAttribute('data-design');
	expect((await read(page))?.pinned).toBe(true);

	await page.goto('/');
	await expect(page.locator('html')).toHaveAttribute('data-design', chosen!);

	await page.goto('/styles');
	await page.getByRole('button', { name: /choose for me/i }).click();
	expect((await read(page))?.pinned).toBe(false);
});

test('the language switch keeps the design and the page', async ({ page }) => {
	await page.goto('/terminal/work/aoun');
	await page.locator('[data-lang-link]').first().click();
	await expect(page).toHaveURL(/\/ar\/terminal\/work\/aoun$/);
	await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
});

test('the old numbered addresses still land somewhere', async ({ page }) => {
	await page.goto('/4');
	await expect(page).toHaveURL(/\/terminal$/);
});

test('the seven copies are not offered to a search engine', async ({
	page,
}) => {
	await page.goto('/bento/work/aoun');
	await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
		'content',
		'noindex, follow',
	);
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
		'href',
		/\/work\/aoun$/,
	);
	await page.goto('/work/aoun');
	await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
});

test('without cross-document transitions the switch still wipes and lands', async ({
	browser,
}) => {
	/* Firefox has no cross-document view transitions yet. Take the feature away
	   from Chrome and the same press has to end on the same page anyway. */
	const ctx = await browser.newContext();
	await ctx.addInitScript(() => {
		delete (window as unknown as Record<string, unknown>).onpagereveal;
		delete (window as unknown as Record<string, unknown>).onpageswap;
	});
	const page = await ctx.newPage();
	await page.goto('/terminal');
	await page.locator('a.dsw').click();
	await page.waitForURL(/\/bento$/, { timeout: 5000 });
	await expect(page.locator('html')).toHaveAttribute('data-design', 'bento');
	await ctx.close();
});

test('reduced motion gets the navigation without the animation', async ({
	browser,
}) => {
	const ctx = await browser.newContext({ reducedMotion: 'reduce' });
	const page = await ctx.newPage();
	await page.goto('/terminal');
	await page.locator('a.dsw').click();
	await page.waitForURL(/\/bento$/, { timeout: 5000 });
	await expect(page.locator('html')).not.toHaveAttribute('data-reveal', '');
	await ctx.close();
});

test('reduced motion is never handed a heavy design', async ({ browser }) => {
	const ctx = await browser.newContext({ reducedMotion: 'reduce' });
	const page = await ctx.newPage();
	const heavy = ['liquid-glass', 'night-reel', 'playroom'];
	await page.goto('/');
	for (let i = 0; i < 10; i++) {
		await page.evaluate(() => {
			const v = JSON.parse(localStorage.getItem('vx-design')!);
			v.at = 0;
			v.pinned = false;
			localStorage.setItem('vx-design', JSON.stringify(v));
		});
		await page.goto('/');
		const id = await page.locator('html').getAttribute('data-design');
		expect(heavy, `visit ${i}`).not.toContain(id);
	}
	await ctx.close();
});
