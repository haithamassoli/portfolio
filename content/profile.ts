import type {
	Certification,
	EducationItem,
	ExperienceItem,
	I18n,
	I18nBlocks,
} from './types';

export const profile = {
	name: {
		en: 'Haitham Assoli',
		ar: 'هيثم العسولي',
	} satisfies I18n,

	title: {
		en: 'Web & Mobile Full-Stack Developer',
		ar: 'مطوّر ويب وتطبيقات موبايل full-stack',
	} satisfies I18n,

	tagline: {
		en: 'I build Arabic-first web and mobile products, from the data model to the interface.',
		ar: 'أبني منتجات ويب وجوال تبدأ بالعربية، من نموذج البيانات حتى الواجهة.',
	} satisfies I18n,

	location: { en: 'Amman, Jordan', ar: 'عمّان، الأردن' } satisfies I18n,

	email: 'haitham.b.assoli@gmail.com',
	phone: '+962 77 619 3666',

	links: {
		github: 'https://github.com/haithamassoli',
		linkedin: 'https://www.linkedin.com/in/haithamassoli/',
		website: 'https://assoli.site',
		resume: 'https://cv.assoli.site',
		playStore: 'https://play.google.com/store/apps/dev?id=6385259170030268414',
	},

	about: {
		en: [
			'I work across the stack: React Native apps on Google Play and the App Store, Next.js and Astro on the web, and the Node, NestJS and Convex services behind them. Most of it ships in Arabic and English, right-to-left first.',
			'The problems that keep coming back are Arabic search that tolerates how people actually type, booking logic that will not sell the same slot twice, reads that survive campus Wi-Fi dropping mid-lecture, and inference that runs on the device so video and audio never leave it.',
		],
		ar: [
			'أعمل على المنظومة كاملة: تطبيقات React Native على متجري جوجل وآبل، وتطبيقات Next.js وAstro على الويب، وخدمات Node وNestJS وConvex خلفها. ومعظمها يصدر بالعربية والإنجليزية، وبالاتجاه من اليمين إلى اليسار أولًا.',
			'المشكلات التي تتكرر: بحث عربي يحتمل طريقة الكتابة الفعلية، ومنطق حجز لا يبيع الموعد نفسه مرتين، وقراءة تصمد أمام انقطاع شبكة الجامعة في منتصف المحاضرة، واستدلال يعمل على الجهاز فلا يغادره الفيديو ولا الصوت.',
		],
	} satisfies I18nBlocks,

	experience: [
		{
			company: { en: 'CartBuzz', ar: 'CartBuzz' },
			role: { en: 'Software Engineer', ar: 'مهندس برمجيات' },
			period: 'Since 2026',
			highlights: {
				en: [
					'Building the NestJS services behind a multi-vendor marketplace, where many sellers write to the same catalogue and stock at once.',
					'Building the storefront and the mobile client against that one API, so a change lands in both.',
				],
				ar: [
					'بناء خدمات NestJS خلف سوق متعدد البائعين، حيث يكتب بائعون كثر على الفهرس والمخزون نفسه في الوقت ذاته.',
					'بناء واجهة المتجر وعميل الجوال على واجهة API واحدة، فيصل التغيير إليهما معًا.',
				],
			},
		},
		{
			company: { en: 'Bionl.Ai', ar: 'Bionl.Ai' },
			role: { en: 'Software Engineer', ar: 'مهندس برمجيات' },
			period: '2025 to 2026',
			location: { en: 'Remote', ar: 'عن بُعد' },
			highlights: {
				en: [
					'Shipped GenAI data analysis, literature search and customisable pipelines on a no-code platform used by 8,000+ researchers.',
					'Built the web and mobile clients from one monorepo, so React and React Native share the same typed data layer.',
					'Worked to HIPAA, GDPR and SOC 2 Type 2 requirements.',
				],
				ar: [
					'إطلاق تحليل بيانات بالذكاء التوليدي وبحث في الأدبيات العلمية وخطوط معالجة قابلة للتخصيص، على منصة بلا شيفرة يستخدمها أكثر من 8,000 باحث.',
					'بناء عميلي الويب والجوال من monorepo واحد، فيتشارك React وReact Native طبقة البيانات نفسها بأنواعها.',
					'العمل وفق متطلبات HIPAA وGDPR وSOC 2 Type 2.',
				],
			},
		},
		{
			company: { en: 'Malabji', ar: 'ملعبجي' },
			role: { en: 'Founder & CEO', ar: 'مؤسس ومدير تنفيذي' },
			period: 'Since 2025',
			highlights: {
				en: [
					'Founded and shipped a playground booking and matchmaking app on iOS and Android.',
					'Led product, design, mobile development, backend work, store releases, and support.',
				],
				ar: [
					'تأسيس وإطلاق تطبيق لحجز الملاعب وإيجاد اللاعبين على iOS وAndroid.',
					'إدارة المنتج والتصميم وتطبيق الموبايل والخادم وإصدارات المتاجر والدعم.',
				],
			},
		},
		{
			company: { en: 'Freelance', ar: 'عمل حر' },
			role: {
				en: 'Web & Mobile Full-Stack Developer',
				ar: 'مطوّر ويب وموبايل full-stack',
			},
			period: 'Since 2022',
			highlights: {
				en: [
					'Gathered requirements directly with clients, proposed the technical approach, and delivered to deadline.',
					'Shipped municipal, tourism, education, charity and e-commerce products across Jordan and Saudi Arabia.',
				],
				ar: [
					'جمع المتطلبات مباشرة مع العملاء، واقتراح المقاربة التقنية، والتسليم ضمن المواعيد.',
					'إطلاق منتجات بلدية وسياحية وتعليمية وخيرية وتجارية في الأردن والسعودية.',
				],
			},
		},
		{
			company: { en: 'Repzo', ar: 'Repzo' },
			role: { en: 'Software Engineer', ar: 'مهندس برمجيات' },
			period: '2022 to 2023',
			highlights: {
				en: [
					'Built and maintained a large operational dashboard in TypeScript and React, with the Node and Express endpoints behind it.',
					'Migrated ageing dependencies and the code that called them, closing known vulnerabilities and cutting render cost.',
				],
				ar: [
					'بناء وصيانة لوحة تحكم تشغيلية كبيرة بـ TypeScript وReact، مع نقاط Node وExpress خلفها.',
					'ترحيل اعتماديات قديمة والشيفرة التي تستدعيها، فأُغلقت ثغرات معروفة وانخفضت كلفة الرسم.',
				],
			},
		},
		{
			company: { en: 'Orange Jordan', ar: 'أورنج الأردن' },
			role: {
				en: 'Full-Stack Developer Trainee',
				ar: 'متدرب تطوير full-stack',
			},
			period: '2021 to 2022',
			location: { en: 'Internship', ar: 'تدريب' },
			highlights: {
				en: [
					'Seven-month internship covering the practical web development stack.',
					'Built 10 dynamic web projects, working alongside peers and mentors.',
				],
				ar: [
					'تدريب لسبعة أشهر غطّى منظومة تطوير الويب عمليًا.',
					'بناء 10 مشاريع ويب ديناميكية بالعمل مع الزملاء والمشرفين.',
				],
			},
		},
		{
			company: { en: 'EECommittee', ar: 'لجنة الهندسة الكهربائية' },
			role: {
				en: 'Full-Stack Developer (Volunteer)',
				ar: 'مطوّر full-stack (تطوّع)',
			},
			period: 'Since 2018',
			highlights: {
				en: [
					'Volunteer work building tools for engineering students.',
					"Shipped and still maintain the committee's Android app and website.",
				],
				ar: [
					'عمل تطوعي لبناء أدوات لطلاب الهندسة.',
					'إطلاق تطبيق اللجنة على أندرويد وموقعها، وما زلت أتولّى صيانتهما.',
				],
			},
		},
	] satisfies ExperienceItem[],

	education: [
		{
			school: { en: 'Irbid National University', ar: 'جامعة إربد الأهلية' },
			degree: { en: 'BSc, Computer Science', ar: 'بكالوريوس، علم الحاسوب' },
			period: '2022 to 2024',
			note: { en: 'Grade: Excellent', ar: 'التقدير: امتياز' },
		},
		{
			school: {
				en: 'Jordan University of Science and Technology',
				ar: 'جامعة العلوم والتكنولوجيا الأردنية',
			},
			degree: {
				en: 'BSc, Electrical and Electronics Engineering',
				ar: 'بكالوريوس، الهندسة الكهربائية والإلكترونية',
			},
			period: '2018 to 2022',
			note: {
				en: 'Incomplete, grade Very Good',
				ar: 'غير مكتملة، التقدير جيد جدًا',
			},
		},
	] satisfies EducationItem[],

	certifications: [
		{
			name: { en: 'AWS DevOps', ar: 'AWS DevOps' },
			issuer: { en: 'Cloud Native Base Camp', ar: 'Cloud Native Base Camp' },
			date: 'Sep 2024',
			description: {
				en: 'Designing, implementing and operating cloud solutions from the ground up.',
				ar: 'تصميم حلول سحابية وتنفيذها وتشغيلها من الصفر.',
			},
		},
		{
			name: {
				en: 'Fundamentals of Database Engineering',
				ar: 'أساسيات هندسة قواعد البيانات',
			},
			issuer: { en: 'Udemy', ar: 'Udemy' },
			date: 'Feb 2023',
			description: {
				en: 'Indexing, partitioning, sharding, replication, B-trees, concurrency control and database engines.',
				ar: 'الفهرسة والتقسيم والتجزئة والنسخ وأشجار B والتحكم بالتزامن ومحركات قواعد البيانات.',
			},
		},
		{
			name: {
				en: 'Algorithms Analysis and Design from Scratch',
				ar: 'تحليل وتصميم الخوارزميات من الصفر',
			},
			issuer: { en: 'Cloud Native Base Camp', ar: 'Cloud Native Base Camp' },
			date: 'Oct 2024',
			description: {
				en: 'Data structures, algorithm analysis, and applying them to real problems.',
				ar: 'هياكل البيانات وتحليل الخوارزميات وتطبيقها على مشكلات واقعية.',
			},
		},
		{
			name: {
				en: 'React Native: The Practical Guide',
				ar: 'React Native: الدليل العملي',
			},
			issuer: { en: 'Udemy', ar: 'Udemy' },
			date: 'Apr 2022',
			description: {
				en: 'The React Native ecosystem end to end: layout, navigation, maps and camera.',
				ar: 'منظومة React Native كاملة: التخطيط والتنقل والخرائط والكاميرا.',
			},
		},
	] satisfies Certification[],

	skills: {
		languages: ['TypeScript', 'JavaScript', 'Swift', 'Kotlin', 'Python'],
		frontend: [
			'React',
			'Next.js',
			'Astro',
			'Tailwind CSS',
			'TanStack Query',
			'Motion',
		],
		mobile: ['React Native', 'Expo', 'Expo Router', 'Reanimated', 'Skia'],
		backend: ['Node.js', 'NestJS', 'Hono', 'Convex', 'Prisma', 'REST APIs'],
		data: [
			'PostgreSQL',
			'MongoDB',
			'Redis',
			'Firebase',
			'Supabase',
			'Meilisearch',
		],
		ai: ['On-device inference', 'ONNX Runtime', 'transformers.js', 'Whisper'],
		infra: ['AWS', 'Docker', 'Vercel', 'Linux', 'Git', 'CI/CD', 'EAS'],
		craft: ['UI/UX', 'Figma', 'Accessibility', 'i18n & RTL', 'Performance'],
	},

	interests: [
		{ en: 'Football', ar: 'كرة القدم', emoji: '⚽' },
		{ en: 'Worship', ar: 'العبادة', emoji: '🙏' },
		{ en: 'Walking', ar: 'المشي', emoji: '🥾' },
		{ en: 'Learning', ar: 'التعلّم', emoji: '🧠' },
		{ en: 'Swimming', ar: 'السباحة', emoji: '🏊' },
		{ en: 'Reading', ar: 'القراءة', emoji: '📚' },
	],
};
