/* The route table, in the shape getStaticPaths wants it.

   Each design has its own route file — `src/pages/<design>/[...slug].astro` and
   its Arabic twin — rather than one catch-all for all eight. That is not
   ceremony: Astro links the CSS of everything a route file imports, so a single
   route would put all eight designs' global stylesheets (and the main design's
   Tailwind base) on every page, and they would fight. One route file, one
   design, one stylesheet. */
import { byId, type DesignId } from './registry';
import { pages } from './routes';
import { projects } from '../data/projects';
import type { Lang } from '../i18n';

export const designPaths = (id: DesignId, lang: Lang) =>
	pages().map((page) => ({
		params: { slug: page.path.slice(1) || undefined },
		props: { id, lang, kind: page.kind, index: page.index },
	}));

export interface RouteProps {
	id: DesignId;
	lang: Lang;
	kind: 'home' | 'work' | 'hire' | 'project';
	index: number;
}

export const resolve = ({ id, index, kind }: RouteProps) => ({
	design: byId(id),
	project: kind === 'project' ? projects[index] : undefined,
	next:
		kind === 'project' ? projects[(index + 1) % projects.length] : undefined,
});
