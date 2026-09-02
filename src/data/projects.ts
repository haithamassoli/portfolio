import { projects as content } from '../../content';

export type { Locale, Project as Content } from '../../content';

/** How a project is showcased on its card and at the top of its page. */
export type Frame = 'phone' | 'browser' | 'editor' | 'postcard';

/**
 * The site's data is `content/`: 39 bilingual projects, written up in full.
 * This module only adds the two things the design needs and the content layer
 * does not carry: a frame to show the project in, and an accent colour.
 */

/* Every cover and gallery shot, resolved to an optimizable image. */
const shots = {
	...import.meta.glob<{ default: ImageMetadata }>('../assets/projects/*.png', {
		eager: true,
	}),
	...import.meta.glob<{ default: ImageMetadata }>('../assets/apps/*.png', {
		eager: true,
	}),
};

/** `/projects/aoun.png` → the imported image, or undefined if there is none. */
const shot = (path: string) => shots[`../assets${path}`]?.default;

/* The frame is what makes each card look unlike the one beside it. */
const frames: Record<string, Frame> = {
	mobile: 'phone',
	desktop: 'editor',
	extension: 'editor',
	ai: 'postcard',
	web: 'browser',
	client: 'browser',
};

/* Six accents, cycled in order so no two neighbouring cards share one. */
const palette = [
	'#FF5A1F',
	'#2FA36B',
	'#C6A02C',
	'#5E9BD6',
	'#A78BFA',
	'#4EA5A5',
];

export const projects = content.map((p, i) => ({
	...p,
	frame: frames[p.category],
	accent: palette[i % palette.length],
	image: p.cover ? shot(p.cover) : undefined,
	shots: p.gallery.map(shot).filter((s) => s !== undefined),
}));

export type Project = (typeof projects)[number];

export const featured = projects.filter((p) => p.featured);
export const rest = projects.filter((p) => !p.featured);

/* Counted, not typed out, so the figures cannot drift from the work. */
export const shipped = projects.length;
export const onStores = projects.filter(
	(p) => p.links.playGoogle ?? p.links.appStore,
).length;

export const bySlug = (slug: string) => projects.find((p) => p.slug === slug);
