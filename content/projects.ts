import type { Project } from "./types";

/**
 * Every project, in English and Arabic.
 *
 * `sourced: true`  — the write-up comes from the project's own README / PRD / store listing.
 * `sourced: false` — the write-up is reconstructed from the stack and shape of the repo.
 *                    Read those once and correct anything that misremembers the work.
 */
export const projects: Project[] = [
  {
    slug: "aoun",
    title: { en: "Aoun", ar: "عون" },
    tagline: {
      en: "A free academic platform for every Jordanian university student.",
      ar: "منصة أكاديمية مجانية لكل طالب جامعي في الأردن.",
    },
    summary: {
      en: "Aoun pulls summaries, past exams, course material, GPA tools, bookmarks and study planning into one place, for students across Jordanian universities. It is free, needs no account to browse, and works offline as an installed PWA.",
      ar: "يجمع «عون» الملخصات والامتحانات السابقة والمواد الدراسية وأدوات المعدّل والمحفوظات وأدوات تنظيم الدراسة في مكان واحد، لطلاب الجامعات الأردنية. مجاني، ولا يحتاج حسابًا للتصفح، ويعمل دون اتصال كتطبيق PWA مثبّت.",
    },
    category: "web",
    status: "live",
    featured: true,
    year: "2026",
    role: { en: "Solo — product, design and engineering", ar: "منفردًا — المنتج والتصميم والبرمجة" },
    stack: ["Next.js", "TypeScript", "React", "Convex", "TanStack Form", "TanStack Table", "Tiptap", "Recharts", "PostHog", "Tailwind CSS", "PWA", "Web Push"],
    cover: "/projects/aoun.png",
    gallery: ["/projects/aoun.png"],
    links: { live: "https://aoun.assoli.site", github: "https://github.com/haithamassoli/aoun" },
    overview: {
      en: [
        "Jordanian students keep their course material scattered across WhatsApp groups, Google Drive folders shared once and never updated, and Telegram channels that vanish. Nothing is indexed, nothing is versioned, and every intake re-collects the same material from scratch.",
        "Aoun is the boring fix: one catalogue, organised by university → faculty → course, where a summary or a past exam stays put and stays findable. On top of the archive sit the tools students actually open every week — a GPA calculator that knows the local grading rules, bookmarks, a study planner, and a focus timer.",
        "The whole thing is a Next.js app on Convex, with the reading experience deliberately account-free: you only sign in when you want to save something.",
      ],
      ar: [
        "تتناثر المواد الدراسية عند طلاب الأردن بين مجموعات واتساب، ومجلدات درايف تُشارَك مرة ولا تُحدَّث، وقنوات تيليجرام تختفي. لا فهرسة، ولا إصدارات، وكل دفعة جديدة تعيد جمع المادة نفسها من الصفر.",
        "«عون» هو الحل الممل والفعّال: فهرس واحد منظّم حسب الجامعة ← الكلية ← المساق، يبقى فيه الملخص أو الامتحان في مكانه وقابلًا للإيجاد. وفوق الأرشيف الأدوات التي يفتحها الطلاب أسبوعيًا فعلًا — حاسبة معدّل تعرف قواعد التقدير المحلية، ومحفوظات، ومنظّم دراسة، ومؤقّت تركيز.",
        "المنصة تطبيق Next.js على Convex، وتجربة القراءة فيه بلا حساب عمدًا: لا تسجّل الدخول إلا حين تريد حفظ شيء.",
      ],
    },
    challenges: [
      {
        title: { en: "One content model for many universities", ar: "نموذج محتوى واحد لجامعات متعددة" },
        problem: {
          en: "Every university names things differently — faculties, credit hours, course codes, even what a 'year' means. Modelling one university and generalising later would have meant a migration for every new one added.",
          ar: "كل جامعة تسمّي الأشياء بطريقتها — الكليات والساعات المعتمدة ورموز المساقات، وحتى معنى «السنة». نمذجة جامعة واحدة ثم التعميم لاحقًا كانت ستعني ترحيل بيانات مع كل جامعة جديدة.",
        },
        solution: {
          en: "I modelled the hierarchy as generic nodes with per-university configuration held as data, not code — grading scales, credit rules and naming all live in a config document. Adding a university became a content task instead of a schema change.",
          ar: "نمذجت التسلسل كعُقد عامة مع إعدادات لكل جامعة محفوظة كبيانات لا كشيفرة — سلالم التقدير وقواعد الساعات والتسميات كلها في مستند إعدادات. صارت إضافة جامعة مهمة محتوى بدل تغيير في المخطط.",
        },
      },
      {
        title: { en: "Arabic search that tolerates how people actually type", ar: "بحث عربي يحتمل طريقة الكتابة الفعلية" },
        problem: {
          en: "Students type 'احصاء' for 'إحصاء', drop diacritics entirely, mix Arabic and English in one query, and use colloquial course nicknames. Naive matching returned nothing for most real queries.",
          ar: "يكتب الطلاب «احصاء» بدل «إحصاء»، ويحذفون التشكيل تمامًا، ويخلطون العربية والإنجليزية في استعلام واحد، ويستخدمون أسماء دارجة للمساقات. المطابقة الساذجة كانت تعيد لا شيء لمعظم الاستعلامات الحقيقية.",
        },
        solution: {
          en: "I normalise both the index and the query — unify hamza forms, strip diacritics and tatweel, fold Arabic-Indic digits — and store curated aliases per course so the nicknames resolve too.",
          ar: "أُطبّع الفهرس والاستعلام معًا — توحيد صور الهمزة، وحذف التشكيل والتطويل، وتوحيد الأرقام العربية الهندية — مع تخزين أسماء بديلة منسّقة لكل مساق حتى تُحَلّ التسميات الدارجة.",
        },
      },
      {
        title: { en: "Offline for a student on campus Wi-Fi", ar: "العمل دون اتصال على شبكة الحرم الجامعي" },
        problem: {
          en: "The place students most need the material — inside a lecture hall — is exactly where connectivity is worst. A normal SPA showed a spinner over an empty page.",
          ar: "المكان الذي يحتاج فيه الطالب المادة أكثر — داخل القاعة — هو أسوأ مكان في التغطية. التطبيق أحادي الصفحة العادي كان يعرض مؤشر تحميل فوق صفحة فارغة.",
        },
        solution: {
          en: "The app is an installable PWA that caches viewed courses and their files, so anything you opened once opens again offline. Writes queue and replay when the connection returns.",
          ar: "التطبيق PWA قابل للتثبيت يخزّن المساقات المعروضة وملفاتها، فأي شيء فتحته مرة يُفتح ثانية دون اتصال. وتُصَفّ عمليات الكتابة وتُعاد عند عودة الاتصال.",
        },
      },
      {
        title: { en: "Moderating an open upload pipe", ar: "ضبط قناة رفع مفتوحة" },
        problem: {
          en: "Letting anyone upload is what makes the archive grow — and also what fills it with duplicates, mislabelled files and the occasional thing that should not be there.",
          ar: "السماح للجميع بالرفع هو ما يُنمّي الأرشيف — وهو أيضًا ما يملؤه بالمكرّرات والملفات الموسومة خطأً وأحيانًا بما لا يجب أن يكون فيه.",
        },
        solution: {
          en: "Uploads land in a review queue rather than the catalogue. An admin view shows the file next to its metadata with approve/relabel/reject in one keystroke, and PostHog funnels tell me where contributors drop off.",
          ar: "تصل الملفات المرفوعة إلى قائمة مراجعة لا إلى الفهرس مباشرة. وتعرض لوحة الإدارة الملف بجانب بياناته الوصفية مع قبول/إعادة وسم/رفض بضغطة واحدة، وتكشف قمعات PostHog أين ينسحب المساهمون.",
        },
      },
    ],
    outcomes: {
      en: [
        "Past 7,500 visitors, tracked live on the home page.",
        "Browsing needs no account; sign-in is only for saving and contributing.",
        "Installable and usable offline for material already opened.",
      ],
      ar: [
        "تجاوز 7,500 زائر، ويُعرض العدّاد مباشرة على الصفحة الرئيسية.",
        "التصفح بلا حساب؛ وتسجيل الدخول للحفظ والمساهمة فقط.",
        "قابل للتثبيت والعمل دون اتصال للمواد التي فُتحت سابقًا.",
      ],
    },
    sourced: true,
  },
  {
    slug: "malabji",
    title: { en: "Malabji", ar: "ملعبجي" },
    tagline: {
      en: "Find a pitch, find players, book it, play.",
      ar: "ابحث عن ملعب، وابحث عن لاعبين، احجز، والعب.",
    },
    summary: {
      en: "Malabji makes booking a football pitch as simple as booking a table: search nearby grounds, see which slots are actually free, and reserve one. It also solves the other half of the problem — finding enough players — with team search, challenges and tournaments.",
      ar: "يجعل «ملعبجي» حجز ملعب كرة قدم بسهولة حجز طاولة: ابحث عن الملاعب القريبة، وشاهد الأوقات الشاغرة فعلًا، واحجز. ويحل النصف الآخر من المشكلة — إيجاد لاعبين كافين — عبر البحث عن فرق والتحديات والبطولات.",
    },
    category: "mobile",
    status: "shipped",
    featured: true,
    year: "2025 — Present",
    role: { en: "Founder — product, design and full engineering", ar: "مؤسس — المنتج والتصميم والبرمجة كاملة" },
    stack: ["React Native", "Expo Router", "TypeScript", "Supabase", "Zustand", "React Query", "React Hook Form", "Zod", "Reanimated", "Skia", "Restyle", "In-App Purchases", "Deep Linking", "Calendars", "Push Notifications"],
    cover: "/apps/malabji-1.png",
    gallery: ["/apps/malabji-1.png", "/apps/malabji-2.png", "/apps/malabji-3.png", "/apps/malabji-4.png", "/apps/malabji-5.png", "/apps/malabji-6.png", "/projects/malabji-web.png"],
    links: {
      appStore: "https://apps.apple.com/jo/app/id6744635501",
      playGoogle: "https://play.google.com/store/apps/details?id=com.haithamassoli.malabji",
      live: "https://malabji.vercel.app",
    },
    overview: {
      en: [
        "Booking a pitch in Jordan runs on phone calls and WhatsApp. You ring the ground, ask what is free on Thursday, get told a time that may or may not still be available by the time you have gathered the players, and pay in cash on arrival. Half the friction is the booking; the other half is that you need nine other people.",
        "Malabji handles both. The booking side is a live availability calendar per pitch with instant reservation. The social side lets you look for a team, challenge another one, and run or join a tournament — plus a directory of sports academies.",
        "I founded it and built all of it: the Expo client for both stores, the Supabase backend, the store releases, and the support that follows a real product.",
      ],
      ar: [
        "حجز الملاعب في الأردن يجري بالمكالمات وواتساب. تتصل بالملعب، وتسأل عمّا هو شاغر يوم الخميس، فيُعطى لك وقت قد لا يبقى متاحًا حين تجمع اللاعبين، وتدفع نقدًا عند الوصول. نصف العناء في الحجز، والنصف الآخر أنك تحتاج تسعة أشخاص آخرين.",
        "يعالج «ملعبجي» الأمرين. جانب الحجز تقويم إتاحة مباشر لكل ملعب مع حجز فوري. والجانب الاجتماعي يتيح البحث عن فريق، وتحدّي فريق آخر، وإنشاء بطولة أو المشاركة فيها — إضافة إلى دليل للأكاديميات الرياضية.",
        "أسّسته وبنيته بالكامل: تطبيق Expo للمتجرين، وخادم Supabase، وإصدارات المتاجر، والدعم الذي يتبع أي منتج حقيقي.",
      ],
    },
    challenges: [
      {
        title: { en: "Never sell the same hour twice", ar: "ألا تُباع الساعة نفسها مرتين" },
        problem: {
          en: "Two people opening the same 7pm slot at the same time is not a rare edge case on a Thursday evening — it is the normal load. Checking availability and then writing the booking is two steps, and anything can happen between them.",
          ar: "أن يفتح شخصان الموعد نفسه في السابعة مساءً في اللحظة ذاتها ليس حالة نادرة مساء الخميس — بل هو الحمل الطبيعي. التحقق من الإتاحة ثم كتابة الحجز خطوتان، وأي شيء قد يقع بينهما.",
        },
        solution: {
          en: "Availability is never trusted from the client. The reservation is a single server-side transaction with a uniqueness constraint on (pitch, time range); the loser of a race gets a clean 'just taken' state and the calendar refreshes under them rather than a failed payment.",
          ar: "لا يُوثق بالإتاحة الآتية من التطبيق أبدًا. الحجز عملية واحدة على الخادم مع قيد تفرّد على (الملعب، المدى الزمني)؛ ومن يخسر السباق يحصل على حالة «حُجز للتو» نظيفة ويُحدَّث التقويم أمامه بدل عملية دفع فاشلة.",
        },
      },
      {
        title: { en: "In-app purchases on two stores with different rules", ar: "المشتريات داخل التطبيق على متجرين بقواعد مختلفة" },
        problem: {
          en: "Apple and Google disagree on receipts, on what a restore means, and on what they will approve. A purchase that succeeds on the device but never reaches the backend is the worst possible bug in a paid product.",
          ar: "تختلف Apple وGoogle في الإيصالات، وفي معنى «الاستعادة»، وفيما توافق عليه. وعملية شراء تنجح على الجهاز ولا تصل إلى الخادم أسوأ خلل ممكن في منتج مدفوع.",
        },
        solution: {
          en: "Entitlement is decided on the server from a verified receipt, never from the client's word. The client re-validates on launch and after every restore, so a purchase interrupted mid-flight reconciles itself the next time the app opens.",
          ar: "تُحسم الصلاحية على الخادم من إيصال مُتحقَّق منه، لا من كلام التطبيق. ويعيد التطبيق التحقق عند الإقلاع وبعد كل استعادة، فتُسوّى أي عملية شراء انقطعت في منتصفها عند الفتح التالي.",
        },
      },
      {
        title: { en: "Calendar and notifications that respect the user", ar: "تقويم وإشعارات تحترم المستخدم" },
        problem: {
          en: "A booking is useless if the player forgets it. But asking for calendar and notification permission on first launch, before the app has earned anything, gets both denied.",
          ar: "الحجز بلا فائدة إن نسيه اللاعب. لكن طلب إذن التقويم والإشعارات عند أول فتح، قبل أن يكسب التطبيق أي ثقة، يؤدي إلى رفض الإذنين.",
        },
        solution: {
          en: "Permissions are asked at the moment they pay off — the calendar prompt appears right after a successful booking, not before. Reminders are scheduled locally so they still fire if the device is offline.",
          ar: "تُطلب الأذونات في اللحظة التي تُثمر فيها — يظهر طلب التقويم بعد حجز ناجح مباشرة، لا قبله. وتُجدوَل التذكيرات محليًا لتعمل حتى لو كان الجهاز دون اتصال.",
        },
      },
      {
        title: { en: "Deep links that survive an install", ar: "روابط عميقة تنجو من التثبيت" },
        problem: {
          en: "Growth happens when someone shares a match invite in a group chat. If the tap opens a store page and the invite is lost after installing, the whole loop breaks.",
          ar: "يحدث النمو حين يشارك أحدهم دعوة مباراة في محادثة جماعية. وإن فتحت النقرة صفحة المتجر وضاعت الدعوة بعد التثبيت، انكسرت الحلقة كلها.",
        },
        solution: {
          en: "Invite links carry their payload through the install, so a new user lands on the actual match after opening the app for the first time — not on a generic home screen.",
          ar: "تحمل روابط الدعوة حمولتها عبر التثبيت، فيصل المستخدم الجديد إلى المباراة نفسها بعد أول فتح للتطبيق — لا إلى شاشة رئيسية عامة.",
        },
      },
    ],
    outcomes: {
      en: [
        "Live on the App Store and Google Play.",
        "Bookings, team search, challenges and tournaments in one app.",
        "Built and operated solo, from schema to store listing.",
      ],
      ar: [
        "متاح على App Store وGoogle Play.",
        "الحجوزات والبحث عن فرق والتحديات والبطولات في تطبيق واحد.",
        "بُني ويُشغَّل منفردًا، من المخطط حتى صفحة المتجر.",
      ],
    },
    sourced: true,
  },
  {
    slug: "naqi",
    title: { en: "Naqi — Halal Video Filter", ar: "نقيّ — مُرشِّح الفيديو" },
    tagline: {
      en: "Strips music and censors imagery in a video — entirely on your device.",
      ar: "يزيل الموسيقى ويحجب الصور في الفيديو — على جهازك بالكامل.",
    },
    summary: {
      en: "Naqi filters a video locally: stem separation removes the music while keeping dialogue, and a detector blurs faces or whole frames for the chosen strictness. No cloud, no account, no telemetry, and the original file is never modified. Shipped on Android; a full Swift rewrite targets iPhone, iPad and Mac.",
      ar: "يُرشِّح «نقيّ» الفيديو محليًا: فصل المسارات يزيل الموسيقى مع الإبقاء على الحوار، وكاشف يُشوّش الوجوه أو الإطار كاملًا حسب درجة التشدّد المختارة. بلا سحابة ولا حساب ولا تتبّع، ولا يُعدَّل الملف الأصلي أبدًا. صدر على أندرويد، وتجري إعادة كتابته بالكامل بلغة Swift لأجهزة iPhone وiPad وMac.",
    },
    category: "ai",
    status: "shipped",
    featured: true,
    year: "2026",
    role: { en: "Solo — architecture, ML pipeline and both platforms", ar: "منفردًا — المعمارية وخط المعالجة والمنصتان" },
    stack: ["Kotlin", "Swift", "ONNX Runtime", "MediaCodec", "OpenGL ES", "AVFoundation", "htdemucs", "NudeNet", "Jetpack Compose", "SwiftUI"],
    cover: "/projects/naqi-01-home.png",
    gallery: ["/projects/naqi-01-home.png", "/projects/naqi-02-options.png", "/projects/naqi-03-jobs.png", "/projects/naqi-05-link.png", "/projects/naqi-04-about.png", "/apps/naqi-1.png", "/apps/naqi-2.png", "/apps/naqi-3.png"],
    links: {
      playGoogle: "https://play.google.com/store/apps/details?id=com.haithamassoli.naqi",
      github: "https://github.com/haithamassoli/NaqiHalalVideoFilter",
    },
    overview: {
      en: [
        "Plenty of tools will filter a video for you if you upload it somewhere. That trade is unacceptable for the people who want this most — the whole point is that nobody else sees what you are watching. So Naqi does everything on the device: models ship inside the app, and the only network call it ever makes is an optional model download.",
        "Two operations run independently or together. Removing music runs htdemucs stem separation and keeps vocals — or vocals plus other — while drums and bass are never kept. Censoring blurs the faces of a chosen gender for their whole on-screen span, and censors the entire frame while an NSFW classifier gate is firing, with pre-roll so nothing slips through on the frame the detector fired.",
        "The Android app is the shipped reference implementation. The Apple version is a ground-up Swift rewrite rather than a port: the Android pipeline is bound to MediaCodec, GLES and ORT-Android, and none of that crosses over.",
      ],
      ar: [
        "كثير من الأدوات تُرشِّح الفيديو نيابةً عنك إن رفعته إلى مكان ما. هذه المقايضة مرفوضة تمامًا لمن يريدون هذا أكثر من غيرهم — فجوهر الفكرة ألا يرى أحد آخر ما تشاهده. لذلك يُنفّذ «نقيّ» كل شيء على الجهاز: النماذج داخل التطبيق، والاتصال الشبكي الوحيد تنزيل اختياري للنماذج.",
        "تعمل عمليتان مستقلتين أو معًا. إزالة الموسيقى تُشغّل فصل المسارات htdemucs وتُبقي الأصوات البشرية — أو الأصوات مع «أخرى» — ولا تُبقي الطبول والبيس أبدًا. أما الحجب فيُشوّش وجوه الجنس المختار طوال ظهورها على الشاشة، ويحجب الإطار بأكمله ما دامت بوابة مصنّف المحتوى الإباحي مفعّلة، مع تمهيد زمني حتى لا يفلت شيء في الإطار الذي عمل فيه الكاشف.",
        "تطبيق أندرويد هو التنفيذ المرجعي المُصدَر. أما نسخة Apple فإعادة كتابة كاملة بـ Swift لا نقل: خط المعالجة في أندرويد مرتبط بـ MediaCodec وGLES وORT-Android، ولا شيء من ذلك يعبر.",
      ],
    },
    challenges: [
      {
        title: { en: "The pipeline does not port", ar: "خط المعالجة غير قابل للنقل" },
        problem: {
          en: "The obvious plan for the Apple version was to reuse the Android core. It does not survive contact: decode, GPU effects and inference are each welded to an Android-only API. Attempting a shared layer would have produced a lowest-common-denominator abstraction that fought both platforms.",
          ar: "كانت الخطة البديهية لنسخة Apple إعادة استخدام نواة أندرويد. لم تصمد: فك الترميز والتأثيرات على المعالج الرسومي والاستدلال، كل منها ملحوم بواجهة خاصة بأندرويد. ومحاولة بناء طبقة مشتركة كانت ستنتج تجريدًا بالحد الأدنى المشترك يصارع المنصتين معًا.",
        },
        solution: {
          en: "I accepted the rewrite and moved the shared asset up a level: instead of shared code, the Android build plus its QA clips became the parity suite. The Swift version is correct when its output matches the Android output on the same inputs, which is a far stronger contract than shared source would have given.",
          ar: "قبلت إعادة الكتابة ونقلت الأصل المشترك مستوىً أعلى: بدل شيفرة مشتركة، صارت نسخة أندرويد ومقاطع اختبارها هي مجموعة التكافؤ. تكون نسخة Swift صحيحة حين يطابق مخرجها مخرج أندرويد على المدخلات نفسها، وهو عقد أقوى بكثير مما كانت الشيفرة المشتركة ستقدّمه.",
        },
      },
      {
        title: { en: "A detector that fires late lets frames through", ar: "كاشف يتأخر يُمرِّر إطارات" },
        problem: {
          en: "A classifier decides frame by frame, so it necessarily fires on the frame that already contains what you did not want to see. Filtering only the flagged frames means the user sees the thing, briefly, every single time.",
          ar: "يقرّر المصنّف إطارًا بإطار، فيعمل بالضرورة عند الإطار الذي يحتوي أصلًا ما لم تُرِد رؤيته. والاكتفاء بترشيح الإطارات المُعلَّمة يعني أن المستخدم يرى الشيء، للحظة، في كل مرة.",
        },
        solution: {
          en: "Detection and rendering are separated by an edit decision list. A first pass builds spans with pre-roll before each detection and hysteresis so a flickering detector does not produce flickering censorship; the second pass renders those spans. The cost is two passes over the video, which is worth it.",
          ar: "فُصل الكشف عن العرض بقائمة قرارات تحرير. يبني المرور الأول مدَيات مع تمهيد قبل كل كشف، ومع تباطؤ يمنع كاشفًا مرتجفًا من إنتاج حجب مرتجف؛ ثم يعرض المرور الثاني تلك المدَيات. الكلفة مروران على الفيديو، وهي كلفة تستحق.",
        },
      },
      {
        title: { en: "Feature-length video on a phone", ar: "فيديو بطول فيلم على هاتف" },
        problem: {
          en: "Stem separation and per-frame inference over a two-hour file is long enough that the OS will kill the app, the user will switch away, or the battery will run out mid-job. Restarting from zero each time makes the feature unusable.",
          ar: "فصل المسارات والاستدلال على كل إطار في ملف مدته ساعتان يطول بما يكفي ليقتل النظام التطبيق، أو ينتقل المستخدم إلى غيره، أو تنفد البطارية في منتصف المهمة. والبدء من الصفر في كل مرة يجعل الميزة غير قابلة للاستخدام.",
        },
        solution: {
          en: "Jobs are checkpointed per segment and survive an app kill or a reboot — processing resumes where it stopped rather than restarting. Progress is reported per stage with a live estimate, so a long job at least looks like a long job instead of a frozen screen.",
          ar: "تُحفَظ نقاط تفتيش للمهام لكل مقطع، وتنجو من إغلاق التطبيق أو إعادة التشغيل — فتُستأنف المعالجة من حيث توقفت لا من البداية. ويُعرض التقدّم لكل مرحلة مع تقدير مباشر، فتبدو المهمة الطويلة مهمة طويلة لا شاشة متجمدة.",
        },
      },
      {
        title: { en: "Being honest about what it cannot do", ar: "الصدق بشأن ما لا يستطيعه" },
        problem: {
          en: "The failure mode of this category of app is overpromising. No detector is perfect, and a user who believes the filter is absolute is worse off than one who knows its limits.",
          ar: "نمط الفشل في هذا النوع من التطبيقات هو المبالغة في الوعود. لا كاشف مثالي، والمستخدم الذي يظن الترشيح مطلقًا في وضع أسوأ ممن يعرف حدوده.",
        },
        solution: {
          en: "The limits are documented in the README and stated in the app: uncertain detections are censored rather than skipped, an occasionally over-blurred frame is the accepted cost, and the output should be verified before it is relied on. The bias is deliberate and it is written down.",
          ar: "الحدود موثّقة في الـ README ومذكورة داخل التطبيق: تُحجب الكشوفات غير المؤكدة بدل تجاوزها، وإطار محجوب زيادةً أحيانًا كلفة مقبولة، ويجب التحقق من المخرج قبل الاعتماد عليه. التحيّز مقصود ومكتوب.",
        },
      },
    ],
    outcomes: {
      en: [
        "Shipped on Google Play; Apple rewrite in progress against an Android parity suite.",
        "Runs fully offline — models bundled, no accounts, no telemetry.",
        "Resumable jobs survive app kills and reboots.",
      ],
      ar: [
        "صدر على Google Play؛ وإعادة كتابة Apple جارية مقابل مجموعة تكافؤ أندرويد.",
        "يعمل دون اتصال بالكامل — نماذج مضمّنة، بلا حسابات وبلا تتبّع.",
        "مهام قابلة للاستئناف تنجو من إغلاق التطبيق وإعادة التشغيل.",
      ],
    },
    sourced: true,
  },
  {
    slug: "kashaf-alkulify",
    title: { en: "Kashaf Abi Ja'far", ar: "كشّاف أبي جعفر" },
    tagline: {
      en: "Search thousands of hours of lessons and land on the exact second.",
      ar: "ابحث في آلاف الساعات من الدروس، وصِل إلى الثانية بعينها.",
    },
    summary: {
      en: "A fully Arabic, right-to-left search engine over a scholar's video lessons and written articles. You type a phrase and get back the passages where it was actually said; one click opens the video at that exact second. No login, no database.",
      ar: "محرك بحث عربي بالكامل ومن اليمين إلى اليسار في دروس الشيخ المرئية ومقالاته المكتوبة. تكتب عبارة فتصلك المقاطع التي قيلت فيها فعلًا؛ ونقرة واحدة تفتح الفيديو عند الثانية نفسها. بلا تسجيل دخول وبلا قاعدة بيانات.",
    },
    category: "web",
    status: "live",
    featured: true,
    year: "2026",
    role: { en: "Solo — pipeline, search and interface", ar: "منفردًا — خط المعالجة والبحث والواجهة" },
    stack: ["Astro", "TypeScript", "Meilisearch", "Whisper ASR", "Tailwind CSS"],
    cover: "/projects/kashaf-alkulify.png",
    gallery: ["/projects/kashaf-alkulify.png"],
    links: { live: "https://alkulify.assoli.site", github: "https://github.com/haithamassoli/kashaf-alkulify" },
    overview: {
      en: [
        "A scholar with years of recorded lessons has, in practice, an unsearchable archive. The knowledge is there, but finding the ten minutes where a specific question was answered means remembering which lesson it was in and scrubbing through it.",
        "This site fixes that. Lessons from the YouTube channel are transcribed automatically, articles are collected from the blog, and everything is indexed in Meilisearch. A search returns transcript segments of roughly thirty seconds each; clicking one opens the player at that timestamp. Beside the player runs an interactive transcript that follows along, can be searched within the lesson, and lets you copy a link to any single line.",
        "There is no backend for search and no database — the index is static and served directly, which is why it stays fast and costs nothing to run.",
      ],
      ar: [
        "الشيخ الذي لديه سنوات من الدروس المسجلة يملك عمليًا أرشيفًا غير قابل للبحث. المعرفة موجودة، لكن إيجاد العشر دقائق التي أُجيب فيها عن سؤال بعينه يتطلب تذكّر الدرس ثم التنقّل داخله.",
        "يعالج الموقع ذلك. تُفرَّغ دروس قناة اليوتيوب آليًا، وتُجمَع المقالات من المدوّنة، ويُفهرس الكل في Meilisearch. يعيد البحث مقاطع تفريغ مدة كل منها نحو ثلاثين ثانية؛ والنقر على أحدها يفتح المشغّل عند تلك اللحظة. وبجانب المشغّل تفريغ تفاعلي يتابع تلقائيًا، ويمكن البحث داخله، ونسخ رابط لأي سطر.",
        "لا خادم للبحث ولا قاعدة بيانات — الفهرس ثابت ويُقدَّم مباشرة، ولهذا يبقى سريعًا وبلا كلفة تشغيل.",
      ],
    },
    challenges: [
      {
        title: { en: "Where does a search result begin?", ar: "أين تبدأ نتيجة البحث؟" },
        problem: {
          en: "Raw transcripts come out as a stream of short caption lines. Indexing each line makes every result a fragment with no context; indexing whole lessons makes every result a two-hour video with no useful timestamp.",
          ar: "تخرج التفريغات الخام كتدفق أسطر قصيرة. فهرسة كل سطر تجعل كل نتيجة شذرة بلا سياق؛ وفهرسة الدرس كاملًا تجعل كل نتيجة فيديو من ساعتين بلا لحظة مفيدة.",
        },
        solution: {
          en: "I chunk the transcript into roughly thirty-second passages that keep their start time. That is long enough to read as a thought and short enough that the timestamp is precise — the result is a readable quote that is also a jump target.",
          ar: "قسّمت التفريغ إلى مقاطع بنحو ثلاثين ثانية تحتفظ بوقت بدايتها. طويلة بما يكفي لتُقرأ كفكرة، وقصيرة بما يجعل اللحظة دقيقة — فتكون النتيجة اقتباسًا مقروءًا ونقطة انتقال في آن.",
        },
      },
      {
        title: { en: "Arabic does not match itself", ar: "العربية لا تطابق نفسها" },
        problem: {
          en: "The same word appears with and without diacritics, with أ / إ / ا used interchangeably, with ة and ه confused, and with tatweel stretching letters. A visitor searching the phrase they remember hearing rarely types it the way the transcriber wrote it.",
          ar: "تظهر الكلمة نفسها بالتشكيل وبدونه، وبتبادل أ/إ/ا، وبالخلط بين ة وه، وبالتطويل الذي يمدّ الحروف. والزائر الذي يبحث عن عبارة يتذكّر سماعها نادرًا ما يكتبها كما كتبها المُفرِّغ.",
        },
        solution: {
          en: "Normalisation runs identically over the index and the query, so both sides are reduced to the same canonical form before matching. Anything else produces a search that works for the person who built it and nobody else.",
          ar: "يُطبَّق التطبيع نفسه على الفهرس والاستعلام معًا، فيُختزل الطرفان إلى الصورة المعيارية ذاتها قبل المطابقة. وأي بديل ينتج بحثًا يعمل لمن بناه وحده.",
        },
      },
      {
        title: { en: "Automatic transcription is imperfect", ar: "التفريغ الآلي غير كامل" },
        problem: {
          en: "ASR misreads names, technical terms and classical vocabulary — exactly the words people search for. Presenting a wrong transcript as authoritative text would misrepresent the scholar, which matters far more here than a bad search result.",
          ar: "يخطئ التعرّف الآلي على الكلام في الأسماء والمصطلحات والألفاظ التراثية — وهي بالضبط ما يبحث عنه الناس. وتقديم تفريغ خاطئ كنصّ موثوق يُحرّف كلام الشيخ، وهو أخطر هنا بكثير من نتيجة بحث سيئة.",
        },
        solution: {
          en: "The transcript is framed as an index into the audio, not as a quotable source. Every result leads back to the recording at that moment, so the video stays the authority and the text is only the way you find it.",
          ar: "يُقدَّم التفريغ بوصفه فهرسًا إلى الصوت لا مصدرًا للاقتباس. وكل نتيجة تعيدك إلى التسجيل عند تلك اللحظة، فيبقى الفيديو هو المرجع والنص مجرد وسيلة للوصول إليه.",
        },
      },
      {
        title: { en: "Search with no server to search on", ar: "بحث بلا خادم يبحث عليه" },
        problem: {
          en: "A always-on search backend for a free, non-commercial site is a recurring cost and a thing that can go down at 3am with nobody on call.",
          ar: "خادم بحث دائم التشغيل لموقع مجاني غير تجاري يعني كلفة متكررة وشيئًا قد يتعطّل في الثالثة فجرًا دون أحد للمناوبة.",
        },
        solution: {
          en: "The site is built with Astro and ships a static index that the browser queries directly. Nothing needs to be running for search to work, which is the right operational profile for a project meant to outlive my attention to it.",
          ar: "بُني الموقع بـ Astro ويُصدِّر فهرسًا ثابتًا يستعلمه المتصفح مباشرة. لا شيء يحتاج أن يكون قيد التشغيل ليعمل البحث، وهو الملمح التشغيلي الصحيح لمشروع يُراد له أن يعيش بعد انصراف انتباهي عنه.",
        },
      },
    ],
    outcomes: {
      en: [
        "Two searchable corpora — lessons and articles — with per-tab result counts and playlist filtering.",
        "Every result is a deep link into the video at the second it was said.",
        "Static, serverless search: no database, no login, no running cost.",
      ],
      ar: [
        "مدوّنتان قابلتان للبحث — الدروس والمقالات — مع عدّاد نتائج لكل تبويب وتصفية بقوائم التشغيل.",
        "كل نتيجة رابط عميق إلى الفيديو عند الثانية التي قيلت فيها.",
        "بحث ثابت بلا خادم: بلا قاعدة بيانات وبلا تسجيل دخول وبلا كلفة تشغيل.",
      ],
    },
    sourced: true,
  },
  {
    slug: "pastehtml",
    title: { en: "pastehtml", ar: "pastehtml" },
    tagline: {
      en: "Drop an HTML file, get a public URL on its own origin.",
      ar: "أفلِت ملف HTML، واحصل على رابط عام على نطاق مستقل.",
    },
    summary: {
      en: "Publish a page in one step — drop a file, paste markup, curl it, or hand it to an agent over MCP. Markdown is rendered to a self-contained page on upload. No account, no build step.",
      ar: "انشر صفحة بخطوة واحدة — أفلِت ملفًا، أو الصق شيفرة، أو أرسلها بـ curl، أو مرّرها لوكيل عبر MCP. ويُحوَّل الـ Markdown إلى صفحة مكتفية بذاتها عند الرفع. بلا حساب وبلا خطوة بناء.",
    },
    category: "web",
    status: "live",
    featured: true,
    year: "2026",
    role: { en: "Solo", ar: "منفردًا" },
    stack: ["Next.js", "TypeScript", "Convex", "MCP", "Tailwind CSS"],
    cover: "/projects/pastehtml.png",
    gallery: ["/projects/pastehtml.png"],
    links: { live: "https://pastehtml.assoli.site", github: "https://github.com/haithamassoli/pastehtml" },
    overview: {
      en: [
        "I kept generating single-file HTML pages — reports, mockups, one-off tools — and having nowhere to put them. Every option was heavier than the artefact: a repo and a deploy for a page that exists to be looked at once.",
        "pastehtml is the missing step. Every route — the drop zone, a paste, a curl, an MCP call from an agent — ends at the same function, and comes back with a URL. Markdown is converted to real HTML at upload time, so the stored paste is a page and every surface below it behaves identically: the live origin, the raw view, the sandboxed preview, the ETag.",
      ],
      ar: [
        "كنت أُولّد باستمرار صفحات HTML بملف واحد — تقارير ونماذج وأدوات لمرة واحدة — ولا أجد أين أضعها. كل الخيارات أثقل من الشيء نفسه: مستودع ونشر لصفحة وُجدت لتُرى مرة.",
        "pastehtml هو الخطوة الناقصة. كل مسار — منطقة الإفلات، أو اللصق، أو curl، أو نداء MCP من وكيل — ينتهي عند الدالة نفسها، ويعود برابط. ويُحوَّل الـ Markdown إلى HTML حقيقي عند الرفع، فتكون النسخة المخزّنة صفحةً وتتصرّف كل الواجهات تحتها بالطريقة ذاتها: النطاق المباشر، والعرض الخام، والمعاينة المعزولة، وETag.",
      ],
    },
    challenges: [
      {
        title: { en: "Hosting arbitrary HTML is hosting arbitrary JavaScript", ar: "استضافة HTML عشوائي هي استضافة JavaScript عشوائي" },
        problem: {
          en: "A paste is a full page with scripts in it. Serve all pastes from one domain and any one of them can read the cookies, storage and DOM of every other — the service becomes a hosted cross-site scripting platform.",
          ar: "كل نسخة صفحة كاملة تحوي شيفرات. ولو قُدّمت كل النسخ من نطاق واحد لأمكن لأيٍّ منها قراءة الكعكات والتخزين وDOM لكل النسخ الأخرى — فتتحول الخدمة إلى منصة استضافة لهجمات XSS.",
        },
        solution: {
          en: "Each paste is served from its own origin, so the browser's own same-origin policy does the isolation rather than a sanitiser I would have to keep ahead of. Sanitising untrusted HTML is a losing race; giving it nothing worth stealing is not.",
          ar: "تُقدَّم كل نسخة من نطاق خاص بها، فتتولى سياسة أصل المتصفح نفسها العزل بدل مُنقٍّ عليّ أن أظل متقدمًا عليه. تنقية HTML غير موثوق سباق خاسر؛ أما ألا تترك له ما يستحق السرقة فليس كذلك.",
        },
      },
      {
        title: { en: "Link previews need per-page tags", ar: "معاينات الروابط تحتاج وسومًا لكل صفحة" },
        problem: {
          en: "A shared link should preview as the page it points to. But the page belongs to the user, who did not write Open Graph tags, and injecting them into their markup would mean rewriting their document.",
          ar: "ينبغي أن يُعاين الرابط المشارَك بوصفه الصفحة التي يشير إليها. لكن الصفحة تخصّ المستخدم الذي لم يكتب وسوم Open Graph، وحقنها في شيفرته يعني إعادة كتابة مستنده.",
        },
        solution: {
          en: "Crawlers are detected at the edge and rewritten to a separate function that renders OG tags for that paste, while human visitors get the untouched document. The user's HTML is never modified — the crawler simply gets a different response.",
          ar: "تُكتشف زواحف الفهرسة عند الحافة وتُحوَّل إلى دالة منفصلة تُنتج وسوم OG لتلك النسخة، بينما يحصل الزائر البشري على المستند كما هو. لا تُعدَّل شيفرة المستخدم أبدًا — الزاحف وحده يتلقى استجابة مختلفة.",
        },
      },
      {
        title: { en: "One publish path, four entry points", ar: "مسار نشر واحد وأربع نقاط دخول" },
        problem: {
          en: "A drop zone, a paste box, a REST call and an MCP tool are four different clients. Implementing publishing four times guarantees they drift apart, and the agent path — the one I most wanted — would be the least tested.",
          ar: "منطقة الإفلات وصندوق اللصق ونداء REST وأداة MCP أربعة عملاء مختلفين. وتنفيذ النشر أربع مرات يضمن تباعدها، ويكون مسار الوكيل — وهو أكثر ما أردته — أقلّها اختبارًا.",
        },
        solution: {
          en: "All four are thin shells over a single Convex function. Whatever works from the browser works identically from curl and from an agent, because it is the same code path.",
          ar: "الأربعة أغلفة رقيقة فوق دالة Convex واحدة. وما يعمل من المتصفح يعمل بالطريقة ذاتها من curl ومن وكيل، لأنه مسار الشيفرة نفسه.",
        },
      },
    ],
    outcomes: {
      en: [
        "Publish from a browser, a terminal, or an AI agent over MCP.",
        "Per-paste origins, so pages cannot reach each other.",
        "Markdown becomes a styled, self-contained page at upload.",
      ],
      ar: [
        "النشر من المتصفح أو الطرفية أو وكيل ذكاء اصطناعي عبر MCP.",
        "نطاق مستقل لكل نسخة، فلا تصل الصفحات إلى بعضها.",
        "يتحوّل الـ Markdown إلى صفحة منسّقة مكتفية بذاتها عند الرفع.",
      ],
    },
    sourced: true,
  },
  {
    slug: "majalis",
    title: { en: "Al-Tibyan Educational Center", ar: "مركز التبيان التعليمي" },
    tagline: {
      en: "Quran memorisation circles, run properly on a phone.",
      ar: "حلقات تحفيظ القرآن، تُدار كما ينبغي من الهاتف.",
    },
    summary: {
      en: "A companion app for a Quran teaching and memorisation centre, linking the centre, the student and the family. Students sit in circles that mirror the real ones, the teacher follows a student's recitation on a synchronised mushaf, and games and tests turn revision into something students return to.",
      ar: "تطبيق مرافق لمركز تعليم القرآن وتحفيظه، يربط المركز بالطالب وأسرته. يجلس الطلاب في حلقات تحاكي الواقع، ويتابع المعلّم تلاوة الطالب على مصحف متزامن، وتحوّل الألعاب والاختبارات المراجعة إلى شيء يعود إليه الطلاب.",
    },
    category: "mobile",
    status: "shipped",
    featured: true,
    year: "2025",
    role: { en: "Solo — mobile and backend", ar: "منفردًا — الموبايل والخادم" },
    stack: ["React Native", "TypeScript", "Firebase", "Zustand", "React Query", "Reanimated", "Skia", "Restyle", "Zod", "Push Notifications"],
    cover: "/apps/majalis-1.png",
    gallery: ["/apps/majalis-1.png", "/apps/majalis-2.png", "/apps/majalis-3.png", "/apps/majalis-4.png", "/apps/majalis-5.png", "/apps/majalis-6.png"],
    links: { playGoogle: "https://play.google.com/store/apps/details?id=com.haithamassoli.majalis" },
    overview: {
      en: [
        "A memorisation centre runs on relationships that software usually flattens: a teacher knows where each student stopped, what they struggle with, and whether the family is following along. Most apps replace that with a progress bar.",
        "This one models the actual structure. Circles mirror the real ones. During recitation the teacher sees the same page the student is reading, so they can follow and correct without asking the student to say where they are. Parents get visibility into their child's progress without having to phone the centre.",
        "The competitive layer — tests, games and a leaderboard — exists because revision is the part students skip, and it is the part that decides whether memorisation holds.",
      ],
      ar: [
        "يقوم مركز التحفيظ على علاقات تُسطّحها البرمجيات عادةً: المعلّم يعرف أين وقف كل طالب، وما يتعثّر فيه، وهل تتابع الأسرة أم لا. ومعظم التطبيقات تستبدل بذلك شريط تقدّم.",
        "يُنمذج هذا التطبيق البنية الفعلية. الحلقات تحاكي الحلقات الحقيقية. وأثناء التلاوة يرى المعلّم الصفحة نفسها التي يقرؤها الطالب، فيتابع ويصحّح دون أن يسأله أين وصل. ويطّلع الأهل على تقدّم أبنائهم دون الاتصال بالمركز.",
        "أما الطبقة التنافسية — الاختبارات والألعاب ولوحة المتصدرين — فموجودة لأن المراجعة هي ما يتجاوزه الطلاب، وهي ما يحدّد ثبات الحفظ.",
      ],
    },
    challenges: [
      {
        title: { en: "The mushaf is not a text view", ar: "المصحف ليس عرض نصّ" },
        problem: {
          en: "Quranic text has to be laid out exactly — the page breaks, line breaks and word positions are fixed, and readers notice immediately when they are not. Standard text rendering reflows, which makes the page wrong.",
          ar: "يجب أن يُخرَج النص القرآني بدقة — فواصل الصفحات والأسطر ومواضع الكلمات ثابتة، ويلحظ القارئ الاختلاف فورًا. أما عرض النص المعتاد فيعيد التدفق، فتصير الصفحة خاطئة.",
        },
        solution: {
          en: "Pages are drawn on a Skia canvas with fixed geometry rather than laid out as flowing text, so a page looks the same on every device size and word-level positions stay addressable for highlighting.",
          ar: "تُرسم الصفحات على لوحة Skia بهندسة ثابتة بدل إخراجها كنص متدفق، فتبدو الصفحة واحدة على كل مقاسات الأجهزة وتبقى مواضع الكلمات قابلة للعنونة لأجل التظليل.",
        },
      },
      {
        title: { en: "Two devices on the same page", ar: "جهازان على الصفحة نفسها" },
        problem: {
          en: "The teacher's view has to track the student's position closely enough to be useful for correction. Polling is too slow to feel connected, and pushing every scroll event floods the connection in a circle of a dozen students.",
          ar: "يجب أن تتابع شاشة المعلّم موضع الطالب بدقة تكفي للتصحيح. والاستطلاع الدوري أبطأ من أن يبدو متصلًا، وبثّ كل حدث تمرير يُغرق الاتصال في حلقة فيها عشرات الطلاب.",
        },
        solution: {
          en: "Position updates are throttled and sent as a compact cursor rather than a stream of scroll events, and only within an active session. The teacher sees the current line quickly without the app maintaining a live channel per student all day.",
          ar: "تُقنَّن تحديثات الموضع وتُرسل كمؤشر مضغوط بدل تدفق أحداث تمرير، وضمن جلسة نشطة فقط. فيرى المعلّم السطر الحالي بسرعة دون أن يُبقي التطبيق قناة حيّة لكل طالب طوال اليوم.",
        },
      },
      {
        title: { en: "Three roles, one codebase", ar: "ثلاثة أدوار وقاعدة شيفرة واحدة" },
        problem: {
          en: "Teacher, student and parent need genuinely different screens and different permissions, but shipping three apps for one centre is unreasonable to build and worse to maintain.",
          ar: "يحتاج المعلّم والطالب وولي الأمر شاشات مختلفة فعلًا وصلاحيات مختلفة، لكن إصدار ثلاثة تطبيقات لمركز واحد غير معقول في البناء وأسوأ في الصيانة.",
        },
        solution: {
          en: "One app with role-derived navigation, and the permissions enforced server-side in security rules rather than by hiding buttons. A student who inspects the traffic still cannot read another circle's data.",
          ar: "تطبيق واحد بتنقّل مشتق من الدور، مع فرض الصلاحيات على الخادم في قواعد الأمان لا بإخفاء الأزرار. فالطالب الذي يفحص الاتصال لا يستطيع قراءة بيانات حلقة أخرى.",
        },
      },
    ],
    outcomes: {
      en: [
        "Live on Google Play, serving a real centre's teachers, students and parents.",
        "Synchronised recitation view for teacher-led correction.",
        "Revision framed as tests, games and a leaderboard.",
      ],
      ar: [
        "متاح على Google Play، ويخدم معلّمي مركز حقيقي وطلابه وأولياء أمورهم.",
        "عرض تلاوة متزامن للتصحيح بقيادة المعلّم.",
        "المراجعة مصاغة كاختبارات وألعاب ولوحة متصدرين.",
      ],
    },
    sourced: true,
  },
  {
    slug: "eecommittee",
    title: { en: "EECommittee", ar: "لجنة الهندسة الكهربائية" },
    tagline: {
      en: "Every resource an electrical engineering student needs, in one place.",
      ar: "كل ما يحتاجه طالب الهندسة الكهربائية، في مكان واحد.",
    },
    summary: {
      en: "Pick any subject from the study plan tree and get everything attached to it — material, recordings, staff contacts. Includes a GPA calculator, bilingual Arabic/English search, and a night mode. Volunteer work that has outlived several intakes of students.",
      ar: "اختر أي مادة من شجرة الخطة الدراسية واحصل على كل ما يتعلق بها — مواد وتسجيلات وبيانات الهيئة التدريسية. ويتضمن حاسبة معدّل، وبحثًا ثنائي اللغة بالعربية والإنجليزية، ووضعًا ليليًا. عمل تطوعي عاش أكثر من دفعة طلابية.",
    },
    category: "mobile",
    status: "shipped",
    featured: true,
    year: "2022 — Present",
    role: { en: "Volunteer — mobile and backend", ar: "متطوّع — الموبايل والخادم" },
    stack: ["React Native", "Expo", "TypeScript", "Firebase", "Zustand", "React Query", "Reanimated", "Zod", "Caching"],
    cover: "/apps/eecommittee-2.png",
    gallery: ["/apps/eecommittee-1.png", "/apps/eecommittee-2.png", "/apps/eecommittee-3.png", "/apps/eecommittee-4.png", "/apps/eecommittee-5.png", "/apps/eecommittee-6.png"],
    links: {
      playGoogle: "https://play.google.com/store/apps/details?id=com.haithamassoli.EECommitte",
      github: "https://github.com/haithamassoli/EECommitte-App",
    },
    overview: {
      en: [
        "The committee had been answering the same questions in the same Facebook group for years: which prerequisites does this subject have, who teaches it, where are the notes, what will my GPA be if this goes badly.",
        "The app turns that into structure. The study plan is a navigable tree, so a subject is a destination with everything hanging off it. Staff details are searchable. The GPA box projects both semester and cumulative results before the semester ends.",
        "It is the longest-running thing I maintain, and the constraint that shapes it is that I am not paid for it — anything that needs constant attention does not survive.",
      ],
      ar: [
        "ظلّت اللجنة تجيب عن الأسئلة نفسها في مجموعة فيسبوك نفسها سنوات: ما متطلبات هذه المادة، ومن يدرّسها، وأين الملخصات، وكم سيصير معدّلي إن ساءت الأمور.",
        "يحوّل التطبيق ذلك إلى بنية. الخطة الدراسية شجرة قابلة للتنقّل، فتصير المادة وجهةً يتدلّى منها كل شيء. وبيانات الهيئة التدريسية قابلة للبحث. وتتوقّع حاسبة المعدّل نتيجة الفصل والتراكمي قبل انتهاء الفصل.",
        "هو أطول ما أتولى صيانته عمرًا، والقيد الذي يشكّله أنني لا أتقاضى عليه أجرًا — فأي شيء يحتاج انتباهًا دائمًا لا ينجو.",
      ],
    },
    challenges: [
      {
        title: { en: "Searching in two languages at once", ar: "البحث بلغتين في آن" },
        problem: {
          en: "Students refer to the same subject as 'Signals', 'إشارات', or a course code, often switching mid-sentence. Indexing one language means half the searches fail silently.",
          ar: "يشير الطلاب إلى المادة نفسها بـ Signals أو «إشارات» أو برمز المساق، وكثيرًا ما يبدّلون في منتصف الجملة. وفهرسة لغة واحدة تعني فشل نصف عمليات البحث بصمت.",
        },
        solution: {
          en: "Every subject carries both names and its code in one searchable field, normalised on both sides. A query in either language, or a code, reaches the same subject.",
          ar: "تحمل كل مادة اسميها ورمزها في حقل واحد قابل للبحث، مُطبَّع من الطرفين. فيصل الاستعلام بأي لغة، أو بالرمز، إلى المادة نفسها.",
        },
      },
      {
        title: { en: "A campus network you cannot rely on", ar: "شبكة جامعية لا يُعتمد عليها" },
        problem: {
          en: "Students open the app between lectures, in corridors and basements where the connection is unreliable. Every screen hitting the network makes the app feel broken in exactly the place it is used.",
          ar: "يفتح الطلاب التطبيق بين المحاضرات، في الممرات والطوابق السفلية حيث الاتصال غير موثوق. وأي شاشة تتصل بالشبكة تجعل التطبيق يبدو معطلًا في المكان الذي يُستخدم فيه بالضبط.",
        },
        solution: {
          en: "The plan tree and staff directory are cached aggressively and treated as slow-changing data, so the app opens instantly from cache and revalidates in the background rather than blocking on a request.",
          ar: "تُخزَّن شجرة الخطة ودليل الهيئة التدريسية بقوة وتُعامَل كبيانات بطيئة التغيّر، فيفتح التطبيق فورًا من الذاكرة ويُعيد التحقق في الخلفية بدل الانتظار على طلب.",
        },
      },
      {
        title: { en: "Content that must outlive its maintainer", ar: "محتوى يجب أن يعيش بعد صائنه" },
        problem: {
          en: "Study plans change, staff move, and I am one volunteer. An app that needs a code release every time a course is renamed dies the moment I get busy.",
          ar: "تتغيّر الخطط الدراسية، وينتقل أعضاء الهيئة، وأنا متطوّع واحد. والتطبيق الذي يحتاج إصدار شيفرة كلما تغيّر اسم مساق يموت لحظة انشغالي.",
        },
        solution: {
          en: "All of it is content in Firebase, editable by committee members without touching the app. My job is the client; keeping the data current is theirs, which is the only arrangement that lasts.",
          ar: "كل ذلك محتوى في Firebase، قابل للتعديل من أعضاء اللجنة دون المساس بالتطبيق. مهمتي التطبيق، وتحديث البيانات مهمتهم، وهو الترتيب الوحيد الذي يدوم.",
        },
      },
    ],
    outcomes: {
      en: [
        "Published on Google Play and maintained across multiple student intakes.",
        "About eleven services behind one search box.",
        "Content editable by the committee without a release.",
      ],
      ar: [
        "منشور على Google Play ومُصان عبر دفعات طلابية متعددة.",
        "نحو أحد عشر خدمة خلف صندوق بحث واحد.",
        "محتوى قابل للتعديل من اللجنة دون إصدار جديد.",
      ],
    },
    sourced: true,
  },
  {
    slug: "rooh-al-jouf",
    title: { en: "Rooh Al-Jouf", ar: "روح الجوف" },
    tagline: {
      en: "A digital guide to the Al-Jouf region and everything in it.",
      ar: "دليلك الرقمي لمنطقة الجوف وكل ما فيها.",
    },
    summary: {
      en: "A bilingual tourism guide for Al-Jouf in Saudi Arabia: heritage and tourist sites, live events and festivals, a directory of local restaurants and cafés, and the historical and cultural background behind them. Built for both a first-time visitor and a resident.",
      ar: "دليل سياحي ثنائي اللغة لمنطقة الجوف في السعودية: المواقع التراثية والسياحية، والفعاليات والمهرجانات الجارية، ودليل المطاعم والمقاهي المحلية، والخلفية التاريخية والثقافية وراءها. مبني للزائر الجديد وللمقيم معًا.",
    },
    category: "mobile",
    status: "shipped",
    featured: true,
    year: "2025",
    role: { en: "Client project — mobile development", ar: "مشروع لعميل — تطوير الموبايل" },
    stack: ["React Native", "Expo Router", "TypeScript", "i18n", "Firebase", "React Query", "Reanimated", "Deep Linking"],
    cover: "/apps/rooh-al-jouf-3.png",
    gallery: ["/apps/rooh-al-jouf-1.png", "/apps/rooh-al-jouf-2.png", "/apps/rooh-al-jouf-3.png", "/apps/rooh-al-jouf-4.png", "/apps/rooh-al-jouf-5.png", "/apps/roohaljouf-android-1.png", "/apps/roohaljouf-android-2.png"],
    links: {
      appStore: "https://apps.apple.com/us/app/rooh-al-jouf/id6743066965",
      playGoogle: "https://play.google.com/store/apps/details?id=com.saudiarabia.roohaljouf",
    },
    overview: {
      en: [
        "Regional tourism apps usually fail in one of two ways: they are a brochure that never changes, or they are a map with pins and no reason to care about any of them. Al-Jouf has genuine depth — heritage sites, seasonal festivals, a food scene — and the client wanted all of it in one place.",
        "The app covers sites, events, and places to eat, each with the historical and cultural context that makes a visit worth making. It is fully bilingual, which for a Saudi tourism product is not a nice-to-have.",
      ],
      ar: [
        "تفشل تطبيقات السياحة الإقليمية عادةً بإحدى طريقتين: إما كتيّب لا يتغير، وإما خريطة بدبابيس بلا سبب يجعلك تهتم بأيٍّ منها. وللجوف عمق حقيقي — مواقع تراثية ومهرجانات موسمية ومشهد طعام — وأراد العميل ذلك كله في مكان واحد.",
        "يغطي التطبيق المواقع والفعاليات وأماكن الطعام، ولكلٍّ سياقه التاريخي والثقافي الذي يجعل الزيارة تستحق. وهو ثنائي اللغة بالكامل، وهذا في منتج سياحي سعودي ليس ترفًا.",
      ],
    },
    challenges: [
      {
        title: { en: "Bilingual means the layout mirrors, not just the words", ar: "ثنائية اللغة تعني انعكاس التخطيط لا الكلمات وحدها" },
        problem: {
          en: "Switching to Arabic flips the entire interface: navigation direction, icon orientation, list alignment, back gestures. Translating strings alone produces an app that reads Arabic but behaves English.",
          ar: "التبديل إلى العربية يقلب الواجهة كلها: اتجاه التنقّل، واتجاه الأيقونات، ومحاذاة القوائم، وإيماءات الرجوع. وترجمة النصوص وحدها تنتج تطبيقًا يقرأ بالعربية ويتصرّف بالإنجليزية.",
        },
        solution: {
          en: "Direction is a property of the whole tree rather than a per-screen fix, so layout, navigation and gestures all mirror together. Anything directional is expressed in start/end terms instead of left/right.",
          ar: "الاتجاه خاصية للشجرة كلها لا إصلاح لكل شاشة، فينعكس التخطيط والتنقّل والإيماءات معًا. وكل ما هو اتجاهي يُعبَّر عنه ببداية/نهاية بدل يمين/يسار.",
        },
      },
      {
        title: { en: "Events go stale faster than releases ship", ar: "تتقادم الفعاليات أسرع من صدور التحديثات" },
        problem: {
          en: "A festival listing that is a week out of date is worse than no listing. Store review cycles are far slower than the pace at which a seasonal events calendar changes.",
          ar: "قائمة مهرجانات متأخرة أسبوعًا أسوأ من غياب القائمة. ودورات مراجعة المتاجر أبطأ بكثير من إيقاع تغيّر تقويم الفعاليات الموسمي.",
        },
        solution: {
          en: "Events, sites and venues are all remote content the client edits directly. Shipping a build is never on the critical path for keeping the app current.",
          ar: "الفعاليات والمواقع والأماكن كلها محتوى بعيد يحرّره العميل مباشرة. فلا يقع إصدار نسخة على المسار الحرج لإبقاء التطبيق محدّثًا.",
        },
      },
      {
        title: { en: "Heavy imagery on a tourist's connection", ar: "صور ثقيلة على اتصال سائح" },
        problem: {
          en: "A guide is mostly photographs, and it is opened by people on roaming data at a heritage site with one bar of signal — the worst possible conditions for the app's heaviest content.",
          ar: "الدليل صور في معظمه، ويفتحه أناس على بيانات تجوال عند موقع تراثي بإشارة واحدة — أسوأ الظروف الممكنة لأثقل محتوى في التطبيق.",
        },
        solution: {
          en: "Images are served at the size they are displayed and cached on disk after first view, so browsing back through places already seen costs nothing.",
          ar: "تُقدَّم الصور بالمقاس المعروض وتُخزَّن على القرص بعد أول مشاهدة، فلا يكلّف التصفح رجوعًا في أماكن رُئيت من قبل شيئًا.",
        },
      },
    ],
    outcomes: {
      en: [
        "Shipped on both the App Store and Google Play for a Saudi client.",
        "Fully bilingual with a properly mirrored right-to-left layout.",
        "Content managed by the client without app releases.",
      ],
      ar: [
        "صدر على App Store وGoogle Play لعميل سعودي.",
        "ثنائي اللغة بالكامل مع تخطيط منعكس بشكل صحيح من اليمين إلى اليسار.",
        "محتوى يديره العميل دون إصدارات جديدة للتطبيق.",
      ],
    },
    sourced: true,
  },
  {
    slug: "fazuwjuh",
    title: { en: "Fazawwijuhu", ar: "فَزَوِّجُوهُ" },
    tagline: {
      en: "A supervised platform for lawful marriage introductions.",
      ar: "منصة لتيسير الزواج الشرعي بإشراف إداري.",
    },
    summary: {
      en: "A platform that introduces people seeking marriage under explicit, published conditions with administrative supervision throughout — deliberately structured to keep the process within religious bounds rather than reproducing a dating app.",
      ar: "منصة تُعرِّف الراغبين والراغبات في الزواج وفق شروط واضحة معلنة مع إشراف إداري في كل مرحلة — مبنيّة عمدًا لإبقاء العملية ضمن الحدود الشرعية بدل استنساخ تطبيقات المواعدة.",
    },
    category: "web",
    status: "live",
    featured: false,
    year: "2026",
    role: { en: "Solo", ar: "منفردًا" },
    stack: ["Next.js 16", "React 19", "TypeScript", "Convex", "Better Auth", "Tailwind v4", "shadcn", "Base UI"],
    cover: "/projects/fazuwjuh.png",
    gallery: ["/projects/fazuwjuh.png"],
    links: { live: "https://fazuwjuh.vercel.app", github: "https://github.com/haithamassoli/fazuwjuh" },
    overview: {
      en: [
        "The default shape of this product is a dating app, and the default shape is exactly what the users this is for want to avoid. The design problem was structural rather than visual: what does the flow look like when open browsing and private messaging are the things you are trying to prevent?",
        "The answer was a form-driven, admin-supervised pipeline. Applicants answer a structured questionnaire that differs by gender, agree to explicit published conditions, and every introduction passes through administrative review rather than happening directly between two users.",
        "Built on Convex with Better Auth, where the server holds the rules and the client is only a view of them.",
      ],
      ar: [
        "الشكل الافتراضي لهذا المنتج تطبيق مواعدة، والشكل الافتراضي هو بالضبط ما يريد مستخدموه تجنّبه. فكانت مشكلة التصميم بنيوية لا بصرية: كيف يبدو المسار حين يكون التصفح المفتوح والمراسلة الخاصة هما ما تحاول منعه؟",
        "كان الجواب مسارًا قائمًا على استمارات وبإشراف إداري. يجيب المتقدمون عن استبيان منظّم يختلف بحسب الجنس، ويوافقون على شروط معلنة صريحة، وتمرّ كل تعريفة عبر مراجعة إدارية بدل أن تقع مباشرة بين طرفين.",
        "بُنيت على Convex مع Better Auth، حيث تُحفظ القواعد على الخادم ولا يكون العميل إلا عرضًا لها.",
      ],
    },
    challenges: [
      {
        title: { en: "The rules are the product, so they cannot live in the UI", ar: "القواعد هي المنتج، فلا يمكن أن تسكن الواجهة" },
        problem: {
          en: "If eligibility and visibility rules are enforced by which screens the client renders, anyone who inspects the network can step around them. For this product that is not a bug class, it is a breach of the entire premise.",
          ar: "إن فُرضت قواعد الأهلية والظهور عبر الشاشات التي يعرضها العميل، أمكن لمن يفحص الاتصال تجاوزها. وهذا في هذا المنتج ليس صنفًا من الأخطاء، بل خرق للفكرة كلها.",
        },
        solution: {
          en: "Convex functions are the source of truth and the enforcement point. The client cannot request what it is not entitled to see, regardless of what it renders.",
          ar: "دوال Convex هي مصدر الحقيقة ونقطة الفرض. فلا يستطيع العميل طلب ما لا يحق له رؤيته، مهما عرض.",
        },
      },
      {
        title: { en: "The questions must change without a deploy", ar: "يجب أن تتغير الأسئلة دون نشر" },
        problem: {
          en: "The form questions and the published conditions are religious and editorial content, not engineering decisions. Having them hard-coded means the person who owns that content has to go through me to change a sentence.",
          ar: "أسئلة الاستمارة والشروط المعلنة محتوى شرعي وتحريري، لا قرارات هندسية. وترميزها في الشيفرة يعني أن صاحب هذا المحتوى مضطر للمرور بي لتعديل جملة.",
        },
        solution: {
          en: "Questions and Arabic copy live in dedicated, owner-editable config modules, separate from application code and marked as such in the repo layout.",
          ar: "توجد الأسئلة والنصوص العربية في وحدات إعدادات مخصصة قابلة لتحرير صاحب المنتج، منفصلة عن شيفرة التطبيق ومُعلَّمة كذلك في بنية المستودع.",
        },
      },
      {
        title: { en: "Publishing someone's details is irreversible", ar: "نشر بيانات شخص لا رجعة فيه" },
        problem: {
          en: "An accidental disclosure here is not a UI bug — it affects a real person's reputation and family, and it cannot be undone by deleting a record afterwards.",
          ar: "الإفشاء العارض هنا ليس خللًا في الواجهة — بل يمسّ سمعة شخص حقيقي وأسرته، ولا يُلغى بحذف سجل بعد وقوعه.",
        },
        solution: {
          en: "Nothing is visible by default. Publication requires explicit, recorded consent from the applicant plus administrative approval, so disclosure needs two deliberate acts rather than one missing check.",
          ar: "لا شيء ظاهر افتراضيًا. ويتطلب النشر موافقة صريحة موثّقة من المتقدّم مع اعتماد إداري، فيحتاج الإفشاء فعلين مقصودين لا فحصًا واحدًا غائبًا.",
        },
      },
    ],
    outcomes: {
      en: [
        "Server-enforced visibility rules — the client cannot request what it may not see.",
        "Questions and religious copy editable by the product owner without a deploy.",
        "Publication gated behind recorded consent plus admin approval.",
      ],
      ar: [
        "قواعد ظهور مفروضة على الخادم — لا يستطيع العميل طلب ما لا يحق له رؤيته.",
        "أسئلة ونصوص شرعية قابلة للتحرير من صاحب المنتج دون نشر.",
        "النشر محكوم بموافقة موثّقة واعتماد إداري.",
      ],
    },
    sourced: true,
  },
  {
    slug: "gift",
    title: { en: "Gift", ar: "هديّة" },
    tagline: {
      en: "Animated 3D gifts you send as a link.",
      ar: "هدايا ثلاثية الأبعاد متحركة تُرسَل كرابط.",
    },
    summary: {
      en: "Pick a gift, record a voice note, send a link. The recipient opens a 3D scene that unwraps in the browser. Free, no accounts, and the sender gets an email when it is opened.",
      ar: "اختر هدية، وسجّل رسالة صوتية، وأرسل رابطًا. يفتح المستلم مشهدًا ثلاثي الأبعاد يُفكّ غلافه في المتصفح. مجاني وبلا حسابات، ويصل المرسِل بريد حين تُفتح.",
    },
    category: "web",
    status: "live",
    featured: false,
    year: "2026",
    role: { en: "Solo", ar: "منفردًا" },
    stack: ["Next.js 16", "React Three Fiber", "drei", "Convex", "Tailwind CSS", "Turbopack", "React Compiler"],
    cover: "/projects/gift.png",
    gallery: ["/projects/gift.png"],
    links: { live: "https://gift.assoli.site", github: "https://github.com/haithamassoli/gift" },
    overview: {
      en: [
        "A greeting sent as a link is usually a static page with a name interpolated into it. This one is a real 3D scene: the gift sits there wrapped, and opening it is an animation rather than a page load.",
        "Senders can attach a voice note, and get an email when the gift is actually opened — which turns out to be the part people care about most.",
      ],
      ar: [
        "التهنئة المُرسَلة كرابط عادةً صفحة ثابتة أُدرج فيها اسم. أما هنا فمشهد ثلاثي الأبعاد حقيقي: الهدية موضوعة مغلَّفة، وفتحها حركة لا تحميل صفحة.",
        "يستطيع المرسِل إرفاق رسالة صوتية، ويصله بريد حين تُفتح الهدية فعلًا — وتبيّن أن هذا أكثر ما يهتم به الناس.",
      ],
    },
    challenges: [
      {
        title: { en: "A shared link that previews as a grey box does not get opened", ar: "رابط يُعاين كمربع رمادي لا يُفتح" },
        problem: {
          en: "The entire distribution model is someone pasting the link into a chat. A client-rendered 3D app gives crawlers an empty shell, so the preview is blank and the link looks like spam.",
          ar: "نموذج التوزيع كله أن يلصق أحدهم الرابط في محادثة. والتطبيق ثلاثي الأبعاد المعروض من طرف العميل يعطي الزواحف هيكلًا فارغًا، فتأتي المعاينة خالية ويبدو الرابط كرسالة مزعجة.",
        },
        solution: {
          en: "Crawlers hitting a gift URL are rewritten to a server function that returns per-gift Open Graph tags, while real visitors get the full 3D app. The preview is correct without server-rendering a WebGL scene.",
          ar: "تُحوَّل الزواحف التي تصل رابط هدية إلى دالة على الخادم تعيد وسوم Open Graph خاصة بتلك الهدية، بينما يحصل الزائر الحقيقي على التطبيق ثلاثي الأبعاد كاملًا. فتصحّ المعاينة دون عرض مشهد WebGL على الخادم.",
        },
      },
      {
        title: { en: "3D scenes and server rendering do not mix", ar: "المشاهد ثلاثية الأبعاد والعرض من الخادم لا يمتزجان" },
        problem: {
          en: "React Three Fiber needs a canvas and a browser; server rendering it produces hydration mismatches and a flash of broken layout before the scene appears.",
          ar: "يحتاج React Three Fiber لوحةً ومتصفحًا؛ وعرضه من الخادم ينتج عدم تطابق في الترطيب ووميض تخطيط مكسور قبل ظهور المشهد.",
        },
        solution: {
          en: "The app tree renders client-only behind a mounted gate, so it behaves like a single-page app while the routes around it stay server-rendered. Fighting the framework here would have cost more than accepting the boundary.",
          ar: "تُعرَض شجرة التطبيق من طرف العميل فقط خلف بوابة تركيب، فتتصرّف كتطبيق أحادي الصفحة بينما تبقى المسارات حولها معروضة من الخادم. ومصارعة الإطار هنا كانت ستكلّف أكثر من قبول الحد.",
        },
      },
    ],
    outcomes: {
      en: [
        "Per-gift link previews without server-rendering WebGL.",
        "Voice notes and open-notification emails, with no account required.",
      ],
      ar: [
        "معاينات روابط خاصة بكل هدية دون عرض WebGL على الخادم.",
        "رسائل صوتية وإشعارات بريدية عند الفتح، بلا حاجة إلى حساب.",
      ],
    },
    sourced: true,
  },
  {
    slug: "devcards",
    title: { en: "DevCards", ar: "بطاقات المقابلات" },
    tagline: {
      en: "Spaced-repetition flashcards for engineering interviews.",
      ar: "بطاقات مراجعة متباعدة للتحضير لمقابلات الهندسة.",
    },
    summary: {
      en: "Hundreds of multiple-choice questions across thirteen topics, each with a full explanation, scheduled by a Leitner system so the cards you get wrong keep coming back until they stick. Entirely frontend — no backend, no account, no network calls.",
      ar: "مئات الأسئلة متعددة الخيارات في ثلاثة عشر موضوعًا، لكل سؤال شرح كامل، مجدولة بنظام لايتنر بحيث تعود البطاقات التي تخطئ فيها حتى ترسخ. واجهة أمامية بالكامل — بلا خادم وبلا حساب وبلا اتصالات شبكية.",
    },
    category: "web",
    status: "live",
    featured: false,
    year: "2026",
    role: { en: "Solo — content and app", ar: "منفردًا — المحتوى والتطبيق" },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "localStorage", "Leitner scheduling"],
    cover: "/projects/devcards.png",
    gallery: ["/projects/devcards.png"],
    links: { live: "https://flashcards.assoli.site", github: "https://github.com/haithamassoli/Interview-Flashcards-Game" },
    overview: {
      en: [
        "Interview prep material is either a list of questions with one-line answers you forget immediately, or a course you never finish. Neither does the thing that actually works, which is being asked the question again a few days after getting it wrong.",
        "DevCards covers thirteen areas — software engineering, frontend, backend, system design, microservices, caching, databases, security, React, PHP, Laravel, Next.js and Node.js — at three difficulty levels. Every card is multiple choice and graded instantly, with a short answer and a deeper 'behind the scenes' explanation.",
        "There is no backend at all. Progress lives in the browser, which means it opens instantly and costs nothing to run.",
      ],
      ar: [
        "مواد التحضير للمقابلات إما قائمة أسئلة بإجابات من سطر تُنسى فورًا، وإما دورة لا تُنهيها أبدًا. ولا يفعل أيٌّ منهما ما ينفع فعلًا: أن يُطرح عليك السؤال ثانيةً بعد أيام من خطئك فيه.",
        "تغطي DevCards ثلاثة عشر مجالًا — هندسة البرمجيات، والواجهات الأمامية والخلفية، وتصميم الأنظمة، والخدمات المصغّرة، والتخزين المؤقت، وقواعد البيانات، والأمان، وReact وPHP وLaravel وNext.js وNode.js — بثلاثة مستويات صعوبة. كل بطاقة متعددة الخيارات وتُصحَّح فورًا، مع إجابة قصيرة وشرح أعمق لما يجري خلف الكواليس.",
        "لا خادم إطلاقًا. يبقى التقدّم في المتصفح، فيُفتح فورًا وبلا كلفة تشغيل.",
      ],
    },
    challenges: [
      {
        title: { en: "Getting it right once is not learning it", ar: "الإصابة مرة ليست تعلّمًا" },
        problem: {
          en: "A plain quiz shuffles and moves on, so a question you guessed correctly and a question you actually know are treated identically — and the ones you got wrong are the ones you never see again.",
          ar: "الاختبار العادي يخلط ويمضي، فيُعامَل السؤال الذي خمّنته صوابًا والسؤال الذي تعرفه فعلًا معاملةً واحدة — وتكون الأسئلة التي أخطأت فيها هي ما لا تراه ثانيةً أبدًا.",
        },
        solution: {
          en: "A Leitner system with self-rating. A missed card drops to box zero and returns almost immediately — both later in the same session and in future ones — while cards you know climb to longer intervals.",
          ar: "نظام لايتنر مع تقييم ذاتي. تهبط البطاقة المُخطأة إلى الصندوق صفر وتعود بعد قليل — في الجلسة نفسها وفي الجلسات اللاحقة — بينما تصعد البطاقات التي تعرفها إلى فواصل أطول.",
        },
      },
      {
        title: { en: "No backend means no account to restore from", ar: "بلا خادم يعني بلا حساب تستعيد منه" },
        problem: {
          en: "Keeping everything client-side is what makes the app free and instant, but it also means progress is tied to one browser and can be cleared without warning.",
          ar: "إبقاء كل شيء على العميل هو ما يجعل التطبيق مجانيًا وفوريًا، لكنه يعني أيضًا أن التقدّم مرتبط بمتصفح واحد وقد يُمسح دون إنذار.",
        },
        solution: {
          en: "I took the trade deliberately rather than adding accounts for a study tool. Storage reads and writes are defensive so a cleared or blocked store degrades to a fresh session instead of a crash.",
          ar: "قبلت المقايضة عمدًا بدل إضافة حسابات لأداة مذاكرة. وعمليات القراءة والكتابة في التخزين دفاعية، فيتحوّل التخزين الممسوح أو المحظور إلى جلسة جديدة بدل انهيار.",
        },
      },
    ],
    outcomes: {
      en: [
        "Thirteen categories, hundreds of graded questions with explanations.",
        "Leitner scheduling plus in-session re-queueing of missed cards.",
        "Fully offline-capable; keyboard-driven throughout.",
      ],
      ar: [
        "ثلاثة عشر تصنيفًا، ومئات الأسئلة المُصحَّحة مع شروح.",
        "جدولة لايتنر مع إعادة إدراج البطاقات المُخطأة داخل الجلسة.",
        "قادر على العمل دون اتصال بالكامل، ويُدار بالكامل من لوحة المفاتيح.",
      ],
    },
    sourced: true,
  },
  {
    slug: "sada",
    title: { en: "Sada", ar: "صدى" },
    tagline: {
      en: "Arabic subtitles for English YouTube, translated on your device.",
      ar: "ترجمة عربية لفيديوهات يوتيوب الإنجليزية، تُترجَم على جهازك.",
    },
    summary: {
      en: "A Chrome extension that renders Arabic subtitles over English YouTube videos by translating the video's own captions entirely in the browser, using a bundled NLLB-200 model. No account, no cloud translation service, and caption text never leaves the machine.",
      ar: "إضافة كروم تعرض ترجمة عربية فوق فيديوهات يوتيوب الإنجليزية بترجمة تسميات الفيديو نفسها داخل المتصفح بالكامل، باستخدام نموذج NLLB-200 مضمَّن. بلا حساب ولا خدمة ترجمة سحابية، ولا يغادر نص الترجمة الجهاز أبدًا.",
    },
    category: "extension",
    status: "live",
    featured: false,
    year: "2026",
    role: { en: "Solo", ar: "منفردًا" },
    stack: ["JavaScript", "Manifest V3", "transformers.js", "NLLB-200", "WebGPU", "WASM"],
    cover: "/projects/sada-logo.png",
    gallery: ["/projects/sada-logo.png"],
    links: { github: "https://github.com/haithamassoli/sada" },
    overview: {
      en: [
        "Auto-translated captions on YouTube mean your viewing history goes to a translation service. Sada does the same job without that: the model and runtime download once at install, and after that the engine runs with remote models disabled.",
        "At runtime the only network traffic is YouTube itself — the video and its caption cues, fetched same-origin — plus extension-local asset loads. Any request to a third-party origin would be a bug, and the privacy claim is written to be falsifiable rather than reassuring.",
      ],
      ar: [
        "الترجمة التلقائية للتسميات على يوتيوب تعني ذهاب سجل مشاهدتك إلى خدمة ترجمة. يؤدي «صدى» العمل نفسه بلا ذلك: يُنزَّل النموذج وبيئة التشغيل مرة واحدة عند التثبيت، وبعدها يعمل المحرّك والنماذج البعيدة معطّلة.",
        "أثناء التشغيل، حركة الشبكة الوحيدة هي يوتيوب نفسه — الفيديو وتسمياته من الأصل ذاته — إضافة إلى تحميل أصول محلية للإضافة. وأي طلب إلى أصل خارجي يُعدّ خللًا، وصياغة ادعاء الخصوصية قابلة للتكذيب لا للطمأنة.",
      ],
    },
    challenges: [
      {
        title: { en: "A translation model in a browser tab", ar: "نموذج ترجمة داخل تبويب متصفح" },
        problem: {
          en: "NLLB-200 is not a small model, and running it in the page means competing with the video for memory and compute on the same machine that is decoding 1080p.",
          ar: "NLLB-200 ليس نموذجًا صغيرًا، وتشغيله داخل الصفحة يعني منافسة الفيديو على الذاكرة والمعالجة على الجهاز نفسه الذي يفكّ ترميز 1080p.",
        },
        solution: {
          en: "The distilled 600M variant runs through transformers.js on WebGPU where available and falls back to WASM otherwise. Assets are fetched once at install rather than per session, so the cost is paid one time.",
          ar: "تعمل النسخة المقطّرة بـ600 مليون معامل عبر transformers.js على WebGPU حيثما توفّر، وترتدّ إلى WASM خلاف ذلك. وتُجلب الأصول مرة عند التثبيت لا في كل جلسة، فتُدفع الكلفة مرة واحدة.",
        },
      },
      {
        title: { en: "Subtitles have to keep up with the video", ar: "على الترجمة أن تلاحق الفيديو" },
        problem: {
          en: "Translation takes time, and a subtitle that arrives after the line has been spoken is worse than none — the viewer reads one sentence while hearing the next.",
          ar: "تستغرق الترجمة وقتًا، والسطر الذي يصل بعد نطقه أسوأ من غيابه — إذ يقرأ المشاهد جملة بينما يسمع التالية.",
        },
        solution: {
          en: "Cues are translated ahead of the playhead rather than on demand, so the work happens during the gap before the line is needed instead of after it has passed.",
          ar: "تُترجَم التسميات قبل موضع التشغيل لا عند الطلب، فيقع العمل في الفجوة السابقة للسطر بدل أن يقع بعد فواته.",
        },
      },
    ],
    outcomes: {
      en: [
        "100% on-device translation with remote models disabled after install.",
        "Toggleable, resizable subtitle overlay on any English YouTube watch page.",
      ],
      ar: [
        "ترجمة على الجهاز بالكامل مع تعطيل النماذج البعيدة بعد التثبيت.",
        "طبقة ترجمة قابلة للتبديل وتغيير الحجم على أي صفحة مشاهدة إنجليزية في يوتيوب.",
      ],
    },
    sourced: true,
  },
  {
    slug: "mubah",
    title: { en: "Mubah", ar: "مباح" },
    tagline: {
      en: "Turn any video into a permissible copy, on your own Mac.",
      ar: "حوّل أي فيديو إلى نسخة مباحة، على جهاز Mac الخاص بك.",
    },
    summary: {
      en: "A local-only Mac tool that removes music and blurs women full-body in a video, from a file or a URL. Nothing leaves the machine and working files are purged when the job finishes. Ships with an honest account of what it cannot do.",
      ar: "أداة محلية بالكامل لأجهزة Mac تزيل الموسيقى وتُشوّش النساء كاملًا في الفيديو، من ملف أو رابط. لا شيء يغادر الجهاز، وتُمحى الملفات المؤقتة عند انتهاء المهمة. وتأتي بوصف صريح لما لا تستطيعه.",
    },
    category: "ai",
    status: "live",
    featured: false,
    year: "2026",
    role: { en: "Solo", ar: "منفردًا" },
    stack: ["Python", "uv", "ffmpeg", "yt-dlp", "Apple Silicon / MPS", "Stem separation", "Pose & person detection"],
    cover: "",
    gallery: [],
    links: { github: "https://github.com/haithamassoli/mubah" },
    overview: {
      en: [
        "Mubah is the desktop counterpart to Naqi: same intent, different constraints. A Mac has more memory and a real GPU, so it can run heavier models and take a whole file rather than working around a phone's limits.",
        "It runs from a CLI with fast, balanced and thorough presets, accepts local files or anything yt-dlp can fetch, and can output audio only. Peak measured memory use is around 2.1 GB, so 8 GB of RAM is enough.",
        "The README states the limitations before the features: music removal keeps all vocals, so songs come out a-cappella; the detectors are unreliable on animation; and the filtering is automated with a fail-safe bias, so output should be verified before it is relied on.",
      ],
      ar: [
        "«مباح» نظير «نقيّ» على سطح المكتب: النية ذاتها والقيود مختلفة. فجهاز Mac يملك ذاكرة أكبر ومعالجًا رسوميًا حقيقيًا، فيستطيع تشغيل نماذج أثقل ومعالجة ملف كامل بدل الالتفاف حول حدود الهاتف.",
        "يعمل من سطر الأوامر بإعدادات سريع ومتوازن ودقيق، ويقبل ملفات محلية أو أي شيء يستطيع yt-dlp جلبه، ويمكنه إخراج الصوت وحده. وذروة الذاكرة المقاسة نحو 2.1 غيغابايت، فثمانية غيغابايت تكفي.",
        "يذكر الـ README القيود قبل الميزات: إزالة الموسيقى تُبقي كل الأصوات البشرية، فتخرج الأغاني بلا موسيقى؛ والكواشف غير موثوقة على الرسوم المتحركة؛ والترشيح آلي بتحيّز احترازي، فينبغي التحقق من المخرج قبل الاعتماد عليه.",
      ],
    },
    challenges: [
      {
        title: { en: "Removing music without removing singing", ar: "إزالة الموسيقى دون إزالة الغناء" },
        problem: {
          en: "Stem separation splits audio into vocals, drums, bass and other. Dropping everything but vocals removes the instruments — but a sung vocal is still a vocal, so songs survive as a-cappella rather than disappearing.",
          ar: "يفصل النموذج الصوت إلى غناء وطبول وبيس وأخرى. وحذف كل شيء عدا الغناء يزيل الآلات — لكن الصوت المغنّى يبقى صوتًا، فتنجو الأغاني بلا موسيقى بدل أن تختفي.",
        },
        solution: {
          en: "Rather than pretend otherwise, this is documented as a known limitation at the top of the README with muting sung vocals on the roadmap. Overstating what a stem separator can do would have been the easier and worse option.",
          ar: "بدل التظاهر بغير ذلك، وُثّق هذا كقيد معروف في صدر الـ README مع كتم الغناء ضمن خارطة الطريق. والمبالغة في وصف ما يستطيعه فاصل المسارات كانت الخيار الأسهل والأسوأ.",
        },
      },
      {
        title: { en: "An uncertain detection has to fail one way", ar: "على الكشف غير المؤكد أن يفشل في اتجاه واحد" },
        problem: {
          en: "Detectors return confidence, not truth. Treating anything below the threshold as clear lets things through; treating everything above it as a person blurs men who are not the target.",
          ar: "تعيد الكواشف ثقةً لا يقينًا. ومعاملة ما دون العتبة كخالٍ تُمرّر أشياء؛ ومعاملة كل ما فوقها كشخص تُشوّش رجالًا ليسوا هدفًا.",
        },
        solution: {
          en: "The bias is set explicitly toward censoring: uncertain people get blurred, and an occasionally blurred man is the accepted cost. Choosing the failure direction on purpose is the whole design decision.",
          ar: "ضُبط التحيّز صراحةً نحو الحجب: تُشوَّش الأشخاص غير المؤكدين، ورجل مشوَّش أحيانًا كلفة مقبولة. واختيار اتجاه الفشل عمدًا هو قرار التصميم كله.",
        },
      },
    ],
    outcomes: {
      en: [
        "Fully local processing on Apple Silicon; working files purged after each job.",
        "CLI with fast / balanced / thorough presets, file or URL input.",
        "Limitations documented up front rather than discovered by users.",
      ],
      ar: [
        "معالجة محلية بالكامل على معالجات Apple Silicon، مع محو الملفات المؤقتة بعد كل مهمة.",
        "سطر أوامر بإعدادات سريع/متوازن/دقيق، ومدخلات ملف أو رابط.",
        "قيود موثّقة مسبقًا بدل أن يكتشفها المستخدمون.",
      ],
    },
    sourced: true,
  },
  {
    slug: "ghadd",
    title: { en: "Ghadd", ar: "غَضّ" },
    tagline: {
      en: "System-wide on-device image filtering for Android.",
      ar: "ترشيح صور على مستوى النظام كاملًا لأندرويد، على الجهاز.",
    },
    summary: {
      en: "An Android accessibility service that covers and blurs immodest imagery anywhere on screen, in any app, using a detector that runs entirely on the device. Because it reads pixels rather than a DOM, it has none of the blind spots a browser extension has.",
      ar: "خدمة إتاحة على أندرويد تغطي وتُشوّش الصور غير المحتشمة في أي مكان على الشاشة وفي أي تطبيق، بكاشف يعمل على الجهاز بالكامل. ولأنها تقرأ البكسلات لا الـ DOM، فليست فيها النقاط العمياء التي في إضافة المتصفح.",
    },
    category: "ai",
    status: "wip",
    featured: false,
    year: "2026",
    role: { en: "Solo", ar: "منفردًا" },
    stack: ["Kotlin", "Android Accessibility Service", "ONNX Runtime", "NudeNet v3", "YOLOv8n"],
    cover: "/projects/ghadd-logo.png",
    gallery: ["/projects/ghadd-logo.png"],
    links: { github: "https://github.com/haithamassoli/haramblur" },
    overview: {
      en: [
        "Browser extensions solved this for the browser. Nothing solved it for the phone, where most of the problem now lives. A DOM-based filter cannot see CSS background images, iframes, picture-in-picture, ads or PDFs, and it only ever covers one app.",
        "Ghadd reads the screen instead. Static images — the primary case — are covered before you can meaningfully look at them, checked, then cleared or blurred. Detection is NudeNet v3 at 320×320, running on-device with no cloud and no telemetry.",
        "It is pre-1.0 and dogfood, developed against a single device, and the README says so rather than implying broader testing than exists.",
      ],
      ar: [
        "حلّت إضافات المتصفح هذا للمتصفح. ولم يحلّه شيء للهاتف حيث تعيش المشكلة اليوم في معظمها. فالمُرشِّح القائم على الـ DOM لا يرى صور خلفيات CSS ولا الإطارات المضمّنة ولا الصورة داخل الصورة ولا الإعلانات ولا ملفات PDF، ولا يغطي إلا تطبيقًا واحدًا.",
        "أما «غَضّ» فيقرأ الشاشة نفسها. تُغطّى الصور الثابتة — وهي الحالة الأساسية — قبل أن تتمكن من النظر إليها فعليًا، ثم تُفحص فتُكشف أو تُشوَّش. والكشف بـ NudeNet v3 بدقة 320×320، يعمل على الجهاز بلا سحابة وبلا تتبّع.",
        "المشروع قبل الإصدار 1.0 وقيد الاستخدام الشخصي، ومطوَّر على جهاز واحد، ويقول الـ README ذلك بدل الإيحاء باختبار أوسع مما جرى.",
      ],
    },
    challenges: [
      {
        title: { en: "The platform caps you at three screenshots a second", ar: "المنصة تحدّك بثلاث لقطات في الثانية" },
        problem: {
          en: "An accessibility service can capture roughly three frames per second. Video, reels and autoplay feeds move far faster than that, so frames between checks are never inspected at all — and no amount of model tuning changes it.",
          ar: "تستطيع خدمة الإتاحة التقاط نحو ثلاثة إطارات في الثانية. أما الفيديو والمقاطع القصيرة والتشغيل التلقائي فتتحرك أسرع من ذلك بكثير، فلا تُفحص الإطارات بين اللقطات إطلاقًا — ولا يغيّر ذلك أي ضبط للنموذج.",
        },
        solution: {
          en: "The ceiling is stated as a product boundary rather than hidden: static images are the supported experience, video is explicitly best-effort, and the README leads with 'substantially reduces exposure, does not guarantee zero exposure'. A tool in this category that overpromises causes the harm it claims to prevent.",
          ar: "ذُكر السقف كحدّ للمنتج لا كشيء مخفي: الصور الثابتة هي التجربة المدعومة، والفيديو أفضل جهد صراحةً، ويبدأ الـ README بأنه «يقلّل التعرّض كثيرًا ولا يضمن انعدامه». والأداة من هذا النوع إن بالغت في الوعد سبّبت الضرر الذي تدّعي منعه.",
        },
      },
      {
        title: { en: "Cover first, decide after", ar: "غطِّ أولًا، ثم قرِّر" },
        problem: {
          en: "Running the detector before covering means the image is on screen, unblurred, for as long as inference takes. That is the exact moment the whole app exists to prevent.",
          ar: "تشغيل الكاشف قبل التغطية يعني بقاء الصورة على الشاشة بلا تشويش طوال زمن الاستدلال. وهي بالضبط اللحظة التي وُجد التطبيق كله ليمنعها.",
        },
        solution: {
          en: "The order is inverted: cover the image immediately, then classify, then clear it if it was fine. A brief cover over a harmless photo is a far cheaper error than a brief exposure of a harmful one.",
          ar: "عُكس الترتيب: تُغطّى الصورة فورًا، ثم تُصنَّف، ثم تُكشف إن كانت سليمة. فتغطية عابرة لصورة بريئة خطأ أرخص بكثير من انكشاف عابر لصورة ضارة.",
        },
      },
    ],
    outcomes: {
      en: [
        "Works system-wide across every app, not just a browser.",
        "On-device detection with no cloud and no telemetry.",
        "Documented ceiling: strong on static imagery, best-effort on video.",
      ],
      ar: [
        "يعمل على مستوى النظام في كل التطبيقات، لا في متصفح فقط.",
        "كشف على الجهاز بلا سحابة وبلا تتبّع.",
        "سقف موثّق: قوي على الصور الثابتة، وأفضل جهد على الفيديو.",
      ],
    },
    sourced: true,
  },
  {
    slug: "azkari",
    title: { en: "Azkari / Dhikr", ar: "أذكاري / ذِكر" },
    tagline: {
      en: "One remembrance, every so often, on whichever screen you are at.",
      ar: "ذِكر واحد، بين حين وآخر، على أي شاشة تكون أمامها.",
    },
    summary: {
      en: "A remembrance reminder that has followed me onto every platform I use: a VS Code extension, a macOS app, a Windows tray app, a standalone Apple Watch app, and a Wear OS watch face companion. Each one is native, offline, and deliberately tiny.",
      ar: "تذكير بالذِّكر تبعني إلى كل منصة أستخدمها: إضافة VS Code، وتطبيق macOS، وتطبيق شريط مهام لويندوز، وتطبيق مستقل لساعة Apple، ورفيق لساعات Wear OS. كل منها أصلي وبلا اتصال وصغير عمدًا.",
    },
    category: "desktop",
    status: "shipped",
    featured: false,
    year: "2023 — 2026",
    role: { en: "Solo — five platforms", ar: "منفردًا — خمس منصات" },
    stack: ["JavaScript", "Swift", "SwiftUI", "Kotlin", "C#", "WPF", "VS Code API", "WatchKit", "UserNotifications"],
    cover: "/projects/azkari-mac.png",
    gallery: ["/projects/azkari-mac.png", "/projects/azkari-preview.png", "/projects/azkari-logo.png", "/apps/dhikr-android-icon.png"],
    links: {
      vscode: "https://marketplace.visualstudio.com/items?itemName=HaithamAssoli.azkari",
      playGoogle: "https://play.google.com/store/apps/details?id=com.haithamassoli.dhikr",
      github: "https://github.com/haithamassoli/Azkari",
      live: "https://dhikr.assoli.site",
    },
    overview: {
      en: [
        "This started as a VS Code extension — a small notification during a coding session, dismissible with a keystroke, gone by itself after six seconds. It is the most-starred thing I have written, which says something about how many developers wanted exactly that and nothing more.",
        "Since then it has gone everywhere I work: a macOS app, a Windows tray app in C# and WPF with zero NuGet dependencies, a standalone watchOS app that needs no iPhone companion, and a Wear OS version. The Windows build even ships a self-test flag that prints PASS/FAIL for its own logic.",
        "The design constraint is the same on all five: it must never become an app you have to manage. Interval, list, and nothing else.",
      ],
      ar: [
        "بدأ هذا إضافةً لـ VS Code — إشعار صغير أثناء جلسة برمجة، يُغلق بضغطة، ويختفي وحده بعد ست ثوانٍ. وهو أكثر ما كتبته نجومًا، وفي ذلك دلالة على عدد المطورين الذين أرادوا هذا بالضبط ولا شيء أكثر.",
        "ومنذ ذلك الحين ذهب إلى كل مكان أعمل فيه: تطبيق macOS، وتطبيق شريط مهام لويندوز بـ C# وWPF بلا أي اعتمادية NuGet، وتطبيق watchOS مستقل لا يحتاج رفيقًا على iPhone، ونسخة Wear OS. بل تأتي نسخة ويندوز براية اختبار ذاتي تطبع نجاح/فشل لمنطقها.",
        "قيد التصميم واحد في الخمسة: يجب ألا يصير تطبيقًا مضطرًا لإدارته. فاصل زمني، وقائمة، ولا شيء غير ذلك.",
      ],
    },
    challenges: [
      {
        title: { en: "A reminder that interrupts stops being used", ar: "التذكير الذي يقاطع يُهجَر" },
        problem: {
          en: "The whole value is frequency, but anything that steals focus while you are typing gets uninstalled within a day. A native system toast is too intrusive and stacks up in notification history.",
          ar: "القيمة كلها في التكرار، لكن ما يخطف التركيز أثناء الكتابة يُحذف خلال يوم. والإشعار النظامي الأصلي مقتحم أكثر مما ينبغي ويتراكم في سجل الإشعارات.",
        },
        solution: {
          en: "Each platform uses the least intrusive surface it has — a frameless transparent popup that fades in over all windows without taking focus or blocking clicks on desktop, a wrist tap on the watch, an editor notification in VS Code. It auto-dismisses, so ignoring it is a valid response.",
          ar: "تستخدم كل منصة أقل سطوحها اقتحامًا — نافذة منبثقة بلا إطار وشفافة تظهر فوق كل النوافذ دون أخذ التركيز أو حجب النقر على سطح المكتب، ونقرة على المعصم في الساعة، وإشعار محرر في VS Code. ويختفي تلقائيًا، فيكون التجاهل استجابة صحيحة.",
        },
      },
      {
        title: { en: "Battery on a watch is the whole product", ar: "البطارية في الساعة هي المنتج كله" },
        problem: {
          en: "A watch app that fires reminders all day and costs noticeable battery gets removed regardless of how good the reminders are. Extended runtime sessions and complications were the obvious route and the wrong one.",
          ar: "تطبيق ساعة يطلق تذكيرات طوال اليوم ويستهلك بطارية ملحوظة يُحذف مهما كانت تذكيراته جيدة. وجلسات التشغيل الممتد والمضاعفات كانت الطريق البديهي والخاطئ.",
        },
        solution: {
          en: "The watchOS build uses only system-scheduled local notifications plus opportunistic background refresh — no workout sessions, no complication, no network at all. Reminders survive a reboot and an app update without the user doing anything.",
          ar: "تستخدم نسخة watchOS إشعارات محلية مجدولة من النظام فقط مع تحديث خلفي انتهازي — بلا جلسات تمرين ولا مضاعفات ولا شبكة إطلاقًا. وتنجو التذكيرات من إعادة التشغيل ومن تحديث التطبيق دون أن يفعل المستخدم شيئًا.",
        },
      },
      {
        title: { en: "Five platforms is five times the maintenance", ar: "خمس منصات تعني صيانة خمسة أضعاف" },
        problem: {
          en: "Writing the same tiny app five times in five languages is how side projects die — every dependency upgrade multiplies by five.",
          ar: "كتابة التطبيق الصغير نفسه خمس مرات بخمس لغات هي كيف تموت المشاريع الجانبية — فكل ترقية اعتمادية تتضاعف خمس مرات.",
        },
        solution: {
          en: "Each build depends on almost nothing. The Windows version has zero NuGet packages — tray via in-box WinForms, JSON via System.Text.Json, startup via the registry, chime via SystemSounds. Nothing to upgrade means nothing to break.",
          ar: "لا تكاد كل نسخة تعتمد على شيء. فنسخة ويندوز بلا أي حزمة NuGet — شريط المهام عبر WinForms المدمج، وJSON عبر System.Text.Json، والإقلاع عبر السجل، والتنبيه عبر SystemSounds. ولا شيء يُرقّى يعني لا شيء ينكسر.",
        },
      },
    ],
    outcomes: {
      en: [
        "Published on the VS Code Marketplace and Google Play.",
        "Five native builds: VS Code, macOS, Windows, watchOS, Wear OS.",
        "Fully offline everywhere; no accounts, no analytics, no data collected.",
      ],
      ar: [
        "منشور على متجر VS Code وعلى Google Play.",
        "خمس نسخ أصلية: VS Code وmacOS وويندوز وwatchOS وWear OS.",
        "يعمل دون اتصال في كل مكان؛ بلا حسابات ولا تحليلات ولا جمع بيانات.",
      ],
    },
    sourced: true,
  },
  {
    slug: "horizon",
    title: { en: "Horizon", ar: "هورايزن" },
    tagline: {
      en: "Eye breaks that know when you are actually at the computer.",
      ar: "استراحات للعين تعرف متى تكون أمام الحاسوب فعلًا.",
    },
    summary: {
      en: "A macOS and Windows desktop app for 20-20-20 eye breaks. What makes it different is that it models presence — idle time, lock state, sleep and wake, fullscreen suppression — so it does not nag you about a break you were not there to miss.",
      ar: "تطبيق سطح مكتب لماك وويندوز لاستراحات العين وفق قاعدة 20-20-20. وما يميّزه أنه ينمذج الحضور — وقت الخمول وحالة القفل والنوم والاستيقاظ وكتم الشاشة الكاملة — فلا يزعجك باستراحة لم تكن موجودًا لتفوّتها.",
    },
    category: "desktop",
    status: "wip",
    featured: false,
    year: "2026",
    role: { en: "Solo", ar: "منفردًا" },
    stack: ["Electron", "TypeScript", "React", "electron-vite", "Vitest", "Native bridges"],
    cover: "",
    gallery: [],
    links: { github: "https://github.com/haithamassoli/horizon" },
    overview: {
      en: [
        "We blink around 60% less at a screen, and the fix — every 20 minutes, look 20 feet away for 20 seconds — is well known and never remembered. The hard part of building the reminder is not the timer.",
        "Horizon is the second attempt at this. The first, LookAway, established the shape: tray-resident, local-only, settings in a JSON file, no accounts and no backend. Horizon rebuilt it around an explicit domain model — a break loop, presence, suppression, an overlay, stats — because the first version's bugs were all really modelling problems wearing timer costumes.",
      ],
      ar: [
        "نرمش أمام الشاشة أقل بنحو 60%، والعلاج — كل 20 دقيقة، انظر إلى مسافة 20 قدمًا لمدة 20 ثانية — معروف ولا يُتذكَّر أبدًا. والجزء الصعب في بناء التذكير ليس المؤقّت.",
        "«هورايزن» هو المحاولة الثانية. أرست الأولى، LookAway، الشكل: مقيم في شريط المهام، محلي بالكامل، إعدادات في ملف JSON، بلا حسابات وبلا خادم. وأعاد «هورايزن» بناءه حول نموذج مجال صريح — حلقة استراحة، وحضور، وكتم، وطبقة عرض، وإحصاءات — لأن أخطاء النسخة الأولى كانت كلها مشكلات نمذجة متنكرة في زي مؤقّتات.",
      ],
    },
    challenges: [
      {
        title: { en: "A timer does not know if you are there", ar: "المؤقّت لا يعرف إن كنت موجودًا" },
        problem: {
          en: "A plain interval timer fires while you are in a meeting, after you locked the screen, and the moment the laptop wakes with four missed breaks queued up. Each of those makes the app feel broken.",
          ar: "المؤقّت الدوري البسيط يعمل وأنت في اجتماع، وبعد قفلك للشاشة، وفي لحظة استيقاظ الحاسوب بأربع استراحات فائتة متراكمة. وكلٌّ من ذلك يجعل التطبيق يبدو معطلًا.",
        },
        solution: {
          en: "Presence is a first-class concept rather than a check bolted onto the timer: idle, locked, asleep and awake are normalised into one view of whether the user is actually at the computer, and the break loop consumes that instead of raw elapsed time.",
          ar: "الحضور مفهوم من الدرجة الأولى لا فحص مُلحق بالمؤقّت: تُطبَّع حالات الخمول والقفل والنوم واليقظة في رؤية واحدة لِما إذا كان المستخدم أمام الحاسوب فعلًا، وتستهلك حلقة الاستراحة ذلك بدل الزمن المنقضي الخام.",
        },
      },
      {
        title: { en: "Interrupting a presentation is unforgivable", ar: "مقاطعة عرض تقديمي لا تُغتفر" },
        problem: {
          en: "A full-screen break overlay that appears while the user is presenting to a room, or mid-way through a film, is the one failure that guarantees uninstallation.",
          ar: "طبقة استراحة تملأ الشاشة وتظهر أثناء عرض المستخدم أمام قاعة، أو في منتصف فيلم، هي الفشل الوحيد الذي يضمن حذف التطبيق.",
        },
        solution: {
          en: "Suppression is its own policy, driven by fullscreen and presentation-like states, and it is allowed to override a due break entirely rather than merely delay the overlay.",
          ar: "الكتم سياسة قائمة بذاتها، تقودها حالات الشاشة الكاملة وما يشبه العرض التقديمي، ويُسمح لها بإلغاء استراحة مستحقة تمامًا لا بتأجيل الطبقة فحسب.",
        },
      },
      {
        title: { en: "Electron does not expose what is needed", ar: "Electron لا يكشف ما يلزم" },
        problem: {
          en: "Lock state, idle detection and fullscreen awareness differ per OS and are not fully available through Electron's cross-platform APIs.",
          ar: "حالة القفل وكشف الخمول والوعي بالشاشة الكاملة تختلف بين الأنظمة وليست متاحة بالكامل عبر واجهات Electron العابرة للمنصات.",
        },
        solution: {
          en: "Minimal per-platform native bridges, used only where Electron genuinely falls short, with everything else staying in shared TypeScript. The bridge is deliberately the smallest surface that works rather than a full abstraction layer.",
          ar: "جسور أصلية صغرى لكل منصة، تُستخدم فقط حيث يقصّر Electron فعلًا، ويبقى كل ما عداها في TypeScript مشترك. والجسر عمدًا أصغر سطح يعمل لا طبقة تجريد كاملة.",
        },
      },
    ],
    outcomes: {
      en: [
        "One codebase for macOS and Windows, with native bridges only where required.",
        "Breaks that respect idle, lock, sleep and fullscreen states.",
        "Local-only: no account, no backend, settings in a JSON file on disk.",
      ],
      ar: [
        "قاعدة شيفرة واحدة لماك وويندوز، مع جسور أصلية عند الضرورة فقط.",
        "استراحات تحترم حالات الخمول والقفل والنوم والشاشة الكاملة.",
        "محلي بالكامل: بلا حساب وبلا خادم، والإعدادات في ملف JSON على القرص.",
      ],
    },
    sourced: true,
  },
  {
    slug: "marafiq-plus",
    title: { en: "Marafiq Plus", ar: "مرافق بلس" },
    tagline: {
      en: "Find every park and public facility in Amman, and report what is broken.",
      ar: "اعثر على كل حديقة ومرفق عام في عمّان، وأبلغ عمّا هو معطّل.",
    },
    summary: {
      en: "A map-driven guide to parks and public facilities under Greater Amman Municipality, with search, details and the ability to report issues back to the municipality.",
      ar: "دليل قائم على الخريطة لحدائق ومرافق أمانة عمّان الكبرى، مع بحث وتفاصيل وإمكانية الإبلاغ عن المشكلات إلى الأمانة.",
    },
    category: "mobile",
    status: "shipped",
    featured: false,
    year: "2025",
    role: { en: "Client project — mobile development", ar: "مشروع لعميل — تطوير الموبايل" },
    stack: ["React Native", "Expo Router", "TypeScript", "Google Maps", "Firebase", "Zustand", "React Query", "Reanimated", "Restyle", "Fuse.js"],
    cover: "/apps/hadiqa-1.png",
    gallery: ["/apps/hadiqa-1.png", "/apps/hadiqa-2.png", "/apps/hadiqa-3.png", "/apps/hadiqa-4.png", "/apps/hadiqa-5.png", "/apps/hadiqa-6.png"],
    links: { playGoogle: "https://play.google.com/store/apps/details?id=com.haithamassoli.hadiqa", github: "https://github.com/haithamassoli/hadiqa" },
    overview: {
      en: [
        "Amman has far more public green space than people use, mostly because nobody knows where it is. The municipality had the data; residents had no way to see it.",
        "The app puts every park and facility on a detailed map with the practical information — where it is, what is there, whether it is open — and closes the loop by letting residents report problems directly instead of finding a phone number.",
      ],
      ar: [
        "في عمّان مساحات خضراء عامة أكثر بكثير مما يستخدمه الناس، والسبب أساسًا أن لا أحد يعرف أين هي. كانت البيانات لدى الأمانة، ولم يكن للسكان سبيل لرؤيتها.",
        "يضع التطبيق كل حديقة ومرفق على خريطة مفصّلة مع المعلومات العملية — أين هو، وما فيه، وهل هو مفتوح — ويُغلق الحلقة بتمكين السكان من الإبلاغ عن المشكلات مباشرة بدل البحث عن رقم هاتف.",
      ],
    },
    challenges: [
      {
        title: { en: "Hundreds of pins is not a map, it is noise", ar: "مئات الدبابيس ليست خريطة بل ضجيج" },
        problem: {
          en: "Rendering every facility at city zoom produces an unreadable cluster and drags the frame rate down on mid-range Android devices.",
          ar: "عرض كل مرفق عند تكبير المدينة ينتج تكتّلًا غير مقروء ويُخفض معدل الإطارات على أجهزة أندرويد المتوسطة.",
        },
        solution: {
          en: "Markers cluster by zoom level and only the visible viewport is queried, so the map stays legible and the device only ever renders what is on screen.",
          ar: "تتجمّع العلامات حسب مستوى التكبير ولا يُستعلم إلا عن الإطار المرئي، فتبقى الخريطة مقروءة ولا يعرض الجهاز إلا ما على الشاشة.",
        },
      },
      {
        title: { en: "People search for places by the wrong name", ar: "يبحث الناس عن الأماكن بأسماء خاطئة" },
        problem: {
          en: "Official facility names rarely match what residents call a place, and Arabic spelling varies. Exact matching returns nothing for most real searches.",
          ar: "نادرًا ما تطابق الأسماء الرسمية للمرافق ما يسميه السكان بها، والإملاء العربي متفاوت. والمطابقة التامة لا تعيد شيئًا لمعظم عمليات البحث الحقيقية.",
        },
        solution: {
          en: "Fuzzy search over normalised Arabic text, so approximate spellings and partial names still land on the right facility.",
          ar: "بحث تقريبي على نص عربي مُطبَّع، فتصل الإملاءات التقريبية والأسماء الجزئية إلى المرفق الصحيح.",
        },
      },
    ],
    outcomes: {
      en: ["Published on Google Play for Greater Amman Municipality.", "Map, search and citizen issue reporting in one app."],
      ar: ["منشور على Google Play لأمانة عمّان الكبرى.", "خريطة وبحث وإبلاغ المواطنين عن المشكلات في تطبيق واحد."],
    },
    sourced: true,
  },
  {
    slug: "discover-ajloun",
    title: { en: "Discover Ajloun", ar: "اكتشف عجلون" },
    tagline: {
      en: "Tourism and municipal complaints for Ajloun Governorate, in one app.",
      ar: "السياحة وشكاوى البلدية لمحافظة عجلون، في تطبيق واحد.",
    },
    summary: {
      en: "A service app for residents and visitors of Ajloun: raise a municipal complaint from home and track its resolution, and browse the governorate's archaeological and tourist sites.",
      ar: "تطبيق خدمي لسكان عجلون وزوارها: ارفع شكوى بلدية من بيتك وتابع معالجتها، وتصفّح مواقع المحافظة الأثرية والسياحية.",
    },
    category: "mobile",
    status: "shipped",
    featured: false,
    year: "2025",
    role: { en: "Client project — mobile development", ar: "مشروع لعميل — تطوير الموبايل" },
    stack: ["React Native", "TypeScript", "i18n", "Firebase", "React Query", "Reanimated", "Zod", "Push Notifications"],
    cover: "/apps/telescope-1.png",
    gallery: ["/apps/telescope-1.png", "/apps/telescope-2.png", "/apps/telescope-3.png", "/apps/telescope-4.png", "/apps/telescope-5.png"],
    links: { playGoogle: "https://play.google.com/store/apps/details?id=com.haithamassoli.telescope" },
    overview: {
      en: [
        "Two audiences in one app: residents who need something fixed, and visitors who want to know what is worth seeing. The municipality wanted both, and separating them into two apps would have meant neither got installed.",
        "The complaints side lets a resident raise an issue within the municipality's remit and receive its resolution without leaving home. The tourism side covers the archaeological and heritage sites across the governorate.",
      ],
      ar: [
        "جمهوران في تطبيق واحد: سكان يحتاجون إصلاح شيء، وزوّار يريدون معرفة ما يستحق الزيارة. أرادت البلدية الاثنين، وفصلهما في تطبيقين كان سيعني ألا يُثبَّت أيٌّ منهما.",
        "يتيح جانب الشكاوى للمقيم رفع مشكلة ضمن اختصاص البلدية وتلقّي معالجتها دون مغادرة بيته. ويغطي جانب السياحة المواقع الأثرية والتراثية في أنحاء المحافظة.",
      ],
    },
    challenges: [
      {
        title: { en: "A complaint with no visible progress is a complaint nobody files twice", ar: "شكوى بلا تقدّم مرئي شكوى لا تُقدَّم مرتين" },
        problem: {
          en: "Submitting into a void is exactly the experience residents already had with the phone line. If the app reproduces it, it has added nothing.",
          ar: "التقديم في فراغ هو بالضبط التجربة التي عاشها السكان أصلًا مع الخط الهاتفي. وإن كرّرها التطبيق فلم يضف شيئًا.",
        },
        solution: {
          en: "Every complaint carries a status the resident can see, and status changes push a notification. The value is the visible state transition, not the submit button.",
          ar: "تحمل كل شكوى حالةً يراها المقيم، ويدفع تغيّر الحالة إشعارًا. والقيمة في انتقال الحالة المرئي لا في زر الإرسال.",
        },
      },
      {
        title: { en: "Complaints arrive with photos on rural connections", ar: "تصل الشكاوى بصور على اتصالات ريفية" },
        problem: {
          en: "A photo is what makes a complaint actionable, but uploading one from a village on weak mobile data fails often enough that people give up mid-report.",
          ar: "الصورة هي ما يجعل الشكوى قابلة للمعالجة، لكن رفعها من قرية على بيانات ضعيفة يفشل بما يكفي ليتخلى الناس عن التبليغ في منتصفه.",
        },
        solution: {
          en: "Images are compressed on the device before upload and the submission is queued, so a report survives a dropped connection and completes when signal returns rather than being lost.",
          ar: "تُضغط الصور على الجهاز قبل الرفع وتُصَفّ عملية الإرسال، فينجو التبليغ من انقطاع الاتصال ويكتمل عند عودة الإشارة بدل أن يضيع.",
        },
      },
    ],
    outcomes: {
      en: ["Published on Google Play for Ajloun Governorate.", "Municipal complaints with tracked status, plus a heritage site guide."],
      ar: ["منشور على Google Play لمحافظة عجلون.", "شكاوى بلدية بحالة متتبَّعة، مع دليل للمواقع التراثية."],
    },
    sourced: true,
  },
  {
    slug: "sawt",
    title: { en: "Sawt", ar: "صوت" },
    tagline: {
      en: "Automating an election, from voting to results.",
      ar: "أتمتة العملية الانتخابية، من التصويت إلى النتائج.",
    },
    summary: {
      en: "An app that digitises the election process end to end — voter registration, identity-verified access, casting a vote, and announcing results — built for transparency at every stage.",
      ar: "تطبيق يُرقمن العملية الانتخابية من طرف إلى طرف — تسجيل الناخبين، والدخول بهوية مُتحقَّق منها، والإدلاء بالصوت، وإعلان النتائج — مبني للشفافية في كل مرحلة.",
    },
    category: "mobile",
    status: "shipped",
    featured: false,
    year: "2025",
    role: { en: "Solo — mobile and backend", ar: "منفردًا — الموبايل والخادم" },
    stack: ["React Native", "TypeScript", "OTP verification", "Firebase", "Zustand", "React Query", "Reanimated", "Restyle", "Zod"],
    cover: "/apps/sawt-1.png",
    gallery: ["/apps/sawt-1.png", "/apps/sawt-2.png", "/apps/sawt-3.png", "/apps/sawt-4.png", "/apps/sawt-5.png", "/apps/sawt-6.png"],
    links: { playGoogle: "https://play.google.com/store/apps/details?id=com.haithamassoli.sawt", github: "https://github.com/haithamassoli/Sawt" },
    overview: {
      en: [
        "Voting is the least forgiving thing to build. A bug in a normal app annoys someone; a bug here invalidates a result and the trust that goes with it.",
        "Sawt covers the whole cycle: voters register and access their account through verified identity, cast a ballot, and results are announced through the same system. The engineering priority throughout was that every stage be verifiable rather than merely fast.",
      ],
      ar: [
        "التصويت أقلّ ما يُبنى تسامحًا. فالخلل في تطبيق عادي يزعج شخصًا؛ والخلل هنا يُبطل نتيجة ومعها الثقة.",
        "يغطي «صوت» الدورة كلها: يسجّل الناخبون ويدخلون حساباتهم بهوية مُتحقَّق منها، ويدلون بأصواتهم، وتُعلن النتائج عبر النظام نفسه. وكانت الأولوية الهندسية طوال العمل أن تكون كل مرحلة قابلة للتحقق لا سريعة فحسب.",
      ],
    },
    challenges: [
      {
        title: { en: "One person, one vote, on a device you do not control", ar: "شخص واحد وصوت واحد على جهاز لا تتحكم به" },
        problem: {
          en: "Anyone can install the app twice, on two phones, with two numbers. Device-based identity is not identity, and client-side checks are trivially bypassed.",
          ar: "يستطيع أي أحد تثبيت التطبيق مرتين، على هاتفين، برقمين. فالهوية القائمة على الجهاز ليست هوية، وفحوص جانب العميل تُتجاوَز ببساطة.",
        },
        solution: {
          en: "Eligibility is bound to a verified identity checked server-side via OTP, and the ballot record itself enforces uniqueness per voter per election. The device is treated as untrusted throughout.",
          ar: "تُربط الأهلية بهوية مُتحقَّق منها تُفحص على الخادم عبر رمز لمرة واحدة، ويفرض سجل الاقتراع نفسه التفرّد لكل ناخب في كل انتخاب. ويُعامَل الجهاز كغير موثوق طوال الوقت.",
        },
      },
      {
        title: { en: "Everyone votes in the last hour", ar: "الجميع يصوّت في الساعة الأخيرة" },
        problem: {
          en: "Election traffic is not steady — it is nothing for days and then everything at once, right before closing. A system that works in testing can fold exactly when it matters.",
          ar: "حركة الانتخاب ليست منتظمة — لا شيء لأيام ثم كل شيء دفعة واحدة قبيل الإغلاق. والنظام الذي يعمل في الاختبار قد ينهار في اللحظة التي تهمّ بالضبط.",
        },
        solution: {
          en: "Writes are kept small and idempotent so a retried submission cannot double-count, and reads for results are served from aggregates rather than recomputed per request.",
          ar: "تُبقى عمليات الكتابة صغيرة وعديمة الأثر التكراري فلا يستطيع إرسال مُعاد أن يُحسب مرتين، وتُقدَّم قراءات النتائج من تجميعات لا بإعادة حسابها مع كل طلب.",
        },
      },
    ],
    outcomes: {
      en: ["Published on Google Play.", "Identity-verified, one-vote-per-voter enforcement on the server."],
      ar: ["منشور على Google Play.", "هوية مُتحقَّق منها وفرض صوت واحد لكل ناخب على الخادم."],
    },
    sourced: true,
  },
  {
    slug: "tawsilah-abshir",
    title: { en: "Tawsilah Abshir", ar: "توصيلة ابشر" },
    tagline: {
      en: "Ride-hailing built for Ajloun, not adapted to it.",
      ar: "تطبيق توصيل مبني لعجلون، لا مُكيَّف عليها.",
    },
    summary: {
      en: "A ride service for Ajloun and the surrounding governorates, with vetted drivers who know the area. Built for daily local trips as much as long runs to other governorates.",
      ar: "خدمة توصيل لعجلون والمحافظات المحيطة، بسائقين معتمدين يعرفون المنطقة. مبنية للمشاوير اليومية المحلية كما للرحلات الطويلة إلى محافظات أخرى.",
    },
    category: "mobile",
    status: "shipped",
    featured: false,
    year: "2026",
    role: { en: "Client project — mobile development", ar: "مشروع لعميل — تطوير الموبايل" },
    stack: ["React Native", "Expo", "TypeScript", "Maps", "Push Notifications", "React Query"],
    cover: "/apps/tawsilah-1.png",
    gallery: ["/apps/tawsilah-1.png", "/apps/tawsilah-2.png", "/apps/tawsilah-3.png", "/apps/tawsilah-4.png", "/apps/tawsilah-5.png"],
    links: { playGoogle: "https://play.google.com/store/apps/details?id=com.assoliindustries.tawsilah", github: "https://github.com/haithamassoli/tawseel" },
    overview: {
      en: [
        "The large ride-hailing apps work in Amman and thin out fast outside it. In a governorate like Ajloun that leaves people back on calling a driver they know, which works until he is busy.",
        "This is the local version: drivers vetted for the area, pricing that makes sense for both short in-town trips and inter-governorate runs, and an interface aimed at people who have never used a ride app before.",
      ],
      ar: [
        "تعمل تطبيقات التوصيل الكبرى في عمّان وتتلاشى بسرعة خارجها. وفي محافظة كعجلون يترك ذلك الناس عائدين إلى الاتصال بسائق يعرفونه، وهو حلّ يصلح حتى ينشغل.",
        "هذه هي النسخة المحلية: سائقون معتمدون للمنطقة، وتسعير منطقي للمشاوير القصيرة داخل المدينة وللرحلات بين المحافظات، وواجهة موجّهة لمن لم يستخدم تطبيق توصيل من قبل.",
      ],
    },
    challenges: [
      {
        title: { en: "Addresses that do not exist", ar: "عناوين غير موجودة" },
        problem: {
          en: "Outside the capital, street addressing is unreliable and many destinations are known by landmark rather than by any address a geocoder recognises.",
          ar: "خارج العاصمة، عنونة الشوارع غير موثوقة، وكثير من الوجهات تُعرف بمعلم بارز لا بعنوان يعرفه أي مُرمِّز جغرافي.",
        },
        solution: {
          en: "Pickup and destination are set by dropping a pin and optionally naming a landmark, so a rider never has to produce an address that does not exist.",
          ar: "يُحدَّد موضع الانطلاق والوجهة بوضع دبوس مع تسمية اختيارية لمعلم، فلا يضطر الراكب أبدًا إلى إنتاج عنوان غير موجود.",
        },
      },
    ],
    outcomes: {
      en: ["Published on Google Play, serving Ajloun and inter-governorate trips."],
      ar: ["منشور على Google Play، ويخدم عجلون والرحلات بين المحافظات."],
    },
    sourced: true,
  },
  {
    slug: "kheir",
    title: { en: "Kheir", ar: "خير" },
    tagline: { en: "Donate directly to people in need.", ar: "تبرّع مباشرةً للمحتاجين." },
    summary: {
      en: "A charity app that connects donors to specific cases in need rather than a general fund, so a giver can see exactly what their donation goes to.",
      ar: "تطبيق خيري يصل المتبرعين بحالات محتاجة بعينها بدل صندوق عام، فيرى المتبرع تحديدًا أين يذهب تبرعه.",
    },
    category: "mobile",
    status: "delisted",
    featured: false,
    year: "2025",
    role: { en: "Solo — mobile and backend", ar: "منفردًا — الموبايل والخادم" },
    stack: ["React Native", "Expo Router", "TypeScript", "Firebase", "Zustand", "React Query", "Reanimated", "Restyle", "Zod"],
    cover: "/projects/kheir-icon.png",
    gallery: ["/projects/kheir-icon.png"],
    links: { github: "https://github.com/haithamassoli/kheir" },
    overview: {
      en: [
        "Giving to a general fund is easy to postpone because it is abstract. Giving to a named case with a stated need is not, and that difference is the entire product.",
        "Kheir lists verified cases with what each one actually needs, and a donor picks. The app is no longer listed on Google Play; the source remains available.",
      ],
      ar: [
        "التبرع لصندوق عام يسهل تأجيله لأنه مجرّد. أما التبرع لحالة مُسمّاة بحاجة محددة فليس كذلك، وهذا الفارق هو المنتج كله.",
        "يعرض «خير» حالات مُتحقَّقًا منها مع حاجة كل منها فعليًا، فيختار المتبرع. ولم يعد التطبيق مدرجًا على Google Play؛ والشيفرة ما تزال متاحة.",
      ],
    },
    challenges: [
      {
        title: { en: "Publishing a case exposes a family", ar: "نشر حالة يكشف أسرة" },
        problem: {
          en: "The detail that makes a case compelling to a donor is the same detail that identifies a family in a small community. Maximising donations and protecting dignity pull in opposite directions.",
          ar: "التفصيل الذي يجعل الحالة مؤثرة لدى المتبرع هو نفسه التفصيل الذي يعرّف أسرة في مجتمع صغير. فتشدّ زيادة التبرعات وحفظ الكرامة في اتجاهين متعاكسين.",
        },
        solution: {
          en: "Cases are published with the need described concretely but identity withheld, and verification happens out of band rather than by showing the donor documents about a real family.",
          ar: "تُنشر الحالات بوصف ملموس للحاجة مع حجب الهوية، ويجري التحقق خارج التطبيق بدل عرض وثائق عن أسرة حقيقية على المتبرع.",
        },
      },
    ],
    outcomes: {
      en: ["Shipped and previously listed on Google Play; source still available."],
      ar: ["أُطلق وكان مدرجًا سابقًا على Google Play؛ والشيفرة ما تزال متاحة."],
    },
    sourced: false,
  },
  {
    slug: "halal-camera",
    title: { en: "Halal Camera", ar: "كاميرا حلال" },
    tagline: { en: "A camera that blurs faces the moment you shoot.", ar: "كاميرا تُشوّش الوجوه لحظة التقاط الصورة." },
    summary: {
      en: "A camera app that automatically detects and blurs faces immediately after capture, for people who want to photograph a place or an event without photographing the people in it. Built natively for both Android and iOS.",
      ar: "تطبيق كاميرا يكتشف الوجوه ويُشوّشها تلقائيًا فور الالتقاط، لمن يريد تصوير مكان أو مناسبة دون تصوير من فيها. مبني أصليًا لأندرويد وiOS.",
    },
    category: "ai",
    status: "shipped",
    featured: false,
    year: "2025",
    role: { en: "Solo — both platforms", ar: "منفردًا — المنصتان" },
    stack: ["Kotlin", "Swift", "On-device face detection", "CameraX", "AVFoundation"],
    cover: "/apps/halalcamera-1.png",
    gallery: ["/apps/halalcamera-1.png"],
    links: {
      playGoogle: "https://play.google.com/store/apps/details?id=com.haithamassoli.halalcamera",
      github: "https://github.com/haithamassoli/halal-camera-anidroid",
    },
    overview: {
      en: [
        "Photographing a wedding hall, a classroom or a family gathering means capturing faces that should not be captured. Editing them out afterwards means the unblurred original existed, was stored, and possibly synced to a cloud backup before you got to it.",
        "Halal Camera closes that window: detection and blurring happen right after capture, on the device, so the file that reaches storage is already filtered.",
      ],
      ar: [
        "تصوير قاعة عرس أو صف دراسي أو تجمّع عائلي يعني التقاط وجوه لا ينبغي التقاطها. وحذفها لاحقًا يعني أن الأصل غير المشوَّش قد وُجد وخُزّن وربما رُفع إلى نسخة سحابية قبل أن تصل إليه.",
        "يُغلق «كاميرا حلال» تلك النافذة: يقع الكشف والتشويش بعد الالتقاط مباشرة على الجهاز، فيصل الملف إلى التخزين مُرشَّحًا أصلًا.",
      ],
    },
    challenges: [
      {
        title: { en: "The unfiltered original must never be written", ar: "يجب ألا يُكتب الأصل غير المُرشَّح أبدًا" },
        problem: {
          en: "The natural implementation saves the photo, then processes it. That leaves the original on disk, where a gallery scanner or a cloud backup can pick it up before it is replaced.",
          ar: "التنفيذ الطبيعي يحفظ الصورة ثم يعالجها. وذلك يترك الأصل على القرص حيث يمكن لماسح المعرض أو النسخ السحابي التقاطه قبل استبداله.",
        },
        solution: {
          en: "Processing happens on the in-memory frame before anything is persisted, so the only file that ever exists on disk is the filtered one.",
          ar: "تقع المعالجة على الإطار في الذاكرة قبل حفظ أي شيء، فيكون الملف الوحيد الموجود على القرص هو المُرشَّح.",
        },
      },
    ],
    outcomes: {
      en: ["Published on Google Play, with a native iOS counterpart.", "Blurring applied before the file is written to storage."],
      ar: ["منشور على Google Play، مع نظير أصلي لـ iOS.", "يُطبَّق التشويش قبل كتابة الملف إلى التخزين."],
    },
    sourced: true,
  },
  {
    slug: "hirfati",
    title: { en: "Hirfati", ar: "حرفتي" },
    tagline: {
      en: "Find a trusted tradesperson in Jordan and get free quotes.",
      ar: "اعثر على حرفي موثوق في الأردن واحصل على عروض أسعار مجانية.",
    },
    summary: {
      en: "A marketplace for skilled trades across Jordan — plumbing, electrical, carpentry, metalwork, painting, air conditioning, tiling and general maintenance. Describe the job, receive quotes, choose.",
      ar: "سوق للحرف المهنية في الأردن — سباكة وكهرباء ونجارة وحدادة ودهان وتكييف وبلاط وصيانة عامة. صِف العمل، واستقبل العروض، واختر.",
    },
    category: "web",
    status: "live",
    featured: false,
    year: "2026",
    role: { en: "Solo", ar: "منفردًا" },
    stack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "SEO", "RTL"],
    cover: "/projects/hirfati.png",
    gallery: ["/projects/hirfati.png"],
    links: { live: "https://hirfati-jo.vercel.app", github: "https://github.com/haithamassoli/hirfati" },
    overview: {
      en: [
        "Finding a plumber in Jordan means asking a neighbour, calling a number written on a wall, or taking whoever answers. There is no way to compare, no way to check anyone, and no price until they are already in your house.",
        "Hirfati puts the job first: describe what needs doing, and tradespeople quote for it. The comparison happens before anyone shows up.",
      ],
      ar: [
        "إيجاد سبّاك في الأردن يعني سؤال جار، أو الاتصال برقم مكتوب على جدار، أو أخذ من يردّ. لا سبيل للمقارنة، ولا للتحقق من أحد، ولا سعر قبل أن يكون في بيتك أصلًا.",
        "يضع «حرفتي» العمل أولًا: صِف ما ينبغي عمله، فيقدّم الحرفيون عروضهم. وتقع المقارنة قبل أن يحضر أحد.",
      ],
    },
    challenges: [
      {
        title: { en: "A marketplace with nobody on it is useless to both sides", ar: "سوق بلا أحد لا ينفع الطرفين" },
        problem: {
          en: "Customers will not post jobs where no tradespeople are, and tradespeople will not sign up where there are no jobs. Launching an empty two-sided marketplace stalls immediately.",
          ar: "لن ينشر الزبائن أعمالًا حيث لا حرفيين، ولن يسجّل الحرفيون حيث لا أعمال. وإطلاق سوق ثنائي فارغ يتوقف فورًا.",
        },
        solution: {
          en: "The site is useful before it has liquidity: it works as a searchable, SEO-indexed directory by trade and governorate, so a customer arriving from search finds someone to call even when quoting is quiet.",
          ar: "الموقع نافع قبل أن تكون فيه سيولة: يعمل كدليل قابل للبحث ومُفهرس لمحركات البحث حسب الحرفة والمحافظة، فيجد الزبون القادم من البحث من يتصل به حتى حين تهدأ العروض.",
        },
      },
    ],
    outcomes: {
      en: ["Live and indexed by trade and governorate across Jordan.", "Free quote requests without an account."],
      ar: ["مباشر ومُفهرس حسب الحرفة والمحافظة في الأردن.", "طلبات عروض أسعار مجانية بلا حساب."],
    },
    sourced: false,
  },
  {
    slug: "hadanati",
    title: { en: "Hadanati", ar: "حضانتي" },
    tagline: {
      en: "Run a nursery — attendance, assessments, fees and a parent portal.",
      ar: "إدارة حضانة — حضور وتقييمات ورسوم وبوابة لأولياء الأمور.",
    },
    summary: {
      en: "An Arabic platform for nurseries in Jordan covering daily attendance, child assessments, fee tracking and a portal that lets parents see their child's day without phoning the nursery.",
      ar: "منصة عربية لحضانات الأردن تغطي الحضور اليومي وتقييمات الأطفال ومتابعة الرسوم، وبوابة تُطلع أولياء الأمور على يوم أطفالهم دون الاتصال بالحضانة.",
    },
    category: "web",
    status: "live",
    featured: false,
    year: "2026",
    role: { en: "Solo", ar: "منفردًا" },
    stack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "RTL"],
    cover: "/projects/hadanati.png",
    gallery: ["/projects/hadanati.png"],
    links: { live: "https://hadanati.assoli.site", github: "https://github.com/haithamassoli/hadanati" },
    overview: {
      en: [
        "Most nurseries here run on a paper register, a WhatsApp group and a notebook of who has paid. It works until a parent asks a question about last month.",
        "Hadanati replaces the three of them with one system — attendance, assessments and fees on the staff side, and a parent portal on the other, so the answer to 'how was he today' does not require a phone call.",
      ],
      ar: [
        "تدير معظم الحضانات هنا سجلًا ورقيًا ومجموعة واتساب ودفترًا لمن دفع. وهذا يصلح حتى يسأل ولي أمر عن الشهر الماضي.",
        "تستبدل «حضانتي» الثلاثة بنظام واحد — حضور وتقييمات ورسوم من جهة الطاقم، وبوابة لأولياء الأمور من الجهة الأخرى، فلا يحتاج جواب «كيف كان اليوم» إلى مكالمة.",
      ],
    },
    challenges: [
      {
        title: { en: "The staff using it are not computer users", ar: "الطاقم الذي يستخدمه ليسوا مستخدمي حواسيب" },
        problem: {
          en: "Nursery staff are with children all day. Any workflow that takes more than a few taps, or that punishes a mistake, gets abandoned for the paper register within a week.",
          ar: "طاقم الحضانة مع الأطفال طوال اليوم. وأي مسار يتطلب أكثر من نقرات قليلة، أو يعاقب على الخطأ، يُهجَر إلى السجل الورقي خلال أسبوع.",
        },
        solution: {
          en: "Attendance is a single tap per child from one list, corrections are always available rather than locked after submit, and nothing requires leaving the screen you are on.",
          ar: "الحضور نقرة واحدة لكل طفل من قائمة واحدة، والتصحيح متاح دائمًا لا مقفل بعد الإرسال، ولا شيء يتطلب مغادرة الشاشة التي أنت فيها.",
        },
      },
      {
        title: { en: "Parents must see enough, and not too much", ar: "على أولياء الأمور أن يروا ما يكفي، لا أكثر" },
        problem: {
          en: "A parent portal that exposes a shared class view leaks other children's attendance, assessments and fee status to every family in the room.",
          ar: "بوابة تعرض رؤية صفّية مشتركة تُسرّب حضور أطفال آخرين وتقييماتهم وحالة رسومهم لكل أسرة في الغرفة.",
        },
        solution: {
          en: "Every parent-facing query is scoped to their own children on the server, so the portal cannot return another family's data regardless of what the client asks for.",
          ar: "كل استعلام موجّه لولي الأمر محصور بأطفاله على الخادم، فلا تستطيع البوابة إعادة بيانات أسرة أخرى مهما طلب العميل.",
        },
      },
    ],
    outcomes: {
      en: ["Attendance, assessments, fees and a parent portal in one Arabic-first platform."],
      ar: ["حضور وتقييمات ورسوم وبوابة أولياء أمور في منصة عربية أولًا."],
    },
    sourced: false,
  },
  {
    slug: "ghurza",
    title: { en: "Ghurza", ar: "غُرزة" },
    tagline: {
      en: "Learn crochet in Arabic, from the first stitch upward.",
      ar: "تعلّم الكروشيه بالعربية، من أول غرزة صعودًا.",
    },
    summary: {
      en: "A complete Arabic learning path for crochet: ordered lessons from the very first stitch through to advanced work, plus references for yarns, hooks and tools, and a curated set of the best Arabic and international sources.",
      ar: "مسار تعلّم عربي متكامل للكروشيه: دروس مرتّبة من أول غرزة حتى الأعمال المتقدمة، مع مراجع للخيوط والإبر والأدوات، ومجموعة منتقاة من أفضل المصادر العربية والعالمية.",
    },
    category: "web",
    status: "live",
    featured: false,
    year: "2026",
    role: { en: "Solo — content structure and build", ar: "منفردًا — بنية المحتوى والتطوير" },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "RTL", "SEO"],
    cover: "/projects/crochet.png",
    gallery: ["/projects/crochet.png"],
    links: { live: "https://crochet.assoli.site", github: "https://github.com/haithamassoli/crochet" },
    overview: {
      en: [
        "Arabic crochet material exists, but it is scattered across videos with no ordering — a beginner has no way to know what to learn after the first stitch, or which of forty videos is the right next one.",
        "This is the missing structure: a single ordered path where each lesson assumes only what came before it, with the reference material a learner keeps needing — yarn weights, hook sizes, tools — kept separate from the path itself.",
      ],
      ar: [
        "المادة العربية عن الكروشيه موجودة، لكنها متناثرة في فيديوهات بلا ترتيب — فلا سبيل للمبتدئ ليعرف ما يتعلّمه بعد أول غرزة، ولا أيّ الأربعين فيديو هو التالي الصحيح.",
        "هذه هي البنية الناقصة: مسار واحد مرتّب يفترض كل درس فيه ما سبقه فقط، مع إبقاء المادة المرجعية التي يظل المتعلم يحتاجها — أوزان الخيوط ومقاسات الإبر والأدوات — منفصلة عن المسار نفسه.",
      ],
    },
    challenges: [
      {
        title: { en: "Ordering is the product", ar: "الترتيب هو المنتج" },
        problem: {
          en: "The content already exists on the internet. Publishing another list of it adds nothing — the reason beginners stall is that no source tells them what order to do things in.",
          ar: "المحتوى موجود أصلًا على الإنترنت. ونشر قائمة أخرى به لا يضيف شيئًا — فسبب تعثّر المبتدئين أن لا مصدر يخبرهم بأي ترتيب يفعلون الأشياء.",
        },
        solution: {
          en: "The site is built around a strict prerequisite chain rather than a category listing, and the references are deliberately kept off that chain so they can be consulted at any point without breaking the sequence.",
          ar: "بُني الموقع حول سلسلة متطلبات صارمة لا حول تصنيف قوائم، وأُبقيت المراجع عمدًا خارج تلك السلسلة ليُرجَع إليها في أي وقت دون كسر التسلسل.",
        },
      },
    ],
    outcomes: {
      en: ["An ordered Arabic curriculum with separate tool and material references."],
      ar: ["منهج عربي مرتّب مع مراجع منفصلة للأدوات والخامات."],
    },
    sourced: false,
  },
  {
    slug: "service",
    title: { en: "Service", ar: "سيرفيس" },
    tagline: {
      en: "Post a trip or book a seat between Jordan's governorates.",
      ar: "انشر رحلتك أو احجز مقعدك بين محافظات الأردن.",
    },
    summary: {
      en: "Intercity ride sharing for Jordan — Amman, Irbid, Zarqa, Aqaba and everywhere else. Drivers post the trip they are already making; passengers book a seat on it.",
      ar: "مشاركة رحلات بين مدن الأردن — عمّان وإربد والزرقاء والعقبة وسائر المحافظات. ينشر السائقون الرحلة التي سيقومون بها أصلًا، ويحجز الركاب مقعدًا فيها.",
    },
    category: "web",
    status: "live",
    featured: false,
    year: "2026",
    role: { en: "Solo", ar: "منفردًا" },
    stack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "RTL"],
    cover: "/projects/sarfees.png",
    gallery: ["/projects/sarfees.png"],
    links: { live: "https://sarfees.vercel.app", github: "https://github.com/haithamassoli/sarfees" },
    overview: {
      en: [
        "Intercity travel in Jordan runs on 'service' cars that leave when they fill. You go to the station and wait, with no way to know whether that is ten minutes or an hour.",
        "This moves the matching online: a driver posts the trip they are making anyway, passengers book seats on it, and both sides know the departure before anyone leaves the house.",
      ],
      ar: [
        "يقوم التنقّل بين مدن الأردن على سيارات «السرفيس» التي تنطلق حين تمتلئ. تذهب إلى المجمّع وتنتظر، بلا سبيل لمعرفة أهي عشر دقائق أم ساعة.",
        "ينقل هذا المطابقة إلى الإنترنت: ينشر السائق الرحلة التي سيقوم بها على أي حال، ويحجز الركاب مقاعد فيها، ويعرف الطرفان موعد الانطلاق قبل أن يغادر أحد بيته.",
      ],
    },
    challenges: [
      {
        title: { en: "Seats are a shared, racing resource", ar: "المقاعد مورد مشترك متسابَق عليه" },
        problem: {
          en: "A seven-seat car with two people booking the last seat at once is the normal case on a popular route, and overselling means someone is left at the station.",
          ar: "سيارة بسبعة مقاعد يحجز شخصان آخر مقعد فيها في اللحظة ذاتها حالة طبيعية على خط مزدحم، والبيع الزائد يعني أن أحدهم يبقى في المجمّع.",
        },
        solution: {
          en: "Remaining seats are decremented in a single server-side operation rather than read-then-write, so a race resolves to one winner and a clean 'full' state for the other.",
          ar: "تُنقَص المقاعد المتبقية في عملية واحدة على الخادم بدل قراءة ثم كتابة، فيُحسم السباق بفائز واحد وحالة «مكتمل» نظيفة للآخر.",
        },
      },
    ],
    outcomes: {
      en: ["Trip posting and seat booking across all Jordanian governorates."],
      ar: ["نشر الرحلات وحجز المقاعد في كل محافظات الأردن."],
    },
    sourced: false,
  },
  {
    slug: "hijabk",
    title: { en: "Hijabk", ar: "حجابك" },
    tagline: {
      en: "A Jordanian atelier for khimars and abayas, ordered over WhatsApp.",
      ar: "مشغل أردني للخُمُر والعبايات، الطلب عبر واتساب.",
    },
    summary: {
      en: "A storefront for a workshop in Amman making khimars, veils and abayas from Korean and Turkish fabrics. Orders go through WhatsApp, payment is cash on delivery, and shipping covers every governorate.",
      ar: "واجهة متجر لمشغل في عمّان يخيط الخُمُر والطُرَح والنُقُب والعبايات من أقمشة كورية وتركية. الطلب عبر واتساب، والدفع عند الاستلام، والتوصيل لكل المحافظات.",
    },
    category: "web",
    status: "live",
    featured: false,
    year: "2026",
    role: { en: "Solo", ar: "منفردًا" },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "RTL", "SEO", "WhatsApp ordering"],
    cover: "/projects/7jabk.png",
    gallery: ["/projects/7jabk.png"],
    links: { live: "https://7jabk.vercel.app", github: "https://github.com/haithamassoli/7jabk" },
    overview: {
      en: [
        "The client sells through Instagram, where every order is a DM conversation and nothing is browsable. Customers cannot see the range, and the workshop retypes the same answers all day.",
        "The site gives the catalogue a permanent home while leaving the ordering exactly where the customer is already comfortable — a tap opens WhatsApp with the item pre-filled, so nothing about the sales process had to change.",
      ],
      ar: [
        "تبيع صاحبة المشروع عبر إنستغرام، حيث كل طلب محادثة خاصة ولا شيء قابل للتصفح. لا يرى الزبائن التشكيلة، ويعيد المشغل كتابة الأجوبة نفسها طوال اليوم.",
        "يمنح الموقع الكتالوج بيتًا دائمًا مع إبقاء الطلب حيث يرتاح الزبون أصلًا — نقرة تفتح واتساب والمنتج مُعبّأ مسبقًا، فلم يتغيّر شيء في عملية البيع.",
      ],
    },
    challenges: [
      {
        title: { en: "Do not replace a checkout that works", ar: "لا تستبدل عملية شراء ناجحة" },
        problem: {
          en: "The obvious move is a real cart and online payment. But the customers here expect cash on delivery and a conversation before buying — a card form would have lost sales, not added them.",
          ar: "الخطوة البديهية سلة حقيقية ودفع إلكتروني. لكن زبائن هنا يتوقعون الدفع عند الاستلام ومحادثة قبل الشراء — ونموذج بطاقة كان سيخسر مبيعات لا يضيفها.",
        },
        solution: {
          en: "The site is a catalogue that hands off to WhatsApp with the item and size already written into the message. It removes the browsing friction and keeps the part that was already working.",
          ar: "الموقع كتالوج يُسلّم إلى واتساب والمنتج والمقاس مكتوبان في الرسالة مسبقًا. فيزيل عناء التصفح ويُبقي الجزء الذي كان يعمل أصلًا.",
        },
      },
    ],
    outcomes: {
      en: ["A browsable catalogue feeding WhatsApp orders, with delivery across Jordan."],
      ar: ["كتالوج قابل للتصفح يغذّي طلبات واتساب، مع توصيل لكل الأردن."],
    },
    sourced: false,
  },
  {
    slug: "al-manal",
    title: { en: "Al-Manal", ar: "المنال" },
    tagline: {
      en: "Find a substitute teacher before the bell rings.",
      ar: "اعثر على معلّم بديل قبل أن يرنّ الجرس.",
    },
    summary: {
      en: "A smart school system for managing teachers, timetables, substitutes, period swaps and task follow-up. Its core job is answering, instantly, who can cover a class when a teacher is absent.",
      ar: "نظام مدرسي ذكي لإدارة المعلمين والجداول والبدلاء وتبديل الحصص ومتابعة المهام. ومهمته الأساسية أن يجيب فورًا: من يستطيع تغطية حصة عند غياب معلّم.",
    },
    category: "web",
    status: "live",
    featured: false,
    year: "2025",
    role: { en: "Solo", ar: "منفردًا" },
    stack: ["JavaScript", "Next.js", "Scheduling logic", "RTL"],
    cover: "/projects/substitution-finder.png",
    gallery: ["/projects/substitution-finder.png"],
    links: {
      live: "https://school-teacher-substitution-finder.vercel.app",
      github: "https://github.com/haithamassoli/School-Teacher-Substitution-Finder",
    },
    overview: {
      en: [
        "When a teacher calls in sick at 7am, someone in the office solves a constraint problem by hand, on paper, in fifteen minutes, while the first period is starting. They do it every single morning.",
        "Al-Manal does that search instantly: given the timetable and who is absent, it produces the teachers who are genuinely free for that period, so the decision is a choice rather than a scramble.",
      ],
      ar: [
        "حين يتصل معلّم صباحًا معتذرًا بالمرض، يحلّ أحدهم في الإدارة مسألة قيود يدويًا على ورقة خلال خمس عشرة دقيقة بينما تبدأ الحصة الأولى. ويفعلون ذلك كل صباح.",
        "يُجري «المنال» ذلك البحث فورًا: من الجدول ومن قائمة الغياب، يُخرج المعلمين المتفرغين فعلًا لتلك الحصة، فيصير القرار اختيارًا لا سباقًا.",
      ],
    },
    challenges: [
      {
        title: { en: "'Free' is not the same as 'available'", ar: "«فارغ» ليس «متاح»" },
        problem: {
          en: "A teacher with no class that period may still be unavailable — they may be on duty, at their daily limit, or already covering something else. A naive gap search returns names the office cannot actually use.",
          ar: "المعلّم الذي لا حصة له في تلك الفترة قد يكون غير متاح رغم ذلك — قد يكون في مناوبة، أو بلغ نصابه اليومي، أو يغطي شيئًا آخر أصلًا. والبحث الساذج عن الفراغات يعيد أسماء لا تستطيع الإدارة استخدامها.",
        },
        solution: {
          en: "Availability is computed from the full set of constraints rather than the timetable alone, and candidates are ranked so the fairest option — usually whoever has covered least — appears first.",
          ar: "تُحسب الإتاحة من مجموعة القيود كاملة لا من الجدول وحده، ويُرتَّب المرشحون بحيث يظهر الخيار الأعدل أولًا — وهو عادةً الأقل تغطيةً.",
        },
      },
    ],
    outcomes: {
      en: ["Instant substitute suggestions ranked by fairness, plus timetable and task management."],
      ar: ["اقتراحات بدلاء فورية مرتّبة بالعدالة، مع إدارة الجداول والمهام."],
    },
    sourced: false,
  },
  {
    slug: "telestream",
    title: { en: "TeleStream & FeedGram", ar: "تيليستريم وفيدجرام" },
    tagline: {
      en: "Read public Telegram channels as one clean timeline.",
      ar: "اقرأ قنوات تيليجرام العامة كخط زمني واحد نظيف.",
    },
    summary: {
      en: "Two takes on the same idea: aggregate posts from public Telegram channels into a single unified feed you can read in a browser, without the app and without joining anything.",
      ar: "مقاربتان للفكرة نفسها: تجميع منشورات قنوات تيليجرام العامة في خط زمني موحّد تقرأه في المتصفح، بلا تطبيق وبلا انضمام إلى شيء.",
    },
    category: "web",
    status: "live",
    featured: false,
    year: "2026",
    role: { en: "Solo", ar: "منفردًا" },
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    cover: "/projects/telegram-feed.png",
    gallery: ["/projects/telegram-feed.png", "/projects/feed-gram.png"],
    links: { live: "https://tele-timeline.vercel.app", github: "https://github.com/haithamassoli/telegram-feed" },
    overview: {
      en: [
        "Following a dozen Telegram channels means a dozen separate chats, each buffering unread counts, mixed in with actual conversations with people. There is no way to just read them.",
        "These aggregate public channels into one chronological feed in the browser — a reader rather than a client. FeedGram is the second pass at the same problem.",
      ],
      ar: [
        "متابعة اثنتي عشرة قناة على تيليجرام تعني اثنتي عشرة محادثة منفصلة، كلٌّ تُراكم عدّادات غير مقروء، مختلطة بمحادثات حقيقية مع أشخاص. ولا سبيل لمجرّد قراءتها.",
        "يجمع هذان قنوات عامة في خط زمني واحد مرتّب زمنيًا داخل المتصفح — قارئ لا عميل. وFeedGram هو المحاولة الثانية للمشكلة نفسها.",
      ],
    },
    challenges: [
      {
        title: { en: "Reading public channels without an account", ar: "قراءة القنوات العامة بلا حساب" },
        problem: {
          en: "The obvious route is the bot API, which requires the bot to be a member of every channel — impossible for channels you do not control, and the whole point was to read without joining.",
          ar: "الطريق البديهي واجهة البوتات، وهي تتطلب أن يكون البوت عضوًا في كل قناة — وهذا مستحيل لقنوات لا تملكها، والغاية كلها كانت القراءة دون انضمام.",
        },
        solution: {
          en: "The reader works from the public web preview each channel already exposes, so it only ever sees what is public anyway and needs no credentials at all.",
          ar: "يعمل القارئ من المعاينة العامة التي تكشفها كل قناة أصلًا، فلا يرى إلا ما هو عام على أي حال ولا يحتاج أي بيانات اعتماد.",
        },
      },
    ],
    outcomes: {
      en: ["A unified, credential-free reader for public Telegram channels."],
      ar: ["قارئ موحّد بلا بيانات اعتماد لقنوات تيليجرام العامة."],
    },
    sourced: false,
  },
  {
    slug: "wedding-invitation",
    title: { en: "Wedding Invitation", ar: "دعوة زفاف" },
    tagline: { en: "A wedding invitation that lives at a link.", ar: "دعوة زفاف تسكن رابطًا." },
    summary: {
      en: "A digital wedding invitation — details, location, countdown and RSVP — sent as a link instead of printed and delivered by hand.",
      ar: "دعوة زفاف رقمية — تفاصيل وموقع وعدّاد تنازلي وتأكيد حضور — تُرسل كرابط بدل الطباعة والتسليم باليد.",
    },
    category: "web",
    status: "live",
    featured: false,
    year: "2026",
    role: { en: "Solo", ar: "منفردًا" },
    stack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "RTL"],
    cover: "/projects/wedding-invitation.png",
    gallery: ["/projects/wedding-invitation.png"],
    links: { live: "https://h-wedding.assoli.site", github: "https://github.com/haithamassoli/wedding-invitation" },
    overview: {
      en: [
        "Printed invitations in Jordan mean a print run, a guest count fixed weeks early, and someone driving around delivering cards. Most of them end up as a photo in a WhatsApp group anyway.",
        "This is the link version: the details, the venue on a map, a countdown, and an RSVP that gives the couple a live number instead of an estimate.",
      ],
      ar: [
        "الدعوات المطبوعة في الأردن تعني طبعة كاملة، وعدد ضيوف يُثبَّت قبل أسابيع، وشخصًا يقود سيارته موزّعًا البطاقات. ومعظمها ينتهي صورةً في مجموعة واتساب على أي حال.",
        "هذه نسخة الرابط: التفاصيل، والقاعة على خريطة، وعدّاد تنازلي، وتأكيد حضور يعطي العروسين رقمًا حيًّا بدل تقدير.",
      ],
    },
    challenges: [
      {
        title: { en: "It gets opened on a phone, in a group chat, once", ar: "تُفتح على هاتف، في محادثة جماعية، مرة واحدة" },
        problem: {
          en: "There is exactly one chance to make the impression, on whatever device the guest happens to hold, often on a slow connection — and a heavy animated page that loads badly is worse than a printed card.",
          ar: "هناك فرصة واحدة بالضبط لترك الانطباع، على أي جهاز يصادف أن يحمله الضيف، وغالبًا على اتصال بطيء — وصفحة متحركة ثقيلة تُحمَّل بسوء أسوأ من بطاقة مطبوعة.",
        },
        solution: {
          en: "The page is built mobile-first and kept light, with motion used sparingly enough that the invitation is readable before the animation finishes.",
          ar: "بُنيت الصفحة للهاتف أولًا وأُبقيت خفيفة، والحركة مستخدمة باقتصاد يكفي لتكون الدعوة مقروءة قبل انتهاء الحركة.",
        },
      },
    ],
    outcomes: {
      en: ["Shareable invitation with map, countdown and live RSVP counts."],
      ar: ["دعوة قابلة للمشاركة مع خريطة وعدّاد تنازلي وأعداد تأكيد حضور حيّة."],
    },
    sourced: false,
  },
  {
    slug: "almadrsa",
    title: { en: "Almadrsa", ar: "المدرسة" },
    tagline: { en: "An e-learning platform for schools.", ar: "منصة تعليم إلكتروني للمدارس." },
    summary: {
      en: "An online school platform bringing courses, materials and student progress into one place for a school's teachers and students.",
      ar: "منصة مدرسية إلكترونية تجمع المساقات والمواد وتقدّم الطلاب في مكان واحد لمعلمي المدرسة وطلابها.",
    },
    category: "web",
    status: "live",
    featured: false,
    year: "2026",
    role: { en: "Solo", ar: "منفردًا" },
    stack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "RTL"],
    cover: "/projects/almadrsa.png",
    gallery: ["/projects/almadrsa.png"],
    links: { live: "https://almadrsa.vercel.app", github: "https://github.com/haithamassoli/almadrsa" },
    overview: {
      en: [
        "Schools that went online during the pandemic mostly ended up with a mix of a video call link, a WhatsApp group and a shared drive. None of it survives a change of teacher.",
        "Almadrsa gives the same activity a structure that outlasts the term: courses hold their material, students have progress, and nothing depends on somebody still being in the right group chat.",
      ],
      ar: [
        "المدارس التي انتقلت إلى الإنترنت في الجائحة انتهت في معظمها إلى خليط من رابط مكالمة مرئية ومجموعة واتساب ومجلد مشترك. ولا شيء من ذلك ينجو من تغيير معلّم.",
        "تمنح «المدرسة» النشاط نفسه بنيةً تدوم بعد الفصل: تحتفظ المساقات بموادها، وللطلاب تقدّم، ولا يعتمد شيء على بقاء أحدهم في المجموعة الصحيحة.",
      ],
    },
    challenges: [
      {
        title: { en: "Teachers will not learn a new tool mid-term", ar: "لن يتعلم المعلمون أداة جديدة في منتصف الفصل" },
        problem: {
          en: "Any platform that asks a teacher to restructure how they already work gets used for one week and abandoned. Adoption fails on effort, not features.",
          ar: "أي منصة تطلب من المعلّم إعادة هيكلة طريقة عمله الحالية تُستخدم أسبوعًا ثم تُهجَر. ويفشل التبنّي بسبب الجهد لا الميزات.",
        },
        solution: {
          en: "The model mirrors what a school already has — a course, its material, its students — so nothing needs to be rethought to start using it.",
          ar: "يحاكي النموذج ما لدى المدرسة أصلًا — مساق ومواده وطلابه — فلا يحتاج شيء إلى إعادة تفكير للبدء باستخدامه.",
        },
      },
    ],
    outcomes: {
      en: ["Courses, materials and student progress in one Arabic-first platform."],
      ar: ["مساقات ومواد وتقدّم الطلاب في منصة عربية أولًا."],
    },
    sourced: false,
  },
  {
    slug: "hafiz-platform",
    title: { en: "Hafiz Platform", ar: "منصة حافظ" },
    tagline: {
      en: "An escrow-style platform that protects both sides of a sale.",
      ar: "منصة وساطة تحفظ حقوق طرفَي البيع.",
    },
    summary: {
      en: "A platform where a seller registers, is connected to a customer, and the rights of both parties are preserved through the transaction rather than depending on trust between strangers.",
      ar: "منصة يسجّل فيها البائع فيُوصَل بالزبون، وتُحفَظ حقوق الطرفين خلال الصفقة بدل الاعتماد على ثقة بين غريبين.",
    },
    category: "web",
    status: "live",
    featured: false,
    year: "2024",
    role: { en: "Solo", ar: "منفردًا" },
    stack: ["Next.js", "TypeScript", "Server Components", "Server Actions", "Zod", "Tailwind CSS", "SEO", "Caching"],
    cover: "/projects/hafiz-platform.png",
    gallery: ["/projects/hafiz-platform.png"],
    links: { live: "https://hafiz-platform.netlify.app" },
    overview: {
      en: [
        "Online selling between individuals fails at the same point every time: one side has to go first. The seller ships before being paid, or the buyer pays before receiving, and whoever moves first carries all the risk.",
        "Hafiz sits between them so neither has to. The platform holds the transaction and releases it when both obligations are met, which turns a trust problem into a process.",
      ],
      ar: [
        "يفشل البيع بين الأفراد عبر الإنترنت عند النقطة نفسها دائمًا: على أحد الطرفين أن يبدأ. فيشحن البائع قبل أن يُدفع له، أو يدفع المشتري قبل أن يستلم، ومن يتحرك أولًا يحمل المخاطرة كلها.",
        "تقف «حافظ» بينهما فلا يضطر أيٌّ منهما. تُمسك المنصة بالصفقة وتُفرج عنها عند استيفاء الالتزامين، فتتحول مشكلة ثقة إلى إجراء.",
      ],
    },
    challenges: [
      {
        title: { en: "The state machine is the safety mechanism", ar: "آلة الحالات هي آلية الأمان" },
        problem: {
          en: "A transaction that can be advanced out of order — released before delivery, cancelled after payment — loses someone real money. The failure is financial, not cosmetic.",
          ar: "الصفقة التي يمكن دفعها خارج الترتيب — الإفراج قبل التسليم، أو الإلغاء بعد الدفع — تخسر أحدهم مالًا حقيقيًا. والفشل مالي لا شكلي.",
        },
        solution: {
          en: "Every transition runs through server actions with the allowed transitions validated on the server and the payload checked with Zod, so an out-of-order request is rejected rather than reaching the state machine.",
          ar: "يمرّ كل انتقال عبر إجراءات على الخادم مع التحقق من الانتقالات المسموحة هناك وفحص الحمولة بـ Zod، فيُرفض الطلب خارج الترتيب بدل أن يبلغ آلة الحالات.",
        },
      },
    ],
    outcomes: {
      en: ["Server-validated transaction states protecting both parties."],
      ar: ["حالات صفقة مُتحقَّق منها على الخادم تحمي الطرفين."],
    },
    sourced: false,
  },
  {
    slug: "nomusic",
    title: { en: "nomusic", ar: "بلا موسيقى" },
    tagline: {
      en: "Watch YouTube and Facebook videos without the music.",
      ar: "شاهد فيديوهات يوتيوب وفيسبوك بلا موسيقى.",
    },
    summary: {
      en: "A free tool that strips music from videos on YouTube, Facebook and other sites while dialogue, narration and other sound keep playing — running against a local audio-separation backend on your own machine.",
      ar: "أداة مجانية تزيل الموسيقى من فيديوهات يوتيوب وفيسبوك ومواقع أخرى مع استمرار الحوار والسرد وبقية الأصوات — تعمل مقابل خادم فصل صوتي محلي على جهازك.",
    },
    category: "ai",
    status: "live",
    featured: false,
    year: "2026",
    role: { en: "Contributor", ar: "مساهم" },
    stack: ["Python", "Audio source separation", "Apple Silicon / MPS", "CUDA", "yt-dlp"],
    cover: "/projects/nomusic-logo.png",
    gallery: ["/projects/nomusic-logo.png"],
    links: { github: "https://github.com/haithamassoli/nomusic" },
    overview: {
      en: [
        "Made for people who avoid music for religious or personal reasons, and who currently have to choose between skipping useful content entirely or muting it and losing the speech too.",
        "It runs a local separation backend — Apple Silicon or an NVIDIA GPU, CPU as a fallback — so the audio never leaves the machine. First-time setup takes about twenty minutes; starting it afterwards takes ten seconds.",
      ],
      ar: [
        "صُنع لمن يتجنبون الموسيقى لأسباب دينية أو شخصية، ويضطرون حاليًا للاختيار بين تفويت محتوى نافع كليًا أو كتمه وخسارة الكلام معه.",
        "يشغّل خادم فصل محليًا — على Apple Silicon أو معالج NVIDIA رسومي، والمعالج المركزي كخيار احتياطي — فلا يغادر الصوت الجهاز. ويستغرق الإعداد الأول نحو عشرين دقيقة، ثم عشر ثوانٍ لتشغيله بعد ذلك.",
      ],
    },
    challenges: [
      {
        title: { en: "The users are not developers", ar: "المستخدمون ليسوا مطورين" },
        problem: {
          en: "The people who want this most are the least likely to be comfortable with a terminal, and a README that assumes any command-line familiarity excludes almost the entire audience.",
          ar: "أكثر الناس رغبةً في هذا هم الأقل ارتياحًا للطرفية، وأي README يفترض إلمامًا بسطر الأوامر يستبعد الجمهور كله تقريبًا.",
        },
        solution: {
          en: "The documentation assumes nothing — it explains where the Downloads folder is and what to click, step by step. Lowering the setup barrier mattered more here than any feature.",
          ar: "لا يفترض التوثيق شيئًا — يشرح أين مجلد التنزيلات وما الذي يُنقر عليه، خطوة بخطوة. وخفض حاجز الإعداد كان هنا أهم من أي ميزة.",
        },
      },
    ],
    outcomes: {
      en: ["Local-only music removal for streaming video, with Mac and Linux paths documented for non-technical users."],
      ar: ["إزالة موسيقى محلية بالكامل لفيديو البث، مع مسارات موثّقة لماك ولينكس لغير التقنيين."],
    },
    sourced: true,
  },
  {
    slug: "cohere-transcribe",
    title: { en: "cohere-transcribe", ar: "cohere-transcribe" },
    tagline: {
      en: "High-throughput Arabic/English transcription, batched properly.",
      ar: "تفريغ عربي/إنجليزي عالي الإنتاجية، بمعالجة دفعية سليمة.",
    },
    summary: {
      en: "A Python package for offline batch transcription with Cohere's 2B Arabic/English ASR model — optimised voice activity detection, multi-file GPU batching under bounded memory, subtitle output and optional word-level timestamps.",
      ar: "حزمة بايثون للتفريغ الدفعي دون اتصال بنموذج Cohere للتعرف على الكلام بحجم ملياري معامل للعربية والإنجليزية — كشف نشاط صوتي محسّن، ومعالجة دفعية لملفات متعددة على المعالج الرسومي بذاكرة محدودة، وإخراج ترجمات وطوابع زمنية اختيارية على مستوى الكلمة.",
    },
    category: "ai",
    status: "live",
    featured: false,
    year: "2026",
    role: { en: "Contributor", ar: "مساهم" },
    stack: ["Python", "Silero VAD", "GPU batching", "SRT / VTT", "Hugging Face"],
    cover: "",
    gallery: [],
    links: { github: "https://github.com/AliOsm/cohere-transcribe" },
    overview: {
      en: [
        "Transcribing one file is a solved problem. Transcribing a directory of hundreds without running out of GPU memory, and without spending most of the run on silence, is not.",
        "The package handles individual files, multiple paths and nested directories with bounded-memory batching, and can return results directly or publish plain text, approximate segment-timed subtitles, or word-timed subtitles.",
      ],
      ar: [
        "تفريغ ملف واحد مسألة محلولة. أما تفريغ مجلد فيه مئات الملفات دون نفاد ذاكرة المعالج الرسومي، ودون إنفاق معظم زمن التشغيل على الصمت، فليس كذلك.",
        "تعالج الحزمة الملفات المفردة والمسارات المتعددة والمجلدات المتشعبة بمعالجة دفعية محدودة الذاكرة، وتستطيع إعادة النتائج مباشرة أو إخراج نص عادي أو ترجمات بتوقيت تقريبي للمقاطع أو ترجمات بتوقيت على مستوى الكلمة.",
      ],
    },
    challenges: [
      {
        title: { en: "Most of a recording is silence", ar: "معظم التسجيل صمت" },
        problem: {
          en: "Feeding raw audio to the model spends a large share of the compute transcribing pauses, which is the main reason long-file throughput is bad.",
          ar: "تمرير الصوت الخام إلى النموذج يُنفق حصة كبيرة من الحوسبة على تفريغ الصمت، وهذا السبب الرئيسي لضعف الإنتاجية على الملفات الطويلة.",
        },
        solution: {
          en: "Voice activity detection segments speech first, so only speech reaches the model. The batching is then built around those segments rather than around file boundaries.",
          ar: "يقسّم كشف نشاط الصوت الكلام أولًا، فلا يصل النموذج إلا الكلام. ثم تُبنى المعالجة الدفعية حول تلك المقاطع لا حول حدود الملفات.",
        },
      },
    ],
    outcomes: {
      en: ["Directory-scale batch transcription with bounded memory and subtitle output."],
      ar: ["تفريغ دفعي على مستوى المجلدات بذاكرة محدودة وإخراج ترجمات."],
    },
    sourced: true,
  },
  {
    slug: "t3-code",
    title: { en: "T3 Code", ar: "T3 Code" },
    tagline: {
      en: "Control the coding agents on your machine, from anywhere.",
      ar: "تحكّم بوكلاء البرمجة على جهازك، من أي مكان.",
    },
    summary: {
      en: "An agent harness control surface — a mobile, web and Electron desktop app for driving the coding agents running on your own computer. Works with Claude Code, Codex, Cursor, Grok and OpenCode.",
      ar: "سطح تحكم بمنظومة الوكلاء — تطبيق موبايل وويب وسطح مكتب بـ Electron لقيادة وكلاء البرمجة العاملين على حاسوبك. يعمل مع Claude Code وCodex وCursor وGrok وOpenCode.",
    },
    category: "client",
    status: "live",
    featured: false,
    year: "2026",
    role: { en: "Contributor", ar: "مساهم" },
    stack: ["TypeScript", "React", "React Native", "Electron"],
    cover: "/projects/t3code.png",
    gallery: ["/projects/t3code.png", "/apps/t3code-1.png", "/apps/t3code-2.png", "/apps/t3code-3.png"],
    links: {
      live: "https://t3.codes",
      appStore: "https://apps.apple.com/us/app/id6787819824",
      playGoogle: "https://play.google.com/store/apps/details?id=com.t3tools.t3code",
      github: "https://github.com/haithamassoli/t3code",
    },
    overview: {
      en: [
        "Coding agents run on your machine, which means you are tied to that machine while they work. T3 Code separates the agent from the desk: kick off runs, browse files, review diffs, use the terminal and do version control from a phone.",
        "It works with whatever subscriptions you already have set up locally rather than replacing them.",
      ],
      ar: [
        "يعمل وكلاء البرمجة على جهازك، ما يعني ارتباطك بذلك الجهاز أثناء عملهم. يفصل T3 Code الوكيل عن المكتب: ابدأ التشغيل، وتصفّح الملفات، وراجع الفروق، واستخدم الطرفية، وأدِر الإصدارات من هاتفك.",
        "ويعمل مع الاشتراكات المُعدَّة لديك محليًا أصلًا بدل استبدالها.",
      ],
    },
    challenges: [
      {
        title: { en: "A phone screen is not a terminal", ar: "شاشة الهاتف ليست طرفية" },
        problem: {
          en: "Diffs, file trees and terminal output are all designed for a wide screen. Shrinking them produces something technically present and practically unusable.",
          ar: "الفروق وأشجار الملفات ومخرجات الطرفية كلها مصممة لشاشة عريضة. وتصغيرها ينتج شيئًا موجودًا تقنيًا وغير قابل للاستخدام عمليًا.",
        },
        solution: {
          en: "The mobile surfaces are rebuilt for the form factor rather than scaled down, so reviewing a diff on a phone is a real workflow instead of a preview of one.",
          ar: "أُعيد بناء واجهات الموبايل لهذا القياس بدل تصغيرها، فتصير مراجعة فرق على الهاتف مسار عمل حقيقيًا لا معاينة له.",
        },
      },
    ],
    outcomes: {
      en: ["Shipped on iOS, Android, web and desktop.", "Works across Claude Code, Codex, Cursor, Grok and OpenCode."],
      ar: ["أُطلق على iOS وأندرويد والويب وسطح المكتب.", "يعمل عبر Claude Code وCodex وCursor وGrok وOpenCode."],
    },
    sourced: true,
  },
  {
    slug: "recruiter-connector",
    title: { en: "Recruiter Connector", ar: "Recruiter Connector" },
    tagline: {
      en: "A marketplace where recruiters trade candidate profiles.",
      ar: "سوق يتبادل فيه المُوظِّفون ملفات المرشحين.",
    },
    summary: {
      en: "A platform built exclusively for recruiters: list and discover verified candidate profiles, chat directly with other recruiters, and turn connections into revenue.",
      ar: "منصة مبنية حصرًا للمُوظِّفين: اعرض واكتشف ملفات مرشحين مُتحقَّقًا منها، وتحدّث مباشرة مع مُوظِّفين آخرين، وحوّل الاتصالات إلى دخل.",
    },
    category: "client",
    status: "shipped",
    featured: false,
    year: "2025",
    role: { en: "Client project — mobile development", ar: "مشروع لعميل — تطوير الموبايل" },
    stack: ["React Native", "TypeScript", "Real-time chat", "Push Notifications"],
    cover: "/apps/ofi-recruiter-1.png",
    gallery: ["/apps/ofi-recruiter-1.png", "/apps/ofi-recruiter-2.png", "/apps/ofi-recruiter-3.png", "/apps/ofi-recruiter-4.png"],
    links: { playGoogle: "https://play.google.com/store/apps/details?id=com.ofi.recruiter_new" },
    overview: {
      en: [
        "Recruiters routinely have a strong candidate who is wrong for their role and right for someone else's. That value currently evaporates in private conversations, or does not move at all.",
        "This makes it a market: candidate profiles can be listed, discovered and shared between recruiters, with built-in chat so the negotiation happens in the same place as the listing.",
      ],
      ar: [
        "لدى المُوظِّفين باستمرار مرشح قوي لا يناسب وظيفتهم ويناسب وظيفة غيرهم. وتتبخر تلك القيمة اليوم في محادثات خاصة، أو لا تتحرك إطلاقًا.",
        "يحوّل هذا الأمر إلى سوق: تُعرَض ملفات المرشحين وتُكتشَف وتُشارَك بين المُوظِّفين، مع محادثة مدمجة ليقع التفاوض في المكان نفسه الذي فيه العرض.",
      ],
    },
    challenges: [
      {
        title: { en: "The inventory is other people's personal data", ar: "البضاعة بيانات شخصية لأناس آخرين" },
        problem: {
          en: "A candidate profile is a real person's employment history and contact details. A marketplace that exposes it before a deal is agreed is trading data those people did not consent to circulate.",
          ar: "ملف المرشح هو تاريخ توظيف شخص حقيقي وبيانات اتصاله. والسوق الذي يكشفه قبل الاتفاق على صفقة يتاجر ببيانات لم يوافق أصحابها على تداولها.",
        },
        solution: {
          en: "Listings show enough to evaluate a match and withhold identifying details until the exchange is agreed, so browsing cannot be used to harvest contact information.",
          ar: "تعرض القوائم ما يكفي لتقييم المطابقة وتحجب التفاصيل المُعرِّفة حتى الاتفاق على التبادل، فلا يمكن استخدام التصفح لحصاد بيانات الاتصال.",
        },
      },
    ],
    outcomes: {
      en: ["Published on Google Play with a candidate marketplace and built-in recruiter chat."],
      ar: ["منشور على Google Play مع سوق للمرشحين ومحادثة مدمجة بين المُوظِّفين."],
    },
    sourced: true,
  },
  {
    slug: "personal-sites",
    title: { en: "assoli.site & cv.assoli.site", ar: "assoli.site وcv.assoli.site" },
    tagline: {
      en: "My portfolio and my web résumé.",
      ar: "معرض أعمالي وسيرتي الذاتية على الويب.",
    },
    summary: {
      en: "The previous portfolio and the standalone web résumé — an animated single-page portfolio with a command menu, and a print-friendly CV with a keyboard-driven interface.",
      ar: "معرض الأعمال السابق والسيرة الذاتية المستقلة على الويب — معرض أعمال أحادي الصفحة متحرك بقائمة أوامر، وسيرة ذاتية صالحة للطباعة بواجهة تُدار من لوحة المفاتيح.",
    },
    category: "web",
    status: "live",
    featured: false,
    year: "2026",
    role: { en: "Solo", ar: "منفردًا" },
    stack: ["Next.js", "TypeScript", "React", "Framer Motion", "Tailwind CSS", "SEO"],
    cover: "/projects/cv.png",
    gallery: ["/projects/cv.png", "/projects/portfolio-old.png"],
    links: {
      live: "https://assoli.site",
      github: "https://github.com/haithamassoli/nextjs-portfolio",
    },
    overview: {
      en: [
        "Two separate sites doing two different jobs. The portfolio is the pitch — animated, opinionated, built to be looked at. The résumé is the reference — dense, scannable, and something a recruiter can print.",
        "Keeping them apart meant neither had to compromise: the portfolio can be heavy on motion without hurting the CV, and the CV can be plain without making the portfolio look dull.",
      ],
      ar: [
        "موقعان منفصلان يؤديان مهمتين مختلفتين. المعرض هو العرض التقديمي — متحرك وذو رأي ومبني ليُنظر إليه. والسيرة هي المرجع — كثيفة وسهلة المسح، ويستطيع مسؤول التوظيف طباعتها.",
        "وفصلهما عنى ألا يتنازل أيٌّ منهما: فيستطيع المعرض الإكثار من الحركة دون الإضرار بالسيرة، وتستطيع السيرة أن تكون بسيطة دون أن تجعل المعرض باهتًا.",
      ],
    },
    challenges: [
      {
        title: { en: "Motion that does not cost the first impression", ar: "حركة لا تكلّف الانطباع الأول" },
        problem: {
          en: "A portfolio is judged in the first two seconds, and that is exactly the window that heavy animation and font loading spend on themselves.",
          ar: "يُحكَم على معرض الأعمال في أول ثانيتين، وهي بالضبط النافذة التي تنفقها الحركة الثقيلة وتحميل الخطوط على نفسها.",
        },
        solution: {
          en: "Content is readable before the animation resolves rather than gated behind it, so a slow connection degrades to a plain page instead of a blank one.",
          ar: "المحتوى مقروء قبل انتهاء الحركة لا محجوب خلفها، فيتحوّل الاتصال البطيء إلى صفحة بسيطة بدل صفحة فارغة.",
        },
      },
    ],
    outcomes: {
      en: ["A motion-led portfolio and a separate, printable web résumé.", "Now being replaced by this bilingual rebuild."],
      ar: ["معرض أعمال تقوده الحركة وسيرة ذاتية منفصلة قابلة للطباعة.", "ويجري الآن استبدالهما بهذه النسخة ثنائية اللغة."],
    },
    sourced: true,
  },
  {
    slug: "tafrigh",
    title: { en: "Tafrigh", ar: "تفريغ" },
    tagline: {
      en: "Transcribe Arabic audio and generate SRT and VTT subtitles.",
      ar: "تفريغ النصوص العربية وإنشاء ملفات SRT وVTT.",
    },
    summary: {
      en: "A transcription tool that turns Arabic audio into text and timed subtitle files using Whisper models and wit.ai. Widely used for making Arabic lectures and books searchable.",
      ar: "أداة تفريغ تحوّل الصوت العربي إلى نص وملفات ترجمة موقوتة باستخدام نماذج Whisper وتقنية wit.ai. تُستخدم على نطاق واسع لجعل المحاضرات والكتب العربية قابلة للبحث.",
    },
    category: "ai",
    status: "live",
    featured: false,
    year: "2026",
    role: { en: "Contributor", ar: "مساهم" },
    stack: ["Python", "Whisper", "wit.ai", "SRT / VTT"],
    cover: "/projects/tafrigh.png",
    gallery: ["/projects/tafrigh.png"],
    links: { live: "https://tafrigh.ieasybooks.com", github: "https://github.com/haithamassoli/tafrigh" },
    overview: {
      en: [
        "Arabic speech is under-served by transcription tooling, and the material that most needs it — lectures, lessons, recorded books — is exactly the material nobody has budget to transcribe by hand.",
        "Tafrigh produces both plain text and timed subtitle files, which is what makes the output useful for search rather than just for reading. It is the same capability that Kashaf Abi Ja'far depends on.",
      ],
      ar: [
        "الكلام العربي ضعيف الحظ من أدوات التفريغ، والمادة التي تحتاجه أكثر — المحاضرات والدروس والكتب المسجلة — هي بالضبط المادة التي لا ميزانية لتفريغها يدويًا.",
        "يُنتج «تفريغ» نصًا عاديًا وملفات ترجمة موقوتة معًا، وهذا ما يجعل المخرج نافعًا للبحث لا للقراءة فحسب. وهي القدرة نفسها التي يعتمد عليها «كشّاف أبي جعفر».",
      ],
    },
    challenges: [
      {
        title: { en: "Timed output is what makes a transcript searchable", ar: "المخرج الموقوت هو ما يجعل التفريغ قابلًا للبحث" },
        problem: {
          en: "A wall of transcribed text tells you a phrase was said but not where, which leaves the listener scrubbing through the recording anyway.",
          ar: "جدار من النص المُفرَّغ يخبرك أن عبارة قيلت لا أين قيلت، فيبقى المستمع يتنقل في التسجيل على أي حال.",
        },
        solution: {
          en: "Output includes SRT and VTT with segment timings, so downstream tools can index the text and still link back to the exact moment in the audio.",
          ar: "يتضمن المخرج ملفات SRT وVTT بتوقيتات المقاطع، فتستطيع الأدوات اللاحقة فهرسة النص مع الإبقاء على رابط إلى اللحظة نفسها في الصوت.",
        },
      },
    ],
    outcomes: {
      en: ["Plain text plus timed SRT/VTT output for Arabic audio."],
      ar: ["نص عادي مع مخرج SRT/VTT موقوت للصوت العربي."],
    },
    sourced: true,
  },
  {
    slug: "web-archive-fetcher",
    title: { en: "Web Archive Data Fetcher", ar: "جالب بيانات أرشيف الويب" },
    tagline: {
      en: "Recover pages that are no longer online.",
      ar: "استرجاع صفحات لم تعد على الإنترنت.",
    },
    summary: {
      en: "A tool for pulling archived snapshots of a site out of the Wayback Machine and extracting structured data from them — built to recover content from a site that had gone offline.",
      ar: "أداة لسحب اللقطات المؤرشفة لموقع من Wayback Machine واستخراج بيانات منظّمة منها — بُنيت لاسترجاع محتوى موقع توقّف عن العمل.",
    },
    category: "web",
    status: "live",
    featured: false,
    year: "2025",
    role: { en: "Solo", ar: "منفردًا" },
    stack: ["Next.js", "TypeScript", "Wayback Machine API", "HTML parsing"],
    cover: "/projects/shahed-abu-hussein.png",
    gallery: ["/projects/shahed-abu-hussein.png"],
    links: { live: "https://shahed-abu-hussein.vercel.app" },
    overview: {
      en: [
        "When a site disappears, its content often still exists in the Internet Archive — but as thousands of individual snapshots that are painful to go through by hand.",
        "This walks the archive's index for a domain, fetches the snapshots, and extracts the structured content out of them, turning a scattered archive back into usable data.",
      ],
      ar: [
        "حين يختفي موقع، يظل محتواه موجودًا غالبًا في أرشيف الإنترنت — لكن كآلاف اللقطات المفردة التي يشقّ المرور عليها يدويًا.",
        "تمرّ هذه الأداة على فهرس الأرشيف لنطاق ما، وتجلب اللقطات، وتستخرج المحتوى المنظّم منها، فتعيد أرشيفًا متناثرًا إلى بيانات قابلة للاستخدام.",
      ],
    },
    challenges: [
      {
        title: { en: "The archive rate-limits you long before you finish", ar: "يحدّ الأرشيف معدّل طلباتك قبل أن تنتهي بوقت طويل" },
        problem: {
          en: "Fetching thousands of snapshots as fast as possible gets throttled almost immediately, and a naive retry loop makes it worse rather than better.",
          ar: "جلب آلاف اللقطات بأقصى سرعة يُخنَق فورًا تقريبًا، وحلقة إعادة محاولة ساذجة تزيد الأمر سوءًا لا تحسّنه.",
        },
        solution: {
          en: "Requests are paced and retried with backoff, and progress is checkpointed so an interrupted run resumes instead of starting the whole crawl again.",
          ar: "تُوزَّع الطلبات زمنيًا وتُعاد بتراجع تدريجي، ويُحفَظ التقدّم بنقاط تفتيش فيُستأنف التشغيل المنقطع بدل إعادة الزحف من أوله.",
        },
      },
    ],
    outcomes: {
      en: ["Recovered structured content from an offline site via archived snapshots."],
      ar: ["استرجاع محتوى منظّم من موقع متوقف عبر لقطات مؤرشفة."],
    },
    sourced: false,
  },
];
