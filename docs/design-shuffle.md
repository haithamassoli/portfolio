# Plan — eight designs, one portfolio

Turn `/1 … /7` from a private contact sheet into the product: every visitor
lands in one of the **eight** designs (the main site plus the seven variants),
the choice rotates on a rule rather than a coin flip, and a button standing
plainly in every hero moves between them with a circular reveal. All eight
carry real Arabic and English routes.

Written against the repo as it stands: static output (no adapter), `main`
design = `[...slug].astro` + `layouts/Base.astro` + `sections/*`, variants =
`pages/N.astro` + `pages/N/{projects,hire,work/[slug]}.astro` + `pages/N/_shell.astro`.

---

## Built — and where it left the plan

All five phases have shipped. `astro check` clean, 33 unit tests, 33 Playwright
tests, 686 pages in ~3s. Lighthouse on the main design: 100 / 100 / 100.
On a variant: accessibility 100, best practices 100, SEO 69 — the 69 is
`is-crawlable` failing on purpose, which is §6 working.

Seven things came out differently from the plan, and the reasons are worth
keeping:

1. **One route file per design per language, not one catch-all.** §1 called for
   a single `[...slug].astro` for all eight designs. That builds, and it is
   wrong: Astro links the CSS of everything a route file imports, so every page
   got all eight designs' global stylesheets plus the main design's Tailwind
   base, and they fought — Bento's grid collapsed outright. The fix is fourteen
   ten-line stubs under `src/pages/<design>/` and `src/pages/ar/<design>/`,
   each importing one design. All the content still lives in `src/designs/`.
   Reason is in `src/designs/paths.ts`.
2. **`LangBoot.astro` survives, as three lines of CSS.** The 744 `<T>` call
   sites now render one language, as planned. But the designs also write about
   200 bilingual pairs inline as `data-l="en"` / `data-l="ar"` siblings, where
   the two languages need different markup around them. Those still ship both
   and let CSS hide one — correct, server-rendered, no script, no flash, and
   far less work than hand-converting 200 sites. The script and the `vx-lang`
   key are gone.
3. **The switch also stands at the foot of sub-pages.** §3 put it in the hero,
   and only home pages have heroes. Deleting `StyleSwitcher` without this would
   have left `/bento/work/aoun` with no way out of Bento. Same component, same
   wording, quieter placement; the shells render it only when
   `parse(pathname).page !== ''`, so a home page never shows two.
4. **"Above the fold" became "before the first visible `h2`".** Four of these
   heroes are taller than a 1280×800 screen by their own design — Night Reel's
   own two CTAs sit at y≈1600. Holding the switch to a rule its neighbours do
   not meet would have meant redesigning seven heroes. It sits with the CTAs,
   inside the hero, in all eight. That is what the Playwright spec checks.
5. **The leading accent ring is a `drop-shadow`, not a second animated layer.**
   `filter: drop-shadow(0 0 14px var(--to))` on `::view-transition-new(root)`
   follows the clipped silhouette, so the incoming circle carries a glowing
   edge in the destination's colour. One line instead of thirty, same read.
6. **No `aria-label` on the switch.** The bilingual one the plan specified
   failed WCAG 2.5.3 (Label in Name): the accessible name has to contain the
   visible text, and "Switch to the Playroom design" does not contain "Next
   design — Playroom". The visible label is now the accessible name; the note
   moved to `title`.
7. **The gate does not run in an iframe.** `/styles` previews all eight live,
   and the gate fired inside every frame, so seven tiles showed whichever
   design the visitor was pinned to. One line: `if (window.top !== window.self)`.

Two smaller notes: `pick()`'s state field is `queue` (what is left of this
cycle) rather than `order`, and visiting a design directly drops it from that
queue, so the tour never offers a design you are already standing in. Four
registry accents were brightened — an accent has to read as a swatch on the
_other_ seven backgrounds, not just its own.

Open question 3 was answered by building it: one press advances the tour, and
`/styles` carries the "let the site choose for me again" control that unpins.

---

## 0. Decisions taken up front

| Question                           | Decision                                                               | Why                                                                              |
| ---------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Where does the pick happen?        | Client, in a blocking `<head>` script on `/` and `/ar` only            | No adapter, no server. A blocking script redirects before first paint.           |
| What does a crawler see?           | Always the main design at `/` and `/ar`                                | Bots do not run the script. Canonical stays one page, one ranking.               |
| Do the seven variants get indexed? | No — `noindex, follow` + `<link rel=canonical>` to the main equivalent | Eight copies of 39 project pages is eight-way self-competition.                  |
| URL shape                          | `/quiet-room`, `/ar/terminal/work/aoun`, … `/1 … /7` kept as redirects | Shareable, locale-prefixed exactly like the main design already is.              |
| Arabic in the variants             | Real routes, server-rendered, one language per page                    | Replaces the dual-render `<T>` + `LangBoot` toggle. Cheaper than it sounds — §4. |
| Reveal technique                   | Native cross-document View Transitions, colour-wipe fallback           | Rung 3 of the ladder: the platform does this now. Firefox degrades to a wipe.    |
| Rotation state                     | `localStorage`, one JSON record                                        | A cookie buys nothing without a server.                                          |

Cost to acknowledge: the redirect on `/` is one extra round trip for returning
visitors, and the build goes to ~670 pages. Both are accepted below;
mitigations in §7.

---

## 1. File reorganisation

The variant pages are 700–2500 lines each and their routes are copy-pasted
seven times. Adding Arabic to that shape would copy them fourteen times. The
reorg replaces all 29 page files with **one** route.

### Target tree

```
src/
  designs/
    registry.ts            ← the single source of truth (see below)
    routes.ts              ← the route table + `sameRoute`, with tests
    pick.ts                ← pure rotation policy + `pick.test.ts`
    boot.ts                ← the head script, inlined by the gate
    _shared/
      DesignSwitch.astro   ← the hero button (§3)
      reveal.css           ← the circular reveal, one copy for all eight
    main/                  ← moved from layouts/Base.astro + sections/*
      Shell.astro  Home.astro  Work.astro  Hire.astro  Project.astro
    quiet-room/            ← moved from pages/1*.astro
      Shell.astro  Home.astro  Work.astro  Hire.astro  Project.astro
    shizukesa/  liquid-glass/  terminal/  bento/  night-reel/  playroom/
  pages/
    [...slug].astro        ← every design × every language × every page
    [n].astro              ← /1 … /7 → /quiet-room … (generated from the registry)
    styles.astro           ← the gallery, reworked (§6)
```

Deleted by the end of Phase 2: `src/pages/N.astro`, `src/pages/N/**`,
`src/data/style-variants.ts`, `src/components/LangBoot.astro`,
`src/components/StyleSwitcher.astro` (§3). `components/`, `data/`, `content/`,
`charts/` stay where they are — already shared, already fine.

### `src/designs/registry.ts`

Everything reads from here: routing, the switch button, the picker, the
gallery, the sitemap.

```ts
export type DesignId =
	| 'main'
	| 'quiet-room'
	| 'shizukesa'
	| 'liquid-glass'
	| 'terminal'
	| 'bento'
	| 'night-reel'
	| 'playroom';

export interface Design {
	id: DesignId;
	n: number; // legacy /1 … /7, 0 for main
	name: I18n; // printed on the hero button, both languages
	note: I18n;
	accent: string; // the colour the reveal circle carries in
	weight: 'light' | 'heavy'; // heavy = blur/glass/grain/motion-led
}
```

### One route table, `src/designs/routes.ts`

Today the main design calls the index `/work` and the variants call it
`/projects`. **Variants adopt `/work`**, so all eight share one table:

```
''            → home
'/work'       → project index
'/work/:slug' → one project
'/hire'       → the form
```

A URL is then exactly three parts: `[/ar] [/design] [/page]`. `main` omits the
design segment (it keeps today's URLs untouched); `en` omits the locale
segment, as the existing i18n config already specifies.

```ts
export const url = (d: Design, lang: Lang, page: string) =>
  (lang === 'ar' ? '/ar' : '') + (d.id === 'main' ? '' : `/${d.id}`) + page || '/';

export const parse = (pathname: string): { design: Design; lang: Lang; page: string }
export const sameRoute = (to: Design, pathname: string) => /* parse, swap design, rebuild */
```

`sameRoute` is the retargeting logic that today lives as a regex inside a
`<script>` in `StyleSwitcher.astro` — moved out, made testable, and now
locale-aware: `/ar/terminal/work/aoun` → `/ar/bento/work/aoun`. The mirror
function `otherLang` powers the header language switch and keeps the design.
Both get a small `routes.test.ts`; they are the two functions every link on the
site depends on.

### `src/pages/[...slug].astro`

```astro
---
import { designs, load } from '../designs/registry';
import { pages, url } from '../designs/routes';

export function getStaticPaths() {
	return designs.flatMap((d) =>
		langs.flatMap((lang) =>
			pages().map((page) => ({
				params: { slug: url(d, lang, page.path).slice(1) || undefined },
				props: { d, lang, page },
			})),
		),
	);
}
const { d, lang, page } = Astro.props;
const mod = await load(d.id);
const View = mod[page.view]; // Home | Work | Hire | Project
---

<mod.Shell design={d} lang={lang} page={page}>
	<View design={d} lang={lang} page={page} />
</mod.Shell>
```

`load` is a plain object of static dynamic imports in `registry.ts`
(`{ terminal: () => import('./terminal') }`) — no `import.meta.glob` with an
interpolated path, so Vite can still see the graph. `styles.astro`,
`accounts.astro` and `logos.astro` are literal routes and keep winning over the
catch-all.

### Migration mechanics per variant (repeat ×7)

1. `git mv src/pages/1.astro src/designs/quiet-room/Home.astro`, same for
   `projects.astro → Work.astro`, `hire.astro → Hire.astro`,
   `work/[slug].astro → Project.astro`, `_shell.astro → Shell.astro`.
2. Delete each file's `getStaticPaths`; take `project`/`next` from props.
3. Fix relative imports (`../` → `../../`).
4. Replace hardcoded `/1/...` hrefs with `url(design, lang, …)`.
5. Apply the Arabic conversion checklist (§4).
6. `astro check` + Playwright after each variant, not after all seven.

No visual change lands in Phase 2. It is mechanical on purpose.

---

## 2. The rotation policy — "smart", not random

All of it is one pure function, testable without a browser.

```ts
// src/designs/pick.ts
interface Visit {
	id: DesignId;
	order: DesignId[];
	at: number;
	pinned: boolean;
}
export function pick(prev: Visit | null, now: number, env: Env): Visit;
```

Rules, in order:

1. **Explicit beats everything.** `?d=terminal` in the URL, or a press of the
   hero button, sets `pinned: true`. A pinned visitor keeps that design until
   they press _shuffle_ or clear storage. Sharing a link shows the recipient
   exactly what the sender saw.
2. **First-ever visit gets `main`.** The polished, indexed design is the first
   impression. The tour is a reward for coming back, not a dice roll thrown at
   a recruiter.
3. **Sticky within a visit.** Less than 4 h since the last hit → same design.
   Refresh, back button and deep links do not reshuffle. This is the specific
   thing you asked not to happen.
4. **A new visit advances the tour.** Past 4 h, move to the next id in `order`
   — a per-visitor shuffle of the eight, seeded once and stored. A returning
   visitor sees all eight before seeing any twice, and two visitors do not get
   the same sequence.
5. **Capability filter.** If `prefers-reduced-motion`, `saveData`, or
   `deviceMemory < 4`, skip `weight: 'heavy'` designs (glass, night-reel,
   playroom). Their whole point is blur and motion; on a throttled phone they
   are a slideshow.
6. **Wrap without a repeat.** When `order` is exhausted, reshuffle with the
   constraint that the new first ≠ the old last.

`pick.test.ts` (vitest, already installed) asserts: refresh is stable, a 6-hour
gap advances, eight visits cover all eight ids exactly once, pinned never
moves, reduced-motion never returns a heavy design.

### The gate

`src/designs/boot.ts` compiled into an `is:inline` script, present **only** on
`/` and `/ar` — not on any other page, or every in-design navigation would
re-run it.

```js
// blocking, before first paint
const v = pick(read(), Date.now(), env);
write(v);
if (v.id !== 'main')
	location.replace(sameRoute(design(v.id), location.pathname));
```

`sameRoute`, not a bare base path, so an Arabic visitor lands on
`/ar/terminal` rather than being dropped into English. `location.replace`, not
`assign`: the back button must leave the site, not bounce off a redirect loop.

---

## 3. The hero button — prominent, and unmistakably not a third CTA

This is the feature, not a utility. It gets hero real estate in all eight
designs, and the seven corner switchers go away: `StyleSwitcher.astro` is
deleted, because two competing switchers means neither is the answer.

### The contract every design honours

Non-negotiable, and the same in all eight — this is what makes it read as a
site-wide mechanism rather than a per-design ornament:

- **In the hero, above the fold**, at 360 × 640 and at desktop width. Not a
  corner overlay, not below the fold, not in the header.
- **Full-width or near it on mobile**, own row on desktop, separated from the
  CTA pair by a hairline or a clear gap. Distinct silhouette from that design's
  own buttons: if the CTAs are pills, this is a plate or a bar.
- **Minimum 48 px tall**, label at ≥ 0.95 rem. No micro-type, no icon alone.
- **Names its destination**: "Next design — Terminal" / «التصميم التالي —
  الطرفية», from the registry's bilingual `name`. The visitor knows what they
  are about to get.
- **Carries the destination's accent** as a swatch or a fill, so the button
  previews the colour that is about to sweep across the page.
- **Shows position in the set**: `03 / 08`. That is the whole pitch in five
  characters — there are eight of these, and you are in one.
- **Second, quieter affordance beside it**: "see all eight" → `/styles`. Also
  reachable by Shift-click or long-press on the button itself.
- **DOM order after the two CTAs**, so <kbd>Tab</kbd> still reaches "See the
  work" first. Prominence is spatial, not a hijacked tab order.
- **Logical properties throughout** — the arrow and the layout flip under RTL
  with no second rule.

### `src/designs/_shared/DesignSwitch.astro`

Ships structure, labelling and behaviour; each design supplies 5–15 lines of
CSS against `.dsw` to make it native to its own room. No `all: unset` armour,
no `!important` — it is _meant_ to inherit the design's voice.

```astro
<a
	class="dsw"
	href={sameRoute(next, Astro.url.pathname)}
	data-astro-reload
	data-to={next.id}
	style={`--to:${next.accent}`}
	aria-label={t('switch.to', next.name[lang])}
>
	<span class="dsw__count">{fmt(index)} / 08</span>
	<span class="dsw__label">{t('switch.next')} — <b>{next.name[lang]}</b></span>
	<span class="dsw__swatch" aria-hidden="true"></span>
</a>
<a class="dsw-all" href={url(null, lang, '/styles')}>{t('switch.all')}</a>
```

An `<a>`, not a `<button>`: it is a navigation, it works with scripting off,
and middle-click opens the next design in a tab. JS upgrades the click to
capture the origin point and pin the choice — it is not required for the thing
to function.

### The reveal, `src/designs/_shared/reveal.css`

Cross-document View Transitions do the work. Every shell adds:

```css
@view-transition {
	navigation: auto;
}

::view-transition-old(root) {
	animation: none;
	z-index: 0;
}
::view-transition-new(root) {
	z-index: 1;
	animation: reveal 620ms cubic-bezier(0.22, 0.61, 0.36, 1);
}
@keyframes reveal {
	from {
		clip-path: circle(0 at var(--rx) var(--ry));
	}
	to {
		clip-path: circle(var(--rr) at var(--rx) var(--ry));
	}
}
```

Origin and radius come from the button:

1. `pageswap` — the outgoing page writes the button's centre and the distance
   to the farthest viewport corner into `sessionStorage`.
2. `pagereveal` — the incoming page reads them and sets `--rx/--ry/--rr` on
   `:root` before the transition runs. Missing values → centre of the viewport,
   so an ordinary link degrades to a circle from the middle.

Details that decide whether this feels expensive or cheap:

- **A tinted leading ring.** `::view-transition-new(root)` cannot draw one, so
  the _outgoing_ page paints a 2 px expanding circle in the destination's
  accent, on the same timing. The new design announces its colour before it
  arrives — the same colour the button was already showing.
- **The hero lands separately.** `view-transition-name: hero` in every shell, so
  the hero cross-fades on its own curve while the root circle wipes. Cheap, and
  it is what stops the switch reading as a slide change.
- **`prefers-reduced-motion: reduce` → no transition.** The navigation still
  happens, instantly.
- **Firefox / no `@view-transition`:** the click handler paints a fixed overlay
  clipped to an expanding circle in the destination accent, navigates on
  `animationend` (400 ms timeout guard so a slow response never traps anyone),
  and the arriving page runs the mirror-image contract-out. A wipe, not a true
  reveal — but 30 lines, and nobody stares at a white flash.
- **ClientRouter conflict.** The main design runs `<ClientRouter />`, which
  would intercept the same-origin click and swap the DOM instead of navigating.
  Hence `data-astro-reload` on the button: force a real navigation, which is
  what hands the transition to the browser. **Verify on a real build** — the one
  interaction here with a genuine chance of surprising us.

---

## 4. Real Arabic routes for the variants

Today the variants ship both languages in the DOM and let CSS hide one:
`<T>` renders its string twice, `LangBoot` flips `html[lang]` from
`localStorage`. That is 744 `<T>` call sites and 336 `[lang='ar']` CSS rules
across the seven designs — which sounds like a wall, and is not, because every
one of those call sites funnels through a single 15-line component.

### The conversion

**`T.astro` renders one language.** That is the whole migration for 744 of the
call sites:

```astro
const lang = Astro.currentLocale === 'ar' ? 'ar' : 'en';
<Tag {...rest} lang={lang}>{v[lang]}</Tag>
```

`Astro.currentLocale` comes from the `/ar` prefix, which the new route table
puts there; no prop threading, no context. (Fallback if it proves unreliable
deep in the tree: `Astro.url.pathname.startsWith('/ar')` — same one-liner, no
call-site change either way.) `<T>` already puts `lang` on the element it
renders, so **all 336 CSS rules keep matching exactly as they do now** — that
is why this is cheap, and it is worth not breaking.

What actually needs hands on it, per variant:

1. **`<html lang="en" dir="ltr">` in each `Shell.astro`** → `lang={lang}
dir={dirOf(lang)}`. Seven edits.
2. **The language toggle** (`data-lang-toggle`, 21 sites) → a real `<a>` to
   `otherLang(Astro.url.pathname)`, keeping the design. The `LangBoot` click
   handler and its `vx-lang` key are deleted.
3. **Hardcoded `.en` in attributes** — `alt={p.title.en}`, `aria-label`,
   `data-title-en`, `profile.about.en.map(…)`; roughly 25 sites, found by
   `grep -n "\.en\b"`. Each becomes `[lang]`. This is the only genuinely
   manual part, and it is the one that would have shipped Arabic pages with
   English alt text if we skipped it.
4. **`data-lbl-en`/`data-lbl-ar`** (5 sites) and the small inline scripts that
   read them → plain server-rendered `aria-label`.
5. **`pair(en, ar)` (462 sites) is untouched** — it still produces the `I18n`
   object `<T>` consumes.

### What this buys and what it costs

Buys: indexable Arabic for all eight designs, `hreflang` pairs that are real
URLs, half the text nodes per page, and the deletion of `LangBoot.astro` plus
seven copies of a language-toggle script. An Arabic visitor can also now _share_
an Arabic page.

Costs: the route count doubles — 8 designs × 2 languages × ~42 pages ≈ **670
pages**. Static, prerendered, and each one is now smaller than the dual-rendered
page it replaces, so `dist/` grows well under 2×. Measure build time after
Phase 2; act only if it passes ~2 minutes.

### The other state that crosses a jump

- **Theme.** Each variant owns its own key (`qr-theme` and friends). Leave
  them: a design's light/dark is a property of that design, and unifying seven
  token sets buys nothing visible. Deliberate, not an oversight.
- **Scroll position.** Reset to top on a design switch. Landing mid-page in a
  completely different layout is disorienting, not clever.
- **The two switches sit apart**: language in the header, where it has always
  been; design in the hero. They are different questions.

---

## 5. `/styles` and the gallery

`/styles` becomes the public room: the live-iframe contact sheet it already is,
but bilingual, linking each tile to that design's _current_ page in the
visitor's current language, and saying in one line what makes each different.
Stays `noindex`. It is what "see all eight" and Shift-click open.

---

## 6. SEO

- **Variant heads** gain `<meta name="robots" content="noindex, follow">` and
  `<link rel="canonical">` to the main design's equivalent page _in the same
  language_. `follow`, so link equity still reaches the main pages.
- **`hreflang`** on every page pairs the two real URLs of that design.
- **`sitemap.xml.ts`** lists main-design URLs only, both languages, generated
  from `routes.ts` so it cannot drift from the route table again.
- **`og:image`** stays the main design's card everywhere. A share preview that
  changes with whichever design the sharer happened to get is a bug.

---

## 7. Costs, and what we do about them

| Cost                                          | Mitigation                                                                                                         |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Extra round trip on `/` for rotated visitors  | On the _previous_ visit, `<link rel="prefetch">` the next design's home after `load`. The hop becomes a cache hit. |
| ~670 prerendered pages                        | Single-language pages are smaller than today's dual-render; measure, act above ~2 min builds.                      |
| Eight heroes to keep the button in            | One component; 5–15 lines of CSS each. The contract in §3 is the review checklist.                                 |
| Eight designs × two languages to keep correct | One Playwright spec walking every design × route type × language.                                                  |

---

## 8. Phases

Each ships on its own and leaves the site working.

- **Phase 1 — registry and routes.** `registry.ts`, `routes.ts` + tests; point
  the existing switcher and `/styles` at them; delete `data/style-variants.ts`.
  No routing change yet. _Half a day._
- **Phase 2 — reorg and Arabic.** Route unification (`/projects` → `/work`), the
  single catch-all, seven `git mv` migrations, the §4 checklist per variant,
  numeric redirects. The bulk of the work, and no visual diff.
- **Phase 3 — rotation.** `pick.ts` + tests + the gate. Ship behind `?d=` first
  and verify the policy by hand before the gate goes live. _Half a day._
- **Phase 4 — the button and the reveal.** `DesignSwitch.astro`, `reveal.css`,
  the `pageswap`/`pagereveal` pair, the fallback wipe, then the per-design
  styling pass ×8 against the §3 contract. Delete `StyleSwitcher.astro`. _The
  most fiddly, the most visible._
- **Phase 5 — SEO and tests.** Canonicals, `hreflang`, robots, sitemap from
  `routes.ts`, the Playwright walk, Lighthouse on two heavy designs.

Sequencing matters in one place: Phase 2 before Phase 4, so the button is
written once against a uniform route table instead of eight times against
seven exceptions.

---

## 9. Open questions

1. **First visit — `main`, or straight into the tour?** The plan says `main`
   (safe first impression). The bolder read is that a recruiter landing on
   Terminal _is_ the pitch. One line in `pick.ts` either way.
2. **Is 4 hours the right stickiness?** Long enough that a reading session never
   reshuffles, short enough that "come back tomorrow" is a new design.
3. **Does the hero button advance the tour, or open the gallery first?**
   Planned: one press = next design, because the reveal is the thing worth
   showing and a menu blunts it. The gallery is one click further out.
