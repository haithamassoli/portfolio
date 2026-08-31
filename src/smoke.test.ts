import { expect, test } from 'vitest';
import { isEmail, isPhone, minLen } from './components/HireForm';
import { projects } from './data/projects';
import { href, swapLangHref, ui } from './i18n';

test('language switch lands on the same page in the other language', () => {
	expect(swapLangHref('/', 'en')).toBe('/ar/');
	expect(swapLangHref('/ar/', 'ar')).toBe('/');
	expect(swapLangHref('/work/aoun', 'en')).toBe('/ar/work/aoun');
	expect(swapLangHref('/ar/work/aoun', 'ar')).toBe('/work/aoun');
	// a slug that merely starts with "ar" must not be mistaken for the prefix
	expect(swapLangHref('/work/archive', 'en')).toBe('/ar/work/archive');
	expect(href('en', 'hire')).toBe('/hire');
	expect(href('ar', 'hire')).toBe('/ar/hire');
});

test('every project ships in both languages', () => {
	for (const p of projects) {
		for (const lang of ['en', 'ar'] as const) {
			expect(p[lang].title, `${p.slug}.${lang}.title`).toBeTruthy();
			expect(p[lang].tagline, `${p.slug}.${lang}.tagline`).toBeTruthy();
			expect(
				p[lang].summary.length,
				`${p.slug}.${lang}.summary`,
			).toBeGreaterThan(40);
		}
	}
	expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
});

test('the two dictionaries carry the same keys', () => {
	expect(Object.keys(ui.ar).sort()).toEqual(Object.keys(ui.en).sort());
});

test('hire form rejects what it should', () => {
	const bad = 'nope';
	expect(isEmail(bad)('me@example.com')).toBeUndefined();
	expect(isEmail(bad)('me@example')).toBe(bad);
	expect(isEmail(bad)('me @example.com')).toBe(bad);
	expect(isPhone(bad)('+962 79 123 4567')).toBeUndefined();
	expect(isPhone(bad)('0791')).toBe(bad);
	expect(minLen(3, bad)('  a  ')).toBe(bad);
	expect(minLen(3, bad)('Layla')).toBeUndefined();
});
