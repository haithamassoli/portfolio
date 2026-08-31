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
		'meta.title': 'Haitham Assoli: apps in two scripts',
		'meta.desc':
			'Haitham Assoli builds mobile and web apps that ship in Arabic and English. Selected work, written up in full.',
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
			'I build apps people actually open, most of them in Arabic first, then in English. Thirty-nine shipped, thirteen of them on the app stores.',
		'hero.seam': 'Both directions',
		'hero.cta': 'See the work',
		'hero.cta2': 'Start a project',
		'stat.shipped': 'projects shipped',
		'stat.stores': 'on the app stores',
		'stat.years': 'years building',
		'work.eyebrow': 'Selected work',
		'work.title': 'Eight built out in full',
		'work.lede':
			'Each one is framed the way it is actually used: a phone, a browser, an editor, a place.',
		'work.archive': 'Everything else',
		'work.archiveLede':
			'Earlier builds and side projects. Each still has its own page.',
		'work.read': 'Read the case',
		'work.all': 'All projects',
		'work.allLede':
			'Everything I have shipped, grouped by what it is. Thirty-nine of them, each with its own page.',
		'cat.web': 'Web',
		'cat.mobile': 'Mobile',
		'cat.ai': 'AI',
		'cat.client': 'Client work',
		'cat.desktop': 'Desktop',
		'cat.extension': 'Extensions',
		'work.more': 'Show more',
		'work.less': 'Show less',
		'about.eyebrow': 'About',
		'about.title': 'Two scripts, one codebase',
		'about.p1':
			'I am Haitham Assoli, a software engineer from Jordan. I have spent the last four years shipping React Native apps to the Play Store and the App Store, and Next.js apps to the web, for students, for mosques, for a governorate tourism board, for whoever needed the thing to exist.',
		'about.p2':
			'Almost everything I build is bilingual, and I have learned that this is not a translation problem. An interface that mirrors properly is a different interface: the back button moves, the progress bar runs the other way, and the typography has to hold up in a script with no capitals and no italics. I design for that from the first screen rather than bolting it on.',
		'about.p3':
			'The rest of the job is the unglamorous half: caching for campus wifi that drops, reconciling bookings so two people cannot take the same hour, keeping a list at sixty frames per second on a four-year-old Android. That is the part I enjoy.',
		'about.stackTitle': 'What I reach for',
		'about.stackLede': 'Ordered by how often, not by how impressive.',
		'hire.eyebrow': 'Hire me',
		'hire.title': 'Tell me about the project',
		'hire.lede':
			'A few minutes of detail now saves a week of back and forth. Fill this in and it opens a pre-written email. Nothing is sent until you press send in your own mail app.',
		'hire.fullName': 'Full name',
		'hire.email': 'Email',
		'hire.phone': 'Phone',
		'hire.deal': 'What kind of arrangement?',
		'hire.location': 'Where would the work happen?',
		'hire.summary': 'What are you building?',
		'hire.summaryPlaceholder':
			'What it does, who it is for, and where it is at right now.',
		'hire.budget': 'Estimated budget',
		'hire.budgetPlaceholder': 'e.g. 5,000 USD, or a range',
		'hire.techStack': 'Which part do you need?',
		'hire.submit': 'Compose the email',
		'hire.submitting': 'Composing…',
		'hire.note': 'I reply within two business days.',
		'hire.sent':
			'Your mail app should be open. If it did not open, write to me directly.',
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
			'Fast, accessible, responsive interfaces. React, Next.js, Motion and Tailwind, usually with a real design pass first.',
		'skill.mobile': 'Mobile apps',
		'skill.mobileDesc':
			'Cross-platform iOS and Android in React Native and Expo, through review and onto both stores.',
		'skill.backend': 'Backend',
		'skill.backendDesc':
			'REST and realtime APIs on Node, NestJS, Convex, Supabase and Firebase, with the schema thought through.',
		'skill.other': 'The rest of it',
		'skill.otherDesc':
			'CI/CD, releases, store submissions, code review and mentoring. Arabic-first localisation when you need it done properly.',
		'project.role': 'Role',
		'project.year': 'Year',
		'project.stack': 'Built with',
		'project.links': 'Where to find it',
		'project.status': 'Status',
		'project.challenges': 'Problems worth solving',
		'project.outcomes': 'What came of it',
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
		'footer.line': 'Built in Astro. Two languages, one deploy.',
		'footer.contact': 'haitham.b.assoli@gmail.com',
		'footer.rights': 'All rights reserved',
		'footer.elsewhere': 'Elsewhere',
		'404.title': 'Nothing at this address',
		'404.lede': 'The page moved or never existed. The work is still here.',
		'500.title': 'Something broke on my side',
		'500.lede':
			'Not your fault. The server tripped over itself. Try again in a moment, or go back to the work.',
		'422.title': 'That did not go through',
		'422.lede':
			'Something in what you sent did not check out. Go back, look over the fields, and send it again.',
		'error.home': 'Back to the home page',
	},
	ar: {
		'meta.title': 'هيثم العسولي: تطبيقات بلغتين',
		'meta.desc':
			'هيثم العسولي يبني تطبيقات جوال وويب تصدر بالعربية والإنجليزية. أعمال مختارة، مشروحة بالكامل.',
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
			'أبني تطبيقات يفتحها الناس فعلًا، أكثرها بالعربية أولًا ثم بالإنجليزية. تسعة وثلاثون مشروعًا صدرت، ثلاثة عشر منها على متاجر التطبيقات.',
		'hero.seam': 'في الاتجاهين',
		'hero.cta': 'شاهد الأعمال',
		'hero.cta2': 'ابدأ مشروعًا',
		'stat.shipped': 'مشروعًا صدر',
		'stat.stores': 'على متاجر التطبيقات',
		'stat.years': 'سنوات في البناء',
		'work.eyebrow': 'أعمال مختارة',
		'work.title': 'ثمانية مشروحة بالكامل',
		'work.lede':
			'كل مشروع مؤطَّر بالشكل الذي يُستخدم فيه فعلًا: هاتف، أو متصفح، أو محرّر، أو مكان.',
		'work.archive': 'بقية الأعمال',
		'work.archiveLede': 'مشاريع أقدم وجانبية. لكل منها صفحته أيضًا.',
		'work.read': 'اقرأ التفاصيل',
		'work.all': 'كل المشاريع',
		'work.allLede':
			'كل ما أنجزته، مرتّبًا حسب نوعه. تسعة وثلاثون مشروعًا، لكلٍّ منها صفحته.',
		'cat.web': 'الويب',
		'cat.mobile': 'الجوّال',
		'cat.ai': 'الذكاء الاصطناعي',
		'cat.client': 'أعمال العملاء',
		'cat.desktop': 'سطح المكتب',
		'cat.extension': 'الإضافات',
		'work.more': 'عرض المزيد',
		'work.less': 'عرض أقل',
		'about.eyebrow': 'نبذة',
		'about.title': 'لغتان، شيفرة واحدة',
		'about.p1':
			'أنا هيثم العسولي، مهندس برمجيات من الأردن. أمضيت السنوات الأربع الماضية في إصدار تطبيقات React Native على متجري جوجل وآبل، وتطبيقات Next.js على الويب، لطلبة، ولمساجد، ولهيئة سياحة في محافظة، ولكل من احتاج أن يوجد الشيء.',
		'about.p2':
			'كل ما أبنيه تقريبًا ثنائي اللغة، وتعلّمت أن هذه ليست مسألة ترجمة. الواجهة التي تنعكس انعكاسًا صحيحًا واجهة أخرى: زر الرجوع ينتقل، وشريط التقدم يسير في الاتجاه المعاكس، والخط لا بد أن يصمد في كتابة بلا حروف كبيرة ولا مائلة. أصمّم لهذا من الشاشة الأولى بدل أن أضيفه لاحقًا.',
		'about.p3':
			'وبقية العمل هي نصفه غير اللامع: تخزين محلي لشبكة جامعة تنقطع، وتوفيق حجوزات كي لا يأخذ شخصان الساعة نفسها، وإبقاء قائمة تعمل بستين إطارًا في الثانية على هاتف أندرويد عمره أربع سنوات. وهذا هو الجزء الذي أستمتع به.',
		'about.stackTitle': 'أدواتي',
		'about.stackLede': 'مرتّبة بحسب كثرة الاستخدام، لا بحسب وقعها.',
		'hire.eyebrow': 'وظّفني',
		'hire.title': 'حدثني عن المشروع',
		'hire.lede':
			'دقائق من التفصيل الآن توفّر أسبوعًا من المراسلات. املأ النموذج فيفتح رسالة بريد مكتوبة مسبقًا. لا يُرسل شيء حتى تضغط إرسال في تطبيق بريدك.',
		'hire.fullName': 'الاسم الكامل',
		'hire.email': 'البريد الإلكتروني',
		'hire.phone': 'رقم الهاتف',
		'hire.deal': 'ما نوع الارتباط المطلوب؟',
		'hire.location': 'أين سيجري العمل؟',
		'hire.summary': 'ما الذي تبنيه؟',
		'hire.summaryPlaceholder': 'ماذا يفعل، ولمن، وأين وصل الآن.',
		'hire.budget': 'الميزانية التقديرية',
		'hire.budgetPlaceholder': 'مثلًا ٥٬٠٠٠ دولار، أو نطاق',
		'hire.techStack': 'أي جزء تحتاج؟',
		'hire.submit': 'اكتب الرسالة',
		'hire.submitting': 'جارٍ الكتابة…',
		'hire.note': 'أرد خلال يومي عمل.',
		'hire.sent':
			'من المفترض أن يكون تطبيق البريد قد فُتح. إن لم يفتح، راسلني مباشرة.',
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
			'واجهات سريعة ومتاحة ومتجاوبة. React وNext.js وMotion وTailwind، وغالبًا بعد مرحلة تصميم حقيقية.',
		'skill.mobile': 'تطبيقات الجوال',
		'skill.mobileDesc':
			'تطبيقات iOS وأندرويد بـ React Native وExpo، مرورًا بالمراجعة وحتى النشر على المتجرين.',
		'skill.backend': 'الخلفية',
		'skill.backendDesc':
			'واجهات REST ولحظية على Node وNestJS وConvex وSupabase وFirebase، بمخطط بيانات مدروس.',
		'skill.other': 'ما تبقّى',
		'skill.otherDesc':
			'أتمتة النشر والإصدارات وتقديم المتاجر ومراجعة الشيفرة والإرشاد. وتعريب من الدرجة الأولى حين تريده متقنًا.',
		'project.role': 'الدور',
		'project.year': 'السنة',
		'project.stack': 'بُني بـ',
		'project.links': 'أين تجده',
		'project.status': 'الحالة',
		'project.challenges': 'مشكلات تستحق الحل',
		'project.outcomes': 'ما الذي نتج عنه',
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
		'footer.line': 'مبني بـ Astro. لغتان، ونشرة واحدة.',
		'footer.contact': 'haitham.b.assoli@gmail.com',
		'footer.rights': 'جميع الحقوق محفوظة',
		'footer.elsewhere': 'مواقع أخرى',
		'404.title': 'لا شيء على هذا العنوان',
		'404.lede': 'انتقلت الصفحة أو لم توجد أصلًا. الأعمال ما زالت هنا.',
		'500.title': 'حدث خطأ من جهتي',
		'500.lede':
			'الخطأ ليس منك. تعثّر الخادم. جرّب بعد لحظات، أو عد إلى الأعمال.',
		'422.title': 'لم يمرّ الطلب',
		'422.lede':
			'شيء ممّا أرسلته لم يجتز التحقق. عد وراجع الحقول ثم أرسله من جديد.',
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
