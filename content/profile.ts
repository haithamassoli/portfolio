import type { Certification, EducationItem, ExperienceItem, I18n, I18nBlocks } from "./types";

export const profile = {
  name: {
    en: "Haitham Assoli",
    ar: "هيثم العسولي",
  } satisfies I18n,

  title: {
    en: "Web & Mobile Full-Stack Developer",
    ar: "مطوّر ويب وتطبيقات موبايل — full-stack",
  } satisfies I18n,

  tagline: {
    en: "I turn designs into fast, accessible products — and ship them.",
    ar: "أحوّل التصاميم إلى منتجات سريعة وسهلة الوصول — وأطلقها فعليًا.",
  } satisfies I18n,

  location: { en: "Amman, Jordan", ar: "عمّان، الأردن" } satisfies I18n,

  email: "haitham.b.assoli@gmail.com",
  phone: "+962 77 619 3666",

  links: {
    github: "https://github.com/haithamassoli",
    linkedin: "https://www.linkedin.com/in/haithamassoli/",
    website: "https://assoli.site",
    resume: "https://cv.assoli.site",
    playStore: "https://play.google.com/store/apps/dev?id=6385259170030268414",
  },

  about: {
    en: [
      "I build web and mobile products end to end — from the data model to the last pixel. Most of what I ship is bilingual and right-to-left first, because most of my users read Arabic.",
      "I like problems where the constraint is real: a model that has to run on the device instead of a server, a search index that has to answer in milliseconds without a backend, a booking flow that cannot double-sell the same hour. The interesting part is never the framework.",
      "Lately most of my work has been on-device AI — video and audio processing that runs entirely on the user's phone or laptop, with no cloud and no telemetry.",
    ],
    ar: [
      "أبني منتجات ويب وموبايل من طرف إلى طرف — من نموذج البيانات حتى آخر بكسل. معظم ما أطلقه ثنائي اللغة ومبني للاتجاه من اليمين إلى اليسار أولًا، لأن معظم مستخدميّ يقرؤون بالعربية.",
      "تستهويني المشكلات ذات القيد الحقيقي: نموذج يجب أن يعمل على الجهاز لا على خادم، فهرس بحث يجب أن يجيب خلال أجزاء من الثانية بلا خادم خلفي، ومسار حجز لا يحتمل بيع الساعة نفسها مرتين. الجزء المثير للاهتمام ليس إطار العمل أبدًا.",
      "معظم عملي مؤخرًا في الذكاء الاصطناعي على الجهاز — معالجة فيديو وصوت تعمل بالكامل على هاتف المستخدم أو حاسوبه، بلا سحابة وبلا تتبّع.",
    ],
  } satisfies I18nBlocks,

  experience: [
    {
      company: { en: "CartBuzz", ar: "CartBuzz" },
      role: { en: "Software Engineer", ar: "مهندس برمجيات" },
      period: "2026 — Present",
      highlights: {
        en: [
          "Building multi-vendor e-commerce systems with NestJS, Next.js and React Native.",
          "Backend services designed for throughput and reliability under vendor-level concurrency.",
          "Responsive storefronts and a shared mobile client on top of the same API surface.",
        ],
        ar: [
          "بناء أنظمة تجارة إلكترونية متعددة البائعين باستخدام NestJS وNext.js وReact Native.",
          "خدمات خلفية مصممة للإنتاجية والموثوقية تحت تزامن على مستوى البائعين.",
          "واجهات متجر متجاوبة وعميل موبايل مشترك فوق واجهة الـ API نفسها.",
        ],
      },
    },
    {
      company: { en: "Bionl.Ai", ar: "Bionl.Ai" },
      role: { en: "Software Engineer", ar: "مهندس برمجيات" },
      period: "2025 — 2026",
      location: { en: "Remote", ar: "عن بُعد" },
      highlights: {
        en: [
          "Built bioinformatics applications in a monorepo with React and React Native sharing one codebase.",
          "End-to-end type safety with TypeScript, Zod for schema validation and Prisma for the data layer.",
          "Server state and forms on TanStack Query and TanStack Form; API endpoints on Hono.",
          "Contributed to a no-code platform used by 8,000+ researchers worldwide.",
          "Shipped GenAI-powered data analysis, literature search, and customisable bioinformatics pipelines.",
          "Worked to HIPAA, GDPR and SOC 2 Type 2 compliance requirements throughout.",
        ],
        ar: [
          "بناء تطبيقات معلوماتية حيوية داخل monorepo يتشارك فيه React وReact Native قاعدة شيفرة واحدة.",
          "أمان أنواع من طرف إلى طرف عبر TypeScript وZod للتحقق من المخططات وPrisma لطبقة البيانات.",
          "إدارة حالة الخادم والنماذج عبر TanStack Query وTanStack Form، ونقاط الـ API على Hono.",
          "المساهمة في منصة بلا شيفرة يستخدمها أكثر من 8,000 باحث حول العالم.",
          "إطلاق تحليل بيانات مدعوم بالذكاء التوليدي، وبحث في الأدبيات العلمية، وخطوط معالجة قابلة للتخصيص.",
          "الالتزام بمتطلبات HIPAA وGDPR وSOC 2 Type 2 في كل ما جرى تطويره.",
        ],
      },
    },
    {
      company: { en: "Malabji", ar: "ملعبجي" },
      role: { en: "Founder & CEO", ar: "مؤسس ومدير تنفيذي" },
      period: "2025 — Present",
      highlights: {
        en: [
          "Founded and shipped a playground booking and matchmaking app on iOS and Android.",
          "Owned the whole surface: product, design, mobile client, backend, store releases and support.",
        ],
        ar: [
          "تأسيس وإطلاق تطبيق لحجز الملاعب وإيجاد اللاعبين على iOS وAndroid.",
          "المسؤولية الكاملة: المنتج والتصميم وتطبيق الموبايل والخادم وإصدارات المتاجر والدعم.",
        ],
      },
    },
    {
      company: { en: "Freelance", ar: "عمل حر" },
      role: { en: "Web & Mobile Full-Stack Developer", ar: "مطوّر ويب وموبايل full-stack" },
      period: "2022 — Present",
      highlights: {
        en: [
          "Gathered requirements directly with clients, proposed the technical approach, and delivered to deadline.",
          "Shipped municipal, tourism, education, charity and e-commerce products across Jordan and Saudi Arabia.",
        ],
        ar: [
          "جمع المتطلبات مباشرة مع العملاء، واقتراح المقاربة التقنية، والتسليم ضمن المواعيد.",
          "إطلاق منتجات بلدية وسياحية وتعليمية وخيرية وتجارية في الأردن والسعودية.",
        ],
      },
    },
    {
      company: { en: "Repzo", ar: "Repzo" },
      role: { en: "Software Engineer", ar: "مهندس برمجيات" },
      period: "2022 — 2023",
      highlights: {
        en: [
          "Built and maintained a large operational dashboard in TypeScript and React.",
          "Ran the dependency and code modernisation effort, improving both security posture and runtime speed.",
          "Backend work on Node.js with Express.",
        ],
        ar: [
          "بناء وصيانة لوحة تحكم تشغيلية كبيرة باستخدام TypeScript وReact.",
          "قيادة تحديث الاعتماديات والشيفرة، بما حسّن الأمان والأداء معًا.",
          "عمل على الخادم باستخدام Node.js وExpress.",
        ],
      },
    },
    {
      company: { en: "Orange Jordan", ar: "أورنج الأردن" },
      role: { en: "Full-Stack Developer Trainee", ar: "متدرب تطوير full-stack" },
      period: "2021 — 2022",
      location: { en: "Internship", ar: "تدريب" },
      highlights: {
        en: [
          "Seven-month internship covering the practical web development stack.",
          "Built 10 dynamic web projects, working alongside peers and mentors.",
        ],
        ar: [
          "تدريب لسبعة أشهر غطّى منظومة تطوير الويب عمليًا.",
          "بناء 10 مشاريع ويب ديناميكية بالعمل مع الزملاء والمشرفين.",
        ],
      },
    },
    {
      company: { en: "EECommittee", ar: "لجنة الهندسة الكهربائية" },
      role: { en: "Full-Stack Developer (Volunteer)", ar: "مطوّر full-stack (تطوّع)" },
      period: "2018 — Present",
      highlights: {
        en: [
          "Long-running volunteer work building tools that improve the academic experience for engineering students.",
          "Shipped and still maintain the committee's Android app and website.",
        ],
        ar: [
          "عمل تطوّعي طويل الأمد لبناء أدوات تحسّن التجربة الأكاديمية لطلاب الهندسة.",
          "إطلاق تطبيق اللجنة على أندرويد وموقعها، وما زلت أتولّى صيانتهما.",
        ],
      },
    },
  ] satisfies ExperienceItem[],

  education: [
    {
      school: { en: "Irbid National University", ar: "جامعة إربد الأهلية" },
      degree: { en: "BSc, Computer Science", ar: "بكالوريوس، علم الحاسوب" },
      period: "2022 — 2024",
      note: { en: "Grade: Excellent", ar: "التقدير: امتياز" },
    },
    {
      school: {
        en: "Jordan University of Science and Technology",
        ar: "جامعة العلوم والتكنولوجيا الأردنية",
      },
      degree: {
        en: "BSc, Electrical and Electronics Engineering",
        ar: "بكالوريوس، الهندسة الكهربائية والإلكترونية",
      },
      period: "2018 — 2022",
      note: { en: "Incomplete — Grade: Very Good", ar: "غير مكتملة — التقدير: جيد جدًا" },
    },
  ] satisfies EducationItem[],

  certifications: [
    {
      name: { en: "AWS DevOps", ar: "AWS DevOps" },
      issuer: { en: "Cloud Native Base Camp", ar: "Cloud Native Base Camp" },
      date: "Sep 2024",
      description: {
        en: "Designing, implementing and operating cloud solutions from the ground up.",
        ar: "تصميم حلول سحابية وتنفيذها وتشغيلها من الصفر.",
      },
    },
    {
      name: { en: "Data Structures Decode", ar: "Data Structures Decode" },
      issuer: { en: "Cloud Native Base Camp", ar: "Cloud Native Base Camp" },
      date: "Oct 2024",
      description: {
        en: "Data structures and algorithms, and applying them to real problems.",
        ar: "هياكل البيانات والخوارزميات وتطبيقها على مشكلات واقعية.",
      },
    },
    {
      name: {
        en: "Algorithms Analysis and Design from Scratch",
        ar: "تحليل وتصميم الخوارزميات من الصفر",
      },
      issuer: { en: "Cloud Native Base Camp", ar: "Cloud Native Base Camp" },
      date: "Oct 2024",
      description: {
        en: "Reasoning through code before writing it, and the common approaches worth reaching for.",
        ar: "التفكير في الشيفرة قبل كتابتها، والمقاربات الشائعة التي تستحق الاستخدام.",
      },
    },
    {
      name: { en: "Node.js From Scratch", ar: "Node.js من الصفر" },
      issuer: { en: "Cloud Native Base Camp", ar: "Cloud Native Base Camp" },
      date: "Oct 2024",
      description: {
        en: "How Node.js actually works behind the scenes.",
        ar: "كيف يعمل Node.js فعليًا خلف الكواليس.",
      },
    },
    {
      name: {
        en: "Fundamentals of Database Engineering",
        ar: "أساسيات هندسة قواعد البيانات",
      },
      issuer: { en: "Udemy", ar: "Udemy" },
      date: "Feb 2023",
      description: {
        en: "24 hours on indexing, partitioning, sharding, replication, B-trees, concurrency control, database engines and security — engineering, not SQL syntax.",
        ar: "24 ساعة في الفهرسة والتقسيم والتجزئة والنسخ وأشجار B والتحكم بالتزامن ومحركات قواعد البيانات والأمان — هندسة لا صياغة SQL.",
      },
    },
    {
      name: {
        en: "JavaScript Algorithms and Data Structures Masterclass",
        ar: "خوارزميات وهياكل بيانات JavaScript",
      },
      issuer: { en: "Udemy", ar: "Udemy" },
      date: "Feb 2022",
      description: {
        en: "22 hours covering Big O, algorithms and data structures from foundations upward.",
        ar: "22 ساعة تغطي Big O والخوارزميات وهياكل البيانات من الأساسيات صعودًا.",
      },
    },
    {
      name: { en: "React Native — The Practical Guide", ar: "React Native — الدليل العملي" },
      issuer: { en: "Udemy", ar: "Udemy" },
      date: "Apr 2022",
      description: {
        en: "58 hours across the React Native ecosystem: core concepts, responsive layout, navigation, maps and camera.",
        ar: "58 ساعة في منظومة React Native: المفاهيم الأساسية والتخطيط المتجاوب والتنقل والخرائط والكاميرا.",
      },
    },
    {
      name: { en: "Linux Basics", ar: "أساسيات لينكس" },
      issuer: { en: "Flex Courses", ar: "Flex Courses" },
      date: "Apr 2022",
      description: {
        en: "Command-line proficiency and system fundamentals.",
        ar: "إتقان سطر الأوامر وأساسيات النظام.",
      },
    },
  ] satisfies Certification[],

  skills: {
    languages: ["TypeScript", "JavaScript", "Swift", "Kotlin", "Python", "C++", "C#", "PHP"],
    frontend: ["React", "Next.js", "Astro", "Tailwind CSS", "Framer Motion", "Redux", "TanStack Query"],
    mobile: ["React Native", "Expo", "Expo Router", "Reanimated", "Skia", "Restyle", "SwiftUI", "Jetpack Compose"],
    backend: ["Node.js", "NestJS", "Express", "Hono", "Laravel", "Convex", "Prisma", "REST APIs"],
    data: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase", "Supabase", "Meilisearch"],
    ai: ["On-device inference", "ONNX Runtime", "transformers.js", "Whisper", "Demucs", "YOLO / NudeNet"],
    infra: ["AWS", "Docker", "Vercel", "Linux", "Git", "CI/CD", "EAS"],
    craft: ["UI/UX", "Figma", "Accessibility", "SEO", "i18n & RTL", "Performance"],
  },

  interests: [
    { en: "Football", ar: "كرة القدم", emoji: "⚽" },
    { en: "Worship", ar: "العبادة", emoji: "🙏" },
    { en: "Walking", ar: "المشي", emoji: "🥾" },
    { en: "Learning", ar: "التعلّم", emoji: "🧠" },
    { en: "Swimming", ar: "السباحة", emoji: "🏊" },
    { en: "Reading", ar: "القراءة", emoji: "📚" },
  ],
};
