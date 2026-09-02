export * from './types';
export { profile } from './profile';
export { projects } from './projects';

import type { Locale, I18n, I18nBlocks } from './types';

/** Pick the active language out of any bilingual field. */
export const t = (field: I18n | I18nBlocks, locale: Locale) => field[locale];
