# Portfolio content

Bilingual (English + Arabic) data for the new portfolio. No framework — plain
TypeScript, import it from whatever you build.

```
content/
  types.ts      shapes (I18n, Project, Challenge, ExperienceItem, …)
  profile.ts    bio, experience, education, certifications, skills, interests
  projects.ts   39 projects, each with detail-page content
  index.ts      re-exports + getProject / featuredProjects / t()
public/
  projects/     web screenshots (1440×900 @2x) + repo logos
  apps/         App Store & Google Play screenshots and icons
```

## Using it

```ts
import { projects, getProject, profile, t } from '@/content';

const p = getProject('aoun')!;
t(p.title, 'ar'); // "عون"
t(p.overview, 'en'); // string[] — render as <p> blocks
p.challenges.map((c) => t(c.problem, locale));
```

Every user-visible string is `{ en, ar }`. Nothing is English-only, so the
language switch never falls back.

## Project detail page

Each project carries enough for a full page:

| field                                                 | what it is                                            |
| ----------------------------------------------------- | ----------------------------------------------------- |
| `summary`                                             | 2–4 sentences under the title                         |
| `overview`                                            | long-form paragraphs — the story                      |
| `challenges`                                          | `{ title, problem, solution }[]` — the problems faced |
| `outcomes`                                            | result bullets                                        |
| `stack`, `links`, `gallery`, `year`, `role`, `status` | metadata                                              |

74 challenge entries across 39 projects.

## The `sourced` flag

- `sourced: true` (27) — write-up grounded in that project's own README, PRD or
  store listing. Naqi, Ghadd, sada, mubah, pastehtml, Kashaf, Fazawwijuhu,
  Aoun, the store-listed apps, and the rest of the documented ones.
- `sourced: false` (12) — reconstructed from the stack and shape of the repo,
  because the repo only had a `create-next-app` README. The stack and what the
  product does are accurate; the _specific_ engineering problems are plausible
  reconstruction, not recovered fact.

Read the 12 `sourced: false` ones before publishing and correct anything that
misremembers the work:

`hirfati` · `hadanati` · `ghurza` · `service` · `hijabk` · `al-manal` ·
`telestream` · `wedding-invitation` · `almadrsa` · `hafiz-platform` ·
`kheir` · `web-archive-fetcher`

## Missing covers

`mubah`, `horizon` and `cohere-transcribe` have `cover: ""` — no screenshot or
logo exists in those repos. Render a fallback, or add an image and set the path.

## Notes on the data

- Majalis is published as **مركز التبيان التعليمي**, and Telescope as
  **اكتشف عجلون** — the store names differ from the old CV. The store names are used.
- `majalisquran` and `kheir` are 404 on Google Play (delisted). Kheir is marked
  `status: "delisted"` and links to GitHub.
- LinkedIn could not be scraped (HTTP 999 bot block). The experience data comes
  from cv.assoli.site, which mirrors it.
