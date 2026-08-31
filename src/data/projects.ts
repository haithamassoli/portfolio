import aoun from '../assets/images/aoun.png';
import malabji from '../assets/images/malabji.png';
import majalis from '../assets/images/majalis.png';
import eecommittee from '../assets/images/eecommittee.png';
import roohAljouf from '../assets/images/rooh-aljouf.png';

/**
 * `frame` picks how a project is showcased — a phone, a browser window, an
 * editor pane, or a wide postcard. It is the one field that makes each entry
 * look unlike the ones around it.
 */
export type Frame = 'phone' | 'browser' | 'editor' | 'postcard';

type Copy = {
	title: string;
	tagline: string;
	role: string;
	summary: string;
	highlights?: string[];
};

export type Project = {
	slug: string;
	year: string;
	frame: Frame;
	accent: string;
	featured: boolean;
	image?: ImageMetadata;
	stack: string[];
	links: { live?: string; play?: string; apple?: string; github?: string };
	/** Postcards are from somewhere — the frame prints it along the bottom. */
	place?: { en: string; ar: string };
	en: Copy;
	ar: Copy;
};

export const projects: Project[] = [
	{
		slug: 'aoun',
		year: '2025',
		frame: 'browser',
		accent: '#FF5A1F',
		featured: true,
		image: aoun,
		stack: [
			'Next.js',
			'TypeScript',
			'Convex',
			'Tailwind CSS',
			'Motion',
			'PWA',
			'TanStack',
			'Web Push',
			'PostHog',
		],
		links: { live: 'https://aoun.assoli.site/' },
		en: {
			title: 'Aoun',
			tagline: 'One place for everything a Jordanian student needs',
			role: 'Design and full build',
			summary:
				'Aoun collects summaries, past exams, course material, a GPA calculator, bookmarks and a study planner into a single free platform for students across Jordanian universities. It installs as an app, works offline, and sends a push when new material lands in a course you follow.',
			highlights: [
				'Realtime data with Convex, so a summary uploaded by one student shows up for everyone without a refresh.',
				'Installable PWA with an offline cache — the library stays readable on campus wifi that keeps dropping.',
				'Web Push notifications scoped per course, not per app, so nobody gets noise from subjects they never took.',
				'Arabic-first interface with full RTL layout, built before the English one.',
			],
		},
		ar: {
			title: 'عون',
			tagline: 'كل ما يحتاجه الطالب الأردني في مكان واحد',
			role: 'التصميم والتنفيذ الكامل',
			summary:
				'يجمع «عون» الملخصات والاختبارات السابقة والمواد الدراسية وحاسبة المعدل والمفضلة ومخطط المذاكرة في منصة واحدة مجانية لطلبة الجامعات الأردنية. يُثبَّت كتطبيق، ويعمل دون اتصال، ويرسل إشعارًا عند نزول مادة جديدة في مساق تتابعه.',
			highlights: [
				'بيانات لحظية عبر Convex، فالملخص الذي يرفعه طالب يظهر للجميع دون إعادة تحميل الصفحة.',
				'تطبيق ويب قابل للتثبيت مع تخزين محلي — المكتبة تبقى مقروءة على شبكة الجامعة المتقطعة.',
				'إشعارات ويب مرتبطة بالمساق لا بالتطبيق، حتى لا تصل الطالب مواد لم يدرسها.',
				'واجهة عربية أولًا بتخطيط RTL كامل، بُنيت قبل النسخة الإنجليزية.',
			],
		},
	},
	{
		slug: 'malabji',
		year: '2025',
		frame: 'phone',
		accent: '#2FA36B',
		featured: true,
		image: malabji,
		stack: [
			'React Native',
			'Expo Router',
			'TypeScript',
			'Supabase',
			'React Query',
			'Zustand',
			'Reanimated',
			'Skia',
			'In-App Purchases',
			'Deep Linking',
		],
		links: {
			play: 'https://play.google.com/store/apps/details?id=com.haithamassoli.malabji',
			apple:
				'https://apps.apple.com/jo/app/%D9%85%D9%84%D8%B9%D8%A8%D8%AC%D9%8A/id6744635501',
		},
		en: {
			title: 'Malabji',
			tagline: 'Find a pitch, book the slot, find the players',
			role: 'Mobile lead',
			summary:
				'Malabji searches nearby football pitches, shows which hours are still open, and books them. The harder half is the social one: find people to fill the other side, or enter a tournament and track the bracket.',
			highlights: [
				'Availability calendar that reconciles overlapping bookings on the server, so two people cannot take the same hour.',
				'In-app purchases on both stores for tournament entry and pitch promotion.',
				'Deep links that open a specific pitch or invite straight from a WhatsApp share.',
				'Light and dark themes plus full RTL, drawn with Skia so the pitch graphics stay sharp on any density.',
			],
		},
		ar: {
			title: 'ملعبجي',
			tagline: 'دوّر على ملعب، احجز الساعة، وكمّل الفريق',
			role: 'مسؤول تطبيق الجوال',
			summary:
				'يبحث «ملعبجي» عن الملاعب القريبة، ويعرض الساعات المتاحة، ويحجزها. الجزء الأصعب اجتماعي: أن تجد من يكمل الفريق معك، أو أن تدخل بطولة وتتابع مسارها.',
			highlights: [
				'تقويم إتاحة يوفّق الحجوزات المتداخلة على الخادم، فلا يأخذ شخصان الساعة نفسها.',
				'مشتريات داخل التطبيق على المتجرين للاشتراك في البطولات وترويج الملاعب.',
				'روابط عميقة تفتح ملعبًا أو دعوة بعينها مباشرة من مشاركة واتساب.',
				'وضعان فاتح وداكن وتخطيط RTL كامل، ورسوم الملعب مرسومة بـ Skia لتبقى حادة على أي كثافة شاشة.',
			],
		},
	},
	{
		slug: 'majalis',
		year: '2024',
		frame: 'phone',
		accent: '#C6A02C',
		featured: true,
		image: majalis,
		stack: [
			'React Native',
			'TypeScript',
			'Firebase',
			'React Query',
			'Zustand',
			'Reanimated',
			'Skia',
			'Restyle',
		],
		links: {
			play: 'https://play.google.com/store/apps/details?id=com.haithamassoli.majalisquran',
			github: 'https://github.com/haithamassoli/qoranthon',
		},
		en: {
			title: 'Majalis',
			tagline: 'A Quran circle that works the way the real one does',
			role: 'Design and full build',
			summary:
				'Majalis moves Quran memorization circles onto the phone without flattening them. Students sit in a circle the way they would in a mosque; the sheikh sees the same mushaf page the student is reciting from and follows along. Games and recall tests turn review into something a student will actually open, and a leaderboard keeps the circle honest with itself.',
			highlights: [
				'A synchronised mushaf view: the sheikh follows the exact ayah the student is on, marking slips as they happen.',
				'Circles mirror real ones — a sheikh, a roster, a schedule — instead of a generic course list.',
				'Review games and spaced recall tests, scored into a leaderboard per circle.',
				'Arabic typography set carefully: the mushaf page is the interface, not a component inside one.',
			],
		},
		ar: {
			title: 'مجالس',
			tagline: 'حلقة قرآن تشبه الحلقة الحقيقية',
			role: 'التصميم والتنفيذ الكامل',
			summary:
				'ينقل «مجالس» حلقات تحفيظ القرآن إلى الهاتف دون أن يفقدها شكلها. يجلس الطلبة في حلقة كما في المسجد، ويرى الشيخ صفحة المصحف نفسها التي يقرأ منها الطالب فيتابع تلاوته. وتحوّل الألعاب واختبارات المراجعة التسميع إلى شيء يفتحه الطالب فعلًا، وتحفظ لوحة المتصدرين للحلقة صدقها مع نفسها.',
			highlights: [
				'عرض متزامن للمصحف: يتابع الشيخ الآية التي يقف عندها الطالب تمامًا، ويؤشّر على الخطأ لحظة وقوعه.',
				'الحلقات تحاكي الواقع — شيخ وقائمة طلبة وجدول — لا قائمة دورات عامة.',
				'ألعاب مراجعة واختبارات تسميع متباعدة، تُحتسب في لوحة متصدرين لكل حلقة.',
				'طباعة عربية مضبوطة: صفحة المصحف هي الواجهة، لا عنصر داخلها.',
			],
		},
	},
	{
		slug: 'rooh-aljouf',
		year: '2025',
		frame: 'postcard',
		accent: '#5E9BD6',
		featured: true,
		image: roohAljouf,
		stack: [
			'React Native',
			'Expo Router',
			'TypeScript',
			'i18n',
			'React Query',
			'Reanimated',
			'Deep Linking',
		],
		links: { apple: 'https://apps.apple.com/us/app/rooh-al-jouf/id6743066965' },
		place: { en: 'Al-Jouf, Saudi Arabia', ar: 'الجوف، السعودية' },
		en: {
			title: 'Rooh Al-Jouf',
			tagline: 'A digital guide to the Al-Jouf region',
			role: 'Mobile lead',
			summary:
				'Rooh Al-Jouf walks a visitor through the region: its heritage sites, its olive country, where to eat, where to stay, and what is on this week. Built bilingual from the first screen, because half its visitors read Arabic and half do not.',
			highlights: [
				'A custom splash and transition sequence that sets the tone before the first screen loads.',
				'Bilingual content model — every destination carries both languages, with layout mirroring rather than a separate app.',
				'Deep links so a shared destination opens on the destination, not the home tab.',
			],
		},
		ar: {
			title: 'روح الجوف',
			tagline: 'دليلك الرقمي إلى منطقة الجوف',
			role: 'مسؤول تطبيق الجوال',
			summary:
				'يأخذ «روح الجوف» الزائر في جولة بالمنطقة: مواقعها التراثية، وبساتين زيتونها، وأين يأكل، وأين يقيم، وما الفعاليات هذا الأسبوع. بُني بلغتين من الشاشة الأولى، لأن نصف زواره يقرأ العربية ونصفهم لا يقرأها.',
			highlights: [
				'شاشة بداية وتسلسل انتقالات مخصصان يضبطان الإيقاع قبل تحميل الشاشة الأولى.',
				'نموذج محتوى ثنائي اللغة — كل وجهة تحمل اللغتين، والتخطيط ينعكس بدل بناء تطبيق منفصل.',
				'روابط عميقة تفتح الوجهة المشاركة على صفحتها لا على الصفحة الرئيسية.',
			],
		},
	},
	{
		slug: 'eecommittee',
		year: '2023',
		frame: 'phone',
		accent: '#A78BFA',
		featured: true,
		image: eecommittee,
		stack: [
			'React Native',
			'TypeScript',
			'Firebase',
			'React Query',
			'Zustand',
			'Reanimated',
			'Caching',
		],
		links: {
			play: 'https://play.google.com/store/apps/details?id=com.haithamassoli.EECommitte',
			github: 'https://github.com/haithamassoli/EECommitte-App',
		},
		en: {
			title: 'EECommittee',
			tagline: 'The electrical engineering degree, mapped',
			role: 'Design and full build',
			summary:
				'Everything an electrical engineering student keeps in scattered PDFs and group chats, in one app: the full plan tree with every prerequisite, course detail pages, staff contacts, and a GPA calculator that projects both the semester and the cumulative result.',
			highlights: [
				'The plan tree renders prerequisites as an actual graph, so a student can see what a failed course blocks.',
				'Search runs across Arabic and English at once — students type course names in either.',
				'Aggressive caching, because the plan barely changes and campus signal often does not exist.',
			],
		},
		ar: {
			title: 'لجنة الهندسة الكهربائية',
			tagline: 'خطة الهندسة الكهربائية، مرسومة',
			role: 'التصميم والتنفيذ الكامل',
			summary:
				'كل ما يحتفظ به طالب الهندسة الكهربائية في ملفات متفرقة ومجموعات دردشة، في تطبيق واحد: شجرة الخطة كاملة بكل متطلباتها السابقة، وصفحات تفصيل المساقات، وبيانات التواصل مع أعضاء الهيئة التدريسية، وحاسبة معدل تتوقع نتيجة الفصل والمعدل التراكمي معًا.',
			highlights: [
				'شجرة الخطة تُرسم كمخطط فعلي للمتطلبات، فيرى الطالب ما الذي يعطّله رسوبه في مساق.',
				'البحث يعمل بالعربية والإنجليزية في آن — والطلبة يكتبون أسماء المساقات بأيهما.',
				'تخزين محلي مكثّف، لأن الخطة تكاد لا تتغير وشبكة الحرم الجامعي كثيرًا ما تنقطع.',
			],
		},
	},
	{
		slug: 'azkari',
		year: '2023',
		frame: 'editor',
		accent: '#4EA5A5',
		featured: true,
		stack: ['JavaScript', 'VS Code Extension'],
		links: {
			live: 'https://marketplace.visualstudio.com/items?itemName=HaithamAssoli.azkari',
			github: 'https://github.com/haithamassoli/Azkari',
		},
		en: {
			title: 'Azkari',
			tagline: 'A quiet reminder, inside the editor',
			role: 'Solo',
			summary:
				'A VS Code extension that surfaces a short remembrance of Allah at an interval you choose. It lives in the status bar and never steals focus — the point is a glance, not an interruption.',
			highlights: [
				'Status-bar first: no modal, no notification centre, nothing that takes the cursor away from the file.',
				'Interval and collection are both configurable, because a reminder you cannot tune is a reminder you disable.',
			],
		},
		ar: {
			title: 'أذكاري',
			tagline: 'تذكير هادئ، داخل المحرّر',
			role: 'منفرد',
			summary:
				'إضافة لـ VS Code تعرض ذكرًا قصيرًا كل مدة تختارها. تسكن في شريط الحالة ولا تخطف التركيز أبدًا — المقصود نظرة عابرة لا مقاطعة.',
			highlights: [
				'شريط الحالة أولًا: لا نافذة منبثقة ولا مركز إشعارات ولا أي شيء يبعد المؤشر عن الملف.',
				'المدة والمجموعة كلاهما قابل للضبط، لأن التذكير الذي لا يُضبط تذكير يُعطَّل.',
			],
		},
	},
	{
		slug: 'kheir',
		year: '2023',
		frame: 'phone',
		accent: '#2FA36B',
		featured: false,
		stack: [
			'React Native',
			'TypeScript',
			'Firebase',
			'React Query',
			'Zustand',
			'Restyle',
		],
		links: {
			play: 'https://play.google.com/store/apps/details?id=com.haithamassoli.kheir',
			github: 'https://github.com/haithamassoli/kheir',
		},
		en: {
			title: 'Kheir',
			tagline: 'Donate to a case, not to a category',
			role: 'Solo',
			summary:
				'A donation app built around individual cases rather than funds. Each case carries its own goal, its own progress, and its own updates once it closes.',
		},
		ar: {
			title: 'خير',
			tagline: 'تبرّع لحالة، لا لتصنيف',
			role: 'منفرد',
			summary:
				'تطبيق تبرعات مبني حول الحالات الفردية لا الصناديق. لكل حالة هدفها ونسبة تقدمها وتحديثاتها بعد إغلاقها.',
		},
	},
	{
		slug: 'telescope',
		year: '2023',
		frame: 'postcard',
		accent: '#5E9BD6',
		featured: false,
		stack: [
			'React Native',
			'TypeScript',
			'i18n',
			'Firebase',
			'React Query',
			'Reanimated',
			'Notifications',
		],
		links: {
			play: 'https://play.google.com/store/apps/details?id=com.haithamassoli.telescope',
		},
		place: { en: 'Ajloun, Jordan', ar: 'عجلون، الأردن' },
		en: {
			title: 'Telescope',
			tagline: 'Ajloun, its sites and its complaints desk',
			role: 'Solo',
			summary:
				'A tourism and civic-service app for Ajloun Governorate. Residents file and track complaints; visitors browse every archaeological and tourist site in the governorate. Bilingual throughout.',
		},
		ar: {
			title: 'تلسكوب',
			tagline: 'عجلون، مواقعها ومكتب شكاواها',
			role: 'منفرد',
			summary:
				'تطبيق سياحي وخدمي لمحافظة عجلون. يقدّم الأهالي شكاواهم ويتابعونها، ويتصفح الزوار كل موقع أثري وسياحي في المحافظة. ثنائي اللغة بالكامل.',
		},
	},
	{
		slug: 'marafiq',
		year: '2023',
		frame: 'phone',
		accent: '#A78BFA',
		featured: false,
		stack: [
			'React Native',
			'TypeScript',
			'Google Maps',
			'Firebase',
			'React Query',
			'Zustand',
			'Restyle',
		],
		links: {
			play: 'https://play.google.com/store/apps/details?id=com.haithamassoli.hadiqa',
			github: 'https://github.com/haithamassoli/hadiqa',
		},
		en: {
			title: 'Marafiq+',
			tagline: 'Every park and public facility on one map',
			role: 'Solo',
			summary:
				'A map-first directory of parks and public facilities, with hours, photos and directions handed off to the phone’s native maps app.',
		},
		ar: {
			title: '+مرافق',
			tagline: 'كل حديقة ومرفق عام على خريطة واحدة',
			role: 'منفرد',
			summary:
				'دليل قائم على الخريطة للحدائق والمرافق العامة، مع أوقات العمل والصور والاتجاهات التي تُسلَّم لتطبيق الخرائط في الهاتف.',
		},
	},
	{
		slug: 'sawt',
		year: '2023',
		frame: 'phone',
		accent: '#C6A02C',
		featured: false,
		stack: [
			'React Native',
			'TypeScript',
			'OTP',
			'Firebase',
			'React Query',
			'Zustand',
			'Restyle',
		],
		links: {
			play: 'https://play.google.com/store/apps/details?id=com.haithamassoli.sawt',
			github: 'https://github.com/haithamassoli/Sawt',
		},
		en: {
			title: 'Sawt',
			tagline: 'Elections, automated end to end',
			role: 'Solo',
			summary:
				'An electronic voting flow: OTP identity check, a ballot that can only be cast once, and a live count that closes with the poll.',
		},
		ar: {
			title: 'صوت',
			tagline: 'انتخابات مؤتمتة من طرف إلى طرف',
			role: 'منفرد',
			summary:
				'مسار تصويت إلكتروني: تحقق من الهوية برمز لمرة واحدة، وورقة اقتراع لا تُدلى إلا مرة، وعدّ مباشر يُغلق بإغلاق الصندوق.',
		},
	},
	{
		slug: 'boost-me',
		year: '2022',
		frame: 'browser',
		accent: '#FF5A1F',
		featured: false,
		stack: ['React', 'Laravel', 'PHP', 'MySQL', 'Tailwind CSS'],
		links: { github: 'https://github.com/haithamassoli/Boost-me' },
		en: {
			title: 'Boost Me',
			tagline: 'Hire a pro player for the level you are stuck on',
			role: 'Solo',
			summary:
				'A marketplace matching players with professionals who will clear the hard parts of a game for them — listings, orders, and a Laravel back office behind it.',
		},
		ar: {
			title: 'Boost Me',
			tagline: 'استأجر لاعبًا محترفًا للمرحلة التي علقت عندها',
			role: 'منفرد',
			summary:
				'سوق يجمع اللاعبين بمحترفين يتجاوزون عنهم المراحل الصعبة — عروض وطلبات ولوحة إدارة على Laravel خلفها.',
		},
	},
	{
		slug: 'online-quizzes',
		year: '2022',
		frame: 'browser',
		accent: '#4EA5A5',
		featured: false,
		stack: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Sass'],
		links: { github: 'https://github.com/haithamassoli/Online-Quiz-Laravel' },
		en: {
			title: 'Online Quizzes',
			tagline: 'Set an exam, sit an exam',
			role: 'Solo',
			summary:
				'A web app for authoring and sitting exams: question banks, timed attempts, automatic marking, and a result sheet per cohort.',
		},
		ar: {
			title: 'الاختبارات الإلكترونية',
			tagline: 'ضع اختبارًا، وأدِّ اختبارًا',
			role: 'منفرد',
			summary:
				'تطبيق ويب لإنشاء الاختبارات وأدائها: بنوك أسئلة، ومحاولات موقوتة، وتصحيح آلي، وكشف علامات لكل شعبة.',
		},
	},
	{
		slug: 'booking-system',
		year: '2022',
		frame: 'browser',
		accent: '#2FA36B',
		featured: false,
		stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
		links: { github: 'https://github.com/haithamassoli/Booking-System' },
		en: {
			title: 'Booking System',
			tagline: 'Restaurant tables, reserved',
			role: 'Solo',
			summary:
				'Table reservation for restaurants — floor plan, time slots, and a kitchen-side view of the night ahead.',
		},
		ar: {
			title: 'نظام الحجز',
			tagline: 'طاولات المطاعم، محجوزة',
			role: 'منفرد',
			summary:
				'حجز طاولات للمطاعم — مخطط الصالة، والفترات الزمنية، وعرض من جهة المطبخ لليلة القادمة.',
		},
	},
	{
		slug: 'coza-store',
		year: '2021',
		frame: 'browser',
		accent: '#A78BFA',
		featured: false,
		stack: ['PHP', 'MySQL', 'JavaScript', 'Sass'],
		links: { github: 'https://github.com/haithamassoli/Coza-Store-PHP' },
		en: {
			title: 'Coza Store',
			tagline: 'Clothes and accessories, sold online',
			role: 'Solo',
			summary:
				'An online store built the long way — hand-rolled PHP, a cart that survives a refresh, and an admin side for stock.',
		},
		ar: {
			title: 'متجر كوزا',
			tagline: 'ملابس وإكسسوارات، تُباع عبر الإنترنت',
			role: 'منفرد',
			summary:
				'متجر إلكتروني بُني بالطريقة الطويلة — PHP مكتوب يدويًا، وسلة تنجو من إعادة التحميل، وواجهة إدارة للمخزون.',
		},
	},
	{
		slug: 'food-funday',
		year: '2021',
		frame: 'browser',
		accent: '#C6A02C',
		featured: false,
		stack: ['React', 'Tailwind CSS', 'Sass', 'JavaScript'],
		links: {
			github: 'https://github.com/haithamassoli/Food-Funday-Restaurant',
		},
		en: {
			title: 'Food Funday',
			tagline: 'Book the table, order ahead or on arrival',
			role: 'Solo',
			summary:
				'Restaurant booking that lets a guest pre-order with the reservation, or hold the order until they sit down.',
		},
		ar: {
			title: 'مطعم فود فنداي',
			tagline: 'احجز الطاولة، واطلب مسبقًا أو عند الوصول',
			role: 'منفرد',
			summary:
				'حجز مطاعم يتيح للضيف أن يطلب مع الحجز، أو أن يؤجل الطلب حتى يجلس.',
		},
	},
	{
		slug: 'amazon-clone',
		year: '2021',
		frame: 'browser',
		accent: '#5E9BD6',
		featured: false,
		stack: ['React', 'Firebase', 'MUI', 'JavaScript'],
		links: { github: 'https://github.com/haithamassoli/Amazon-Clone' },
		en: {
			title: 'Amazon Clone',
			tagline: 'Rebuilt to learn the shape of it',
			role: 'Solo',
			summary:
				'A study project: rebuild a familiar storefront — browse, cart, checkout, auth — to learn where the complexity actually sits.',
		},
		ar: {
			title: 'نسخة أمازون',
			tagline: 'أُعيد بناؤه لفهم شكله',
			role: 'منفرد',
			summary:
				'مشروع تعلّم: إعادة بناء واجهة متجر مألوفة — تصفح وسلة وإتمام شراء وتسجيل دخول — لمعرفة أين يقع التعقيد فعلًا.',
		},
	},
];

export const featured = projects.filter((p) => p.featured);
export const archive = projects.filter((p) => !p.featured);

export const bySlug = (slug: string) => projects.find((p) => p.slug === slug);
