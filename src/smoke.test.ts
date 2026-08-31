import { expect, test } from 'vitest';

// ponytail: placeholder so the unit-test job has something to run; delete once real tests exist.
test('build config loads', async () => {
	expect(await import('../astro.config.mjs')).toBeTruthy();
});
