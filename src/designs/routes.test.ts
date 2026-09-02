import { expect, test } from 'vitest';
import { byId, designs } from './registry';
import { otherLang, parse, sameRoute, url } from './routes';

const terminal = byId('terminal');
const bento = byId('bento');
const main = byId('main');

test('a url is [/ar] [/design] [/page]', () => {
	expect(url(main, 'en', '')).toBe('/');
	expect(url(main, 'ar', '')).toBe('/ar');
	expect(url(main, 'en', '/work/aoun')).toBe('/work/aoun');
	expect(url(terminal, 'en', '')).toBe('/terminal');
	expect(url(terminal, 'ar', '/hire')).toBe('/ar/terminal/hire');
});

test('parse is the inverse of url', () => {
	for (const d of designs) {
		for (const lang of ['en', 'ar'] as const) {
			for (const page of ['', '/work', '/hire', '/work/aoun']) {
				const got = parse(url(d, lang, page));
				expect([got.design.id, got.lang, got.page]).toEqual([d.id, lang, page]);
			}
		}
	}
});

test('a slug that merely starts with ar is not a locale prefix', () => {
	expect(parse('/work/archive').lang).toBe('en');
	expect(parse('/arcade').lang).toBe('en');
});

test('switching design keeps the page and the language', () => {
	expect(sameRoute(bento, '/terminal/work/aoun')).toBe('/bento/work/aoun');
	expect(sameRoute(bento, '/ar/terminal/work/aoun')).toBe(
		'/ar/bento/work/aoun',
	);
	expect(sameRoute(main, '/ar/terminal/hire')).toBe('/ar/hire');
	expect(sameRoute(terminal, '/ar')).toBe('/ar/terminal');
});

test('switching language keeps the page and the design', () => {
	expect(otherLang('/terminal/work/aoun')).toBe('/ar/terminal/work/aoun');
	expect(otherLang('/ar/terminal/work/aoun')).toBe('/terminal/work/aoun');
	expect(otherLang('/')).toBe('/ar');
	expect(otherLang('/ar')).toBe('/');
});
