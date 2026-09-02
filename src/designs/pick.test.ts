import { expect, test } from 'vitest';
import { heavy, ids } from './registry';
import { pick, STICKY_MS, type Env, type Visit } from './pick';

const open: Env = { reduce: false, save: false, memory: 8 };
const throttled: Env = { reduce: true, save: false, memory: 8 };
const SEED = 12345;

const step = (prev: Visit | null, now: number, env = open) =>
	pick(prev, now, env, ids, heavy, SEED);

test('a first-ever visit lands on the main design', () => {
	expect(step(null, 0).id).toBe('main');
});

test('a refresh does not reshuffle', () => {
	const first = step(null, 0);
	const second = step(first, 1000);
	const third = step(second, STICKY_MS - 1);
	expect(second.id).toBe(first.id);
	expect(third.id).toBe(first.id);
});

test('a new visit past the sticky window advances the tour', () => {
	const first = step(null, 0);
	const second = step(first, STICKY_MS + 1);
	expect(second.id).not.toBe(first.id);
});

test('eight visits cover all eight designs exactly once', () => {
	let v = step(null, 0);
	const seen = [v.id];
	for (let i = 1; i < ids.length; i++) {
		v = step(v, i * (STICKY_MS + 1));
		seen.push(v.id);
	}
	expect(seen.slice().sort()).toEqual(ids.slice().sort());
});

test('wrapping never repeats the design just seen', () => {
	let v = step(null, 0);
	for (let i = 1; i < ids.length * 3; i++) {
		const next = step(v, i * (STICKY_MS + 1));
		expect(next.id, `visit ${i}`).not.toBe(v.id);
		v = next;
	}
});

test('two visitors do not walk the same sequence', () => {
	const walk = (seed: number) => {
		let v = pick(null, 0, open, ids, heavy, seed);
		const seen = [v.id];
		for (let i = 1; i < ids.length; i++) {
			v = pick(v, i * (STICKY_MS + 1), open, ids, heavy, seed);
			seen.push(v.id);
		}
		return seen.join();
	};
	expect(walk(1)).not.toBe(walk(999));
});

test('a pinned design never moves, however long the gap', () => {
	const pinned: Visit = {
		id: 'terminal',
		queue: [],
		at: 0,
		pinned: true,
		seed: SEED,
	};
	expect(step(pinned, STICKY_MS * 100).id).toBe('terminal');
});

test('reduced motion never returns a heavy design', () => {
	let v = pick(null, 0, throttled, ids, heavy, SEED);
	for (let i = 1; i < 40; i++) {
		v = pick(v, i * (STICKY_MS + 1), throttled, ids, heavy, SEED);
		expect(heavy, `visit ${i}`).not.toContain(v.id);
	}
});

test('a design pinned but now disallowed gives way to a light one', () => {
	const pinned: Visit = {
		id: 'night-reel',
		queue: [],
		at: 0,
		pinned: true,
		seed: SEED,
	};
	const v = pick(pinned, 10, throttled, ids, heavy, SEED);
	expect(heavy).not.toContain(v.id);
});
