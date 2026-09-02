import type { APIRoute } from 'astro';
import { designs } from '../designs/registry';
import { langs, pages, url } from '../designs/routes';
import { canonical } from '../i18n';

/* The main design only: the other seven are noindex copies of these pages, and
   a sitemap that offered eight spellings of one URL would be asking Google to
   pick. Generated from the same route table [...slug].astro builds from, so it
   cannot drift. */
const main = designs[0];

export const GET: APIRoute = ({ site }) => {
	const abs = (lang: (typeof langs)[number], path: string) =>
		canonical(url(main, lang, path), site!);

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages()
	.map(
		(page) => `	<url>
		<loc>${abs('en', page.path)}</loc>
${langs
	.map(
		(lang) =>
			`		<xhtml:link rel="alternate" hreflang="${lang}" href="${abs(lang, page.path)}"/>`,
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
