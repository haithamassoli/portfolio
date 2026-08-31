# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run lint`            | Lint with ESLint                                 |
| `npm run format`          | Format everything with Prettier                  |
| `npm run format:check`    | Check formatting (what CI runs)                  |
| `npm run typecheck`       | Type-check with `astro check`                    |
| `npm test`                | Unit tests (Vitest, `src/**/*.test.ts`)          |
| `npm run test:e2e`        | E2E tests (Playwright, `e2e/`)                   |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## ✅ CI

`.github/workflows/ci.yml` runs on every push to `main` and every pull request:
lint → format check → typecheck → unit tests → build.

Run the same chain locally with:

```sh
npm run lint && npm run format:check && npm run typecheck && npm test && npm run build
```

Playwright is not in CI — run `npm run test:e2e` locally (first time: `npx playwright install`).
