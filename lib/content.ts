export type FeatureCard = {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly metric: string;
  readonly metricLabel: string;
};

export const features: readonly FeatureCard[] = [
  {
    eyebrow: "SEN Systems",
    title: "Adaptive learning that turns movement into progress data.",
    description:
      "Motion, AR, and VR activities support literacy, attention, coordination, and social adaptability through repeatable intervention loops.",
    metric: "98,000+",
    metricLabel: "SEN users supported"
  },
  {
    eyebrow: "Active Aging",
    title: "Sensor-guided rehabilitation for safer community care.",
    description:
      "Elderly fitness and fall-prevention experiences help frontline teams observe confidence, balance, response, and mobility.",
    metric: "2,000+",
    metricLabel: "seniors supported"
  },
  {
    eyebrow: "Impact Intelligence",
    title: "A data layer for care teams, NGOs, and partners.",
    description:
      "AESIR translates frontline learning and rehabilitation activity into measurable indicators of reach, engagement, and outcomes.",
    metric: "50,000+",
    metricLabel: "training data points"
  }
];

export type ImpactMetric = {
  readonly value: string;
  readonly label: string;
  readonly domain: string;
};

export const impactMetrics: readonly ImpactMetric[] = [
  { value: "100,000+", label: "Annual Lives Reached", domain: "Reach" },
  { value: "98,000+", label: "SEN Users Supported", domain: "SEN" },
  { value: "2,000+", label: "Seniors Supported", domain: "Aging" },
  { value: "79", label: "SEN Service NGO Partners", domain: "Network" },
  { value: "43", label: "Elderly Service NGO Partners", domain: "Network" },
  { value: "50,000+", label: "Training Data Points Captured", domain: "Data" },
  {
    value: "90%+",
    label: "Students Demonstrating Measurable Progress via Gamified Learning",
    domain: "Progress"
  },
  { value: "50%+", label: "Behavioral and Social Adaptability Improvement", domain: "Behavior" }
];

export type TargetStatus = {
  readonly title: string;
  readonly summary: string;
  readonly points: readonly {
    readonly label: string;
    readonly body: string;
  }[];
};

export const targetStatuses: readonly TargetStatus[] = [
  {
    title: "Target Status: SEN Learners",
    summary:
      "SEN learners often need higher repetition, clearer feedback, and stronger motivation than traditional worksheet-based or one-way training can provide.",
    points: [
      {
        label: "Learning Need",
        body: "Support literacy, pronunciation, attention, executive function, motor coordination, and social adaptability through multi-sensory practice."
      },
      {
        label: "Field Context",
        body: "Used across schools, NGOs, learning centres, and family-facing intervention settings where engagement and repeatability are critical."
      },
      {
        label: "Product Response",
        body: "Motion sensing, AR, VR, and adaptive game mechanics provide immediate feedback while capturing usable training signals."
      }
    ]
  },
  {
    title: "Target Status: Elderly Care",
    summary:
      "Older adults benefit from safe, low-impact, repeatable rehabilitation formats that make movement practice more engaging and easier for staff to observe.",
    points: [
      {
        label: "Care Need",
        body: "Support balance, reaction, mobility, confidence, and fall-risk awareness through guided activity that reduces fear of movement."
      },
      {
        label: "Field Context",
        body: "Applied in elderly service NGOs, day-care centres, community settings, and home-like care environments with frontline facilitation."
      },
      {
        label: "Product Response",
        body: "VR and motion-sensing experiences turn rehabilitation into guided scenarios with observable posture, comfort, and response data."
      }
    ]
  }
];

export type ProductModule = {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly image: string;
  readonly imageAlt: string;
};

export const productModules: readonly ProductModule[] = [
  {
    eyebrow: "SEN-01 | Literacy Engine",
    title: "Magic Word Adventure",
    description:
      "Motion-sensing games support handwriting, spatial awareness, character recognition, and sustained practice through body movement and instant visual feedback.",
    tags: ["Literacy", "Motion", "Feedback"],
    image: "/impact-photos/sen-magic-word-battle.png",
    imageAlt: "Child playing the Magic Word Adventure motion-sensing literacy game"
  },
  {
    eyebrow: "SEN-02 | Motor Layer",
    title: "Motor Skills Training",
    description:
      "Interactive training supports fine motor control, coordination, reaction, and hand-eye integration for students who need repeated, structured practice.",
    tags: ["Fine Motor", "Coordination", "Attention"],
    image: "/impact-photos/sen-motor-capability.png",
    imageAlt: "Child using an interactive motor-skills training display"
  },
  {
    eyebrow: "SEN-03 | Body Literacy",
    title: "Chinese Body Literacy Game",
    description:
      "Movement-based learning connects Chinese phonetics, body action, and memory into one active experience for language acquisition and participation.",
    tags: ["Language", "Movement", "Memory"],
    image: "/impact-photos/sen-body-literacy.png",
    imageAlt: "Learner using a movement-based Chinese body literacy activity"
  },
  {
    eyebrow: "AGE-01 | Mobility Layer",
    title: "Elderly Fitness Games",
    description:
      "Motion-based exercises support balance, coordination, mobility, and confidence through repeatable routines that can be used in centres and care homes.",
    tags: ["Balance", "Mobility", "Confidence"],
    image: "/impact-photos/elderly-fitness-session.png",
    imageAlt: "Older adults taking part in a guided fitness session"
  },
  {
    eyebrow: "AGE-02 | Risk Simulation",
    title: "Fall Prevention VR Game",
    description:
      "Immersive balance training creates safer practice environments for movement control, confidence building, and fall-risk exposure without high-impact physical strain.",
    tags: ["VR", "Fall Risk", "Rehab"],
    image: "/impact-photos/elderly-fall-prevention-vr-2.png",
    imageAlt: "Older adult using a virtual-reality headset for fall-prevention training"
  },
  {
    eyebrow: "SPORT-01 | Immersive Training",
    title: "AR/VR Sports Training",
    description:
      "AR, VR, and motion sensing extend physical training beyond conventional spaces, turning reaction, participation, and coaching feedback into measurable activity.",
    tags: ["AR", "VR", "Sports Data"],
    image: "/impact-photos/sports-vr-training.jpg",
    imageAlt: "Participant using virtual reality for sports training"
  }
];

export type FounderStory = {
  readonly eyebrow: string;
  readonly title: string;
  readonly founders: readonly string[];
  readonly summary: string;
  readonly promise: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly principles: readonly {
    readonly title: string;
    readonly body: string;
  }[];
};

export const founderStory: FounderStory = {
  eyebrow: "Founders' Spotlight",
  title: "Technology becomes meaningful when it starts at the frontline.",
  founders: ["Ernest Chan", "Zero Wong"],
  summary:
    "AESIR's founders chose social impact over a conventional corporate path. For more than a decade, they have worked alongside special-education and elderly-care communities to understand the systems, routines, and barriers that shape everyday care.",
  promise:
    "The AESIR promise: transforming clinical rigor into accessible human empowerment.",
  image: "/impact-photos/founder-ai-launch.jpeg",
  imageAlt: "Group photograph from an AI technology launch event",
  principles: [
    {
      title: "Research is the key",
      body:
        "Every interactive platform is designed as a measurable intervention, grounded in psychological and clinical validation rather than entertainment alone."
    },
    {
      title: "Innovation with conscience",
      body:
        "AESIR channels technological progress back into accessible tools and systemic relief for communities with fewer resources."
    }
  ]
};

export type SocialInnovation = {
  readonly eyebrow: string;
  readonly title: string;
  readonly statement: string;
  readonly challenge: string;
  readonly response: string;
  readonly images: readonly {
    readonly src: string;
    readonly alt: string;
  }[];
};

export const socialInnovation: SocialInnovation = {
  eyebrow: "The Architecture of Social Innovation",
  title: "The convergence of science and play.",
  statement:
    "We do not build games to entertain. We engineer immersive, clinically validated ecosystems that turn repetitive therapeutic exercises into cognitive and motor milestones.",
  challenge:
    "Conventional rehabilitation and special-education programmes can be repetitive, hard to sustain, and difficult to personalise. That friction can reduce confidence, participation, and continuity of care.",
  response:
    "AESIR combines evidence-based cognitive-behavioural principles, sensory-motor integration, and neural plasticity with gamified environments. The result is a safer, engaging practice loop that encourages people to play, learn, and heal.",
  images: [
    {
      src: "/impact-photos/social-elderly-vr-outreach.jpeg",
      alt: "Older adults participating in a virtual-reality outreach session"
    },
    {
      src: "/impact-photos/social-ar-game.png",
      alt: "Participant engaging with an augmented-reality game"
    }
  ]
};

export type AICapability = {
  readonly title: string;
  readonly body: string;
};

export const aiCapabilities: readonly AICapability[] = [
  {
    title: "Adaptive Difficulty",
    body:
      "Real-time calibration matches challenge thresholds to each learner's capability, helping sessions remain achievable and meaningful."
  },
  {
    title: "Multimodal Analytics",
    body:
      "Computer vision captures joint angles, motor skills, and contextual movement signals in the same training moment."
  },
  {
    title: "Automated Analytics",
    body:
      "Raw activity signals become visual progress reports that help educators and clinicians interpret each session."
  },
  {
    title: "Predictive Intelligence",
    body:
      "Longitudinal cognitive and motor patterns support earlier visibility into developmental milestones and changing care needs."
  }
];

export const aiFeedbackLoop = [
  "Real-time assessment",
  "Dynamic environmental adjustment",
  "Continuous data-driven feedback"
] as const;

export type ProductAtlasProduct = {
  readonly name: string;
  readonly description: string;
  readonly outcomes: readonly string[];
};

export type ProductAtlasCategory = {
  readonly label: string;
  readonly title: string;
  readonly challenge: string;
  readonly response: string;
  readonly products: readonly ProductAtlasProduct[];
};

export const productAtlasCategories: readonly ProductAtlasCategory[] = [
  {
    label: "Category 01",
    title: "SEN Support",
    challenge:
      "Students with autism, ADHD, dyslexia, developmental coordination differences, and executive-function needs can require personalised, repeatable practice across movement, language, attention, and social participation.",
    response:
      "Multi-sensory games and assistive technology translate structured training into accessible practice loops with immediate feedback.",
    products: [
      {
        name: "Magic Word Adventure",
        description:
          "A motion-sensing desktop suite that uses a wireless mouse as a magic wand for character drawing, radical recognition, and spatial-awareness training.",
        outcomes: ["Handwriting practice", "Character recognition", "Spatial awareness"]
      },
      {
        name: "Motor Skills Toys",
        description:
          "Light Spot, Neuro Pulse, and Cognigrid combine physical play with memory, sensory regulation, spatial reasoning, and precise finger manipulation.",
        outcomes: ["Cognitive-motor integration", "Sensory regulation", "Fine-motor control"]
      },
      {
        name: "FingerFarm and Monkey and Banana",
        description:
          "Mobile applications for finger isolation, hand strength, gripping, and touchscreen-based pinching and dragging exercises.",
        outcomes: ["Finger strength", "Gripping", "Hand therapy"]
      },
      {
        name: "Chinese Body Literacy Game",
        description:
          "A movement-based literacy experience that connects body action, visual cues, and auditory feedback to Chinese characters.",
        outcomes: ["Kinesthetic learning", "Memory and recall", "Whole-body engagement"]
      },
      {
        name: "New Life VR and Eye-Learning Platform",
        description:
          "Immersive and eye-tracking tools for emotional regulation, cognitive flexibility, visual attention, reaction inhibition, and objective progress reporting.",
        outcomes: ["Safe practice", "Sustained attention", "Teacher reporting"]
      },
      {
        name: "Little Rice Growth Story",
        description:
          "A narrative-led mobile app that supports all nine core executive functions through continuous, game-based assessment.",
        outcomes: ["Executive function", "Personalised journey", "Family support"]
      }
    ]
  },
  {
    label: "Category 02",
    title: "Elderly Care & Rehabilitation",
    challenge:
      "Older adults can face muscle loss, reduced balance, fall risk, lower confidence, and the difficulty of sustaining conventional physiotherapy routines.",
    response:
      "Motion-sensing and VR experiences create safe, repeatable rehabilitation activities that make movement visible, engaging, and easier for care teams to guide.",
    products: [
      {
        name: "Elderly Fitness Games",
        description:
          "Kinect-enabled movement games for stepping, stretching, and sit-to-stand practice in supported community and care settings.",
        outcomes: ["Balance and coordination", "Muscle strength", "Motivation to practise"]
      },
      {
        name: "Fall Prevention VR Game",
        description:
          "An immersive virtual programme that trains balance, mobility, spatial awareness, and confident movement in a controlled setting.",
        outcomes: ["Fall-risk awareness", "Proprioception", "Anxiety reduction"]
      }
    ]
  },
  {
    label: "Category 03",
    title: "Physical & Sports Technology",
    challenge:
      "Many children and young adults need a more approachable route into sustained physical activity, especially when conventional sport feels intimidating or inaccessible.",
    response:
      "AR, VR, and motion-sensing sports combine physical exertion with game structure, coaching signals, and an engaging sense of progression.",
    products: [
      {
        name: "Football Games",
        description:
          "Interactive AR and motion-sensing football games including goal, running, penalty, striker, and goalkeeper challenges.",
        outcomes: ["Cardiovascular fitness", "Reaction time", "Cognitive flexibility"]
      },
      {
        name: "Taekwondo Games",
        description:
          "Three motion-sensing experiences that teach martial-arts fundamentals through whole-body kicks and punches.",
        outcomes: ["Gross-motor skills", "Strength and agility", "Focus"]
      },
      {
        name: "VR Sports",
        description:
          "Immersive sports including badminton, pickleball, tennis, golf, and fencing for full-body movement and skill development.",
        outcomes: ["Hand-eye coordination", "Strategic thinking", "Safe practice"]
      }
    ]
  }
];

export type PartnerValidation = {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly proofs: readonly {
    readonly value: string;
    readonly label: string;
  }[];
  readonly network: readonly string[];
};

export const partnerValidation: PartnerValidation = {
  eyebrow: "Validated in the Field",
  title: "A social-enterprise model designed to compound public value.",
  body:
    "AESIR's model is built with universities, research professionals, frontline NGOs, schools, rehabilitation centres, and elderly-care facilities. Its impact is measured through reach, repeatable practice, and the quality of collaboration around each deployment.",
  proofs: [
    { value: "2014", label: "Founded in Hong Kong" },
    { value: "500,000+", label: "Cumulative individuals served" },
    { value: "122", label: "NGO partners across SEN and elderly care" }
  ],
  network: [
    "University and research collaboration",
    "Special schools and learning centres",
    "NGO rehabilitation services",
    "Elderly-care facilities and frontline teams"
  ]
};

export type RoadmapItem = {
  readonly number: string;
  readonly title: string;
  readonly body: string;
};

export const roadmapItems: readonly RoadmapItem[] = [
  {
    number: "01",
    title: "Predictive & Preventive AI",
    body:
      "Advance from real-time behavioural tracking to earlier visibility into developmental trajectories and cognitive or motor decline, while reducing administrative burden for care teams."
  },
  {
    number: "02",
    title: "Universal Accessibility",
    body:
      "Extend clinical validation and inclusive technology access through schools, rehabilitation centres, NGOs, and international research partnerships."
  }
];
