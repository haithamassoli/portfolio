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
		'meta.title': 'Haitham Assoli: full-stack web & mobile engineer',
		'meta.desc':
			'Full-stack engineer building web, iOS, and Android products from architecture and interface design through release and support.',
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
		'hero.role': 'Full-stack web & mobile engineer · Amman',
		'hero.lede':
			'I turn product requirements into reliable web, iOS, and Android apps, from the data model and interface through release and support.',
		'hero.seam': 'From brief to release',
		'hero.cta': 'Explore case studies',
		'hero.cta2': 'Discuss a project',
		'stat.shipped': 'projects shipped',
		'stat.stores': 'on the app stores',
		'stat.years': 'years building',
		'work.eyebrow': 'Selected work',
		'work.title': 'Products, decisions, and results',
		'work.lede':
			'Eight case studies explain the user problem, my role, the technical decisions, and what shipped.',
		'work.archive': 'Everything else',
		'work.archiveLede':
			'Client work, production apps, experiments, and open-source tools across web and mobile.',
		'work.read': 'View the case study',
		'work.all': 'All projects',
		'work.allLede':
			'Browse 39 projects by platform and open any project for its scope, stack, constraints, and outcome.',
		'cat.web': 'Web',
		'cat.mobile': 'Mobile',
		'cat.ai': 'AI',
		'cat.client': 'Client work',
		'cat.desktop': 'Desktop',
		'cat.extension': 'Extensions',
		'work.more': 'Show more',
		'work.less': 'Show less',
		'about.eyebrow': 'About',
		'about.title': 'Engineering across the whole product',
		'about.p1':
			'I am Haitham Assoli, a software engineer in Amman. Since 2022 I have worked as a product founder, a full-stack engineer, and a freelancer for teams in commerce, bioinformatics, education, tourism, and community services.',
		'about.p2':
			'I work across React Native, Expo, Next.js, Astro, Node.js, NestJS, Convex, and Supabase. I can own the data model, API, interface, deployment, and app-store release instead of handing the product between specialists.',
		'about.p3':
			'The work is shaped by real constraints: offline access on unreliable networks, transactional booking without double-selling, responsive interfaces on older phones, and private AI processing that stays on the device.',
		'about.stackTitle': 'What I reach for',
		'about.stackLede':
			'Production tools I use most often, chosen to fit the product rather than a fixed template.',
		'stats.eyebrow': 'By the numbers',
		'stats.title': 'Public development activity',
		'stats.lede':
			'A transparent view of public contributions and tracked coding time from the past year. Private client work is not included.',
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
		'hire.title': 'Share the scope, constraints, and target date',
		'hire.lede':
			'Tell me what must ship, who will use it, its current stage, budget range, and deadline. I will reply with the clearest next step within two business days.',
		'hire.fullName': 'Full name',
		'hire.email': 'Email',
		'hire.phone': 'Phone',
		'hire.deal': 'What kind of arrangement?',
		'hire.location': 'Where would the work happen?',
		'hire.summary': 'What are you building?',
		'hire.summaryPlaceholder':
			'Describe the user problem, must-have features, current stage, and target release date.',
		'hire.budget': 'Estimated budget',
		'hire.budgetPlaceholder': 'e.g. 5,000 USD, or a range',
		'hire.techStack': 'Where do you need help?',
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
		'skills.title': 'What I can deliver',
		'skill.web': 'Web frontend',
		'skill.webDesc':
			'Production websites, dashboards, portals, search experiences, and PWAs with responsive, accessible interfaces.',
		'skill.mobile': 'Mobile apps',
		'skill.mobileDesc':
			'iOS and Android apps with React Native and Expo, including native integrations, testing, store review, and release.',
		'skill.backend': 'Backend',
		'skill.backendDesc':
			'Data models, REST and real-time APIs, authentication, payments, search, and background jobs with Node-based systems.',
		'skill.other': 'Delivery and support',
		'skill.otherDesc':
			'Architecture reviews, performance work, CI/CD, production releases, app-store submissions, handover, and ongoing maintenance.',
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
		'footer.line': 'Selected product engineering work from Amman, Jordan.',
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
		'meta.title': 'هيثم العسولي: مهندس برمجيات للويب والجوال',
		'meta.desc':
			'مهندس برمجيات متكامل يبني منتجات الويب وiOS وأندرويد من المعمارية وتصميم الواجهة حتى الإطلاق والدعم.',
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
		'hero.role': 'مهندس برمجيات للويب والجوال · عمّان',
		'hero.lede':
			'أحوّل متطلبات المنتج إلى تطبيقات ويب وiOS وأندرويد موثوقة، من نموذج البيانات والواجهة حتى الإطلاق والدعم.',
		'hero.seam': 'من المتطلبات إلى الإطلاق',
		'hero.cta': 'استكشف دراسات الحالة',
		'hero.cta2': 'ناقش مشروعك',
		'stat.shipped': 'مشروعًا صدر',
		'stat.stores': 'على متاجر التطبيقات',
		'stat.years': 'سنوات في البناء',
		'work.eyebrow': 'أعمال مختارة',
		'work.title': 'منتجات وقرارات ونتائج',
		'work.lede':
			'تشرح ثماني دراسات حالة مشكلة المستخدم ودوري والقرارات التقنية وما أُطلق فعليًا.',
		'work.archive': 'بقية الأعمال',
		'work.archiveLede':
			'أعمال عملاء وتطبيقات مستخدمة وأدوات مفتوحة المصدر وتجارب على الويب والجوال.',
		'work.read': 'شاهد دراسة الحالة',
		'work.all': 'كل المشاريع',
		'work.allLede':
			'تصفّح ٣٩ مشروعًا بحسب المنصة، وافتح أي مشروع لمعرفة نطاقه وأدواته وقيوده ونتيجته.',
		'cat.web': 'الويب',
		'cat.mobile': 'الجوّال',
		'cat.ai': 'الذكاء الاصطناعي',
		'cat.client': 'أعمال العملاء',
		'cat.desktop': 'سطح المكتب',
		'cat.extension': 'الإضافات',
		'work.more': 'عرض المزيد',
		'work.less': 'عرض أقل',
		'about.eyebrow': 'نبذة',
		'about.title': 'هندسة المنتج من أوله إلى آخره',
		'about.p1':
			'أنا هيثم العسولي، مهندس برمجيات في عمّان. منذ 2022 عملت مؤسس منتج ومهندسًا متكاملًا ومستقلًا مع فرق في التجارة والمعلوماتية الحيوية والتعليم والسياحة والخدمات المجتمعية.',
		'about.p2':
			'أعمل باستخدام React Native وExpo وNext.js وAstro وNode.js وNestJS وConvex وSupabase. ويمكنني تولّي نموذج البيانات وواجهة API والواجهة والنشر وإصدار المتاجر دون نقل المنتج بين عدة اختصاصيين.',
		'about.p3':
			'تشكّل القيود الواقعية طريقة البناء: عمل دون اتصال على الشبكات المتقطعة، وحجوزات تمنع بيع الموعد مرتين، وواجهات سريعة على الهواتف الأقدم، ومعالجة ذكاء اصطناعي خاصة تبقى على الجهاز.',
		'about.stackTitle': 'أدواتي',
		'about.stackLede':
			'أدوات إنتاج أستخدمها كثيرًا، وأختار منها ما يناسب المنتج بدل فرض قالب ثابت.',
		'stats.eyebrow': 'بالأرقام',
		'stats.title': 'نشاط التطوير العام',
		'stats.lede':
			'عرض شفاف للمساهمات العامة وساعات البرمجة المسجلة خلال السنة الماضية. لا يشمل أعمال العملاء الخاصة.',
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
		'hire.title': 'أرسل النطاق والقيود والموعد المستهدف',
		'hire.lede':
			'اذكر ما يجب إطلاقه ومن سيستخدمه ومرحلته الحالية ونطاق الميزانية والموعد. سأرد بالخطوة التالية الأوضح خلال يومي عمل.',
		'hire.fullName': 'الاسم الكامل',
		'hire.email': 'البريد الإلكتروني',
		'hire.phone': 'رقم الهاتف',
		'hire.deal': 'ما نوع الارتباط المطلوب؟',
		'hire.location': 'أين سيجري العمل؟',
		'hire.summary': 'ما الذي تبنيه؟',
		'hire.summaryPlaceholder':
			'اشرح مشكلة المستخدم والميزات الأساسية والمرحلة الحالية وموعد الإطلاق المستهدف.',
		'hire.budget': 'الميزانية التقديرية',
		'hire.budgetPlaceholder': 'مثلًا ٥٬٠٠٠ دولار، أو نطاق',
		'hire.techStack': 'أين تحتاج المساعدة؟',
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
		'skills.title': 'ما يمكنني تسليمه',
		'skill.web': 'واجهات الويب',
		'skill.webDesc':
			'مواقع إنتاج ولوحات تحكم وبوابات وتجارب بحث وتطبيقات PWA بواجهات متجاوبة وسهلة الوصول.',
		'skill.mobile': 'تطبيقات الجوال',
		'skill.mobileDesc':
			'تطبيقات iOS وأندرويد باستخدام React Native وExpo، تشمل التكاملات الأصلية والاختبار ومراجعة المتاجر والإطلاق.',
		'skill.backend': 'الخلفية',
		'skill.backendDesc':
			'نماذج بيانات وواجهات REST ولحظية ومصادقة ومدفوعات وبحث ومهام خلفية باستخدام أنظمة Node.',
		'skill.other': 'الإطلاق والدعم',
		'skill.otherDesc':
			'مراجعة المعمارية وتحسين الأداء وCI/CD والإصدارات وتقديم المتاجر والتسليم والصيانة المستمرة.',
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
		'footer.line': 'أعمال مختارة في هندسة المنتجات من عمّان، الأردن.',
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
