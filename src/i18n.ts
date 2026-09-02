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
		'meta.title': 'Haitham Assoli — full-stack web & mobile developer',
		'meta.desc':
			'Haitham Assoli builds Arabic-first web and mobile products, from the data model to the interface. Selected projects, in detail.',
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
		'hero.role': 'Full-stack web & mobile developer · Amman, Jordan',
		'hero.lede':
			'I build Arabic-first web and mobile products, from the data model to the interface.',
		'hero.cta': 'View projects',
		'hero.cta2': 'Contact me',
		'stat.shipped': 'projects shipped',
		'stat.stores': 'on the app stores',
		'stat.years': 'years building',
		'work.eyebrow': 'Projects',
		'work.title': 'Featured projects',
		'work.archive': 'More projects',
		'work.read': 'Read the case',
		'work.all': 'All projects',
		'work.allLede': 'Everything I have shipped, grouped by kind.',
		'cat.web': 'Web',
		'cat.mobile': 'Mobile',
		'cat.ai': 'AI',
		'cat.client': 'Client work',
		'cat.desktop': 'Desktop',
		'cat.extension': 'Extensions',
		'work.more': 'Show more',
		'work.less': 'Show less',
		'about.eyebrow': 'About',
		'about.title': 'What I work on',
		'about.p1':
			'I work across the stack: React Native apps on Google Play and the App Store, Next.js and Astro on the web, and the Node, NestJS and Convex services behind them. Most of it ships in Arabic and English, right-to-left first.',
		'about.p2':
			'The problems that keep coming back are Arabic search that tolerates how people actually type, booking logic that will not sell the same slot twice, reads that survive campus Wi-Fi dropping mid-lecture, and inference that runs on the device so video and audio never leave it.',
		'about.stackTitle': 'Main stack',
		'cta.line': 'Have a project in mind?',
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
		'meta.title': 'هيثم العسولي — مطوّر ويب وتطبيقات جوال',
		'meta.desc':
			'هيثم العسولي يبني منتجات ويب وجوال تبدأ بالعربية، من نموذج البيانات حتى الواجهة. مشاريع مختارة بتفاصيلها.',
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
		'hero.role': 'مطوّر ويب وتطبيقات جوال full-stack · عمّان، الأردن',
		'hero.lede':
			'أبني منتجات ويب وجوال تبدأ بالعربية، من نموذج البيانات حتى الواجهة.',
		'hero.cta': 'شاهد المشاريع',
		'hero.cta2': 'راسلني',
		'stat.shipped': 'مشروعًا صدر',
		'stat.stores': 'على متاجر التطبيقات',
		'stat.years': 'سنوات في البناء',
		'work.eyebrow': 'المشاريع',
		'work.title': 'مشاريع مختارة',
		'work.archive': 'مشاريع أخرى',
		'work.read': 'اقرأ التفاصيل',
		'work.all': 'كل المشاريع',
		'work.allLede': 'كل ما أصدرته، مرتبًا بحسب النوع.',
		'cat.web': 'الويب',
		'cat.mobile': 'الجوّال',
		'cat.ai': 'الذكاء الاصطناعي',
		'cat.client': 'أعمال العملاء',
		'cat.desktop': 'سطح المكتب',
		'cat.extension': 'الإضافات',
		'work.more': 'عرض المزيد',
		'work.less': 'عرض أقل',
		'about.eyebrow': 'نبذة',
		'about.title': 'ما أعمل عليه',
		'about.p1':
			'أعمل على المنظومة كاملة: تطبيقات React Native على متجري جوجل وآبل، وتطبيقات Next.js وAstro على الويب، وخدمات Node وNestJS وConvex خلفها. ومعظمها يصدر بالعربية والإنجليزية، وبالاتجاه من اليمين إلى اليسار أولًا.',
		'about.p2':
			'المشكلات التي تتكرر: بحث عربي يحتمل طريقة الكتابة الفعلية، ومنطق حجز لا يبيع الموعد نفسه مرتين، وقراءة تصمد أمام انقطاع شبكة الجامعة في منتصف المحاضرة، واستدلال يعمل على الجهاز فلا يغادره الفيديو ولا الصوت.',
		'about.stackTitle': 'الأدوات الأساسية',
		'cta.line': 'لديك مشروع؟',
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

/** The stack the current work actually runs on. */
export const toolbox = [
	'TypeScript',
	'React',
	'React Native',
	'Next.js',
	'Expo',
	'Astro',
	'Tailwind CSS',
	'React Query',
	'Reanimated',
	'Node.js',
	'NestJS',
	'Convex',
	'Firebase',
	'Supabase',
	'PostgreSQL',
];

/** Same page, other language. `/work/aoun` <-> `/ar/work/aoun`. */
export const swapLangHref = (pathname: string, lang: Lang) => {
	const path = pathname.replace(/^\/ar(?=\/|$)/, '').replace(/^\//, '');
	return lang === 'ar' ? href('en', path) : href('ar', path);
};
