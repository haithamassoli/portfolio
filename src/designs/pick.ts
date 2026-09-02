/* Which design a visitor gets, and why. Smart, not a coin flip:

   1. Explicit beats everything. ?d=terminal, or a press of the hero switch,
      pins the choice until it is cleared.
   2. A first-ever visit gets the main design. It is the polished, indexed one;
      the tour is a reward for coming back, not a dice roll thrown at a recruiter.
   3. Sticky within a visit. Under four hours since the last hit, the same
      design. Refresh, back button and deep links do not reshuffle.
   4. A new visit advances a per-visitor tour: a seeded shuffle of the set, so
      eight visits cover all eight, and two visitors do not share a sequence.
   5. Capability filter: reduced motion, save-data or a small device skips the
      heavy designs.
   6. Wrapping never repeats the design just seen.

   ponytail: every function here is standalone on purpose — no imports, no
   closures — so boot.ts can stringify them into the blocking inline script
   instead of keeping a second copy of the policy. Edit with that in mind. */

export interface Visit {
	id: string;
	/** Designs not yet shown this cycle, in order. */
	queue: string[];
	at: number;
	pinned: boolean;
	seed: number;
}

export interface Env {
	reduce: boolean;
	save: boolean;
	memory: number;
}

export const STICKY_MS = 4 * 60 * 60 * 1000;

/** Small, fast, seeded. Enough to shuffle eight things. */
export function rng(seed: number) {
	let a = seed >>> 0;
	return function () {
		a = (a + 0x6d2b79f5) >>> 0;
		let t = Math.imul(a ^ (a >>> 15), 1 | a);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

/** Fisher-Yates, seeded, and never starting on `avoid`. */
export function shuffle(ids: string[], seed: number, avoid?: string): string[] {
	const out = ids.slice();
	const rand = rng(seed);
	for (let i = out.length - 1; i > 0; i--) {
		const j = Math.floor(rand() * (i + 1));
		const t = out[i];
		out[i] = out[j];
		out[j] = t;
	}
	if (out.length > 1 && avoid && out[0] === avoid) {
		const t = out[0];
		out[0] = out[out.length - 1];
		out[out.length - 1] = t;
	}
	return out;
}

/** The designs this device should be shown. */
export function allowed(ids: string[], heavy: string[], env: Env): string[] {
	if (!env.reduce && !env.save && !(env.memory > 0 && env.memory < 4)) {
		return ids.slice();
	}
	const light = ids.filter(function (id) {
		return heavy.indexOf(id) < 0;
	});
	return light.length ? light : ids.slice();
}

export function pick(
	prev: Visit | null,
	now: number,
	env: Env,
	ids: string[],
	heavy: string[],
	seed: number,
): Visit {
	const ok = allowed(ids, heavy, env);
	const home = ids[0];

	if (prev && prev.pinned && ok.indexOf(prev.id) >= 0) {
		return {
			id: prev.id,
			queue: prev.queue,
			at: now,
			pinned: true,
			seed: prev.seed,
		};
	}

	if (!prev) {
		const rest = ok.filter(function (id) {
			return id !== home;
		});
		return {
			id: home,
			queue: shuffle(rest, seed),
			at: now,
			pinned: false,
			seed: seed,
		};
	}

	if (now - prev.at < STICKY_MS && ok.indexOf(prev.id) >= 0) {
		return {
			id: prev.id,
			queue: prev.queue,
			at: now,
			pinned: prev.pinned,
			seed: prev.seed,
		};
	}

	let queue = prev.queue.filter(function (id) {
		return ok.indexOf(id) >= 0;
	});
	let s = prev.seed;
	if (!queue.length) {
		s = (s + 1) >>> 0;
		queue = shuffle(ok, s, prev.id);
	}
	const id = queue[0];
	return { id: id, queue: queue.slice(1), at: now, pinned: false, seed: s };
}
