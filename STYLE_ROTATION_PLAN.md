# Smart Portfolio Style Rotation Plan

## Outcome

Serve the portfolio through all seven existing styles, keep one style stable across refreshes, and let the visitor switch to another style with a circular reveal from the switch button.

This is a routing and presentation change. The seven designs, their content, and their existing URLs stay intact.

## Decisions

- The canonical routes (`/`, `/work`, `/hire`, and `/work/{slug}`) remain server-rendered and act as automatic entry points into the selected style family.
- Explicit variant URLs such as `/3`, `/3/projects`, and `/3/work/aoun` always render style 3. They are stable links for sharing and testing.
- A visitor keeps the same automatic style for one local calendar day.
- Styles come from a persisted shuffled bag. Every style appears once before any repeats.
- A manual switch draws the next style immediately, updates today's choice, and keeps the equivalent sub-page when it exists.
- The current language and style-specific preferences continue to survive navigation.
- No new animation, state, or random-number dependency is needed.

## Smart selection contract

Store one versioned record in `localStorage`:

```ts
type StyleState = {
	version: 1;
	day: string; // local YYYY-MM-DD
	current: number;
	queue: number[];
};
```

Selection rules:

1. If the record is valid and `day` is today, reuse `current`.
2. Otherwise, take the first item from `queue` and save it as today's `current`.
3. When the queue is empty, shuffle all style IDs with `crypto.getRandomValues()` and ensure the first item is not the style just shown.
4. A switch-button click uses the same draw operation immediately and saves the result for today.
5. If storage is blocked or corrupt, use `styles[Math.floor(Date.now() / 86_400_000) % styles.length].id` so the fallback is still stable for the day.
6. Direct `/{style}` visits do not draw a new style. Only canonical entry routes and the switch button change automatic state.

This gives variety without refresh flicker, avoids immediate repeats, and automatically includes a newly registered style after the storage version or registry changes.

## Target file organization

Keep Astro's file-based routes instead of adding a custom router. Colocate each complete style family:

```text
src/
  components/
    StyleEntry.astro
    StyleSwitcher.astro
    StyleTransition.astro
  data/
    styles.ts
  lib/
    style-selection.ts
  pages/
    [...slug].astro
    styles.astro
    1/
      index.astro
      _layout.astro
      projects.astro
      hire.astro
      work/[slug].astro
    2/
      index.astro
      _layout.astro
      ...
    ...
    7/
      index.astro
      _layout.astro
      ...
```

The moves are mechanical:

- Move `src/pages/1.astro` through `src/pages/7.astro` to each numbered directory's `index.astro`.
- Rename each `_shell.astro` to `_layout.astro` and update local imports.
- Make every home page use its style layout. Styles 2, 3, 5, and 6 currently duplicate the document shell and should be brought in line with the other styles.
- Rename `src/data/style-variants.ts` to `src/data/styles.ts`; the styles are now a product feature, not disposable prototypes.
- Keep style-specific markup and CSS inside its numbered directory. Do not combine the seven layouts or introduce a universal page schema; their deliberate differences would make that abstraction larger than the duplication it removes.

## Shared style registry

`src/data/styles.ts` is the only ordered list of available styles:

```ts
export const styles = [
	{ id: 1, name: 'Quiet Room' },
	// ...
] as const;
```

The entry selector, switcher, `/styles` contact sheet, sitemap rules, and tests all read this list. Adding a style means adding one route family and one registry entry.

## Entry flow

Keep the current canonical portfolio as the server-rendered fallback. Add `StyleEntry.astro` to `Base.astro`; it runs a small inline script in `<head>` before paint and maps the current canonical route into the chosen style family:

```text
/                    -> /{style}
/work                -> /{style}/projects
/hire                -> /{style}/hire
/work/{slug}         -> /{style}/work/{slug}
/ar/...               -> the same style route with `vx-lang` set to Arabic
```

Use `location.replace()` so the canonical entry does not remain as a useless Back-button step. Without JavaScript, the existing portfolio still renders normally; crawlers also retain real content and canonical URLs instead of receiving a blank redirect page.

Keep `/styles` as the explicit contact sheet and update its copy from “prototypes” to “styles.” Canonical routes stay indexable. Numbered style routes and `/styles` should be `noindex` to avoid seven copies of the same content competing in search results.

## Circular reveal

Use the existing Astro `ClientRouter` and native View Transition CSS.

On switch-button activation:

1. Read the button's center with `getBoundingClientRect()`.
2. Save `--reveal-x` and `--reveal-y` on `<html>`.
3. Compute the required radius with `Math.hypot(max(x, innerWidth - x), max(y, innerHeight - y))` and save `--reveal-radius`.
4. Mark this navigation as a style switch, draw the next style, and navigate to its equivalent route.
5. Animate `::view-transition-new(root)` from `clip-path: circle(0 at x y)` to `circle(radius at x y)` while the old page remains beneath it.
6. Clear the temporary marker after `astro:page-load` so ordinary in-style navigation keeps the current seam transition.

`StyleTransition.astro` owns the lifecycle script and global transition CSS. `StyleSwitcher.astro` owns only the accessible control and style menu. Both are mounted once by every `_layout.astro`.

Equivalent-route mapping remains deliberately small:

```text
/{from}                    -> /{to}
/{from}/projects           -> /{to}/projects
/{from}/hire               -> /{to}/hire
/{from}/work/{slug}        -> /{to}/work/{slug}
```

Unknown paths fall back to `/{to}`. Validate the destination against the registered style IDs before navigation.

## Accessibility and fallback

- Use a real `<button type="button">` with an accessible label that includes the destination style name.
- Keep the numbered links in the disclosure menu so keyboard users can choose a specific style.
- Preserve visible focus and restore focus to the switch button after navigation.
- Under `prefers-reduced-motion: reduce`, skip the circular animation and perform the same client-side navigation immediately.
- If View Transitions are unsupported, rely on Astro's swap fallback; navigation and persistence must still work.
- The control stays hidden in print and respects safe-area insets, as it does now.

## Implementation phases

### 1. Lock the current behavior

- Extend `e2e/variant-transitions.spec.ts` to cover switching between two styles while staying on home, projects, hire, and project-detail routes.
- Assert that language, direction, and Quiet Room's theme survive a style switch.
- Run the current unit, type, build, and end-to-end checks before moving files.

### 2. Normalize the directories

- Move each home page into its numbered directory.
- Rename shells to layouts and make all four page types use them.
- Keep route output unchanged and run the checks again.
- Commit this mechanical move separately from behavior changes if the work is split into commits.

### 3. Add smart selection

- Add `src/lib/style-selection.ts` with parse, draw, and fallback logic.
- Add one focused `src/lib/style-selection.test.ts` covering same-day stability, exhaustion without repeats, corrupt storage, and avoiding the previous style after reshuffle.
- Add `StyleEntry.astro` to the canonical `Base.astro` layout and map each canonical route to its style equivalent before paint.
- Update `/styles` and the sitemap/indexing metadata.

### 4. Add the circular switch

- Split transition behavior from the existing switcher into `StyleTransition.astro`.
- Add the next-style button while retaining direct style links.
- Override the current seam animation only for style-switch navigation.
- Preserve the current sub-page and browser history behavior.

### 5. Verify the finished flow

Run:

```sh
npm test
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```

Then manually check one mobile and one desktop viewport in English and Arabic, including reduced motion, Back/Forward navigation, a blocked-storage browser context, and all seven reveal destinations.

## Acceptance criteria

- Refreshing does not change the chosen style.
- Returning on a new local day advances through the shuffled bag.
- Entering through any canonical portfolio route lands on its equivalent route in the selected style.
- No style repeats until all seven have been shown.
- The button always changes to a different style.
- The reveal starts at the clicked button and covers the viewport without exposing an unpainted edge.
- Reduced-motion users get no circular animation.
- Switching on projects, hire, or a project detail lands on the matching page in the next style.
- Language, direction, theme, browser history, focus, and scroll behavior remain correct.
- Direct numbered URLs remain stable and the production build still generates every project route.
- With JavaScript disabled, the current canonical portfolio remains usable and indexable.

## Explicitly skipped

- No server-side personalization or cookie service: the site is already static and browser persistence covers the requirement.
- No animation library: Astro's client router, CSS `clip-path`, and the browser View Transition API cover the reveal.
- No universal style renderer: the seven designs intentionally have different markup, so colocated route families are simpler to maintain.
