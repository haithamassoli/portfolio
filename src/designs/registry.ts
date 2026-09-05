/* The designs, and everything that has to agree about them: routing, the
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
	| 'playroom'
	| 'signal'
	| 'slip-box'
	| 'spooler'
	| 'blueprint';

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
		name: { en: 'Loom', ar: 'النَّوْل' },
		note: {
			en: 'The primary portfolio: the name woven in WebGL, linen and ink',
			ar: 'ملف الأعمال الأساسي: الاسم منسوج بـ WebGL، كتّان وحبر',
		},
		accent: '#1d35d1',
		/* Light on purpose: the loom is an enhancement. Reduced motion, a slow
		   connection or no WebGL get the same page with a CSS weave instead. */
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
	{
		id: 'signal',
		n: 8,
		name: { en: 'Signal', ar: 'الإشارة' },
		note: {
			en: 'Ink and bone, two scripts pressed along one seam',
			ar: 'حبر وعظم، خطّان متلاصقان على درزة واحدة',
		},
		accent: '#ff5a1f',
		weight: 'light',
	},
	{
		id: 'slip-box',
		n: 9,
		name: { en: 'Slip-box', ar: 'صندوق البطاقات' },
		note: {
			en: 'Index cards on a green board, threaded in red',
			ar: 'بطاقات فهرسة على لوح أخضر، يربطها خيط أحمر',
		},
		accent: '#c1362b',
		weight: 'light',
	},
	{
		id: 'spooler',
		n: 10,
		name: { en: 'Spooler', ar: 'الطابعة' },
		note: {
			en: 'Green-bar paper, tractor holes, a dot-matrix report',
			ar: 'ورق مخطّط أخضر، ثقوب الجرّ، تقرير طابعة نقطية',
		},
		accent: '#6b8f72',
		weight: 'light',
	},
	{
		id: 'blueprint',
		n: 11,
		name: { en: 'Blueprint', ar: 'المخطَّط' },
		note: {
			en: 'Navy drawing sheet, a floor plan of the work',
			ar: 'ورقة رسم كحلية، مخطّط أرضي للأعمال',
		},
		accent: '#ff6b52',
		weight: 'light',
	},
];

export const ids = designs.map((d) => d.id);
export const heavy = designs
	.filter((d) => d.weight === 'heavy')
	.map((d) => d.id);

export const byId = (id: string): Design =>
	designs.find((d) => d.id === id) ?? designs[0];

/** Position in the set, printed on the switch as `03 / 08`. */
export const pad = (n: number) => String(n).padStart(2, '0');
export const indexOf = (id: DesignId) => designs.findIndex((d) => d.id === id);
export const nextOf = (id: DesignId): Design =>
	designs[(indexOf(id) + 1) % designs.length];
