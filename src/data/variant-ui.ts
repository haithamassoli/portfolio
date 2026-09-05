import type { I18n } from '../../content/types';
import { ui } from '../i18n';

/**
 * Any string from the site's own dictionary, as a bilingual pair the design
 * variants can hand straight to <T>. ponytail: no second dictionary.
 */
export const s = (key: keyof (typeof ui)['en']): I18n => ({
	en: ui.en[key],
	ar: ui.ar[key],
});

/** A literal pair, for copy that only exists inside a variant. */
export const pair = (en: string, ar: string): I18n => ({ en, ar });

/**
 * "Since 2025" → «منذ 2025», "2023 to 2026" → «2023 إلى 2026». A bare year is
 * the same in both. Covers every `year` and `period` string in `content/`.
 */
export const yearPair = (y: string): I18n => ({
	en: y,
	ar: y.replace(/^Since /, 'منذ ').replace(/ to /, ' إلى '),
});

/* The three word maps every design's pages rebuild by hand. Once, here. */
export const statusWord: Record<string, I18n> = {
	live: s('status.live'),
	shipped: s('status.shipped'),
	delisted: s('status.delisted'),
	wip: s('status.wip'),
	archived: s('status.archived'),
};

export const catWord: Record<string, I18n> = {
	web: s('cat.web'),
	mobile: s('cat.mobile'),
	ai: s('cat.ai'),
	client: s('cat.client'),
	desktop: s('cat.desktop'),
	extension: s('cat.extension'),
};

export const linkWord: Record<string, I18n> = {
	live: s('project.live'),
	github: s('project.github'),
	appStore: s('project.apple'),
	playGoogle: s('project.play'),
	vscode: s('project.vscode'),
};
