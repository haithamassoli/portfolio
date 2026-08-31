// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Thmanyah Sans',
			cssVariable: '--font-thmanyah',
			fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
			options: {
				variants: [
					{
						weight: 300,
						style: 'normal',
						src: ['./src/assets/fonts/thmanyahsans-Light.woff2'],
					},
					{
						weight: 400,
						style: 'normal',
						src: ['./src/assets/fonts/thmanyahsans-Regular.woff2'],
					},
					{
						weight: 500,
						style: 'normal',
						src: ['./src/assets/fonts/thmanyahsans-Medium.woff2'],
					},
					{
						weight: 700,
						style: 'normal',
						src: ['./src/assets/fonts/thmanyahsans-Bold.woff2'],
					},
					{
						weight: 900,
						style: 'normal',
						src: ['./src/assets/fonts/thmanyahsans-Black.woff2'],
					},
				],
			},
		},
		{
			provider: fontProviders.google(),
			name: 'Martian Mono',
			cssVariable: '--font-mono',
			fallbacks: ['ui-monospace', 'SFMono-Regular', 'monospace'],
			weights: [400, 600],
			subsets: ['latin'],
			styles: ['normal'],
		},
	],

	i18n: {
		locales: ['en', 'ar'],
		defaultLocale: 'en',
		routing: { prefixDefaultLocale: false },
	},

	vite: {
		plugins: [tailwindcss()],
	},

	integrations: [react()],
});
