# Haitham Assoli — portfolio

A bilingual (English / Arabic) portfolio built in Astro. The design idea is a
seam: the page is an indigo field and a bone field pressed together, and the
line between them is where the two scripts meet. Switching language mirrors the
site rather than loading a different one.

## Running it

```sh
npm install
astro dev --background     # astro dev stop | status | logs
npm run build
npm run preview
```

```sh
npm run test        # unit — i18n routing, bilingual data, form validators
npm run test:e2e    # Playwright — language flip, project pages, form guard
npm run typecheck   # astro check
npm run lint
```

## How it fits together

| Path                          | What it is                                                       |
| ----------------------------- | ---------------------------------------------------------------- |
| `src/i18n.ts`                 | Both dictionaries, `href`/`swapLangHref`, the option lists       |
| `src/data/projects.ts`        | Every project, in both languages, with its `frame` and accent    |
| `src/pages/[...slug].astro`   | The only route file: home, hire, and a page per project × 2      |
| `src/components/Frame.astro`  | The four showcases — store listing, browser, postcard, editor    |
| `src/components/HireForm.tsx` | TanStack Form island; the one piece of client JS on the site     |
| `src/styles/global.css`       | Tokens, primitives, scroll reveals, the language-flip transition |

### Adding a project

Append an entry to `src/data/projects.ts`. Give it a `slug`, a `frame`, an
`accent`, and both `en` and `ar` copy. Both routes and both listings follow —
there is nothing else to wire up. `featured: true` puts it in the top grid;
`false` puts it in the archive rows.

`frame` is what makes each project look unlike the one beside it:

- `phone` — an app-store listing header above the shot
- `browser` — window chrome with the real hostname
- `postcard` — wide crop, a date stamp, and the place it is from
- `editor` — no screenshot; a live code pane with a status bar

### Notes

- No animation library. Entrances are CSS keyframes, scroll reveals are
  `animation-timeline: view()`, and the language flip is a view transition.
  Everything is off under `prefers-reduced-motion`.
- No validation library either — the hire form's rules are four small functions
  at the top of `HireForm.tsx`.
- The form composes a `mailto:` in the reader's language. Nothing is sent from
  the page.
- Layout uses logical properties throughout, except where an element has its own
  vertical `writing-mode` — there `inset-inline-*` follows the text, not the
  page, so those few rules are physical on purpose and commented as such.
