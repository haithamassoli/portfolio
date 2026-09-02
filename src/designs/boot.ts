/* The gate: one blocking inline script, on `/` and `/ar` only, that sends a
   returning visitor to whichever design the policy picked. Anywhere else it
   would re-run on every in-design navigation.

   The policy itself is not copied here — the functions from pick.ts are
   stringified into the script, so there is exactly one definition of the rules
   and pick.test.ts covers the version that ships. `gate` therefore takes
   `choose` as an argument rather than referencing the import: the emitted call
   passes the emitted `pick`, and nothing depends on how the bundler spells an
   import.
   ponytail: no bundler entry, no second script tag, no hydration. */
import { allowed, pick, rng, shuffle, STICKY_MS, type Visit } from './pick';
import { heavy, ids } from './registry';

export const KEY = 'vx-design';

function gate(
	key: string,
	list: string[],
	heavyList: string[],
	choose: typeof pick,
) {
	try {
		/* /styles shows every design in a live iframe. The gate must not fire in
		   there, or seven of the eight previews become whichever design the
		   visitor is pinned to. */
		if (window.top !== window.self) return;
		const raw = localStorage.getItem(key);
		const prev: Visit | null = raw ? JSON.parse(raw) : null;
		const forced = new URLSearchParams(location.search).get('d');
		const now = Date.now();
		const seed =
			prev && prev.seed ? prev.seed : (Math.random() * 4294967296) >>> 0;
		const nav = navigator as Navigator & {
			connection?: { saveData?: boolean };
			deviceMemory?: number;
		};

		const v =
			forced && list.indexOf(forced) >= 0
				? {
						id: forced,
						queue: prev ? prev.queue : [],
						at: now,
						pinned: true,
						seed,
					}
				: choose(
						prev,
						now,
						{
							reduce: matchMedia('(prefers-reduced-motion: reduce)').matches,
							save: !!(nav.connection && nav.connection.saveData),
							memory: nav.deviceMemory || 0,
						},
						list,
						heavyList,
						seed,
					);
		localStorage.setItem(key, JSON.stringify(v));

		if (v.id !== list[0]) {
			/* Only ever runs on `/` or `/ar`, so the rebuild is this simple.
			   `replace`, not `assign`: back must leave the site, not bounce. */
			const ar = location.pathname.replace(/\/$/, '') === '/ar';
			location.replace((ar ? '/ar/' : '/') + v.id);
		}
	} catch {
		/* private mode, blocked storage: the main design is a fine answer */
	}
}

/** The whole gate, as one string, ready for `<script is:inline set:html>`. */
export const gateSource = () =>
	[
		`var STICKY_MS=${STICKY_MS};`,
		rng.toString(),
		shuffle.toString(),
		allowed.toString(),
		pick.toString(),
		gate.toString(),
		`gate(${JSON.stringify(KEY)},${JSON.stringify(ids)},${JSON.stringify(heavy)},pick);`,
	].join('\n');
