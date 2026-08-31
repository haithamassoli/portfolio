import type { APIRoute } from 'astro';
import { projects } from '../data/projects';
import { canonical, languages, href, type Lang } from '../i18n';

/* The route table lives in [...slug].astro; this mirrors it. Two languages of
   home, hire, and every project, no dependency needed for eighty URLs. */
const paths = ['', 'work', 'hire', ...projects.map((p) => `work/${p.slug}`)];

export const GET: APIRoute = ({ site }) => {
	const url = (lang: Lang, path: string) => canonical(href(lang, path), site!);

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${paths
	.map(
		(path) => `	<url>
		<loc>${url('en', path)}</loc>
${(Object.keys(languages) as Lang[])
	.map(
		(lang) =>
			`		<xhtml:link rel="alternate" hreflang="${lang}" href="${url(lang, path)}"/>`,
	)
	.join('\n')}
	</url>`,
	)
	.join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml' },
	});
};
