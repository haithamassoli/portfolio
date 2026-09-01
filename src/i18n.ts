export const languages = { en: 'English', ar: 'العربية' } as const;
export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';
export const dirOf = (lang: Lang) => (lang === 'ar' ? 'rtl' : 'ltr');

/** Absolute, no trailing slash. The one spelling of a page we advertise. */
export const canonical = (path: string, site: URL | string) =>
	new URL(path, site).href.replace(/(?<=[^/])\/$/, '');

/** `/about` in English, `/ar/about` in Arabic. Pass '' for the home page. */
export const href = (lang: Lang, path = '') =>
	lang === defaultLang ? `/${path}` : `/ar/${path}`;

export const ui = {
	en: {
		'meta.title': 'Haitham Assoli: mobile & web engineer',
		'meta.desc':
			'Haitham Assoli builds Arabic- and English-language web and mobile apps. Explore selected projects in detail.',
		'name.latin': 'Haitham Assoli',
		'name.arabic': 'هيثم العسولي',
		'nav.work': 'Work',
		'nav.about': 'About',
		'nav.hire': 'Hire me',
		'nav.home': 'Home',
		'nav.cv': 'CV',
		'nav.skip': 'Skip to content',
		'nav.lang': 'اقرأ بالعربية',
		'nav.langShort': 'ع',
		'hero.role': 'Mobile & web engineer · Jordan',
		'hero.lede':
			'I build Arabic-first web and mobile apps. I have shipped 39 projects, including 13 on the app stores.',
		'hero.seam': 'Built to last',
		'hero.cta': 'See the work',
		'hero.cta2': 'Start a project',
		'stat.shipped': 'projects shipped',
		'stat.stores': 'on the app stores',
		'stat.years': 'years building',
		'work.eyebrow': 'Selected work',
		'work.title': 'Eight projects in detail',
		'work.lede': 'Each case study shows the product in its working context.',
		'work.archive': 'Everything else',
		'work.archiveLede':
			'Earlier work and side projects, each with its own page.',
		'work.read': 'Read the case',
		'work.all': 'All projects',
		'work.allLede': 'Browse all 39 shipped projects by category.',
		'cat.web': 'Web',
		'cat.mobile': 'Mobile',
		'cat.ai': 'AI',
		'cat.client': 'Client work',
		'cat.desktop': 'Desktop',
		'cat.extension': 'Extensions',
		'work.more': 'Show more',
		'work.less': 'Show less',
		'about.eyebrow': 'About',
		'about.title': 'Built for real use',
		'about.p1':
			'I am Haitham Assoli, a software engineer from Jordan. For four years, I have shipped React Native apps to Google Play and the App Store, plus Next.js apps for students, mosques, and a governorate tourism board.',
		'about.p2':
			'I design clear type, responsive controls, and flows that work on small screens and slow networks.',
		'about.p3':
			'I build offline caching for unreliable campus Wi-Fi, booking logic that prevents double bookings, and fast lists for older Android phones.',
		'about.stackTitle': 'What I reach for',
		'about.stackLede': 'Ordered by use.',
		'stats.eyebrow': 'By the numbers',
		'stats.title': 'A year of days, and where the hours went',
		'stats.lede':
			'The calendar shows public contributions from the past year. WakaTime provides the tracked hours at build time.',
		'stats.calendar': 'Contributions, last year',
		'stats.cumulative': 'The same year, added up',
		'stats.languages': 'Hours by language',
		'stats.contributions': 'Contributions',
		'stats.hours': 'Hours',
		'stats.day': 'Contributions',
		'stats.less': 'Less',
		'stats.more': 'More',
		'stats.calendarDesc':
			'Each square represents a day. Brighter squares mark more contributions.',
		'stats.cumulativeDesc':
			'The running total for the same year. Flat sections mark quieter weeks.',
		'stats.languagesDesc':
			'Block area shows each language’s share of tracked time. TypeScript accounts for three quarters.',
		'stats.total': 'hours tracked',
		'stats.contribCount': 'contributions this year',
		'stats.streak': 'day streak',
		'stats.activeDays': 'days with something shipped',
		'stats.stale':
			'Live figures were unavailable at build time; these are the last recorded ones.',
		'stats.source': 'Sources',
		'hire.eyebrow': 'Hire me',
		'hire.title': 'Tell me about the project',
		'hire.lede':
			'Add the project details and the form will prepare an email. Review it and send it from your mail app.',
		'hire.fullName': 'Full name',
		'hire.email': 'Email',
		'hire.phone': 'Phone',
		'hire.deal': 'What kind of arrangement?',
		'hire.location': 'Where would the work happen?',
		'hire.summary': 'What are you building?',
		'hire.summaryPlaceholder':
			'Describe the product, its audience, and its current stage.',
		'hire.budget': 'Estimated budget',
		'hire.budgetPlaceholder': 'e.g. 5,000 USD, or a range',
		'hire.techStack': 'Which part do you need?',
		'hire.submit': 'Compose the email',
		'hire.submitting': 'Composing…',
		'hire.note': 'I reply within two business days.',
		'hire.sent':
			'Your mail app should be open. If it is not, email me directly.',
		'deal.part': 'Part time',
		'deal.full': 'Full time',
		'deal.contract': 'Contract',
		'deal.freelance': 'Freelance',
		'deal.hourly': 'Hourly',
		'loc.remote': 'Remote',
		'loc.onsite': 'On site',
		'tech.frontend': 'Web frontend',
		'tech.backend': 'Backend',
		'tech.mobile': 'Mobile app',
		'tech.other': 'Something else',
		'err.fullName': 'Give me a name to reply to.',
		'err.email': 'That email address will not reach you.',
		'err.phone': 'A phone number, at least ten digits.',
		'err.summary': 'A sentence or two about the project.',
		'err.budget': 'A number or a range, even a rough one.',
		'err.techStack': 'Pick at least one.',
		'skills.title': 'What I can take on',
		'skill.web': 'Web frontend',
		'skill.webDesc':
			'Accessible, responsive interfaces with React, Next.js, Motion, and Tailwind.',
		'skill.mobile': 'Mobile apps',
		'skill.mobileDesc':
			'Cross-platform iOS and Android apps with React Native and Expo, through store review and release.',
		'skill.backend': 'Backend',
		'skill.backendDesc':
			'REST and real-time APIs with Node, NestJS, Convex, Supabase, and Firebase.',
		'skill.other': 'Delivery and support',
		'skill.otherDesc':
			'CI/CD, releases, store submissions, code review, mentoring, and Arabic-first localization.',
		'project.role': 'Role',
		'project.year': 'Year',
		'project.stack': 'Built with',
		'project.links': 'Where to find it',
		'project.status': 'Status',
		'project.challenges': 'Challenges',
		'project.outcomes': 'Results',
		'status.live': 'Live',
		'status.shipped': 'Shipped',
		'status.delisted': 'Delisted',
		'status.wip': 'In progress',
		'status.archived': 'Archived',
		'project.live': 'Visit the site',
		'project.play': 'Google Play',
		'project.apple': 'App Store',
		'project.vscode': 'VS Code Marketplace',
		'project.github': 'Source',
		'project.next': 'Next project',
		'project.back': 'All projects',
		'footer.line': 'Built with Astro in Arabic and English.',
		'footer.contact': 'haitham.b.assoli@gmail.com',
		'footer.rights': 'All rights reserved',
		'footer.elsewhere': 'Elsewhere',
		'404.title': 'Nothing at this address',
		'404.lede': 'The page may have moved. Browse the projects instead.',
		'500.title': 'Something broke on my side',
		'500.lede':
			'The server hit an error. Try again, or return to the projects.',
		'422.title': 'That did not go through',
		'422.lede': 'Review the form fields and send it again.',
		'error.home': 'Back to the home page',
	},
	ar: {
		'meta.title': 'هيثم العسولي: تطبيقات بلغتين',
		'meta.desc':
			'هيثم العسولي يبني تطبيقات ويب وجوال بالعربية والإنجليزية. اطّلع على مشاريع مختارة بتفاصيلها.',
		'name.latin': 'Haitham Assoli',
		'name.arabic': 'هيثم العسولي',
		'nav.work': 'الأعمال',
		'nav.about': 'نبذة',
		'nav.hire': 'وظّفني',
		'nav.home': 'الرئيسية',
		'nav.cv': 'السيرة الذاتية',
		'nav.skip': 'تخطَّ إلى المحتوى',
		'nav.lang': 'Read in English',
		'nav.langShort': 'EN',
		'hero.role': 'مهندس تطبيقات جوال وويب · الأردن',
		'hero.lede':
			'أبني تطبيقات ويب وجوال تبدأ بالعربية. أصدرت ٣٩ مشروعًا، منها ١٣ على متاجر التطبيقات.',
		'hero.seam': 'مصمّمة لتدوم',
		'hero.cta': 'شاهد الأعمال',
		'hero.cta2': 'ابدأ مشروعًا',
		'stat.shipped': 'مشروعًا صدر',
		'stat.stores': 'على متاجر التطبيقات',
		'stat.years': 'سنوات في البناء',
		'work.eyebrow': 'أعمال مختارة',
		'work.title': 'ثمانية مشاريع بتفاصيلها',
		'work.lede': 'تعرض كل دراسة حالة المنتج في سياق استخدامه.',
		'work.archive': 'بقية الأعمال',
		'work.archiveLede': 'أعمال أقدم ومشاريع جانبية، ولكل منها صفحة.',
		'work.read': 'اقرأ التفاصيل',
		'work.all': 'كل المشاريع',
		'work.allLede': 'تصفّح المشاريع الـ٣٩ التي أصدرتها، مرتبة بحسب النوع.',
		'cat.web': 'الويب',
		'cat.mobile': 'الجوّال',
		'cat.ai': 'الذكاء الاصطناعي',
		'cat.client': 'أعمال العملاء',
		'cat.desktop': 'سطح المكتب',
		'cat.extension': 'الإضافات',
		'work.more': 'عرض المزيد',
		'work.less': 'عرض أقل',
		'about.eyebrow': 'نبذة',
		'about.title': 'مصمّمة للاستخدام الحقيقي',
		'about.p1':
			'أنا هيثم العسولي، مهندس برمجيات من الأردن. خلال أربع سنوات أصدرت تطبيقات React Native على متجري جوجل وآبل، وتطبيقات Next.js للطلاب والمساجد وهيئة سياحة في محافظة.',
		'about.p2':
			'أصمّم خطوطًا واضحة وعناصر متجاوبة ومسارات تعمل على الشاشات الصغيرة والشبكات البطيئة.',
		'about.p3':
			'أبني تخزينًا محليًا لشبكات الجامعات المتقطعة، ومنطق حجوزات يمنع الحجز المزدوج، وقوائم سريعة لهواتف أندرويد الأقدم.',
		'about.stackTitle': 'أدواتي',
		'about.stackLede': 'مرتّبة بحسب الاستخدام.',
		'stats.eyebrow': 'بالأرقام',
		'stats.title': 'سنة من الأيام، وأين ذهبت الساعات',
		'stats.lede':
			'تعرض الرزنامة المساهمات العامة خلال السنة الماضية. تأتي الساعات المسجلة من WakaTime وقت بناء الموقع.',
		'stats.calendar': 'المساهمات في السنة الماضية',
		'stats.cumulative': 'السنة نفسها، مجموعة',
		'stats.languages': 'الساعات بحسب اللغة',
		'stats.contributions': 'مساهمة',
		'stats.hours': 'ساعة',
		'stats.day': 'مساهمة',
		'stats.less': 'أقل',
		'stats.more': 'أكثر',
		'stats.calendarDesc':
			'يمثل كل مربع يومًا. تشير المربعات الأكثر سطوعًا إلى مساهمات أكثر.',
		'stats.cumulativeDesc':
			'المجموع التراكمي للسنة نفسها. تشير المقاطع المستوية إلى أسابيع أقل نشاطًا.',
		'stats.languagesDesc':
			'تمثل مساحة كل مربع حصته من الوقت المسجل. تستحوذ TypeScript على ثلاثة أرباعه.',
		'stats.total': 'ساعة مُسجَّلة',
		'stats.contribCount': 'مساهمة هذه السنة',
		'stats.streak': 'يومًا متتاليًا',
		'stats.activeDays': 'يومًا فيه شيء أُنجز',
		'stats.stale':
			'تعذّر جلب الأرقام الحيّة أثناء البناء، وهذه آخر ما سُجّل منها.',
		'stats.source': 'المصادر',
		'hire.eyebrow': 'وظّفني',
		'hire.title': 'حدثني عن المشروع',
		'hire.lede':
			'أضف تفاصيل المشروع وسيُعدّ النموذج رسالة بريد. راجعها وأرسلها من تطبيق بريدك.',
		'hire.fullName': 'الاسم الكامل',
		'hire.email': 'البريد الإلكتروني',
		'hire.phone': 'رقم الهاتف',
		'hire.deal': 'ما نوع الارتباط المطلوب؟',
		'hire.location': 'أين سيجري العمل؟',
		'hire.summary': 'ما الذي تبنيه؟',
		'hire.summaryPlaceholder': 'اشرح المنتج وجمهوره ومرحلة العمل الحالية.',
		'hire.budget': 'الميزانية التقديرية',
		'hire.budgetPlaceholder': 'مثلًا ٥٬٠٠٠ دولار، أو نطاق',
		'hire.techStack': 'أي جزء تحتاج؟',
		'hire.submit': 'اكتب الرسالة',
		'hire.submitting': 'جارٍ الكتابة…',
		'hire.note': 'أرد خلال يومي عمل.',
		'hire.sent': 'يُفترض أن تطبيق بريدك فُتح. إن لم يفتح، راسلني مباشرة.',
		'deal.part': 'دوام جزئي',
		'deal.full': 'دوام كامل',
		'deal.contract': 'عقد',
		'deal.freelance': 'عمل حر',
		'deal.hourly': 'بالساعة',
		'loc.remote': 'عن بُعد',
		'loc.onsite': 'في الموقع',
		'tech.frontend': 'واجهات ويب',
		'tech.backend': 'خلفية',
		'tech.mobile': 'تطبيق جوال',
		'tech.other': 'شيء آخر',
		'err.fullName': 'اكتب اسمًا أردّ عليه.',
		'err.email': 'هذا البريد لن يصلك.',
		'err.phone': 'رقم هاتف، عشرة أرقام على الأقل.',
		'err.summary': 'جملة أو جملتان عن المشروع.',
		'err.budget': 'رقم أو نطاق، ولو تقريبيًا.',
		'err.techStack': 'اختر واحدًا على الأقل.',
		'skills.title': 'ما يمكنني تولّيه',
		'skill.web': 'واجهات الويب',
		'skill.webDesc':
			'واجهات متاحة ومتجاوبة باستخدام React وNext.js وMotion وTailwind.',
		'skill.mobile': 'تطبيقات الجوال',
		'skill.mobileDesc':
			'تطبيقات iOS وأندرويد متعددة المنصات بـ React Native وExpo، حتى المراجعة والنشر في المتاجر.',
		'skill.backend': 'الخلفية',
		'skill.backendDesc':
			'واجهات REST ولحظية باستخدام Node وNestJS وConvex وSupabase وFirebase.',
		'skill.other': 'الإطلاق والدعم',
		'skill.otherDesc':
			'أتمتة النشر والإصدارات وتقديم المتاجر ومراجعة الشيفرة والإرشاد والتعريب الذي يبدأ بالعربية.',
		'project.role': 'الدور',
		'project.year': 'السنة',
		'project.stack': 'بُني بـ',
		'project.links': 'أين تجده',
		'project.status': 'الحالة',
		'project.challenges': 'التحديات',
		'project.outcomes': 'النتائج',
		'status.live': 'يعمل الآن',
		'status.shipped': 'صدر',
		'status.delisted': 'أُزيل من المتجر',
		'status.wip': 'قيد التطوير',
		'status.archived': 'مؤرشف',
		'project.live': 'زر الموقع',
		'project.play': 'جوجل بلاي',
		'project.apple': 'آب ستور',
		'project.vscode': 'متجر VS Code',
		'project.github': 'الشيفرة',
		'project.next': 'المشروع التالي',
		'project.back': 'كل المشاريع',
		'footer.line': 'مبني بـ Astro بالعربية والإنجليزية.',
		'footer.contact': 'haitham.b.assoli@gmail.com',
		'footer.rights': 'جميع الحقوق محفوظة',
		'footer.elsewhere': 'مواقع أخرى',
		'404.title': 'لا شيء على هذا العنوان',
		'404.lede': 'قد تكون الصفحة انتقلت. تصفّح المشاريع بدلًا منها.',
		'500.title': 'حدث خطأ من جهتي',
		'500.lede': 'واجه الخادم خطأً. حاول مرة أخرى أو عد إلى المشاريع.',
		'422.title': 'لم يمرّ الطلب',
		'422.lede': 'راجع حقول النموذج ثم أرسله من جديد.',
		'error.home': 'العودة إلى الصفحة الرئيسية',
	},
} as const;

export type Key = keyof (typeof ui)['en'];

export const useT =
	(lang: Lang) =>
	(key: Key): string =>
		(ui[lang] as Record<string, string>)[key] ?? ui.en[key];

export const deals = [
	'part',
	'full',
	'contract',
	'freelance',
	'hourly',
] as const;
export const locations = ['remote', 'onsite'] as const;
export const techStack = ['frontend', 'mobile', 'backend', 'other'] as const;

/** Ordered by how often they show up in the work, per the About copy. */
export const toolbox = [
	'TypeScript',
	'React Native',
	'React',
	'Next.js',
	'Expo',
	'Tailwind CSS',
	'React Query',
	'Zustand',
	'Reanimated',
	'Firebase',
	'Supabase',
	'Convex',
	'Node.js',
	'NestJS',
	'PostgreSQL',
	'Zod',
	'Motion',
	'Skia',
	'Figma',
];

/** Same page, other language. `/work/aoun` <-> `/ar/work/aoun`. */
export const swapLangHref = (pathname: string, lang: Lang) => {
	const path = pathname.replace(/^\/ar(?=\/|$)/, '').replace(/^\//, '');
	return lang === 'ar' ? href('en', path) : href('ar', path);
};
