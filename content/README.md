# Portfolio content

Bilingual (English + Arabic) data for the new portfolio. No framework, just plain
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
t(p.overview, 'en'); // string[], render as <p> blocks
p.challenges.map((c) => t(c.problem, locale));
```

Every user-visible string is `{ en, ar }`. Nothing is English-only, so the
language switch never falls back.

## Project detail page

Each project carries enough for a full page:

| field                                                 | what it is                                            |
| ----------------------------------------------------- | ----------------------------------------------------- |
| `summary`                                             | two sentences at most, under the title                |
| `overview`                                            | one paragraph of context the summary does not carry  |
| `challenges`                                          | `{ title, problem, solution }[]`, featured only      |
| `outcomes`                                            | result bullets, three at most                         |
| `stack`, `links`, `gallery`, `year`, `role`, `status` | metadata                                              |

16 challenge entries, two on each of the 8 featured projects. The other 31 are
short factual entries: what it is, what it ran on, where to find it.

## The `sourced` flag

- `sourced: true` (27) is a write-up grounded in that project's own README, PRD or
  store listing. Naqi, Ghadd, sada, mubah, pastehtml, Kashaf, Fazawwijuhu,
  Aoun, the store-listed apps, and the rest of the documented ones.
- `sourced: false` (12) is reconstructed from the stack and shape of the repo,
  because the repo only had a `create-next-app` README. The stack and what the
  product does are accurate. The reconstructed problem/solution narratives have
  been removed from these entries rather than published as fact.

Check the 12 `sourced: false` ones against the real work before adding anything
back to them:

`hirfati` · `hadanati` · `ghurza` · `service` · `hijabk` · `al-manal` ·
`telestream` · `wedding-invitation` · `almadrsa` · `hafiz-platform` ·
`kheir` · `web-archive-fetcher`

## Missing covers

`mubah`, `horizon` and `cohere-transcribe` have `cover: ""`, no screenshot or
logo exists in those repos. Render a fallback, or add an image and set the path.

## Notes on the data

- Majalis is published as **مركز التبيان التعليمي**, and Telescope as
  **اكتشف عجلون**. The store names differ from the old CV. The store names are used.
- `majalisquran` and `kheir` are 404 on Google Play (delisted). Kheir is marked
  `status: "delisted"` and links to GitHub.
- LinkedIn could not be scraped (HTTP 999 bot block). The experience data comes
  from cv.assoli.site, which mirrors it.
