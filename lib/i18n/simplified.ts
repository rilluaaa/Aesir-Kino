import type { SiteContent } from "@/lib/i18n/types";

export const simplifiedContent = {
  metadata: {
    title: "AESIR 影响力报告｜高端 3D 体验",
    description: "以电影感与玻璃拟态视觉呈现 AESIR 的 AI 照护、SEN 干预、老年康复及运动科技生态系统。"
  },
  languageSelector: { compact: "简中", selectLanguage: "选择语言", language: "语言" },
  chapters: [
    { id: "hero", label: "AESIR 影响力报告" },
    { id: "founder-story", label: "创始人聚焦" },
    { id: "social-innovation", label: "社会创新宣言" },
    { id: "features", label: "照护能力" },
    { id: "impact-metrics", label: "影响力指标" },
    { id: "ai-ecosystem", label: "AI 生态系统" },
    { id: "target-status", label: "目标群体现状" },
    { id: "product-ecosystem", label: "产品生态系统" },
    { id: "sen-support", label: "SEN 支持" },
    { id: "elderly-care", label: "老年照护与康复" },
    { id: "physical-sports", label: "体能与运动科技" },
    { id: "partner-validation", label: "合作伙伴验证" },
    { id: "roadmap", label: "路线图" },
    { id: "cta", label: "联系 AESIR" }
  ],
  accessibility: { chapterNavigation: "影响力报告章节", goToChapter: "前往“{{chapter}}”" },
  hero: {
    eyebrow: "AESIR 影响力报告",
    heading: "为可量化的世界打造 AI 照护系统。",
    headingSegments: ["为", "可量化的世界", "打造", "AI", "照护系统。"],
    description: "以高端而具电影感的视角，呈现 AESIR 在SEN领域积极老龄化，康复及运动科技的生态系统。",
    descriptionSegments: ["以高端而具电影感的视角，", "呈现 AESIR 在SEN领域", "积极老龄化，康复及运动科技的生态系统。"],
    spacedSegments: false
  },
  featuresSection: {
    eyebrow: "影响力架构",
    title: "三个相互连接的层级，贯通照护，学习与智能。",
    features: [
      { eyebrow: "SEN 系统", title: "自适应学习，将动作转化为进展数据。", description: "通过可重复的干预循环，动作感应，AR 和 VR 活动支持识字、注意力、协调能力及社交适应能力。", metric: "98,000+", metricLabel: "已支持 SEN 用户" },
      { eyebrow: "积极老龄化", title: "传感器引导的康复训练，让社区照护更安全。", description: "老年健身及防跌倒体验，帮助一线团队观察参与者的信心、平衡、反应及活动能力。", metric: "2,000+", metricLabel: "已支持老年人" },
      { eyebrow: "成效分析", title: "为照护团队，NGO 及合作伙伴而设的数据层。", description: "AESIR 将一线学习与康复活动转化为可量化的覆盖范围，参与度及成效指标。", metric: "50,000+", metricLabel: "训练数据点" }
    ]
  },
  impactMetricsSection: {
    eyebrow: "成效数据分析",
    title: "将一线活动转化为可量化指标。",
    description: "AESIR 在整个照护科技生态系统中，持续追踪覆盖范围、SEN 参与度、老年服务部署、训练参与情况，以及可观察的进展信号。",
    metrics: [
      { value: "100,000+", label: "年度覆盖人数", domain: "覆盖" },
      { value: "98,000+", label: "已支持 SEN 用户", domain: "SEN" },
      { value: "2,000+", label: "已支持老年人", domain: "老龄" },
      { value: "79", label: "SEN 服务 NGO 合作伙伴", domain: "网络" },
      { value: "43", label: "老年服务 NGO 合作伙伴", domain: "网络" },
      { value: "50,000+", label: "已采集训练数据点", domain: "数据" },
      { value: "90%+", label: "通过游戏化学习展现可量化进步的学生比例", domain: "进展" },
      { value: "50%+", label: "行为及社交适应能力改善", domain: "行为" }
    ]
  },
  targetStatusSection: {
    eyebrow: "目标群体现状",
    title: "面向真实 SEN 与老年照护场景而设计。",
    statuses: [
      {
        title: "目标群体：SEN 学习者",
        summary: "与传统练习册或单向训练相比，SEN 学习者往往需要更多重复练习，更清晰的反馈，以及更强的学习动力。",
        points: [
          { label: "学习需求", body: "通过多感官练习，支持识字、发音、注意力、执行功能、动作协调及社交适应能力。" },
          { label: "实际应用场景", body: "应用于学校、NGO、学习中心及面向家庭的干预场景，这些环境尤其重视参与度与可重复练习。" },
          { label: "产品方案", body: "动作感应、AR、VR 及自适应游戏机制提供即时反馈，同时采集可用的训练信号。" }
        ]
      },
      {
        title: "目标群体：老年照护",
        summary: "安全，低冲击且可重复进行的康复模式，能让老年人更投入动作练习，同时让工作人员更容易观察其表现。",
        points: [
          { label: "照护需求", body: "通过引导式活动支持平衡、反应、活动能力、信心及跌倒风险意识，同时降低对运动的恐惧。" },
          { label: "实际应用场景", body: "应用于老年服务 NGO、日间照护中心、社区场景及家庭式照护环境，并由一线人员协助带领。" },
          { label: "产品方案", body: "VR 与动作感应体验将康复转化为引导式场景，让团队观察姿势，舒适度及反应数据。" }
        ]
      }
    ]
  },
  productEcosystemSection: {
    eyebrow: "产品影响力模块",
    title: "更完整的产品技术组合，支持学习，康复与主动参与运动。",
    modules: [
      { eyebrow: "SEN-01 | 识字引擎", title: "Magic Word Adventure", description: "动作感应游戏通过身体动作与即时视觉反馈，支持书写、空间感知、汉字识别及持续练习。", tags: ["识字", "动作", "反馈"], image: "/impact-photos/sen-magic-word-battle.webp", imageAlt: "儿童正在使用 Magic Word Adventure 动作感应识字游戏" },
      { eyebrow: "SEN-02 | 运动能力层", title: "运动技能训练", description: "互动训练支持精细动作控制、协调、反应及手眼整合，适合需要重复且有系统练习的学生。", tags: ["精细动作", "协调", "注意力"], image: "/impact-photos/sen-motor-capability.webp", imageAlt: "儿童正在使用互动式运动技能训练显示系统" },
      { eyebrow: "SEN-03 | 身体识字", title: "中文身体识字游戏", description: "动作式学习将中文语音，身体动作与记忆连接成一个主动学习体验，支持语言习得与参与。", tags: ["语言", "动作", "记忆"], image: "/impact-photos/sen-body-literacy.png", imageAlt: "学习者正在使用动作式中文身体识字活动" },
      { eyebrow: "AGE-01 | 活动能力层", title: "老年健身游戏", description: "动作式运动通过可重复的练习流程支持平衡、协调、活动能力及信心，可应用于中心及照护机构。", tags: ["平衡", "活动能力", "信心"], image: "/impact-photos/elderly-fitness-session.webp", imageAlt: "老年人正在参加由工作人员带领的健身活动" },
      { eyebrow: "AGE-02 | 风险模拟", title: "防跌倒 VR 游戏", description: "沉浸式平衡训练建立更安全的练习环境，在减少高冲击身体负荷的同时，训练动作控制，建立信心并接触跌倒风险场景。", tags: ["VR", "跌倒风险", "康复"], image: "/impact-photos/elderly-fall-prevention-vr-2.webp", imageAlt: "老年人正在使用 VR 头戴设备进行防跌倒训练" },
      { eyebrow: "SPORT-01 | 沉浸式训练", title: "AR/VR 运动训练", description: "AR，VR 及动作感应将体能训练延伸至传统场地以外，把反应，参与度及教练反馈转化为可量化的活动数据。", tags: ["AR", "VR", "运动数据"], image: "/impact-photos/sports-vr-training.jpg", imageAlt: "参与者正在使用 VR 进行运动训练" }
    ]
  },
  founderStory: {
    eyebrow: "创始人聚焦",
    title: "科技从一线出发，才真正产生意义。",
    founders: ["Ernest Chan", "Zero Wong"],
    summary: "AESIR 的创始人选择以社会影响力为方向，而非走传统企业道路。十多年来，他们一直与特殊教育及老年照护群体并肩合作，深入理解塑造日常照护的制度，流程与障碍。",
    promise: "AESIR 的承诺：将临床严谨性转化为人人可及的自主与赋能。",
    image: "/impact-photos/founder-ai-launch.jpeg",
    imageAlt: "AI 科技发布活动的团体合照",
    imageOverlay: "从零开始，面向学习，康复与照护的真实需求而打造。",
    principles: [
      { title: "关键是研究", body: "每个互动平台都被设计为可量化的干预方案，以心理学及临床验证为基础，而不仅仅是娱乐体验。" },
      { title: "良知驱动的创新", body: "AESIR 将科技进步重新投入可及工具及系统层面的支持，服务资源较少的群体。" }
    ]
  },
  socialInnovation: {
    eyebrow: "社会创新架构",
    title: "科学与游戏的融合。",
    statement: "我们不是为了娱乐而制作游戏。我们打造经临床验证的沉浸式生态系统，将重复的治疗训练转化为可见的认知与运动里程碑。",
    frictionLabel: "现实阻力",
    challenge: "传统康复与特殊教育项目往往重复，难以持续，也不易个性化。这些阻力可能降低信心，参与度，以及照护的连续性。",
    responseLabel: "我们的应对",
    response: "AESIR 将循证的认知行为原则，感觉与动作整合，以及神经可塑性融入游戏化环境，形成更安全且更具吸引力的练习循环，鼓励人们在游戏中学习，成长与康复。",
    fieldPracticeLabel: "一线实践",
    images: [
      { src: "/impact-photos/social-elderly-vr-outreach.jpeg", alt: "老年人正在参加 VR 社区外展活动" },
      { src: "/impact-photos/social-ar-game.webp", alt: "参与者正在体验 AR 游戏" }
    ]
  },
  aiEcosystem: {
    eyebrow: "AI代理生态系统",
    title: "从静态软件，进化为自适应的数字协同治疗伙伴。",
    description: "每次训练都连接评估，环境调整与可执行反馈，让专业人员在不中断体验的情况下，作出更有依据的照护决策。",
    feedbackLoop: ["实时评估", "动态环境调整", "持续数据驱动反馈"],
    capabilityLabel: "能力",
    capabilities: [
      { title: "自适应难度", body: "实时校准会根据每位学习者的能力调整挑战门槛，让训练保持可达成且有意义。" },
      { title: "多模态分析", body: "计算机视觉在同一训练时刻采集关节角度，运动技能及情境动作信号。" },
      { title: "自动化分析", body: "原始活动信号转化为可视化进展报告，帮助教育及临床专业人员理解每次训练。" },
      { title: "预测智能", body: "纵向积累的认知与运动模式，让团队更早洞察发展里程碑及照护需求的变化。" }
    ],
    foundationLabel: "运行基础",
    foundations: ["经临床验证的认知与运动框架", "自主研发的计算机视觉与 AI 智能体模型基础设施", "NGO，学校与临床数据整合"]
  },
  productAtlas: {
    careConditionLabel: "照护场景",
    responseLabel: "AESIR 方案",
    fieldDeploymentLabel: "一线部署",
    categoryImages: [
      { src: "/impact-photos/category-sen-ar-book.jpg", alt: "学习者正在使用 AR 图书体验" },
      { src: "/impact-photos/category-elderly-new-life-vr.webp", alt: "老年人正在使用 New Life VR 平台" },
      { src: "/impact-photos/category-sports-vr-fencing.jpeg", alt: "VR 击剑科技演示" }
    ],
    categories: [
      {
        label: "类别 01", title: "SEN 支持",
        challenge: "有自闭症、ADHD、读写障碍、发育协调差异及执行功能需求的学生，可能需要在动作、语言、注意力与社交参与方面获得个性化且可重复的练习。",
        response: "多感官游戏与辅助技术将结构化训练转化为容易参与，可重复并提供即时反馈的练习循环。",
        products: [
          { name: "Magic Word Adventure", description: "一套桌面动作感应系统，将无线鼠标化身为魔法棒，用于汉字书写，部首识别及空间感知训练。", outcomes: ["书写练习", "汉字识别", "空间感知"] },
          { name: "运动技能训练玩具", description: "Light Spot、Neuro Pulse 和 Cognigrid 将实体游戏与记忆、感觉调节、空间推理及精细手指操作结合。", outcomes: ["认知与运动整合", "感觉调节", "精细动作控制"] },
          { name: "FingerFarm and Monkey and Banana", description: "移动应用支持手指独立控制、手部力量、抓握，以及触摸屏上的捏合与拖拽练习。", outcomes: ["手指力量", "抓握", "手部训练"] },
          { name: "中文身体识字游戏", description: "以动作为基础的识字体验，将身体动作，视觉提示与听觉反馈连接到汉字学习。", outcomes: ["动觉学习", "记忆与回想", "全身参与"] },
          { name: "New Life VR 与 Eye-Learning 平台", description: "沉浸式及眼动追踪工具支持情绪调节、认知灵活性、视觉注意、反应抑制及客观进展报告。", outcomes: ["安全练习", "持续注意", "教师报告"] },
          { name: "Little Rice Growth Story", description: "以叙事驱动的移动应用，通过持续的游戏化评估支持九项核心执行功能。", outcomes: ["执行功能", "个性化历程", "家庭支持"] }
        ]
      },
      {
        label: "类别 02", title: "老年照护与康复",
        challenge: "老年人可能面临肌肉流失、平衡能力下降、跌倒风险、信心降低，以及难以持续传统物理治疗训练等问题。",
        response: "动作感应与 VR 体验建立安全且可重复的康复活动，让动作表现更清晰，更具参与感，也更方便照护团队指导。",
        products: [
          { name: "老年健身游戏", description: "通过 Kinect 动作感应游戏进行踏步，伸展及坐站训练，适合在有支持的社区及照护环境中使用。", outcomes: ["平衡与协调", "肌肉力量", "练习动力"] },
          { name: "防跌倒 VR 游戏", description: "沉浸式虚拟训练项目在受控环境中训练平衡、活动能力、空间感知及自信动作。", outcomes: ["跌倒风险意识", "本体感觉", "减少焦虑"] }
        ]
      },
      {
        label: "类别 03", title: "体能与运动科技",
        challenge: "不少儿童及年轻人需要更容易投入的方式来建立持续运动习惯，尤其当传统运动让人感到压力或难以参与时。",
        response: "AR，VR 及动作感应运动将体能活动与游戏结构，教练信号及具有吸引力的进阶体验结合。",
        products: [
          { name: "足球游戏", description: "互动 AR 及动作感应足球游戏，包括射门、跑动、点球、前锋及守门员挑战。", outcomes: ["心肺体能", "反应速度", "认知灵活性"] },
          { name: "跆拳道游戏", description: "三款动作感应体验通过全身踢击及出拳，教授基本武术技巧。", outcomes: ["大运动技能", "力量与敏捷性", "专注力"] },
          { name: "VR 运动", description: "沉浸式运动包括羽毛球、匹克球、网球、高尔夫及击剑，支持全身运动与技能发展。", outcomes: ["手眼协调", "策略思维", "安全练习"] }
        ]
      }
    ]
  },
  partnerValidation: {
    eyebrow: "一线验证",
    title: "一个旨在扩大公共价值的社会企业模式。",
    body: "AESIR 的模式由高校、科研专业人员、一线 NGO、学校、康复中心及老年照护机构共同建立。其影响力通过覆盖范围，可重复练习，以及每次部署中的协作质量来衡量。",
    imageAlt: "AESIR 团队正在为老年服务参与者带领活动",
    imageOverlay: "照护科技只有在能够强化每位参与者身边的人与机构时，才真正有效。",
    proofs: [
      { value: "2014", label: "成立于香港" },
      { value: "500,000+", label: "累计服务人数" },
      { value: "122", label: "覆盖 SEN 与老年照护的 NGO 合作伙伴" }
    ],
    network: ["高校及科研合作", "特殊学校及学习中心", "NGO 康复服务", "老年照护机构及一线团队"]
  },
  roadmap: {
    eyebrow: "2026 路线图",
    title: "打造更具预防性，更可及的影响力系统。",
    description: "下一阶段将不再只衡量一次完成的训练，而是进一步提供更早期的洞察，并让更多人能够获得科技支持的照护。",
    items: [
      { number: "01", title: "预测与预防型 AI", body: "从实时行为追踪进一步发展，让团队更早掌握发展轨迹，以及认知或运动能力下降的迹象，同时减轻照护团队的行政负担。" },
      { number: "02", title: "全面的可及性", body: "通过学校、康复中心、NGO 及国际科研合作伙伴，进一步扩大临床验证及包容性技术的可及性。" }
    ],
    directionLabel: "发展方向",
    direction: "衡量真正重要的事。预见下一步。让科技持续服务它原本要服务的群体。"
  },
  cta: {
    eyebrow: "下一阶段系统形态",
    title: "从软件产品迈向临床级影响力平台。",
    body: "建立一个让每次训练都能教学、衡量、调整，并持续改善下一次干预的生态系统。",
    primary: "探索影响力",
    secondary: "联系 AESIR"
  }
} satisfies SiteContent;
