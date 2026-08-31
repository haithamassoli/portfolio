export * from "./types";
export { profile } from "./profile";
export { projects } from "./projects";

import { projects } from "./projects";
import type { Locale, I18n, I18nBlocks } from "./types";

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = projects.filter((p) => p.featured);

/** Pick the active language out of any bilingual field. */
export const t = (field: I18n | I18nBlocks, locale: Locale) => field[locale];
