import { expect, test } from 'vitest';
import { hireSchema } from './components/HireForm';
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
	const t = ui.en as unknown as Record<string, string>;
	const schema = hireSchema(t);
	const ok = {
		fullName: 'Layla',
		email: 'me@example.com',
		phone: '+962 79 123 4567',
		deal: 'part',
		location: 'remote',
		summary: 'A booking app for a clinic.',
		budget: '5000 USD',
		techStack: ['web'],
	};
	expect(schema.safeParse(ok).success).toBe(true);

	const errorOn = (patch: Partial<typeof ok>) => {
		const r = schema.safeParse({ ...ok, ...patch });
		return r.success ? undefined : r.error.issues[0].message;
	};
	expect(errorOn({ email: 'me@example' })).toBe(t['err.email']);
	expect(errorOn({ email: 'me @example.com' })).toBe(t['err.email']);
	expect(errorOn({ phone: '0791' })).toBe(t['err.phone']);
	expect(errorOn({ fullName: '  a  ' })).toBe(t['err.fullName']);
	expect(errorOn({ summary: 'too short' })).toBe(t['err.summary']);
	expect(errorOn({ budget: '   ' })).toBe(t['err.budget']);
	expect(errorOn({ techStack: [] })).toBe(t['err.techStack']);
});
