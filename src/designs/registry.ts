/* The eight designs, and everything that has to agree about them: routing, the
   hero switch, the picker, the gallery, the sitemap. One list, no second copy.

   `weight: 'heavy'` means the design leads with blur, grain or motion. The
   picker skips those on a throttled phone or under reduced motion — they are a
   slideshow there, not a design. */
import type { I18n } from '../../content/types';

export type DesignId =
	| 'main'
	| 'quiet-room'
	| 'shizukesa'
	| 'liquid-glass'
	| 'terminal'
	| 'bento'
	| 'night-reel'
	| 'playroom';

export interface Design {
	id: DesignId;
	/** The legacy /1 … /7 number. 0 is the main design, which has no number. */
	n: number;
	name: I18n;
	note: I18n;
	/** What the reveal circle glows with on the way in. */
	accent: string;
	weight: 'light' | 'heavy';
}

export const designs: Design[] = [
	{
		id: 'main',
		n: 0,
		name: { en: 'Signal', ar: 'الإشارة' },
		note: {
			en: 'The live site: two scripts, one seam',
			ar: 'الموقع الأساسي: خطّان ودرزة واحدة',
		},
		accent: '#6c5ce7',
		weight: 'light',
	},
	{
		id: 'quiet-room',
		n: 1,
		name: { en: 'Quiet Room', ar: 'الغرفة الهادئة' },
		note: {
			en: 'Minimal, generous space, light and dark',
			ar: 'تقليل ومساحة سخيّة، فاتح وداكن',
		},
		accent: '#8fa88a',
		weight: 'light',
	},
	{
		id: 'shizukesa',
		n: 2,
		name: { en: '静けさ Shizukesa', ar: '静けさ سكون' },
		note: {
			en: 'Japanese, vertical type, sumi ink',
			ar: 'يابانيّ، حروف رأسية، حبر سومي',
		},
		accent: '#c8452c',
		weight: 'light',
	},
	{
		id: 'liquid-glass',
		n: 3,
		name: { en: 'Liquid Glass', ar: 'الزجاج السائل' },
		note: { en: 'Refractive glass, depth, blur', ar: 'زجاج كاسر، عمق، ضباب' },
		accent: '#38bdf8',
		weight: 'heavy',
	},
	{
		id: 'terminal',
		n: 4,
		name: { en: 'Terminal', ar: 'الطرفية' },
		note: {
			en: 'Phosphor console, monospace, keyboard-first',
			ar: 'شاشة فوسفورية، خط ثابت، لوحة مفاتيح أولًا',
		},
		accent: '#ffb454',
		weight: 'light',
	},
	{
		id: 'bento',
		n: 5,
		name: { en: 'Bento', ar: 'بنتو' },
		note: {
			en: 'Modular dashboard cards, live figures',
			ar: 'بطاقات لوحة معلومات، أرقام حيّة',
		},
		accent: '#e5b830',
		weight: 'light',
	},
	{
		id: 'night-reel',
		n: 6,
		name: { en: 'Night Reel', ar: 'بكرة الليل' },
		note: {
			en: 'Cinematic dark, spotlight, film grain',
			ar: 'عتمة سينمائية، ضوء مسلّط، حبيبات فيلم',
		},
		accent: '#e2b13c',
		weight: 'heavy',
	},
	{
		id: 'playroom',
		n: 7,
		name: { en: 'Playroom', ar: 'غرفة اللعب' },
		note: {
			en: 'Kinetic colour, springy, tactile',
			ar: 'لون متحرك، نابض، ملموس',
		},
		accent: '#ff6fb5',
		weight: 'heavy',
	},
];

export const ids = designs.map((d) => d.id);
export const heavy = designs
	.filter((d) => d.weight === 'heavy')
	.map((d) => d.id);

export const byId = (id: string): Design =>
	designs.find((d) => d.id === id) ?? designs[0];

export const byN = (n: number): Design | undefined =>
	designs.find((d) => d.n === n && d.n !== 0);

/** Position in the set, printed on the switch as `03 / 08`. */
export const pad = (n: number) => String(n).padStart(2, '0');
export const indexOf = (id: DesignId) => designs.findIndex((d) => d.id === id);
export const nextOf = (id: DesignId): Design =>
	designs[(indexOf(id) + 1) % designs.length];
