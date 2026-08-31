// Shared shapes for the bilingual (en/ar) content layer.

export type Locale = "en" | "ar";

/** Any string the site renders is stored in both languages. */
export type I18n = { en: string; ar: string };

/** A paragraph list — rendered as <p> blocks. */
export type I18nBlocks = { en: string[]; ar: string[] };

export type ProjectCategory =
  | "web"
  | "mobile"
  | "desktop"
  | "extension"
  | "ai"
  | "client";

export type ProjectStatus =
  | "live"        // publicly reachable right now
  | "shipped"     // published to a store
  | "delisted"    // was published, no longer listed
  | "wip"         // active development
  | "archived";   // finished, not maintained

export type ProjectLinks = {
  live?: string;
  github?: string;
  appStore?: string;
  playGoogle?: string;
  vscode?: string;
};

/** One "problem I hit → what I did about it" entry on the detail page. */
export type Challenge = {
  title: I18n;
  problem: I18n;
  solution: I18n;
};

export type Project = {
  slug: string;
  title: I18n;
  /** One line, used on cards. */
  tagline: I18n;
  /** 2–4 sentences, used at the top of the detail page. */
  summary: I18n;
  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;
  /** Display string — "2026", "2025 — present", … */
  year: string;
  role: I18n;
  stack: string[];
  /** Path under /public. */
  cover: string;
  gallery: string[];
  links: ProjectLinks;
  /** Long-form body for the detail page. */
  overview: I18nBlocks;
  challenges: Challenge[];
  outcomes: I18nBlocks;
  /**
   * true  — the write-up is grounded in this repo's own README/PRD/store listing.
   * false — the write-up is inferred from the stack and project shape; review before publishing.
   */
  sourced: boolean;
};

export type ExperienceItem = {
  company: I18n;
  role: I18n;
  period: string;
  location?: I18n;
  highlights: I18nBlocks;
};

export type EducationItem = {
  school: I18n;
  degree: I18n;
  period: string;
  note?: I18n;
};

export type Certification = {
  name: I18n;
  issuer: I18n;
  date: string;
  description: I18n;
};
