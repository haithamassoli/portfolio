/* Dates in this variant are notation, not sentences.
   `ls -l` prints a date field, and a date field has no room for a word —
   which is lucky, because the machine columns here are `ch`-measured on the
   Latin mono face and a word would have to be translated, which would move
   them. So a span is written the way a timeline writes one: a trailing dash
   for "and it has not stopped", an en dash for a closed range. Digits and
   dashes read the same in both languages, and the convention itself is said
   in prose, bilingually, where the reader meets it.

   "Since 2022" → 2022–      "2021 to 2022" → 2021–2022      "2026" → 2026 */
export const dateSpan = (period: string): string => {
	const years = period.match(/\d{4}/g);
	if (!years) return period;
	if (years.length > 1) return `${years[0]}–${years[years.length - 1]}`;
	return /since|منذ/i.test(period) ? `${years[0]}–` : years[0];
};
