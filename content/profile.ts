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
		en: 'I turn product requirements into reliable software, from architecture to release.',
		ar: 'أحوّل متطلبات المنتج إلى برمجيات موثوقة، من المعمارية حتى الإطلاق.',
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
			'I build web and mobile products across the full delivery path: data model, API, interface, deployment, app-store review, and support.',
			'I work on constraints that shape the product: models that run on the device, search that answers in milliseconds without a backend, and booking flows that prevent double-selling a time slot.',
			'My recent work includes private on-device AI, multi-vendor commerce, bioinformatics tools used by researchers, and products for education and community services.',
		],
		ar: [
			'أبني منتجات ويب وجوال عبر مسار التسليم كاملًا: نموذج البيانات وواجهة API والواجهة والنشر ومراجعة المتاجر والدعم.',
			'أعمل على قيود تؤثر في المنتج: نماذج تعمل على الجهاز، وبحث يجيب خلال أجزاء من الثانية بلا خادم، ومسارات حجز تمنع بيع الموعد نفسه مرتين.',
			'تشمل أعمالي الحديثة ذكاءً اصطناعيًا خاصًا يعمل على الجهاز، وتجارة متعددة البائعين، وأدوات معلوماتية حيوية يستخدمها باحثون، ومنتجات للتعليم والخدمات المجتمعية.',
		],
	} satisfies I18nBlocks,

	experience: [
		{
			company: { en: 'CartBuzz', ar: 'CartBuzz' },
			role: { en: 'Software Engineer', ar: 'مهندس برمجيات' },
			period: 'Since 2026',
			highlights: {
				en: [
					'Building multi-vendor e-commerce systems with NestJS, Next.js and React Native.',
					'Built backend services for reliable, high-throughput vendor concurrency.',
					'Built responsive storefronts and a shared mobile client on the same API.',
				],
				ar: [
					'بناء أنظمة تجارة إلكترونية متعددة البائعين باستخدام NestJS وNext.js وReact Native.',
					'بناء خدمات خلفية موثوقة وعالية الإنتاجية لتزامن البائعين.',
					'بناء واجهات متجر متجاوبة وعميل موبايل مشترك على واجهة API نفسها.',
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
					'Built bioinformatics applications in a monorepo with React and React Native sharing one codebase.',
					'Used TypeScript, Zod, and Prisma for type-safe validation and data access.',
					'Server state and forms on TanStack Query and TanStack Form; API endpoints on Hono.',
					'Contributed to a no-code platform used by 8,000+ researchers worldwide.',
					'Shipped GenAI-powered data analysis, literature search, and customisable bioinformatics pipelines.',
					'Built to HIPAA, GDPR, and SOC 2 Type 2 requirements.',
				],
				ar: [
					'بناء تطبيقات معلوماتية حيوية داخل monorepo يتشارك فيه React وReact Native قاعدة شيفرة واحدة.',
					'استخدام TypeScript وZod وPrisma للتحقق من البيانات والوصول إليها بأمان الأنواع.',
					'إدارة حالة الخادم والنماذج عبر TanStack Query وTanStack Form، ونقاط الـ API على Hono.',
					'المساهمة في منصة بلا شيفرة يستخدمها أكثر من 8,000 باحث حول العالم.',
					'إطلاق تحليل بيانات مدعوم بالذكاء التوليدي، وبحث في الأدبيات العلمية، وخطوط معالجة قابلة للتخصيص.',
					'بناء الميزات وفق متطلبات HIPAA وGDPR وSOC 2 Type 2.',
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
					'Built and maintained a large operational dashboard in TypeScript and React.',
					'Updated dependencies and code to improve security and runtime speed.',
					'Backend work on Node.js with Express.',
				],
				ar: [
					'بناء وصيانة لوحة تحكم تشغيلية كبيرة باستخدام TypeScript وReact.',
					'تحديث الاعتماديات والشيفرة لتحسين الأمان وسرعة التشغيل.',
					'عمل على الخادم باستخدام Node.js وExpress.',
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
			name: { en: 'Data Structures Decode', ar: 'Data Structures Decode' },
			issuer: { en: 'Cloud Native Base Camp', ar: 'Cloud Native Base Camp' },
			date: 'Oct 2024',
			description: {
				en: 'Data structures and algorithms, and applying them to real problems.',
				ar: 'هياكل البيانات والخوارزميات وتطبيقها على مشكلات واقعية.',
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
				en: 'Reasoning through code before writing it, and the common approaches worth reaching for.',
				ar: 'التفكير في الشيفرة قبل كتابتها، والمقاربات الشائعة التي تستحق الاستخدام.',
			},
		},
		{
			name: { en: 'Node.js From Scratch', ar: 'Node.js من الصفر' },
			issuer: { en: 'Cloud Native Base Camp', ar: 'Cloud Native Base Camp' },
			date: 'Oct 2024',
			description: {
				en: 'How Node.js works under the hood.',
				ar: 'كيف يعمل Node.js داخليًا.',
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
				en: '24 hours on indexing, partitioning, sharding, replication, B-trees, concurrency control, database engines and security, engineering, not SQL syntax.',
				ar: '24 ساعة في الفهرسة والتقسيم والتجزئة والنسخ وأشجار B والتحكم بالتزامن ومحركات قواعد البيانات والأمان، هندسة لا صياغة SQL.',
			},
		},
		{
			name: {
				en: 'JavaScript Algorithms and Data Structures Masterclass',
				ar: 'خوارزميات وهياكل بيانات JavaScript',
			},
			issuer: { en: 'Udemy', ar: 'Udemy' },
			date: 'Feb 2022',
			description: {
				en: '22 hours covering Big O, algorithms and data structures from foundations upward.',
				ar: '22 ساعة تغطي Big O والخوارزميات وهياكل البيانات من الأساسيات صعودًا.',
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
				en: '58 hours across the React Native ecosystem: core concepts, responsive layout, navigation, maps and camera.',
				ar: '58 ساعة في منظومة React Native: المفاهيم الأساسية والتخطيط المتجاوب والتنقل والخرائط والكاميرا.',
			},
		},
		{
			name: { en: 'Linux Basics', ar: 'أساسيات لينكس' },
			issuer: { en: 'Flex Courses', ar: 'Flex Courses' },
			date: 'Apr 2022',
			description: {
				en: 'Command-line proficiency and system fundamentals.',
				ar: 'إتقان سطر الأوامر وأساسيات النظام.',
			},
		},
	] satisfies Certification[],

	skills: {
		languages: [
			'TypeScript',
			'JavaScript',
			'Swift',
			'Kotlin',
			'Python',
			'C++',
			'C#',
			'PHP',
		],
		frontend: [
			'React',
			'Next.js',
			'Astro',
			'Tailwind CSS',
			'Framer Motion',
			'Redux',
			'TanStack Query',
		],
		mobile: [
			'React Native',
			'Expo',
			'Expo Router',
			'Reanimated',
			'Skia',
			'Restyle',
			'SwiftUI',
			'Jetpack Compose',
		],
		backend: [
			'Node.js',
			'NestJS',
			'Express',
			'Hono',
			'Laravel',
			'Convex',
			'Prisma',
			'REST APIs',
		],
		data: [
			'PostgreSQL',
			'MySQL',
			'MongoDB',
			'Redis',
			'Firebase',
			'Supabase',
			'Meilisearch',
		],
		ai: [
			'On-device inference',
			'ONNX Runtime',
			'transformers.js',
			'Whisper',
			'Demucs',
			'YOLO / NudeNet',
		],
		infra: ['AWS', 'Docker', 'Vercel', 'Linux', 'Git', 'CI/CD', 'EAS'],
		craft: [
			'UI/UX',
			'Figma',
			'Accessibility',
			'SEO',
			'i18n & RTL',
			'Performance',
		],
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
