import type { Project } from './types';

/**
 * Every project, in English and Arabic.
 *
 * Featured entries carry a case study: one paragraph of context, the one or two
 * challenges worth reading, and the results. Everything else is a short factual
 * entry, and `sourced: false` marks a write-up reconstructed from the repo
 * rather than from the project's own README, PRD or store listing.
 */
export const projects: Project[] = [
	{
		slug: 'aoun',
		title: { en: 'Aoun', ar: 'عون' },
		tagline: {
			en: 'A free academic platform for Jordanian university students.',
			ar: 'منصة أكاديمية مجانية لطلاب الجامعات الأردنية.',
		},
		summary: {
			en: 'Aoun brings summaries, past exams, course material, GPA tools, bookmarks, and study planning into one place for Jordanian university students. It is free to browse without an account and works offline as an installed PWA.',
			ar: 'يجمع «عون» الملخصات والامتحانات السابقة والمواد الدراسية وأدوات المعدّل والمحفوظات وتنظيم الدراسة في مكان واحد لطلاب الجامعات الأردنية. تصفحه مجاني بلا حساب، ويعمل دون اتصال كتطبيق PWA مثبّت.',
		},
		category: 'web',
		status: 'live',
		featured: true,
		year: '2026',
		role: {
			en: 'Solo: product, design and engineering',
			ar: 'منفردًا: المنتج والتصميم والبرمجة',
		},
		stack: [
			'Next.js',
			'TypeScript',
			'React',
			'Convex',
			'Tailwind CSS',
			'PWA',
			'Web Push',
			'PostHog',
		],
		cover: '/projects/aoun.png',
		gallery: ['/projects/aoun.png'],
		links: {
			live: 'https://aoun.assoli.site',
			github: 'https://github.com/haithamassoli/aoun',
		},
		overview: {
			en: [
				'Jordanian students find course material in WhatsApp groups, one-off Google Drive folders, and Telegram channels that disappear. Students must collect the same material again for each intake because those sources lack indexing and versioning.',
			],
			ar: [
				'تتناثر المواد الدراسية عند طلاب الأردن بين مجموعات واتساب، ومجلدات درايف تُشارَك مرة ولا تُحدَّث، وقنوات تيليجرام تختفي. لا فهرسة، ولا إصدارات، وكل دفعة جديدة تعيد جمع المادة نفسها من الصفر.',
			],
		},
		challenges: [
			{
				title: {
					en: 'Arabic search that tolerates how people actually type',
					ar: 'بحث عربي يحتمل طريقة الكتابة الفعلية',
				},
				problem: {
					en: "Students type 'احصاء' for 'إحصاء', drop diacritics entirely, mix Arabic and English in one query, and use colloquial course nicknames. Naive matching returned nothing for most real queries.",
					ar: 'يكتب الطلاب «احصاء» بدل «إحصاء»، ويحذفون التشكيل تمامًا، ويخلطون العربية والإنجليزية في استعلام واحد، ويستخدمون أسماء دارجة للمساقات. المطابقة الساذجة كانت تعيد لا شيء لمعظم الاستعلامات الحقيقية.',
				},
				solution: {
					en: 'I normalise both the index and the query: unify hamza forms, strip diacritics and tatweel, fold Arabic-Indic digits. I also store curated aliases per course so the nicknames resolve too.',
					ar: 'أُطبّع الفهرس والاستعلام معًا: توحيد صور الهمزة، وحذف التشكيل والتطويل، وتوحيد الأرقام العربية الهندية. وأخزّن أسماء بديلة منسّقة لكل مساق حتى تُحَلّ التسميات الدارجة.',
				},
			},
			{
				title: {
					en: 'Offline for a student on campus Wi-Fi',
					ar: 'العمل دون اتصال على شبكة الحرم الجامعي',
				},
				problem: {
					en: 'The place students most need the material, inside a lecture hall, is exactly where connectivity is worst. A normal SPA showed a spinner over an empty page.',
					ar: 'المكان الذي يحتاج فيه الطالب المادة أكثر، داخل القاعة، هو أسوأ مكان في التغطية. التطبيق أحادي الصفحة العادي كان يعرض مؤشر تحميل فوق صفحة فارغة.',
				},
				solution: {
					en: 'The app is an installable PWA that caches viewed courses and their files, so anything you opened once opens again offline. Writes queue and replay when the connection returns.',
					ar: 'التطبيق PWA قابل للتثبيت يخزّن المساقات المعروضة وملفاتها، فأي شيء فتحته مرة يُفتح ثانية دون اتصال. وتُصَفّ عمليات الكتابة وتُعاد عند عودة الاتصال.',
				},
			},
		],
		outcomes: {
			en: [
				'Past 7,500 visitors, tracked live on the home page.',
				'Browsing needs no account; sign-in is only for saving and contributing.',
				'Installable and usable offline for material already opened.',
			],
			ar: [
				'تجاوز 7,500 زائر، ويُعرض العدّاد مباشرة على الصفحة الرئيسية.',
				'التصفح بلا حساب؛ وتسجيل الدخول للحفظ والمساهمة فقط.',
				'قابل للتثبيت والعمل دون اتصال للمواد التي فُتحت سابقًا.',
			],
		},
		sourced: true,
	},
	{
		slug: 'malabji',
		title: { en: 'Malabji', ar: 'ملعبجي' },
		tagline: {
			en: 'Find a pitch, find players, book it, play.',
			ar: 'ابحث عن ملعب، وابحث عن لاعبين، احجز، والعب.',
		},
		summary: {
			en: 'Malabji lets you search nearby football pitches, see available slots, and reserve one. Team search, challenges, and tournaments help players fill the match.',
			ar: 'يتيح «ملعبجي» البحث عن ملاعب كرة القدم القريبة ورؤية الأوقات المتاحة وحجزها. ويساعد البحث عن الفرق والتحديات والبطولات اللاعبين على إكمال المباراة.',
		},
		category: 'mobile',
		status: 'shipped',
		featured: true,
		year: 'Since 2025',
		role: {
			en: 'Founder: product, design and full engineering',
			ar: 'مؤسس: المنتج والتصميم والبرمجة كاملة',
		},
		stack: [
			'React Native',
			'Expo Router',
			'TypeScript',
			'Supabase',
			'React Query',
			'Reanimated',
			'In-App Purchases',
			'Push Notifications',
		],
		cover: '/apps/malabji-1.png',
		gallery: [
			'/apps/malabji-1.png',
			'/apps/malabji-2.png',
			'/apps/malabji-3.png',
			'/apps/malabji-4.png',
			'/apps/malabji-5.png',
			'/apps/malabji-6.png',
			'/projects/malabji-web.png',
		],
		links: {
			appStore: 'https://apps.apple.com/jo/app/id6744635501',
			playGoogle:
				'https://play.google.com/store/apps/details?id=com.haithamassoli.malabji',
			live: 'https://malabji.vercel.app',
		},
		overview: {
			en: [
				'Football pitch bookings in Jordan run through phone calls and WhatsApp. You ask a ground about Thursday, gather players, then find the slot has gone; payment happens in cash on arrival. You also need nine other players.',
			],
			ar: [
				'حجز الملاعب في الأردن يجري بالمكالمات وواتساب. تتصل بالملعب، وتسأل عمّا هو شاغر يوم الخميس، فيُعطى لك وقت قد لا يبقى متاحًا حين تجمع اللاعبين، وتدفع نقدًا عند الوصول. نصف العناء في الحجز، والنصف الآخر أنك تحتاج تسعة أشخاص آخرين.',
			],
		},
		challenges: [
			{
				title: {
					en: 'Never sell the same hour twice',
					ar: 'ألا تُباع الساعة نفسها مرتين',
				},
				problem: {
					en: 'Two people opening the same 7pm slot at the same time is not a rare edge case on a Thursday evening. It is the normal load. Checking availability and then writing the booking is two steps, and anything can happen between them.',
					ar: 'أن يفتح شخصان الموعد نفسه في السابعة مساءً في اللحظة ذاتها ليس حالة نادرة مساء الخميس، بل هو الحمل الطبيعي. التحقق من الإتاحة ثم كتابة الحجز خطوتان، وأي شيء قد يقع بينهما.',
				},
				solution: {
					en: "Availability is never trusted from the client. The reservation is a single server-side transaction with a uniqueness constraint on (pitch, time range); the loser of a race gets a clean 'just taken' state and the calendar refreshes under them rather than a failed payment.",
					ar: 'لا يُوثق بالإتاحة الآتية من التطبيق أبدًا. الحجز عملية واحدة على الخادم مع قيد تفرّد على (الملعب، المدى الزمني)؛ ومن يخسر السباق يحصل على حالة «حُجز للتو» نظيفة ويُحدَّث التقويم أمامه بدل عملية دفع فاشلة.',
				},
			},
			{
				title: {
					en: 'In-app purchases on two stores with different rules',
					ar: 'المشتريات داخل التطبيق على متجرين بقواعد مختلفة',
				},
				problem: {
					en: 'Apple and Google disagree on receipts, on what a restore means, and on what they will approve. A purchase that succeeds on the device but never reaches the backend is the worst possible bug in a paid product.',
					ar: 'تختلف Apple وGoogle في الإيصالات، وفي معنى «الاستعادة»، وفيما توافق عليه. وعملية شراء تنجح على الجهاز ولا تصل إلى الخادم أسوأ خلل ممكن في منتج مدفوع.',
				},
				solution: {
					en: "Entitlement is decided on the server from a verified receipt, never from the client's word. The client re-validates on launch and after every restore, so a purchase interrupted mid-flight reconciles itself the next time the app opens.",
					ar: 'تُحسم الصلاحية على الخادم من إيصال مُتحقَّق منه، لا من كلام التطبيق. ويعيد التطبيق التحقق عند الإقلاع وبعد كل استعادة، فتُسوّى أي عملية شراء انقطعت في منتصفها عند الفتح التالي.',
				},
			},
		],
		outcomes: {
			en: [
				'Live on the App Store and Google Play.',
				'Bookings, team search, challenges and tournaments in one app.',
				'Built and operated solo, from schema to store listing.',
			],
			ar: [
				'متاح على App Store وGoogle Play.',
				'الحجوزات والبحث عن فرق والتحديات والبطولات في تطبيق واحد.',
				'بُني ويُشغَّل منفردًا، من المخطط حتى صفحة المتجر.',
			],
		},
		sourced: true,
	},
	{
		slug: 'naqi',
		title: { en: 'Naqi: Halal Video Filter', ar: 'نقيّ: مُرشِّح الفيديو' },
		tagline: {
			en: 'Strips music and censors imagery in a video, entirely on your device.',
			ar: 'يزيل الموسيقى ويحجب الصور في الفيديو، على جهازك بالكامل.',
		},
		summary: {
			en: 'Naqi filters video on the device: stem separation removes the music while keeping dialogue, and a detector blurs faces or whole frames at the level you pick. No cloud, no account, no telemetry, and the original file is left as it was.',
			ar: 'يُرشّح «نقي» الفيديو على الجهاز: فصل المسارات يزيل الموسيقى ويُبقي الحوار، وكاشف يُشوّش الوجوه أو الإطار كاملًا بالمستوى الذي تختاره. بلا سحابة ولا حساب ولا تتبع، والملف الأصلي يبقى كما هو.',
		},
		category: 'ai',
		status: 'shipped',
		featured: true,
		year: '2026',
		role: {
			en: 'Solo: architecture, ML pipeline and both platforms',
			ar: 'منفردًا: المعمارية وخط المعالجة والمنصتان',
		},
		stack: [
			'Kotlin',
			'Swift',
			'ONNX Runtime',
			'MediaCodec',
			'AVFoundation',
			'htdemucs',
			'NudeNet',
			'Jetpack Compose',
		],
		cover: '/projects/naqi-01-home.png',
		gallery: [
			'/projects/naqi-01-home.png',
			'/projects/naqi-02-options.png',
			'/projects/naqi-03-jobs.png',
			'/projects/naqi-05-link.png',
			'/projects/naqi-04-about.png',
			'/apps/naqi-1.png',
			'/apps/naqi-2.png',
			'/apps/naqi-3.png',
		],
		links: {
			playGoogle:
				'https://play.google.com/store/apps/details?id=com.haithamassoli.naqi',
			github: 'https://github.com/haithamassoli/NaqiHalalVideoFilter',
		},
		overview: {
			en: [
				'Many video filters require an upload. Naqi processes video on the device so other parties do not receive it. The app bundles its models; users can choose an optional model download.',
			],
			ar: [
				'كثير من الأدوات تُرشِّح الفيديو نيابةً عنك إن رفعته إلى مكان ما. هذه المقايضة مرفوضة تمامًا لمن يريدون هذا أكثر من غيرهم، فجوهر الفكرة ألا يرى أحد آخر ما تشاهده. لذلك يُنفّذ «نقيّ» كل شيء على الجهاز: النماذج داخل التطبيق، والاتصال الشبكي الوحيد تنزيل اختياري للنماذج.',
			],
		},
		challenges: [
			{
				title: {
					en: 'A detector that fires late lets frames through',
					ar: 'كاشف يتأخر يُمرِّر إطارات',
				},
				problem: {
					en: 'A classifier decides frame by frame, so it necessarily fires on the frame that already contains what you did not want to see. Filtering only the flagged frames means the user sees the thing, briefly, every single time.',
					ar: 'يقرّر المصنّف إطارًا بإطار، فيعمل بالضرورة عند الإطار الذي يحتوي أصلًا ما لم تُرِد رؤيته. والاكتفاء بترشيح الإطارات المُعلَّمة يعني أن المستخدم يرى الشيء، للحظة، في كل مرة.',
				},
				solution: {
					en: 'Detection and rendering are separated by an edit decision list. A first pass builds spans with pre-roll before each detection and hysteresis so a flickering detector does not produce flickering censorship; the second pass renders those spans. The cost is two passes over the video, which is worth it.',
					ar: 'فُصل الكشف عن العرض بقائمة قرارات تحرير. يبني المرور الأول مدَيات مع تمهيد قبل كل كشف، ومع تباطؤ يمنع كاشفًا مرتجفًا من إنتاج حجب مرتجف؛ ثم يعرض المرور الثاني تلك المدَيات. الكلفة مروران على الفيديو، وهي كلفة تستحق.',
				},
			},
			{
				title: {
					en: 'Feature-length video on a phone',
					ar: 'فيديو بطول فيلم على هاتف',
				},
				problem: {
					en: 'Stem separation and per-frame inference over a two-hour file is long enough that the OS will kill the app, the user will switch away, or the battery will run out mid-job. Restarting from zero each time makes the feature unusable.',
					ar: 'فصل المسارات والاستدلال على كل إطار في ملف مدته ساعتان يطول بما يكفي ليقتل النظام التطبيق، أو ينتقل المستخدم إلى غيره، أو تنفد البطارية في منتصف المهمة. والبدء من الصفر في كل مرة يجعل الميزة غير قابلة للاستخدام.',
				},
				solution: {
					en: 'Jobs are checkpointed per segment and survive an app kill or a reboot. Processing resumes where it stopped rather than restarting. Progress is reported per stage with a live estimate, so a long job at least looks like a long job instead of a frozen screen.',
					ar: 'تُحفَظ نقاط تفتيش للمهام لكل مقطع، وتنجو من إغلاق التطبيق أو إعادة التشغيل، فتُستأنف المعالجة من حيث توقفت لا من البداية. ويُعرض التقدّم لكل مرحلة مع تقدير مباشر، فتبدو المهمة الطويلة مهمة طويلة لا شاشة متجمدة.',
				},
			},
		],
		outcomes: {
			en: [
				'Shipped on Google Play; Apple rewrite in progress against an Android parity suite.',
				'Runs fully offline: models bundled, no accounts, no telemetry.',
				'Resumable jobs survive app kills and reboots.',
			],
			ar: [
				'صدر على Google Play؛ وإعادة كتابة Apple جارية مقابل مجموعة تكافؤ أندرويد.',
				'يعمل دون اتصال بالكامل: نماذج مضمّنة، بلا حسابات وبلا تتبّع.',
				'مهام قابلة للاستئناف تنجو من إغلاق التطبيق وإعادة التشغيل.',
			],
		},
		sourced: true,
	},
	{
		slug: 'kashaf-alkulify',
		title: { en: "Kashaf Abi Ja'far", ar: 'كشّاف أبي جعفر' },
		tagline: {
			en: 'Search thousands of hours of lessons and land on the exact second.',
			ar: 'ابحث في آلاف الساعات من الدروس، وصِل إلى الثانية بعينها.',
		},
		summary: {
			en: "A fully Arabic, right-to-left search engine over a scholar's video lessons and written articles: type a phrase and get back the passages where it was actually said. One click opens the video at that exact second, with no login and no database behind it.",
			ar: 'محرك بحث عربي بالكامل وبالاتجاه من اليمين إلى اليسار في دروس شيخ المصوّرة ومقالاته المكتوبة: تكتب عبارة فتعود إليك المقاطع التي قيلت فيها فعلًا. ونقرة واحدة تفتح الفيديو عند تلك الثانية بعينها، بلا تسجيل دخول وبلا قاعدة بيانات خلفه.',
		},
		category: 'web',
		status: 'live',
		featured: true,
		year: '2026',
		role: {
			en: 'Solo: pipeline, search and interface',
			ar: 'منفردًا: خط المعالجة والبحث والواجهة',
		},
		stack: [
			'Astro',
			'TypeScript',
			'Meilisearch',
			'Whisper ASR',
			'Tailwind CSS',
		],
		cover: '/projects/kashaf-alkulify.png',
		gallery: ['/projects/kashaf-alkulify.png'],
		links: {
			live: 'https://alkulify.assoli.site',
			github: 'https://github.com/haithamassoli/kashaf-alkulify',
		},
		overview: {
			en: [
				'A scholar with years of recorded lessons has, in practice, an unsearchable archive. The knowledge is there, but finding the ten minutes where a specific question was answered means remembering which lesson it was in and scrubbing through it.',
			],
			ar: [
				'الشيخ الذي لديه سنوات من الدروس المسجلة يملك عمليًا أرشيفًا غير قابل للبحث. المعرفة موجودة، لكن إيجاد العشر دقائق التي أُجيب فيها عن سؤال بعينه يتطلب تذكّر الدرس ثم التنقّل داخله.',
			],
		},
		challenges: [
			{
				title: {
					en: 'Arabic does not match itself',
					ar: 'العربية لا تطابق نفسها',
				},
				problem: {
					en: 'The same word appears with and without diacritics, with أ / إ / ا used interchangeably, with ة and ه confused, and with tatweel stretching letters. A visitor searching the phrase they remember hearing rarely types it the way the transcriber wrote it.',
					ar: 'تظهر الكلمة نفسها بالتشكيل وبدونه، وبتبادل أ/إ/ا، وبالخلط بين ة وه، وبالتطويل الذي يمدّ الحروف. والزائر الذي يبحث عن عبارة يتذكّر سماعها نادرًا ما يكتبها كما كتبها المُفرِّغ.',
				},
				solution: {
					en: 'Normalisation runs identically over the index and the query, so both sides are reduced to the same canonical form before matching. Anything else produces a search that works for the person who built it and nobody else.',
					ar: 'يُطبَّق التطبيع نفسه على الفهرس والاستعلام معًا، فيُختزل الطرفان إلى الصورة المعيارية ذاتها قبل المطابقة. وأي بديل ينتج بحثًا يعمل لمن بناه وحده.',
				},
			},
			{
				title: {
					en: 'Search with no server to search on',
					ar: 'بحث بلا خادم يبحث عليه',
				},
				problem: {
					en: 'A always-on search backend for a free, non-commercial site is a recurring cost and a thing that can go down at 3am with nobody on call.',
					ar: 'خادم بحث دائم التشغيل لموقع مجاني غير تجاري يعني كلفة متكررة وشيئًا قد يتعطّل في الثالثة فجرًا دون أحد للمناوبة.',
				},
				solution: {
					en: 'The site is built with Astro and ships a static index that the browser queries directly. Nothing needs to be running for search to work, which is the right operational profile for a project meant to outlive my attention to it.',
					ar: 'بُني الموقع بـ Astro ويُصدِّر فهرسًا ثابتًا يستعلمه المتصفح مباشرة. لا شيء يحتاج أن يكون قيد التشغيل ليعمل البحث، وهو الملمح التشغيلي الصحيح لمشروع يُراد له أن يعيش بعد انصراف انتباهي عنه.',
				},
			},
		],
		outcomes: {
			en: [
				'Two searchable corpora, lessons and articles, with per-tab result counts and playlist filtering.',
				'Every result is a deep link into the video at the second it was said.',
				'Static, serverless search: no database, no login, no running cost.',
			],
			ar: [
				'مدوّنتان قابلتان للبحث، الدروس والمقالات، مع عدّاد نتائج لكل تبويب وتصفية بقوائم التشغيل.',
				'كل نتيجة رابط عميق إلى الفيديو عند الثانية التي قيلت فيها.',
				'بحث ثابت بلا خادم: بلا قاعدة بيانات وبلا تسجيل دخول وبلا كلفة تشغيل.',
			],
		},
		sourced: true,
	},
	{
		slug: 'pastehtml',
		title: { en: 'pastehtml', ar: 'pastehtml' },
		tagline: {
			en: 'Drop an HTML file, get a public URL on its own origin.',
			ar: 'أفلِت ملف HTML، واحصل على رابط عام على نطاق مستقل.',
		},
		summary: {
			en: 'Publish a page in one step: drop a file, paste markup, curl it, or hand it to an agent over MCP. Markdown is rendered to a self-contained page on upload, with no account and no build step.',
			ar: 'انشر صفحة بخطوة واحدة: أفلِت ملفًا، أو ألصق شيفرة، أو أرسلها بـ curl، أو سلّمها لوكيل عبر MCP. ويُحوَّل Markdown إلى صفحة مكتفية بنفسها وقت الرفع، بلا حساب وبلا خطوة بناء.',
		},
		category: 'web',
		status: 'live',
		featured: true,
		year: '2026',
		role: { en: 'Solo', ar: 'منفردًا' },
		stack: ['Next.js', 'TypeScript', 'Convex', 'MCP', 'Tailwind CSS'],
		cover: '/projects/pastehtml.png',
		gallery: ['/projects/pastehtml.png'],
		links: {
			live: 'https://pastehtml.assoli.site',
			github: 'https://github.com/haithamassoli/pastehtml',
		},
		overview: {
			en: [
				'I kept generating single-file HTML pages like reports, mockups and one-off tools, and having nowhere nowhere to put them. Every option was heavier than the artefact: a repo and a deploy for a page that exists to be looked at once.',
			],
			ar: [
				'كنت أُولّد باستمرار صفحات HTML بملف واحد، من تقارير ونماذج وأدوات لمرة واحدة، ولا أجد أين أضعها. كل الخيارات أثقل من الشيء نفسه: مستودع ونشر لصفحة وُجدت لتُرى مرة.',
			],
		},
		challenges: [
			{
				title: {
					en: 'Hosting arbitrary HTML is hosting arbitrary JavaScript',
					ar: 'استضافة HTML عشوائي هي استضافة JavaScript عشوائي',
				},
				problem: {
					en: 'A paste is a full page with scripts in it. Serve all pastes from one domain and any one of them can read the cookies, storage and DOM of every other. The service becomes a hosted cross-site scripting platform.',
					ar: 'كل نسخة صفحة كاملة تحوي شيفرات. ولو قُدّمت كل النسخ من نطاق واحد لأمكن لأيٍّ منها قراءة الكعكات والتخزين وDOM لكل النسخ الأخرى، فتتحول الخدمة إلى منصة استضافة لهجمات XSS.',
				},
				solution: {
					en: "Each paste is served from its own origin, so the browser's own same-origin policy does the isolation rather than a sanitiser I would have to keep ahead of. Sanitising untrusted HTML is a losing race; giving it nothing worth stealing is not.",
					ar: 'تُقدَّم كل نسخة من نطاق خاص بها، فتتولى سياسة أصل المتصفح نفسها العزل بدل مُنقٍّ عليّ أن أظل متقدمًا عليه. تنقية HTML غير موثوق سباق خاسر؛ أما ألا تترك له ما يستحق السرقة فليس كذلك.',
				},
			},
			{
				title: {
					en: 'One publish path, four entry points',
					ar: 'مسار نشر واحد وأربع نقاط دخول',
				},
				problem: {
					en: 'A drop zone, a paste box, a REST call and an MCP tool are four different clients. Implementing publishing four times guarantees they drift apart, and the agent path, the one I most wanted, would be the least tested.',
					ar: 'منطقة الإفلات وصندوق اللصق ونداء REST وأداة MCP أربعة عملاء مختلفين. وتنفيذ النشر أربع مرات يضمن تباعدها، ويكون مسار الوكيل، وهو أكثر ما أردته، أقلّها اختبارًا.',
				},
				solution: {
					en: 'All four are thin shells over a single Convex function. Whatever works from the browser works identically from curl and from an agent, because it is the same code path.',
					ar: 'الأربعة أغلفة رقيقة فوق دالة Convex واحدة. وما يعمل من المتصفح يعمل بالطريقة ذاتها من curl ومن وكيل، لأنه مسار الشيفرة نفسه.',
				},
			},
		],
		outcomes: {
			en: [
				'Publish from a browser, a terminal, or an AI agent over MCP.',
				'Per-paste origins, so pages cannot reach each other.',
				'Markdown becomes a styled, self-contained page at upload.',
			],
			ar: [
				'النشر من المتصفح أو الطرفية أو وكيل ذكاء اصطناعي عبر MCP.',
				'نطاق مستقل لكل نسخة، فلا تصل الصفحات إلى بعضها.',
				'يتحوّل الـ Markdown إلى صفحة منسّقة مكتفية بذاتها عند الرفع.',
			],
		},
		sourced: true,
	},
	{
		slug: 'majalis',
		title: { en: 'Al-Tibyan Educational Center', ar: 'مركز التبيان التعليمي' },
		tagline: {
			en: 'Quran memorisation circles, run properly on a phone.',
			ar: 'حلقات تحفيظ القرآن، تُدار كما ينبغي من الهاتف.',
		},
		summary: {
			en: "A companion app for a Quran teaching and memorisation centre, linking the centre, the student and the family. Students sit in circles that mirror the real ones, the teacher follows a student's recitation on a synchronised mushaf, and games and tests turn revision into something students return to.",
			ar: 'تطبيق مرافق لمركز تعليم القرآن وتحفيظه، يربط المركز بالطالب وأسرته. يجلس الطلاب في حلقات تحاكي الواقع، ويتابع المعلّم تلاوة الطالب على مصحف متزامن، وتحوّل الألعاب والاختبارات المراجعة إلى شيء يعود إليه الطلاب.',
		},
		category: 'mobile',
		status: 'shipped',
		featured: true,
		year: '2025',
		role: { en: 'Solo: mobile and backend', ar: 'منفردًا: الموبايل والخادم' },
		stack: [
			'React Native',
			'TypeScript',
			'Firebase',
			'React Query',
			'Reanimated',
			'Skia',
			'Zod',
			'Push Notifications',
		],
		cover: '/apps/majalis-1.png',
		gallery: [
			'/apps/majalis-1.png',
			'/apps/majalis-2.png',
			'/apps/majalis-3.png',
			'/apps/majalis-4.png',
			'/apps/majalis-5.png',
			'/apps/majalis-6.png',
		],
		links: {
			playGoogle:
				'https://play.google.com/store/apps/details?id=com.haithamassoli.majalis',
		},
		overview: {
			en: [
				'A memorisation centre runs on relationships that software usually flattens: a teacher knows where each student stopped, what they struggle with, and whether the family is following along. Most apps replace that with a progress bar.',
			],
			ar: [
				'يقوم مركز التحفيظ على علاقات تُسطّحها البرمجيات عادةً: المعلّم يعرف أين وقف كل طالب، وما يتعثّر فيه، وهل تتابع الأسرة أم لا. ومعظم التطبيقات تستبدل بذلك شريط تقدّم.',
			],
		},
		challenges: [
			{
				title: {
					en: 'The mushaf is not a text view',
					ar: 'المصحف ليس عرض نصّ',
				},
				problem: {
					en: 'Quranic text has to be laid out exactly. The page breaks, line breaks and word positions are fixed, and readers notice immediately when they are not. Standard text rendering reflows, which makes the page wrong.',
					ar: 'يجب أن يُخرَج النص القرآني بدقة. فواصل الصفحات والأسطر ومواضع الكلمات ثابتة، ويلحظ القارئ الاختلاف فورًا. أما عرض النص المعتاد فيعيد التدفق، فتصير الصفحة خاطئة.',
				},
				solution: {
					en: 'Pages are drawn on a Skia canvas with fixed geometry rather than laid out as flowing text, so a page looks the same on every device size and word-level positions stay addressable for highlighting.',
					ar: 'تُرسم الصفحات على لوحة Skia بهندسة ثابتة بدل إخراجها كنص متدفق، فتبدو الصفحة واحدة على كل مقاسات الأجهزة وتبقى مواضع الكلمات قابلة للعنونة لأجل التظليل.',
				},
			},
			{
				title: {
					en: 'Two devices on the same page',
					ar: 'جهازان على الصفحة نفسها',
				},
				problem: {
					en: "The teacher's view has to track the student's position closely enough to be useful for correction. Polling is too slow to feel connected, and pushing every scroll event floods the connection in a circle of a dozen students.",
					ar: 'يجب أن تتابع شاشة المعلّم موضع الطالب بدقة تكفي للتصحيح. والاستطلاع الدوري أبطأ من أن يبدو متصلًا، وبثّ كل حدث تمرير يُغرق الاتصال في حلقة فيها عشرات الطلاب.',
				},
				solution: {
					en: 'Position updates are throttled and sent as a compact cursor rather than a stream of scroll events, and only within an active session. The teacher sees the current line quickly without the app maintaining a live channel per student all day.',
					ar: 'تُقنَّن تحديثات الموضع وتُرسل كمؤشر مضغوط بدل تدفق أحداث تمرير، وضمن جلسة نشطة فقط. فيرى المعلّم السطر الحالي بسرعة دون أن يُبقي التطبيق قناة حيّة لكل طالب طوال اليوم.',
				},
			},
		],
		outcomes: {
			en: [
				"Live on Google Play, serving a real centre's teachers, students and parents.",
				'Synchronised recitation view for teacher-led correction.',
				'Revision framed as tests, games and a leaderboard.',
			],
			ar: [
				'متاح على Google Play، ويخدم معلّمي مركز حقيقي وطلابه وأولياء أمورهم.',
				'عرض تلاوة متزامن للتصحيح بقيادة المعلّم.',
				'المراجعة مصاغة كاختبارات وألعاب ولوحة متصدرين.',
			],
		},
		sourced: true,
	},
	{
		slug: 'eecommittee',
		title: { en: 'EECommittee', ar: 'لجنة الهندسة الكهربائية' },
		tagline: {
			en: 'Every resource an electrical engineering student needs, in one place.',
			ar: 'كل ما يحتاجه طالب الهندسة الكهربائية، في مكان واحد.',
		},
		summary: {
			en: 'Pick any subject from the study plan tree and get everything attached to it: material, recordings, staff contacts. Plus a GPA calculator, bilingual Arabic and English search, and a night mode.',
			ar: 'اختر أي مادة من شجرة الخطة الدراسية فتحصل على كل ما يتعلق بها: المادة والتسجيلات وبيانات أعضاء الهيئة. ومعها حاسبة معدّل، وبحث بالعربية والإنجليزية، ووضع ليلي.',
		},
		category: 'mobile',
		status: 'shipped',
		featured: true,
		year: 'Since 2022',
		role: {
			en: 'Volunteer: mobile and backend',
			ar: 'متطوّع: الموبايل والخادم',
		},
		stack: [
			'React Native',
			'Expo',
			'TypeScript',
			'Firebase',
			'React Query',
			'Reanimated',
			'Caching',
		],
		cover: '/apps/eecommittee-2.png',
		gallery: [
			'/apps/eecommittee-1.png',
			'/apps/eecommittee-2.png',
			'/apps/eecommittee-3.png',
			'/apps/eecommittee-4.png',
			'/apps/eecommittee-5.png',
			'/apps/eecommittee-6.png',
		],
		links: {
			playGoogle:
				'https://play.google.com/store/apps/details?id=com.haithamassoli.EECommitte',
			github: 'https://github.com/haithamassoli/EECommitte-App',
		},
		overview: {
			en: [
				'The committee had been answering the same questions in the same Facebook group for years: which prerequisites does this subject have, who teaches it, where are the notes, what will my GPA be if this goes badly.',
			],
			ar: [
				'ظلّت اللجنة تجيب عن الأسئلة نفسها في مجموعة فيسبوك نفسها سنوات: ما متطلبات هذه المادة، ومن يدرّسها، وأين الملخصات، وكم سيصير معدّلي إن ساءت الأمور.',
			],
		},
		challenges: [
			{
				title: {
					en: 'Searching in two languages at once',
					ar: 'البحث بلغتين في آن',
				},
				problem: {
					en: "Students refer to the same subject as 'Signals', 'إشارات', or a course code, often switching mid-sentence. Indexing one language means half the searches fail silently.",
					ar: 'يشير الطلاب إلى المادة نفسها بـ Signals أو «إشارات» أو برمز المساق، وكثيرًا ما يبدّلون في منتصف الجملة. وفهرسة لغة واحدة تعني فشل نصف عمليات البحث بصمت.',
				},
				solution: {
					en: 'Every subject carries both names and its code in one searchable field, normalised on both sides. A query in either language, or a code, reaches the same subject.',
					ar: 'تحمل كل مادة اسميها ورمزها في حقل واحد قابل للبحث، مُطبَّع من الطرفين. فيصل الاستعلام بأي لغة، أو بالرمز، إلى المادة نفسها.',
				},
			},
			{
				title: {
					en: 'A campus network you cannot rely on',
					ar: 'شبكة جامعية لا يُعتمد عليها',
				},
				problem: {
					en: 'Students open the app between lectures, in corridors and basements where the connection is unreliable. Every screen hitting the network makes the app feel broken in exactly the place it is used.',
					ar: 'يفتح الطلاب التطبيق بين المحاضرات، في الممرات والطوابق السفلية حيث الاتصال غير موثوق. وأي شاشة تتصل بالشبكة تجعل التطبيق يبدو معطلًا في المكان الذي يُستخدم فيه بالضبط.',
				},
				solution: {
					en: 'The plan tree and staff directory are cached aggressively and treated as slow-changing data, so the app opens instantly from cache and revalidates in the background rather than blocking on a request.',
					ar: 'تُخزَّن شجرة الخطة ودليل الهيئة التدريسية بقوة وتُعامَل كبيانات بطيئة التغيّر، فيفتح التطبيق فورًا من الذاكرة ويُعيد التحقق في الخلفية بدل الانتظار على طلب.',
				},
			},
		],
		outcomes: {
			en: [
				'Published on Google Play and maintained across multiple student intakes.',
				'About eleven services behind one search box.',
				'Content editable by the committee without a release.',
			],
			ar: [
				'منشور على Google Play ومُصان عبر دفعات طلابية متعددة.',
				'نحو أحد عشر خدمة خلف صندوق بحث واحد.',
				'محتوى قابل للتعديل من اللجنة دون إصدار جديد.',
			],
		},
		sourced: true,
	},
	{
		slug: 'rooh-al-jouf',
		title: { en: 'Rooh Al-Jouf', ar: 'روح الجوف' },
		tagline: {
			en: 'A digital guide to the Al-Jouf region and everything in it.',
			ar: 'دليلك الرقمي لمنطقة الجوف وكل ما فيها.',
		},
		summary: {
			en: 'A bilingual tourism guide for Al-Jouf in Saudi Arabia: heritage and tourist sites, live events and festivals, a directory of local restaurants and cafés, and the historical and cultural background behind them. Built for both a first-time visitor and a resident.',
			ar: 'دليل سياحي ثنائي اللغة لمنطقة الجوف في السعودية: المواقع التراثية والسياحية، والفعاليات والمهرجانات الجارية، ودليل المطاعم والمقاهي المحلية، والخلفية التاريخية والثقافية وراءها. مبني للزائر الجديد وللمقيم معًا.',
		},
		category: 'mobile',
		status: 'shipped',
		featured: true,
		year: '2025',
		role: {
			en: 'Client project: mobile development',
			ar: 'مشروع لعميل: تطوير الموبايل',
		},
		stack: [
			'React Native',
			'Expo Router',
			'TypeScript',
			'i18n',
			'Firebase',
			'React Query',
			'Reanimated',
			'Deep Linking',
		],
		cover: '/apps/rooh-al-jouf-3.png',
		gallery: [
			'/apps/rooh-al-jouf-1.png',
			'/apps/rooh-al-jouf-2.png',
			'/apps/rooh-al-jouf-3.png',
			'/apps/rooh-al-jouf-4.png',
			'/apps/rooh-al-jouf-5.png',
			'/apps/roohaljouf-android-1.png',
			'/apps/roohaljouf-android-2.png',
		],
		links: {
			appStore: 'https://apps.apple.com/us/app/rooh-al-jouf/id6743066965',
			playGoogle:
				'https://play.google.com/store/apps/details?id=com.saudiarabia.roohaljouf',
		},
		overview: {
			en: [
				'Regional tourism apps usually fail in one of two ways: they are a brochure that never changes, or they are a map with pins and no reason to care about any of them. Al-Jouf has genuine depth in heritage sites, seasonal festivals and a food scene, and the client wanted all of it in one place.',
			],
			ar: [
				'تفشل تطبيقات السياحة الإقليمية عادةً بإحدى طريقتين: إما كتيّب لا يتغير، وإما خريطة بدبابيس بلا سبب يجعلك تهتم بأيٍّ منها. وللجوف عمق حقيقي في مواقعها التراثية ومهرجاناتها الموسمية ومشهد الطعام فيها، وأراد العميل ذلك كله في مكان واحد.',
			],
		},
		challenges: [
			{
				title: {
					en: 'Bilingual means the layout mirrors, not just the words',
					ar: 'ثنائية اللغة تعني انعكاس التخطيط لا الكلمات وحدها',
				},
				problem: {
					en: 'Switching to Arabic flips the entire interface: navigation direction, icon orientation, list alignment, back gestures. Translating strings alone produces an app that reads Arabic but behaves English.',
					ar: 'التبديل إلى العربية يقلب الواجهة كلها: اتجاه التنقّل، واتجاه الأيقونات، ومحاذاة القوائم، وإيماءات الرجوع. وترجمة النصوص وحدها تنتج تطبيقًا يقرأ بالعربية ويتصرّف بالإنجليزية.',
				},
				solution: {
					en: 'Direction is a property of the whole tree rather than a per-screen fix, so layout, navigation and gestures all mirror together. Anything directional is expressed in start/end terms instead of left/right.',
					ar: 'الاتجاه خاصية للشجرة كلها لا إصلاح لكل شاشة، فينعكس التخطيط والتنقّل والإيماءات معًا. وكل ما هو اتجاهي يُعبَّر عنه ببداية/نهاية بدل يمين/يسار.',
				},
			},
			{
				title: {
					en: 'Events go stale faster than releases ship',
					ar: 'تتقادم الفعاليات أسرع من صدور التحديثات',
				},
				problem: {
					en: 'A festival listing that is a week out of date is worse than no listing. Store review cycles are far slower than the pace at which a seasonal events calendar changes.',
					ar: 'قائمة مهرجانات متأخرة أسبوعًا أسوأ من غياب القائمة. ودورات مراجعة المتاجر أبطأ بكثير من إيقاع تغيّر تقويم الفعاليات الموسمي.',
				},
				solution: {
					en: 'Events, sites and venues are all remote content the client edits directly. Shipping a build is never on the critical path for keeping the app current.',
					ar: 'الفعاليات والمواقع والأماكن كلها محتوى بعيد يحرّره العميل مباشرة. فلا يقع إصدار نسخة على المسار الحرج لإبقاء التطبيق محدّثًا.',
				},
			},
		],
		outcomes: {
			en: [
				'Shipped on both the App Store and Google Play for a Saudi client.',
				'Fully bilingual with a properly mirrored right-to-left layout.',
				'Content managed by the client without app releases.',
			],
			ar: [
				'صدر على App Store وGoogle Play لعميل سعودي.',
				'ثنائي اللغة بالكامل مع تخطيط منعكس بشكل صحيح من اليمين إلى اليسار.',
				'محتوى يديره العميل دون إصدارات جديدة للتطبيق.',
			],
		},
		sourced: true,
	},
	{
		slug: 'fazuwjuh',
		title: { en: 'Fazawwijuhu', ar: 'فَزَوِّجُوهُ' },
		tagline: {
			en: 'A supervised platform for lawful marriage introductions.',
			ar: 'منصة لتيسير الزواج الشرعي بإشراف إداري.',
		},
		summary: {
			en: 'A platform that introduces people seeking marriage under explicit, published conditions with administrative supervision throughout, deliberately structured to keep the process within religious bounds rather than reproducing a dating app.',
			ar: 'منصة تُعرِّف الراغبين والراغبات في الزواج وفق شروط واضحة معلنة مع إشراف إداري في كل مرحلة، مبنيّة عمدًا لإبقاء العملية ضمن الحدود الشرعية بدل استنساخ تطبيقات المواعدة.',
		},
		category: 'web',
		status: 'live',
		featured: false,
		year: '2026',
		role: { en: 'Solo', ar: 'منفردًا' },
		stack: [
			'Next.js 16',
			'React 19',
			'TypeScript',
			'Convex',
			'Better Auth',
			'Tailwind v4',
		],
		cover: '/projects/fazuwjuh.png',
		gallery: ['/projects/fazuwjuh.png'],
		links: {
			live: 'https://fazuwjuh.vercel.app',
			github: 'https://github.com/haithamassoli/fazuwjuh',
		},
		overview: {
			en: [
				'The default shape of this product is a dating app, and the default shape is exactly what the users this is for want to avoid. The design problem was structural rather than visual: what does the flow look like when open browsing and private messaging are the things you are trying to prevent?',
			],
			ar: [
				'الشكل الافتراضي لهذا المنتج تطبيق مواعدة، والشكل الافتراضي هو بالضبط ما يريد مستخدموه تجنّبه. فكانت مشكلة التصميم بنيوية لا بصرية: كيف يبدو المسار حين يكون التصفح المفتوح والمراسلة الخاصة هما ما تحاول منعه؟',
			],
		},
		challenges: [],
		outcomes: {
			en: [
				'Server-enforced visibility rules. The client cannot request what it may not see.',
				'Questions and religious copy editable by the product owner without a deploy.',
			],
			ar: [
				'قواعد ظهور مفروضة على الخادم. لا يستطيع العميل طلب ما لا يحق له رؤيته.',
				'أسئلة ونصوص شرعية قابلة للتحرير من صاحب المنتج دون نشر.',
			],
		},
		sourced: true,
	},
	{
		slug: 'gift',
		title: { en: 'Gift', ar: 'هديّة' },
		tagline: {
			en: 'Animated 3D gifts you send as a link.',
			ar: 'هدايا ثلاثية الأبعاد متحركة تُرسَل كرابط.',
		},
		summary: {
			en: 'Pick a gift, record a voice note, send a link. The recipient opens a 3D scene that unwraps in the browser.',
			ar: 'اختر هدية، وسجّل رسالة صوتية، وأرسل رابطًا. يفتح المستلم مشهدًا ثلاثي الأبعاد يُفكّ غلافه في المتصفح.',
		},
		category: 'web',
		status: 'live',
		featured: false,
		year: '2026',
		role: { en: 'Solo', ar: 'منفردًا' },
		stack: [
			'Next.js 16',
			'React Three Fiber',
			'drei',
			'Convex',
			'Tailwind CSS',
			'Turbopack',
		],
		cover: '/projects/gift.png',
		gallery: ['/projects/gift.png'],
		links: {
			live: 'https://gift.assoli.site',
			github: 'https://github.com/haithamassoli/gift',
		},
		overview: {
			en: [
				'A greeting sent as a link is usually a static page with a name interpolated into it. This one is a real 3D scene: the gift sits there wrapped, and opening it is an animation rather than a page load.',
			],
			ar: [
				'التهنئة المُرسَلة كرابط عادةً صفحة ثابتة أُدرج فيها اسم. أما هنا فمشهد ثلاثي الأبعاد حقيقي: الهدية موضوعة مغلَّفة، وفتحها حركة لا تحميل صفحة.',
			],
		},
		challenges: [],
		outcomes: {
			en: [
				'Per-gift link previews without server-rendering WebGL.',
				'Voice notes and open-notification emails, with no account required.',
			],
			ar: [
				'معاينات روابط خاصة بكل هدية دون عرض WebGL على الخادم.',
				'رسائل صوتية وإشعارات بريدية عند الفتح، بلا حاجة إلى حساب.',
			],
		},
		sourced: true,
	},
	{
		slug: 'devcards',
		title: { en: 'DevCards', ar: 'بطاقات المقابلات' },
		tagline: {
			en: 'Spaced-repetition flashcards for engineering interviews.',
			ar: 'بطاقات مراجعة متباعدة للتحضير لمقابلات الهندسة.',
		},
		summary: {
			en: 'Hundreds of multiple-choice questions across thirteen topics, each with a full explanation, scheduled by a Leitner system so the cards you get wrong keep coming back until they stick. Entirely frontend: no backend, no account, no network calls.',
			ar: 'مئات الأسئلة متعددة الخيارات في ثلاثة عشر موضوعًا، لكل سؤال شرح كامل، مجدولة بنظام لايتنر بحيث تعود البطاقات التي تخطئ فيها حتى ترسخ. واجهة أمامية بالكامل: بلا خادم وبلا حساب وبلا اتصالات شبكية.',
		},
		category: 'web',
		status: 'live',
		featured: false,
		year: '2026',
		role: { en: 'Solo: content and app', ar: 'منفردًا: المحتوى والتطبيق' },
		stack: [
			'Next.js',
			'TypeScript',
			'Tailwind CSS',
			'localStorage',
			'Leitner scheduling',
		],
		cover: '/projects/devcards.png',
		gallery: ['/projects/devcards.png'],
		links: {
			live: 'https://flashcards.assoli.site',
			github: 'https://github.com/haithamassoli/Interview-Flashcards-Game',
		},
		overview: {
			en: [
				'Interview prep material is either a list of questions with one-line answers you forget immediately, or a course you never finish. Neither does the thing that actually works, which is being asked the question again a few days after getting it wrong.',
			],
			ar: [
				'مواد التحضير للمقابلات إما قائمة أسئلة بإجابات من سطر تُنسى فورًا، وإما دورة لا تُنهيها أبدًا. ولا يفعل أيٌّ منهما ما ينفع فعلًا: أن يُطرح عليك السؤال ثانيةً بعد أيام من خطئك فيه.',
			],
		},
		challenges: [],
		outcomes: {
			en: [
				'Thirteen categories, hundreds of graded questions with explanations.',
				'Leitner scheduling plus in-session re-queueing of missed cards.',
			],
			ar: [
				'ثلاثة عشر تصنيفًا، ومئات الأسئلة المُصحَّحة مع شروح.',
				'جدولة لايتنر مع إعادة إدراج البطاقات المُخطأة داخل الجلسة.',
			],
		},
		sourced: true,
	},
	{
		slug: 'sada',
		title: { en: 'Sada', ar: 'صدى' },
		tagline: {
			en: 'Arabic subtitles for English YouTube, translated on your device.',
			ar: 'ترجمة عربية لفيديوهات يوتيوب الإنجليزية، تُترجَم على جهازك.',
		},
		summary: {
			en: "A Chrome extension that renders Arabic subtitles over English YouTube videos by translating the video's own captions entirely in the browser, using a bundled NLLB-200 model. No account, no cloud translation service, and caption text never leaves the machine.",
			ar: 'إضافة كروم تعرض ترجمة عربية فوق فيديوهات يوتيوب الإنجليزية بترجمة تسميات الفيديو نفسها داخل المتصفح بالكامل، باستخدام نموذج NLLB-200 مضمَّن. بلا حساب ولا خدمة ترجمة سحابية، ولا يغادر نص الترجمة الجهاز أبدًا.',
		},
		category: 'extension',
		status: 'live',
		featured: false,
		year: '2026',
		role: { en: 'Solo', ar: 'منفردًا' },
		stack: [
			'JavaScript',
			'Manifest V3',
			'transformers.js',
			'NLLB-200',
			'WebGPU',
			'WASM',
		],
		cover: '/projects/sada-logo.png',
		gallery: ['/projects/sada-logo.png'],
		links: { github: 'https://github.com/haithamassoli/sada' },
		overview: {
			en: [
				'Auto-translated captions on YouTube mean your viewing history goes to a translation service. Sada does the same job without that: the model and runtime download once at install, and after that the engine runs with remote models disabled.',
			],
			ar: [
				'الترجمة التلقائية للتسميات على يوتيوب تعني ذهاب سجل مشاهدتك إلى خدمة ترجمة. يؤدي «صدى» العمل نفسه بلا ذلك: يُنزَّل النموذج وبيئة التشغيل مرة واحدة عند التثبيت، وبعدها يعمل المحرّك والنماذج البعيدة معطّلة.',
			],
		},
		challenges: [],
		outcomes: {
			en: [
				'100% on-device translation with remote models disabled after install.',
				'Toggleable, resizable subtitle overlay on any English YouTube watch page.',
			],
			ar: [
				'ترجمة على الجهاز بالكامل مع تعطيل النماذج البعيدة بعد التثبيت.',
				'طبقة ترجمة قابلة للتبديل وتغيير الحجم على أي صفحة مشاهدة إنجليزية في يوتيوب.',
			],
		},
		sourced: true,
	},
	{
		slug: 'mubah',
		title: { en: 'Mubah', ar: 'مباح' },
		tagline: {
			en: 'Turn any video into a permissible copy, on your own Mac.',
			ar: 'حوّل أي فيديو إلى نسخة مباحة، على جهاز Mac الخاص بك.',
		},
		summary: {
			en: 'A local-only Mac tool that removes music and blurs women full-body in a video, from a file or a URL. Nothing leaves the machine, and working files are purged when the job finishes.',
			ar: 'أداة محلية بالكامل لأجهزة Mac تزيل الموسيقى وتُشوّش النساء كاملًا في الفيديو، من ملف أو رابط. لا شيء يغادر الجهاز، وتُمحى الملفات المؤقتة عند انتهاء المهمة.',
		},
		category: 'ai',
		status: 'live',
		featured: false,
		year: '2026',
		role: { en: 'Solo', ar: 'منفردًا' },
		stack: [
			'Python',
			'uv',
			'ffmpeg',
			'yt-dlp',
			'Apple Silicon / MPS',
			'Stem separation',
		],
		cover: '',
		gallery: [],
		links: { github: 'https://github.com/haithamassoli/mubah' },
		overview: {
			en: [
				"Mubah is the desktop counterpart to Naqi: same intent, different constraints. A Mac has more memory and a real GPU, so it can run heavier models and take a whole file rather than working around a phone's limits.",
			],
			ar: [
				'«مباح» نظير «نقيّ» على سطح المكتب: النية ذاتها والقيود مختلفة. فجهاز Mac يملك ذاكرة أكبر ومعالجًا رسوميًا حقيقيًا، فيستطيع تشغيل نماذج أثقل ومعالجة ملف كامل بدل الالتفاف حول حدود الهاتف.',
			],
		},
		challenges: [],
		outcomes: {
			en: [
				'Fully local processing on Apple Silicon; working files purged after each job.',
				'CLI with fast / balanced / thorough presets, file or URL input.',
			],
			ar: [
				'معالجة محلية بالكامل على معالجات Apple Silicon، مع محو الملفات المؤقتة بعد كل مهمة.',
				'سطر أوامر بإعدادات سريع/متوازن/دقيق، ومدخلات ملف أو رابط.',
			],
		},
		sourced: true,
	},
	{
		slug: 'ghadd',
		title: { en: 'Ghadd', ar: 'غَضّ' },
		tagline: {
			en: 'System-wide on-device image filtering for Android.',
			ar: 'ترشيح صور على مستوى النظام كاملًا لأندرويد، على الجهاز.',
		},
		summary: {
			en: 'An Android accessibility service that covers and blurs immodest imagery anywhere on screen, in any app, using a detector that runs entirely on the device. Because it reads pixels rather than a DOM, it has none of the blind spots a browser extension has.',
			ar: 'خدمة إتاحة على أندرويد تغطي وتُشوّش الصور غير المحتشمة في أي مكان على الشاشة وفي أي تطبيق، بكاشف يعمل على الجهاز بالكامل. ولأنها تقرأ البكسلات لا الـ DOM، فليست فيها النقاط العمياء التي في إضافة المتصفح.',
		},
		category: 'ai',
		status: 'wip',
		featured: false,
		year: '2026',
		role: { en: 'Solo', ar: 'منفردًا' },
		stack: [
			'Kotlin',
			'Android Accessibility Service',
			'ONNX Runtime',
			'NudeNet v3',
			'YOLOv8n',
		],
		cover: '/projects/ghadd-logo.png',
		gallery: ['/projects/ghadd-logo.png'],
		links: { github: 'https://github.com/haithamassoli/haramblur' },
		overview: {
			en: [
				'Browser extensions solved this for the browser. Nothing solved it for the phone, where most of the problem now lives. A DOM-based filter cannot see CSS background images, iframes, picture-in-picture, ads or PDFs, and it only ever covers one app.',
			],
			ar: [
				'حلّت إضافات المتصفح هذا للمتصفح. ولم يحلّه شيء للهاتف حيث تعيش المشكلة اليوم في معظمها. فالمُرشِّح القائم على الـ DOM لا يرى صور خلفيات CSS ولا الإطارات المضمّنة ولا الصورة داخل الصورة ولا الإعلانات ولا ملفات PDF، ولا يغطي إلا تطبيقًا واحدًا.',
			],
		},
		challenges: [],
		outcomes: {
			en: [
				'Works system-wide across every app, not just a browser.',
				'On-device detection with no cloud and no telemetry.',
			],
			ar: [
				'يعمل على مستوى النظام في كل التطبيقات، لا في متصفح فقط.',
				'كشف على الجهاز بلا سحابة وبلا تتبّع.',
			],
		},
		sourced: true,
	},
	{
		slug: 'azkari',
		title: { en: 'Azkari / Dhikr', ar: 'أذكاري / ذِكر' },
		tagline: {
			en: 'One remembrance, every so often, on whichever screen you are at.',
			ar: 'ذِكر واحد، بين حين وآخر، على أي شاشة تكون أمامها.',
		},
		summary: {
			en: 'A remembrance reminder that has followed me onto every platform I use: a VS Code extension, a macOS app, a Windows tray app, a standalone Apple Watch app, and a Wear OS watch face companion. Each one is native, offline, and deliberately tiny.',
			ar: 'تذكير بالذِّكر تبعني إلى كل منصة أستخدمها: إضافة VS Code، وتطبيق macOS، وتطبيق شريط مهام لويندوز، وتطبيق مستقل لساعة Apple، ورفيق لساعات Wear OS. كل منها أصلي وبلا اتصال وصغير عمدًا.',
		},
		category: 'desktop',
		status: 'shipped',
		featured: false,
		year: '2023 to 2026',
		role: { en: 'Solo: five platforms', ar: 'منفردًا: خمس منصات' },
		stack: ['JavaScript', 'Swift', 'SwiftUI', 'Kotlin', 'C#', 'WPF'],
		cover: '/projects/azkari-mac.png',
		gallery: [
			'/projects/azkari-mac.png',
			'/projects/azkari-preview.png',
			'/projects/azkari-logo.png',
			'/apps/dhikr-android-icon.png',
		],
		links: {
			vscode:
				'https://marketplace.visualstudio.com/items?itemName=HaithamAssoli.azkari',
			playGoogle:
				'https://play.google.com/store/apps/details?id=com.haithamassoli.dhikr',
			github: 'https://github.com/haithamassoli/Azkari',
			live: 'https://dhikr.assoli.site',
		},
		overview: {
			en: [
				'This started as a VS Code extension: a small notification during a coding session, dismissible with a keystroke, gone by itself after six seconds. It is the most-starred thing I have written, which says something about how many developers wanted exactly that and nothing more.',
			],
			ar: [
				'بدأ هذا إضافةً لـ VS Code: إشعار صغير أثناء جلسة برمجة، يُغلق بضغطة، ويختفي وحده بعد ست ثوانٍ. وهو أكثر ما كتبته نجومًا، وفي ذلك دلالة على عدد المطورين الذين أرادوا هذا بالضبط ولا شيء أكثر.',
			],
		},
		challenges: [],
		outcomes: {
			en: [
				'Published on the VS Code Marketplace and Google Play.',
				'Five native builds: VS Code, macOS, Windows, watchOS, Wear OS.',
			],
			ar: [
				'منشور على متجر VS Code وعلى Google Play.',
				'خمس نسخ أصلية: VS Code وmacOS وويندوز وwatchOS وWear OS.',
			],
		},
		sourced: true,
	},
	{
		slug: 'horizon',
		title: { en: 'Horizon', ar: 'هورايزن' },
		tagline: {
			en: 'Eye breaks that know when you are actually at the computer.',
			ar: 'استراحات للعين تعرف متى تكون أمام الحاسوب فعلًا.',
		},
		summary: {
			en: 'A macOS and Windows desktop app for 20-20-20 eye breaks. What makes it different is that it models presence, tracking idle time, lock state, sleep and wake, and fullscreen suppression, so it does not nag you about a break you were not there to miss.',
			ar: 'تطبيق سطح مكتب لماك وويندوز لاستراحات العين وفق قاعدة 20-20-20. وما يميّزه أنه ينمذج الحضور من وقت خمول وحالة قفل ونوم واستيقاظ وكتم للشاشة الكاملة، فلا يزعجك باستراحة لم تكن موجودًا لتفوّتها.',
		},
		category: 'desktop',
		status: 'wip',
		featured: false,
		year: '2026',
		role: { en: 'Solo', ar: 'منفردًا' },
		stack: [
			'Electron',
			'TypeScript',
			'React',
			'electron-vite',
			'Vitest',
			'Native bridges',
		],
		cover: '',
		gallery: [],
		links: { github: 'https://github.com/haithamassoli/horizon' },
		overview: {
			en: [
				'We blink around 60% less at a screen, and the fix is well known and never remembered: every 20 minutes, look 20 feet away for 20 seconds. The hard part of building the reminder is not the timer.',
			],
			ar: [
				'نرمش أمام الشاشة أقل بنحو 60%، والعلاج معروف ولا يُتذكَّر أبدًا: كل 20 دقيقة، انظر إلى مسافة 20 قدمًا لمدة 20 ثانية. والجزء الصعب في بناء التذكير ليس المؤقّت.',
			],
		},
		challenges: [],
		outcomes: {
			en: [
				'One codebase for macOS and Windows, with native bridges only where required.',
				'Breaks that respect idle, lock, sleep and fullscreen states.',
			],
			ar: [
				'قاعدة شيفرة واحدة لماك وويندوز، مع جسور أصلية عند الضرورة فقط.',
				'استراحات تحترم حالات الخمول والقفل والنوم والشاشة الكاملة.',
			],
		},
		sourced: true,
	},
	{
		slug: 'marafiq-plus',
		title: { en: 'Marafiq Plus', ar: 'مرافق بلس' },
		tagline: {
			en: 'Find every park and public facility in Amman, and report what is broken.',
			ar: 'اعثر على كل حديقة ومرفق عام في عمّان، وأبلغ عمّا هو معطّل.',
		},
		summary: {
			en: 'A map-driven guide to parks and public facilities under Greater Amman Municipality, with search, details and the ability to report issues back to the municipality.',
			ar: 'دليل قائم على الخريطة لحدائق ومرافق أمانة عمّان الكبرى، مع بحث وتفاصيل وإمكانية الإبلاغ عن المشكلات إلى الأمانة.',
		},
		category: 'mobile',
		status: 'shipped',
		featured: false,
		year: '2025',
		role: {
			en: 'Client project: mobile development',
			ar: 'مشروع لعميل: تطوير الموبايل',
		},
		stack: [
			'React Native',
			'Expo Router',
			'TypeScript',
			'Google Maps',
			'Firebase',
			'Zustand',
		],
		cover: '/apps/hadiqa-1.png',
		gallery: [
			'/apps/hadiqa-1.png',
			'/apps/hadiqa-2.png',
			'/apps/hadiqa-3.png',
			'/apps/hadiqa-4.png',
			'/apps/hadiqa-5.png',
			'/apps/hadiqa-6.png',
		],
		links: {
			playGoogle:
				'https://play.google.com/store/apps/details?id=com.haithamassoli.hadiqa',
			github: 'https://github.com/haithamassoli/hadiqa',
		},
		overview: {
			en: [
				'Amman has far more public green space than people use, mostly because nobody knows where it is. The municipality had the data; residents had no way to see it.',
			],
			ar: [
				'في عمّان مساحات خضراء عامة أكثر بكثير مما يستخدمه الناس، والسبب أساسًا أن لا أحد يعرف أين هي. كانت البيانات لدى الأمانة، ولم يكن للسكان سبيل لرؤيتها.',
			],
		},
		challenges: [],
		outcomes: {
			en: [
				'Published on Google Play for Greater Amman Municipality.',
				'Map, search and citizen issue reporting in one app.',
			],
			ar: [
				'منشور على Google Play لأمانة عمّان الكبرى.',
				'خريطة وبحث وإبلاغ المواطنين عن المشكلات في تطبيق واحد.',
			],
		},
		sourced: true,
	},
	{
		slug: 'discover-ajloun',
		title: { en: 'Discover Ajloun', ar: 'اكتشف عجلون' },
		tagline: {
			en: 'Tourism and municipal complaints for Ajloun Governorate, in one app.',
			ar: 'السياحة وشكاوى البلدية لمحافظة عجلون، في تطبيق واحد.',
		},
		summary: {
			en: "A service app for residents and visitors of Ajloun: raise a municipal complaint from home and track its resolution, and browse the governorate's archaeological and tourist sites.",
			ar: 'تطبيق خدمي لسكان عجلون وزوارها: ارفع شكوى بلدية من بيتك وتابع معالجتها، وتصفّح مواقع المحافظة الأثرية والسياحية.',
		},
		category: 'mobile',
		status: 'shipped',
		featured: false,
		year: '2025',
		role: {
			en: 'Client project: mobile development',
			ar: 'مشروع لعميل: تطوير الموبايل',
		},
		stack: [
			'React Native',
			'TypeScript',
			'i18n',
			'Firebase',
			'React Query',
			'Reanimated',
		],
		cover: '/apps/telescope-1.png',
		gallery: [
			'/apps/telescope-1.png',
			'/apps/telescope-2.png',
			'/apps/telescope-3.png',
			'/apps/telescope-4.png',
			'/apps/telescope-5.png',
		],
		links: {
			playGoogle:
				'https://play.google.com/store/apps/details?id=com.haithamassoli.telescope',
		},
		overview: {
			en: [
				'Two audiences in one app: residents who need something fixed, and visitors who want to know what is worth seeing. The municipality wanted both, and separating them into two apps would have meant neither got installed.',
			],
			ar: [
				'جمهوران في تطبيق واحد: سكان يحتاجون إصلاح شيء، وزوّار يريدون معرفة ما يستحق الزيارة. أرادت البلدية الاثنين، وفصلهما في تطبيقين كان سيعني ألا يُثبَّت أيٌّ منهما.',
			],
		},
		challenges: [],
		outcomes: {
			en: [
				'Published on Google Play for Ajloun Governorate.',
				'Municipal complaints with tracked status, plus a heritage site guide.',
			],
			ar: [
				'منشور على Google Play لمحافظة عجلون.',
				'شكاوى بلدية بحالة متتبَّعة، مع دليل للمواقع التراثية.',
			],
		},
		sourced: true,
	},
	{
		slug: 'sawt',
		title: { en: 'Sawt', ar: 'صوت' },
		tagline: {
			en: 'Automating an election, from voting to results.',
			ar: 'أتمتة العملية الانتخابية، من التصويت إلى النتائج.',
		},
		summary: {
			en: 'An app that digitises the election process end to end: voter registration, identity-verified access, casting a vote and announcing results. Built for transparency at every stage.',
			ar: 'تطبيق يُرقمن العملية الانتخابية من طرف إلى طرف: تسجيل الناخبين، والدخول بهوية مُتحقَّق منها، والإدلاء بالصوت، وإعلان النتائج. مبني للشفافية في كل مرحلة.',
		},
		category: 'mobile',
		status: 'shipped',
		featured: false,
		year: '2025',
		role: { en: 'Solo: mobile and backend', ar: 'منفردًا: الموبايل والخادم' },
		stack: [
			'React Native',
			'TypeScript',
			'OTP verification',
			'Firebase',
			'Zustand',
			'React Query',
		],
		cover: '/apps/sawt-1.png',
		gallery: [
			'/apps/sawt-1.png',
			'/apps/sawt-2.png',
			'/apps/sawt-3.png',
			'/apps/sawt-4.png',
			'/apps/sawt-5.png',
			'/apps/sawt-6.png',
		],
		links: {
			playGoogle:
				'https://play.google.com/store/apps/details?id=com.haithamassoli.sawt',
			github: 'https://github.com/haithamassoli/Sawt',
		},
		overview: {
			en: [
				'Voting is the least forgiving thing to build. A bug in a normal app annoys someone; a bug here invalidates a result and the trust that goes with it.',
			],
			ar: [
				'التصويت أقلّ ما يُبنى تسامحًا. فالخلل في تطبيق عادي يزعج شخصًا؛ والخلل هنا يُبطل نتيجة ومعها الثقة.',
			],
		},
		challenges: [],
		outcomes: {
			en: [
				'Published on Google Play.',
				'Identity-verified, one-vote-per-voter enforcement on the server.',
			],
			ar: [
				'منشور على Google Play.',
				'هوية مُتحقَّق منها وفرض صوت واحد لكل ناخب على الخادم.',
			],
		},
		sourced: true,
	},
	{
		slug: 'tawsilah-abshir',
		title: { en: 'Tawsilah Abshir', ar: 'توصيلة ابشر' },
		tagline: {
			en: 'Ride-hailing built for Ajloun, not adapted to it.',
			ar: 'تطبيق توصيل مبني لعجلون، لا مُكيَّف عليها.',
		},
		summary: {
			en: 'A ride service for Ajloun and the surrounding governorates, with vetted drivers who know the area. Built for daily local trips as much as long runs to other governorates.',
			ar: 'خدمة توصيل لعجلون والمحافظات المحيطة، بسائقين معتمدين يعرفون المنطقة. مبنية للمشاوير اليومية المحلية كما للرحلات الطويلة إلى محافظات أخرى.',
		},
		category: 'mobile',
		status: 'shipped',
		featured: false,
		year: '2026',
		role: {
			en: 'Client project: mobile development',
			ar: 'مشروع لعميل: تطوير الموبايل',
		},
		stack: [
			'React Native',
			'Expo',
			'TypeScript',
			'Maps',
			'Push Notifications',
			'React Query',
		],
		cover: '/apps/tawsilah-1.png',
		gallery: [
			'/apps/tawsilah-1.png',
			'/apps/tawsilah-2.png',
			'/apps/tawsilah-3.png',
			'/apps/tawsilah-4.png',
			'/apps/tawsilah-5.png',
		],
		links: {
			playGoogle:
				'https://play.google.com/store/apps/details?id=com.assoliindustries.tawsilah',
			github: 'https://github.com/haithamassoli/tawseel',
		},
		overview: {
			en: [
				'The large ride-hailing apps work in Amman and thin out fast outside it. In a governorate like Ajloun that leaves people back on calling a driver they know, which works until he is busy.',
			],
			ar: [
				'تعمل تطبيقات التوصيل الكبرى في عمّان وتتلاشى بسرعة خارجها. وفي محافظة كعجلون يترك ذلك الناس عائدين إلى الاتصال بسائق يعرفونه، وهو حلّ يصلح حتى ينشغل.',
			],
		},
		challenges: [],
		outcomes: {
			en: [
				'Published on Google Play, serving Ajloun and inter-governorate trips.',
			],
			ar: ['منشور على Google Play، ويخدم عجلون والرحلات بين المحافظات.'],
		},
		sourced: true,
	},
	{
		slug: 'kheir',
		title: { en: 'Kheir', ar: 'خير' },
		tagline: {
			en: 'Donate directly to people in need.',
			ar: 'تبرّع مباشرةً للمحتاجين.',
		},
		summary: {
			en: 'A charity app that connects donors to specific cases in need rather than a general fund, so a giver can see exactly what their donation goes to.',
			ar: 'تطبيق خيري يصل المتبرعين بحالات محتاجة بعينها بدل صندوق عام، فيرى المتبرع تحديدًا أين يذهب تبرعه.',
		},
		category: 'mobile',
		status: 'delisted',
		featured: false,
		year: '2025',
		role: { en: 'Solo: mobile and backend', ar: 'منفردًا: الموبايل والخادم' },
		stack: [
			'React Native',
			'Expo Router',
			'TypeScript',
			'Firebase',
			'Zustand',
			'React Query',
		],
		cover: '/projects/kheir-icon.png',
		gallery: ['/projects/kheir-icon.png'],
		links: { github: 'https://github.com/haithamassoli/kheir' },
		overview: {
			en: [
				'Kheir lists verified cases with what each one actually needs, and a donor picks. The app is no longer listed on Google Play; the source remains available.',
			],
			ar: [
				'يعرض «خير» حالات مُتحقَّقًا منها مع حاجة كل منها فعليًا، فيختار المتبرع. ولم يعد التطبيق مدرجًا على Google Play؛ والشيفرة ما تزال متاحة.',
			],
		},
		challenges: [],
		outcomes: {
			en: [
				'Shipped and previously listed on Google Play; source still available.',
			],
			ar: ['أُطلق وكان مدرجًا سابقًا على Google Play؛ والشيفرة ما تزال متاحة.'],
		},
		sourced: false,
	},
	{
		slug: 'halal-camera',
		title: { en: 'Halal Camera', ar: 'كاميرا حلال' },
		tagline: {
			en: 'A camera that blurs faces the moment you shoot.',
			ar: 'كاميرا تُشوّش الوجوه لحظة التقاط الصورة.',
		},
		summary: {
			en: 'A camera app that automatically detects and blurs faces immediately after capture, for people who want to photograph a place or an event without photographing the people in it. Built natively for both Android and iOS.',
			ar: 'تطبيق كاميرا يكتشف الوجوه ويُشوّشها تلقائيًا فور الالتقاط، لمن يريد تصوير مكان أو مناسبة دون تصوير من فيها. مبني أصليًا لأندرويد وiOS.',
		},
		category: 'ai',
		status: 'shipped',
		featured: false,
		year: '2025',
		role: { en: 'Solo: both platforms', ar: 'منفردًا: المنصتان' },
		stack: [
			'Kotlin',
			'Swift',
			'On-device face detection',
			'CameraX',
			'AVFoundation',
		],
		cover: '/apps/halalcamera-1.png',
		gallery: ['/apps/halalcamera-1.png'],
		links: {
			playGoogle:
				'https://play.google.com/store/apps/details?id=com.haithamassoli.halalcamera',
			github: 'https://github.com/haithamassoli/halal-camera-anidroid',
		},
		overview: {
			en: [
				'Photographing a wedding hall, a classroom or a family gathering means capturing faces that should not be captured. Editing them out afterwards means the unblurred original existed, was stored, and possibly synced to a cloud backup before you got to it.',
			],
			ar: [
				'تصوير قاعة عرس أو صف دراسي أو تجمّع عائلي يعني التقاط وجوه لا ينبغي التقاطها. وحذفها لاحقًا يعني أن الأصل غير المشوَّش قد وُجد وخُزّن وربما رُفع إلى نسخة سحابية قبل أن تصل إليه.',
			],
		},
		challenges: [],
		outcomes: {
			en: [
				'Published on Google Play, with a native iOS counterpart.',
				'Blurring applied before the file is written to storage.',
			],
			ar: [
				'منشور على Google Play، مع نظير أصلي لـ iOS.',
				'يُطبَّق التشويش قبل كتابة الملف إلى التخزين.',
			],
		},
		sourced: true,
	},
	{
		slug: 'hirfati',
		title: { en: 'Hirfati', ar: 'حرفتي' },
		tagline: {
			en: 'Find a trusted tradesperson in Jordan and get free quotes.',
			ar: 'اعثر على حرفي موثوق في الأردن واحصل على عروض أسعار مجانية.',
		},
		summary: {
			en: 'A marketplace for skilled trades across Jordan: plumbing, electrical, carpentry, metalwork, painting, air conditioning, tiling and general maintenance. Describe the job, receive quotes, choose.',
			ar: 'سوق للحرف المهنية في الأردن: سباكة وكهرباء ونجارة وحدادة ودهان وتكييف وبلاط وصيانة عامة. صِف العمل، واستقبل العروض، واختر.',
		},
		category: 'web',
		status: 'live',
		featured: false,
		year: '2026',
		role: { en: 'Solo', ar: 'منفردًا' },
		stack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'SEO', 'RTL'],
		cover: '/projects/hirfati.png',
		gallery: ['/projects/hirfati.png'],
		links: {
			live: 'https://hirfati-jo.vercel.app',
			github: 'https://github.com/haithamassoli/hirfati',
		},
		overview: {
			en: [
				'Hirfati puts the job first: describe what needs doing, and tradespeople quote for it. The comparison happens before anyone shows up.',
			],
			ar: [
				'يضع «حرفتي» العمل أولًا: صِف ما ينبغي عمله، فيقدّم الحرفيون عروضهم. وتقع المقارنة قبل أن يحضر أحد.',
			],
		},
		challenges: [],
		outcomes: {
			en: [
				'Live and indexed by trade and governorate across Jordan.',
				'Free quote requests without an account.',
			],
			ar: [
				'مباشر ومُفهرس حسب الحرفة والمحافظة في الأردن.',
				'طلبات عروض أسعار مجانية بلا حساب.',
			],
		},
		sourced: false,
	},
	{
		slug: 'hadanati',
		title: { en: 'Hadanati', ar: 'حضانتي' },
		tagline: {
			en: 'Run a nursery: attendance, assessments, fees and a parent portal.',
			ar: 'إدارة حضانة: حضور وتقييمات ورسوم وبوابة لأولياء الأمور.',
		},
		summary: {
			en: "An Arabic platform for nurseries in Jordan covering daily attendance, child assessments, fee tracking and a portal that lets parents see their child's day without phoning the nursery.",
			ar: 'منصة عربية لحضانات الأردن تغطي الحضور اليومي وتقييمات الأطفال ومتابعة الرسوم، وبوابة تُطلع أولياء الأمور على يوم أطفالهم دون الاتصال بالحضانة.',
		},
		category: 'web',
		status: 'live',
		featured: false,
		year: '2026',
		role: { en: 'Solo', ar: 'منفردًا' },
		stack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'RTL'],
		cover: '/projects/hadanati.png',
		gallery: ['/projects/hadanati.png'],
		links: {
			live: 'https://hadanati.assoli.site',
			github: 'https://github.com/haithamassoli/hadanati',
		},
		overview: {
			en: [
				"Hadanati replaces the three of them with one system: attendance, assessments and fees on the staff side, and a parent portal on the other, so the answer to 'how was he today' does not require a phone call.",
			],
			ar: [
				'تستبدل «حضانتي» الثلاثة بنظام واحد: حضور وتقييمات ورسوم من جهة الطاقم، وبوابة لأولياء الأمور من الجهة الأخرى، فلا يحتاج جواب «كيف كان اليوم» إلى مكالمة.',
			],
		},
		challenges: [],
		outcomes: {
			en: [
				'Attendance, assessments, fees and a parent portal in one Arabic-first platform.',
			],
			ar: ['حضور وتقييمات ورسوم وبوابة أولياء أمور في منصة عربية أولًا.'],
		},
		sourced: false,
	},
	{
		slug: 'ghurza',
		title: { en: 'Ghurza', ar: 'غُرزة' },
		tagline: {
			en: 'Learn crochet in Arabic, from the first stitch upward.',
			ar: 'تعلّم الكروشيه بالعربية، من أول غرزة صعودًا.',
		},
		summary: {
			en: 'A complete Arabic learning path for crochet: ordered lessons from the very first stitch through to advanced work, plus references for yarns, hooks and tools, and a curated set of the best Arabic and international sources.',
			ar: 'مسار تعلّم عربي متكامل للكروشيه: دروس مرتّبة من أول غرزة حتى الأعمال المتقدمة، مع مراجع للخيوط والإبر والأدوات، ومجموعة منتقاة من أفضل المصادر العربية والعالمية.',
		},
		category: 'web',
		status: 'live',
		featured: false,
		year: '2026',
		role: {
			en: 'Solo: content structure and build',
			ar: 'منفردًا: بنية المحتوى والتطوير',
		},
		stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'RTL', 'SEO'],
		cover: '/projects/crochet.png',
		gallery: ['/projects/crochet.png'],
		links: {
			live: 'https://crochet.assoli.site',
			github: 'https://github.com/haithamassoli/crochet',
		},
		overview: {
			en: [
				'This is the missing structure: a single ordered path where each lesson assumes only what came before it, with the reference material a learner keeps needing, like yarn weights, hook sizes and tools, kept separate from the path itself.',
			],
			ar: [
				'هذه هي البنية الناقصة: مسار واحد مرتّب يفترض كل درس فيه ما سبقه فقط، مع إبقاء المادة المرجعية التي يظل المتعلم يحتاجها، كأوزان الخيوط ومقاسات الإبر والأدوات، منفصلة عن المسار نفسه.',
			],
		},
		challenges: [],
		outcomes: {
			en: [
				'An ordered Arabic curriculum with separate tool and material references.',
			],
			ar: ['منهج عربي مرتّب مع مراجع منفصلة للأدوات والخامات.'],
		},
		sourced: false,
	},
	{
		slug: 'service',
		title: { en: 'Service', ar: 'سيرفيس' },
		tagline: {
			en: "Post a trip or book a seat between Jordan's governorates.",
			ar: 'انشر رحلتك أو احجز مقعدك بين محافظات الأردن.',
		},
		summary: {
			en: 'Intercity ride sharing for Jordan: Amman, Irbid, Zarqa, Aqaba and everywhere else. Drivers post the trip they are already making; passengers book a seat on it.',
			ar: 'مشاركة رحلات بين مدن الأردن: عمّان وإربد والزرقاء والعقبة وسائر المحافظات. ينشر السائقون الرحلة التي سيقومون بها أصلًا، ويحجز الركاب مقعدًا فيها.',
		},
		category: 'web',
		status: 'live',
		featured: false,
		year: '2026',
		role: { en: 'Solo', ar: 'منفردًا' },
		stack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'RTL'],
		cover: '/projects/sarfees.png',
		gallery: ['/projects/sarfees.png'],
		links: {
			live: 'https://sarfees.vercel.app',
			github: 'https://github.com/haithamassoli/sarfees',
		},
		overview: {
			en: [
				'This moves the matching online: a driver posts the trip they are making anyway, passengers book seats on it, and both sides know the departure before anyone leaves the house.',
			],
			ar: [
				'ينقل هذا المطابقة إلى الإنترنت: ينشر السائق الرحلة التي سيقوم بها على أي حال، ويحجز الركاب مقاعد فيها، ويعرف الطرفان موعد الانطلاق قبل أن يغادر أحد بيته.',
			],
		},
		challenges: [],
		outcomes: {
			en: ['Trip posting and seat booking across all Jordanian governorates.'],
			ar: ['نشر الرحلات وحجز المقاعد في كل محافظات الأردن.'],
		},
		sourced: false,
	},
	{
		slug: 'hijabk',
		title: { en: 'Hijabk', ar: 'حجابك' },
		tagline: {
			en: 'A Jordanian atelier for khimars and abayas, ordered over WhatsApp.',
			ar: 'مشغل أردني للخُمُر والعبايات، الطلب عبر واتساب.',
		},
		summary: {
			en: 'A storefront for a workshop in Amman making khimars, veils and abayas from Korean and Turkish fabrics. Orders go through WhatsApp, payment is cash on delivery, and shipping covers every governorate.',
			ar: 'واجهة متجر لمشغل في عمّان يخيط الخُمُر والطُرَح والنُقُب والعبايات من أقمشة كورية وتركية. الطلب عبر واتساب، والدفع عند الاستلام، والتوصيل لكل المحافظات.',
		},
		category: 'web',
		status: 'live',
		featured: false,
		year: '2026',
		role: { en: 'Solo', ar: 'منفردًا' },
		stack: [
			'Next.js',
			'TypeScript',
			'Tailwind CSS',
			'RTL',
			'SEO',
			'WhatsApp ordering',
		],
		cover: '/projects/7jabk.png',
		gallery: ['/projects/7jabk.png'],
		links: {
			live: 'https://7jabk.vercel.app',
			github: 'https://github.com/haithamassoli/7jabk',
		},
		overview: {
			en: [
				'The site gives the catalogue a permanent home while leaving the ordering exactly where the customer is already comfortable. A tap opens WhatsApp with the item pre-filled, so nothing about the sales process had to change.',
			],
			ar: [
				'يمنح الموقع الكتالوج بيتًا دائمًا مع إبقاء الطلب حيث يرتاح الزبون أصلًا. نقرة تفتح واتساب والمنتج مُعبّأ مسبقًا، فلم يتغيّر شيء في عملية البيع.',
			],
		},
		challenges: [],
		outcomes: {
			en: [
				'A browsable catalogue feeding WhatsApp orders, with delivery across Jordan.',
			],
			ar: ['كتالوج قابل للتصفح يغذّي طلبات واتساب، مع توصيل لكل الأردن.'],
		},
		sourced: false,
	},
	{
		slug: 'al-manal',
		title: { en: 'Al-Manal', ar: 'المنال' },
		tagline: {
			en: 'Find a substitute teacher before the bell rings.',
			ar: 'اعثر على معلّم بديل قبل أن يرنّ الجرس.',
		},
		summary: {
			en: 'A smart school system for managing teachers, timetables, substitutes, period swaps and task follow-up. Its core job is answering, instantly, who can cover a class when a teacher is absent.',
			ar: 'نظام مدرسي ذكي لإدارة المعلمين والجداول والبدلاء وتبديل الحصص ومتابعة المهام. ومهمته الأساسية أن يجيب فورًا: من يستطيع تغطية حصة عند غياب معلّم.',
		},
		category: 'web',
		status: 'live',
		featured: false,
		year: '2025',
		role: { en: 'Solo', ar: 'منفردًا' },
		stack: ['JavaScript', 'Next.js', 'Scheduling logic', 'RTL'],
		cover: '/projects/substitution-finder.png',
		gallery: ['/projects/substitution-finder.png'],
		links: {
			live: 'https://school-teacher-substitution-finder.vercel.app',
			github:
				'https://github.com/haithamassoli/School-Teacher-Substitution-Finder',
		},
		overview: {
			en: [
				'Al-Manal does that search instantly: given the timetable and who is absent, it produces the teachers who are genuinely free for that period, so the decision is a choice rather than a scramble.',
			],
			ar: [
				'يُجري «المنال» ذلك البحث فورًا: من الجدول ومن قائمة الغياب، يُخرج المعلمين المتفرغين فعلًا لتلك الحصة، فيصير القرار اختيارًا لا سباقًا.',
			],
		},
		challenges: [],
		outcomes: {
			en: ['Timetable, substitute cover and task follow-up for a school.'],
			ar: ['جدول الحصص وتغطية الغياب ومتابعة المهام لمدرسة.'],
		},
		sourced: false,
	},
	{
		slug: 'telestream',
		title: { en: 'TeleStream & FeedGram', ar: 'تيليستريم وفيدجرام' },
		tagline: {
			en: 'Read public Telegram channels as one clean timeline.',
			ar: 'اقرأ قنوات تيليجرام العامة كخط زمني واحد نظيف.',
		},
		summary: {
			en: 'Two takes on the same idea: aggregate posts from public Telegram channels into a single unified feed you can read in a browser, without the app and without joining anything.',
			ar: 'مقاربتان للفكرة نفسها: تجميع منشورات قنوات تيليجرام العامة في خط زمني موحّد تقرأه في المتصفح، بلا تطبيق وبلا انضمام إلى شيء.',
		},
		category: 'web',
		status: 'live',
		featured: false,
		year: '2026',
		role: { en: 'Solo', ar: 'منفردًا' },
		stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
		cover: '/projects/telegram-feed.png',
		gallery: ['/projects/telegram-feed.png', '/projects/feed-gram.png'],
		links: {
			live: 'https://tele-timeline.vercel.app',
			github: 'https://github.com/haithamassoli/telegram-feed',
		},
		overview: {
			en: [
				'These aggregate public channels into one chronological feed in the browser, a reader rather than a client. FeedGram is the second pass at the same problem.',
			],
			ar: [
				'يجمع هذان قنوات عامة في خط زمني واحد مرتّب زمنيًا داخل المتصفح، قارئ لا عميل. وFeedGram هو المحاولة الثانية للمشكلة نفسها.',
			],
		},
		challenges: [],
		outcomes: {
			en: ['A unified, credential-free reader for public Telegram channels.'],
			ar: ['قارئ موحّد بلا بيانات اعتماد لقنوات تيليجرام العامة.'],
		},
		sourced: false,
	},
	{
		slug: 'wedding-invitation',
		title: { en: 'Wedding Invitation', ar: 'دعوة زفاف' },
		tagline: {
			en: 'A wedding invitation that lives at a link.',
			ar: 'دعوة زفاف تسكن رابطًا.',
		},
		summary: {
			en: 'A digital wedding invitation with details, location, countdown and RSVP, sent as a link instead of printed and delivered by hand.',
			ar: 'دعوة زفاف رقمية فيها التفاصيل والموقع وعدّاد تنازلي وتأكيد حضور، تُرسل كرابط بدل الطباعة والتسليم باليد.',
		},
		category: 'web',
		status: 'live',
		featured: false,
		year: '2026',
		role: { en: 'Solo', ar: 'منفردًا' },
		stack: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'RTL'],
		cover: '/projects/wedding-invitation.png',
		gallery: ['/projects/wedding-invitation.png'],
		links: {
			live: 'https://h-wedding.assoli.site',
			github: 'https://github.com/haithamassoli/wedding-invitation',
		},
		overview: {
			en: [
				'This is the link version: the details, the venue on a map, a countdown, and an RSVP that gives the couple a live number instead of an estimate.',
			],
			ar: [
				'هذه نسخة الرابط: التفاصيل، والقاعة على خريطة، وعدّاد تنازلي، وتأكيد حضور يعطي العروسين رقمًا حيًّا بدل تقدير.',
			],
		},
		challenges: [],
		outcomes: {
			en: ['Shareable invitation with map, countdown and live RSVP counts.'],
			ar: [
				'دعوة قابلة للمشاركة مع خريطة وعدّاد تنازلي وأعداد تأكيد حضور حيّة.',
			],
		},
		sourced: false,
	},
	{
		slug: 'almadrsa',
		title: { en: 'Almadrsa', ar: 'المدرسة' },
		tagline: {
			en: 'An e-learning platform for schools.',
			ar: 'منصة تعليم إلكتروني للمدارس.',
		},
		summary: {
			en: "An online school platform bringing courses, materials and student progress into one place for a school's teachers and students.",
			ar: 'منصة مدرسية إلكترونية تجمع المساقات والمواد وتقدّم الطلاب في مكان واحد لمعلمي المدرسة وطلابها.',
		},
		category: 'web',
		status: 'live',
		featured: false,
		year: '2026',
		role: { en: 'Solo', ar: 'منفردًا' },
		stack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'RTL'],
		cover: '/projects/almadrsa.png',
		gallery: ['/projects/almadrsa.png'],
		links: {
			live: 'https://almadrsa.vercel.app',
			github: 'https://github.com/haithamassoli/almadrsa',
		},
		overview: {
			en: [
				'Almadrsa gives the same activity a structure that outlasts the term: courses hold their material, students have progress, and nothing depends on somebody still being in the right group chat.',
			],
			ar: [
				'تمنح «المدرسة» النشاط نفسه بنيةً تدوم بعد الفصل: تحتفظ المساقات بموادها، وللطلاب تقدّم، ولا يعتمد شيء على بقاء أحدهم في المجموعة الصحيحة.',
			],
		},
		challenges: [],
		outcomes: {
			en: [
				'Courses, materials and student progress in one Arabic-first platform.',
			],
			ar: ['مساقات ومواد وتقدّم الطلاب في منصة عربية أولًا.'],
		},
		sourced: false,
	},
	{
		slug: 'hafiz-platform',
		title: { en: 'Hafiz Platform', ar: 'منصة حافظ' },
		tagline: {
			en: 'An escrow-style platform that protects both sides of a sale.',
			ar: 'منصة وساطة تحفظ حقوق طرفَي البيع.',
		},
		summary: {
			en: 'A platform where a seller registers, is connected to a customer, and the rights of both parties are preserved through the transaction rather than depending on trust between strangers.',
			ar: 'منصة يسجّل فيها البائع فيُوصَل بالزبون، وتُحفَظ حقوق الطرفين خلال الصفقة بدل الاعتماد على ثقة بين غريبين.',
		},
		category: 'web',
		status: 'live',
		featured: false,
		year: '2024',
		role: { en: 'Solo', ar: 'منفردًا' },
		stack: [
			'Next.js',
			'TypeScript',
			'Server Components',
			'Server Actions',
			'Zod',
			'Tailwind CSS',
		],
		cover: '/projects/hafiz-platform.png',
		gallery: ['/projects/hafiz-platform.png'],
		links: { live: 'https://hafiz-platform.netlify.app' },
		overview: {
			en: [
				'Hafiz sits between them so neither has to. The platform holds the transaction and releases it when both obligations are met, which turns a trust problem into a process.',
			],
			ar: [
				'تقف «حافظ» بينهما فلا يضطر أيٌّ منهما. تُمسك المنصة بالصفقة وتُفرج عنها عند استيفاء الالتزامين، فتتحول مشكلة ثقة إلى إجراء.',
			],
		},
		challenges: [],
		outcomes: {
			en: [
				'A mediated seller-to-buyer transaction flow, validated on the server.',
			],
			ar: [
				'مسار معاملة بين بائع ومشترٍ بوساطة المنصة، مُتحقَّق منه على الخادم.',
			],
		},
		sourced: false,
	},
	{
		slug: 'nomusic',
		title: { en: 'nomusic', ar: 'بلا موسيقى' },
		tagline: {
			en: 'Watch YouTube and Facebook videos without the music.',
			ar: 'شاهد فيديوهات يوتيوب وفيسبوك بلا موسيقى.',
		},
		summary: {
			en: 'A free tool that strips music from videos on YouTube, Facebook and other sites while dialogue, narration and other sound keep playing, running against a local audio-separation backend on your own machine.',
			ar: 'أداة مجانية تزيل الموسيقى من فيديوهات يوتيوب وفيسبوك ومواقع أخرى مع استمرار الحوار والسرد وبقية الأصوات، وتعمل مقابل خادم فصل صوتي محلي على جهازك.',
		},
		category: 'ai',
		status: 'live',
		featured: false,
		year: '2026',
		role: { en: 'Contributor', ar: 'مساهم' },
		stack: [
			'Python',
			'Audio source separation',
			'Apple Silicon / MPS',
			'CUDA',
			'yt-dlp',
		],
		cover: '/projects/nomusic-logo.png',
		gallery: ['/projects/nomusic-logo.png'],
		links: { github: 'https://github.com/haithamassoli/nomusic' },
		overview: {
			en: [
				'Made for people who avoid music for religious or personal reasons, and who currently have to choose between skipping useful content entirely or muting it and losing the speech too.',
			],
			ar: [
				'صُنع لمن يتجنبون الموسيقى لأسباب دينية أو شخصية، ويضطرون حاليًا للاختيار بين تفويت محتوى نافع كليًا أو كتمه وخسارة الكلام معه.',
			],
		},
		challenges: [],
		outcomes: {
			en: [
				'Local-only music removal for streaming video, with Mac and Linux paths documented for non-technical users.',
			],
			ar: [
				'إزالة موسيقى محلية بالكامل لفيديو البث، مع مسارات موثّقة لماك ولينكس لغير التقنيين.',
			],
		},
		sourced: true,
	},
	{
		slug: 'cohere-transcribe',
		title: { en: 'cohere-transcribe', ar: 'cohere-transcribe' },
		tagline: {
			en: 'High-throughput Arabic/English transcription, batched properly.',
			ar: 'تفريغ عربي/إنجليزي عالي الإنتاجية، بمعالجة دفعية سليمة.',
		},
		summary: {
			en: "A Python package for offline batch transcription with Cohere's 2B Arabic/English ASR model: optimised voice activity detection, multi-file GPU batching under bounded memory, subtitle output and optional word-level timestamps.",
			ar: 'حزمة بايثون للتفريغ الدفعي دون اتصال بنموذج Cohere للتعرف على الكلام بحجم ملياري معامل للعربية والإنجليزية: كشف نشاط صوتي محسّن، ومعالجة دفعية لملفات متعددة على المعالج الرسومي بذاكرة محدودة، وإخراج ترجمات وطوابع زمنية اختيارية على مستوى الكلمة.',
		},
		category: 'ai',
		status: 'live',
		featured: false,
		year: '2026',
		role: { en: 'Contributor', ar: 'مساهم' },
		stack: [
			'Python',
			'Silero VAD',
			'GPU batching',
			'SRT / VTT',
			'Hugging Face',
		],
		cover: '',
		gallery: [],
		links: { github: 'https://github.com/AliOsm/cohere-transcribe' },
		overview: {
			en: [
				'Transcribing one file is a solved problem. Transcribing a directory of hundreds without running out of GPU memory, and without spending most of the run on silence, is not.',
			],
			ar: [
				'تفريغ ملف واحد مسألة محلولة. أما تفريغ مجلد فيه مئات الملفات دون نفاد ذاكرة المعالج الرسومي، ودون إنفاق معظم زمن التشغيل على الصمت، فليس كذلك.',
			],
		},
		challenges: [],
		outcomes: {
			en: [
				'Directory-scale batch transcription with bounded memory and subtitle output.',
			],
			ar: ['تفريغ دفعي على مستوى المجلدات بذاكرة محدودة وإخراج ترجمات.'],
		},
		sourced: true,
	},
	{
		slug: 't3-code',
		title: { en: 'T3 Code', ar: 'T3 Code' },
		tagline: {
			en: 'Control the coding agents on your machine, from anywhere.',
			ar: 'تحكّم بوكلاء البرمجة على جهازك، من أي مكان.',
		},
		summary: {
			en: 'A control panel for coding agents: a mobile, web and Electron desktop app for driving the agents running on your own computer. Works with Claude Code, Codex, Cursor, Grok and OpenCode.',
			ar: 'لوحة تحكم بوكلاء البرمجة: تطبيق موبايل وويب وسطح مكتب بـ Electron لقيادة الوكلاء العاملين على حاسوبك. يعمل مع Claude Code وCodex وCursor وGrok وOpenCode.',
		},
		category: 'client',
		status: 'live',
		featured: false,
		year: '2026',
		role: { en: 'Contributor', ar: 'مساهم' },
		stack: ['TypeScript', 'React', 'React Native', 'Electron'],
		cover: '/projects/t3code.png',
		gallery: [
			'/projects/t3code.png',
			'/apps/t3code-1.png',
			'/apps/t3code-2.png',
			'/apps/t3code-3.png',
		],
		links: {
			live: 'https://t3.codes',
			appStore: 'https://apps.apple.com/us/app/id6787819824',
			playGoogle:
				'https://play.google.com/store/apps/details?id=com.t3tools.t3code',
			github: 'https://github.com/haithamassoli/t3code',
		},
		overview: {
			en: [
				'Coding agents run on your machine, which means you are tied to that machine while they work. T3 Code separates the agent from the desk: kick off runs, browse files, review diffs, use the terminal and do version control from a phone.',
			],
			ar: [
				'يعمل وكلاء البرمجة على جهازك، ما يعني ارتباطك بذلك الجهاز أثناء عملهم. يفصل T3 Code الوكيل عن المكتب: ابدأ التشغيل، وتصفّح الملفات، وراجع الفروق، واستخدم الطرفية، وأدِر الإصدارات من هاتفك.',
			],
		},
		challenges: [],
		outcomes: {
			en: [
				'Shipped on iOS, Android, web and desktop.',
				'Works across Claude Code, Codex, Cursor, Grok and OpenCode.',
			],
			ar: [
				'أُطلق على iOS وأندرويد والويب وسطح المكتب.',
				'يعمل عبر Claude Code وCodex وCursor وGrok وOpenCode.',
			],
		},
		sourced: true,
	},
	{
		slug: 'recruiter-connector',
		title: { en: 'Recruiter Connector', ar: 'Recruiter Connector' },
		tagline: {
			en: 'A marketplace where recruiters trade candidate profiles.',
			ar: 'سوق يتبادل فيه المُوظِّفون ملفات المرشحين.',
		},
		summary: {
			en: 'A platform built exclusively for recruiters: list and discover verified candidate profiles, chat directly with other recruiters, and turn connections into revenue.',
			ar: 'منصة مبنية حصرًا للمُوظِّفين: اعرض واكتشف ملفات مرشحين مُتحقَّقًا منها، وتحدّث مباشرة مع مُوظِّفين آخرين، وحوّل الاتصالات إلى دخل.',
		},
		category: 'client',
		status: 'shipped',
		featured: false,
		year: '2025',
		role: {
			en: 'Client project: mobile development',
			ar: 'مشروع لعميل: تطوير الموبايل',
		},
		stack: [
			'React Native',
			'TypeScript',
			'Real-time chat',
			'Push Notifications',
		],
		cover: '/apps/ofi-recruiter-1.png',
		gallery: [
			'/apps/ofi-recruiter-1.png',
			'/apps/ofi-recruiter-2.png',
			'/apps/ofi-recruiter-3.png',
			'/apps/ofi-recruiter-4.png',
		],
		links: {
			playGoogle:
				'https://play.google.com/store/apps/details?id=com.ofi.recruiter_new',
		},
		overview: {
			en: [
				"Recruiters routinely have a strong candidate who is wrong for their role and right for someone else's. That value currently evaporates in private conversations, or does not move at all.",
			],
			ar: [
				'لدى المُوظِّفين باستمرار مرشح قوي لا يناسب وظيفتهم ويناسب وظيفة غيرهم. وتتبخر تلك القيمة اليوم في محادثات خاصة، أو لا تتحرك إطلاقًا.',
			],
		},
		challenges: [],
		outcomes: {
			en: [
				'Published on Google Play with a candidate marketplace and built-in recruiter chat.',
			],
			ar: [
				'منشور على Google Play مع سوق للمرشحين ومحادثة مدمجة بين المُوظِّفين.',
			],
		},
		sourced: true,
	},
	{
		slug: 'personal-sites',
		title: {
			en: 'assoli.site & cv.assoli.site',
			ar: 'assoli.site وcv.assoli.site',
		},
		tagline: {
			en: 'My portfolio and my web résumé.',
			ar: 'معرض أعمالي وسيرتي الذاتية على الويب.',
		},
		summary: {
			en: 'The previous portfolio and the standalone web résumé: an animated single-page portfolio with a command menu, and a print-friendly CV with a keyboard-driven interface.',
			ar: 'معرض الأعمال السابق والسيرة الذاتية المستقلة على الويب: معرض أعمال أحادي الصفحة متحرك بقائمة أوامر، وسيرة ذاتية صالحة للطباعة بواجهة تُدار من لوحة المفاتيح.',
		},
		category: 'web',
		status: 'live',
		featured: false,
		year: '2026',
		role: { en: 'Solo', ar: 'منفردًا' },
		stack: [
			'Next.js',
			'TypeScript',
			'React',
			'Framer Motion',
			'Tailwind CSS',
			'SEO',
		],
		cover: '/projects/cv.png',
		gallery: ['/projects/cv.png', '/projects/portfolio-old.png'],
		links: {
			live: 'https://assoli.site',
			github: 'https://github.com/haithamassoli/nextjs-portfolio',
		},
		overview: {
			en: [
				'Two separate sites doing two different jobs. The portfolio is the pitch, animated, opinionated, built to be looked at. The résumé is the reference, dense, scannable, and something a recruiter can print.',
			],
			ar: [
				'موقعان منفصلان يؤديان مهمتين مختلفتين. المعرض هو العرض التقديمي، متحرك وذو رأي ومبني ليُنظر إليه. والسيرة هي المرجع، كثيفة وسهلة المسح، ويستطيع مسؤول التوظيف طباعتها.',
			],
		},
		challenges: [],
		outcomes: {
			en: [
				'A motion-led portfolio and a separate, printable web résumé.',
				'Now being replaced by this bilingual rebuild.',
			],
			ar: [
				'معرض أعمال تقوده الحركة وسيرة ذاتية منفصلة قابلة للطباعة.',
				'ويجري الآن استبدالهما بهذه النسخة ثنائية اللغة.',
			],
		},
		sourced: true,
	},
	{
		slug: 'tafrigh',
		title: { en: 'Tafrigh', ar: 'تفريغ' },
		tagline: {
			en: 'Transcribe Arabic audio and generate SRT and VTT subtitles.',
			ar: 'تفريغ النصوص العربية وإنشاء ملفات SRT وVTT.',
		},
		summary: {
			en: 'A transcription tool that turns Arabic audio into text and timed subtitle files using Whisper models and wit.ai. Widely used for making Arabic lectures and books searchable.',
			ar: 'أداة تفريغ تحوّل الصوت العربي إلى نص وملفات ترجمة موقوتة باستخدام نماذج Whisper وتقنية wit.ai. تُستخدم على نطاق واسع لجعل المحاضرات والكتب العربية قابلة للبحث.',
		},
		category: 'ai',
		status: 'live',
		featured: false,
		year: '2026',
		role: { en: 'Contributor', ar: 'مساهم' },
		stack: ['Python', 'Whisper', 'wit.ai', 'SRT / VTT'],
		cover: '/projects/tafrigh.png',
		gallery: ['/projects/tafrigh.png'],
		links: {
			live: 'https://tafrigh.ieasybooks.com',
			github: 'https://github.com/haithamassoli/tafrigh',
		},
		overview: {
			en: [
				'Arabic speech is under-served by transcription tooling, and the material that most needs it, lectures, lessons, recorded books, is exactly the material nobody has budget to transcribe by hand.',
			],
			ar: [
				'الكلام العربي ضعيف الحظ من أدوات التفريغ، والمادة التي تحتاجه أكثر، المحاضرات والدروس والكتب المسجلة، هي بالضبط المادة التي لا ميزانية لتفريغها يدويًا.',
			],
		},
		challenges: [],
		outcomes: {
			en: ['Plain text plus timed SRT/VTT output for Arabic audio.'],
			ar: ['نص عادي مع مخرج SRT/VTT موقوت للصوت العربي.'],
		},
		sourced: true,
	},
	{
		slug: 'web-archive-fetcher',
		title: { en: 'Web Archive Data Fetcher', ar: 'جالب بيانات أرشيف الويب' },
		tagline: {
			en: 'Recover pages that are no longer online.',
			ar: 'استرجاع صفحات لم تعد على الإنترنت.',
		},
		summary: {
			en: 'A tool for pulling archived snapshots of a site out of the Wayback Machine and extracting structured data from them, built to recover content from a site that had gone offline.',
			ar: 'أداة لسحب اللقطات المؤرشفة لموقع من Wayback Machine واستخراج بيانات منظّمة منها، بُنيت لاسترجاع محتوى موقع توقّف عن العمل.',
		},
		category: 'web',
		status: 'live',
		featured: false,
		year: '2025',
		role: { en: 'Solo', ar: 'منفردًا' },
		stack: ['Next.js', 'TypeScript', 'Wayback Machine API', 'HTML parsing'],
		cover: '/projects/shahed-abu-hussein.png',
		gallery: ['/projects/shahed-abu-hussein.png'],
		links: { live: 'https://shahed-abu-hussein.vercel.app' },
		overview: {
			en: [
				"This walks the archive's index for a domain, fetches the snapshots, and extracts the structured content out of them, turning a scattered archive back into usable data.",
			],
			ar: [
				'تمرّ هذه الأداة على فهرس الأرشيف لنطاق ما، وتجلب اللقطات، وتستخرج المحتوى المنظّم منها، فتعيد أرشيفًا متناثرًا إلى بيانات قابلة للاستخدام.',
			],
		},
		challenges: [],
		outcomes: {
			en: [
				'Recovered structured content from an offline site via archived snapshots.',
			],
			ar: ['استرجاع محتوى منظّم من موقع متوقف عبر لقطات مؤرشفة.'],
		},
		sourced: false,
	},
];
