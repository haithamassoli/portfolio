import ts from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default [
	{
		ignores: [
			'dist/',
			'.astro/',
			'node_modules/',
			'playwright-report/',
			'test-results/',
		],
	},
	...ts.configs.recommended,
	...astro.configs.recommended,
];
