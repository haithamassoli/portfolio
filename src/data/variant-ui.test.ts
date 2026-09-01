import { describe, expect, it } from 'vitest';
import { projects } from '../../content';
import { profile } from '../../content/profile';
import { yearPair } from './variant-ui';

describe('yearPair', () => {
	it('says the two shapes content/ actually uses', () => {
		expect(yearPair('Since 2025').ar).toBe('منذ 2025');
		expect(yearPair('2023 to 2026').ar).toBe('2023 إلى 2026');
		expect(yearPair('2026').ar).toBe('2026');
	});

	it('leaves no English in any real year or period', () => {
		const all = [
			...projects.map((p) => p.year),
			...profile.experience.map((e) => e.period),
			...profile.education.map((e) => e.period),
		];
		for (const y of all) expect(yearPair(y).ar).not.toMatch(/[A-Za-z]/);
	});
});
