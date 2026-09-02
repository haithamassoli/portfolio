/* Every URL on the site is three parts: [/ar] [/design] [/page].

   `main` omits the design segment, so today's URLs are untouched; `en` omits
   the locale segment, as astro.config already specifies. The retargeting that
   used to be a regex inside StyleSwitcher's <script> lives here instead, so it
   is one function, locale-aware, and tested. */
import { byId, designs, type Design } from './registry';
import { projects } from '../data/projects';
import type { Lang } from '../i18n';

export type PageKind = 'home' | 'work' | 'hire' | 'project';

export interface Page {
	kind: PageKind;
	/** '' | '/work' | '/hire' | '/work/aoun' */
	path: string;
	/** Index into `projects`, for project pages only. */
	index: number;
}

export const langs: Lang[] = ['en', 'ar'];

/** All four page shapes, in the order the sitemap wants them. */
export const pages = (): Page[] => [
	{ kind: 'home', path: '', index: -1 },
	{ kind: 'work', path: '/work', index: -1 },
	{ kind: 'hire', path: '/hire', index: -1 },
	...projects.map((p, index) => ({
		kind: 'project' as const,
		path: `/work/${p.slug}`,
		index,
	})),
];

export const langOf = (pathname: string): Lang =>
	/^\/ar(\/|$)/.test(pathname) ? 'ar' : 'en';

export const url = (d: Design, lang: Lang, page: string) =>
	(lang === 'ar' ? '/ar' : '') + (d.id === 'main' ? '' : `/${d.id}`) + page ||
	'/';

const idSet = new Set<string>(designs.map((d) => d.id));

export function parse(pathname: string): {
	design: Design;
	lang: Lang;
	page: string;
} {
	const lang = langOf(pathname);
	let rest = pathname.replace(/^\/ar(?=\/|$)/, '').replace(/\/$/, '');
	const head = rest.split('/')[1] ?? '';
	const design = idSet.has(head) && head !== 'main' ? byId(head) : byId('main');
	if (design.id !== 'main') rest = rest.slice(head.length + 1);
	return { design, lang, page: rest };
}

/** Same page, same language, a different design. */
export const sameRoute = (to: Design, pathname: string) => {
	const { lang, page } = parse(pathname);
	return url(to, lang, page);
};

/** Same page, same design, the other language. */
export const otherLang = (pathname: string) => {
	const { design, lang, page } = parse(pathname);
	return url(design, lang === 'ar' ? 'en' : 'ar', page);
};
