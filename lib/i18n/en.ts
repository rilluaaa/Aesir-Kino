import type { SiteContent } from "@/lib/i18n/types";

export const enContent = {
  metadata: {
    title: "AESIR Impact Report | Premium 3D Experience",
    description:
      "A cinematic, glassmorphic impact report experience for AESIR's AI care, SEN intervention, elderly rehabilitation, and sports technology ecosystem."
  },
  languageSelector: {
    compact: "EN",
    selectLanguage: "Select language",
    language: "Language"
  },
  chapters: [
    { id: "hero", label: "AESIR Impact Report" },
    { id: "founder-story", label: "Founder’s Spotlight" },
    { id: "social-innovation", label: "Social Innovation Manifesto" },
    { id: "features", label: "Care Capabilities" },
    { id: "impact-metrics", label: "Impact Metrics" },
    { id: "ai-ecosystem", label: "AI Ecosystem" },
    { id: "target-status", label: "Target Status" },
    { id: "product-ecosystem", label: "Product Ecosystem" },
    { id: "sen-support", label: "SEN Support" },
    { id: "elderly-care", label: "Elderly Care & Rehabilitation" },
    { id: "physical-sports", label: "Physical & Sports Technology" },
    { id: "partner-validation", label: "Partner Validation" },
    { id: "roadmap", label: "Roadmap" },
    { id: "cta", label: "Contact AESIR" }
  ],
  accessibility: {
    chapterNavigation: "Impact report chapters",
    goToChapter: "Go to {{chapter}}"
  },
  hero: {
    eyebrow: "AESIR Impact Report",
    heading: "AI care systems for a measurable world.",
    headingSegments: ["AI", "care", "systems", "for", "a", "measurable", "world."],
    description:
      "A premium, cinematic view of AESIR's SEN intervention, active aging, rehabilitation, and sports technology ecosystem.",
    descriptionSegments: [
      "A", "premium,", "cinematic", "view", "of", "AESIR's", "SEN", "intervention,", "active", "aging,", "rehabilitation,", "and", "sports", "technology", "ecosystem."
    ],
    spacedSegments: true
  },
  featuresSection: {
    eyebrow: "Impact Architecture",
    title: "Three connected layers of care, learning, and intelligence.",
    features: [
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
    ]
  },
  impactMetricsSection: {
    eyebrow: "Impact Intelligence Layer",
    title: "Frontline activity translated into measurable indicators.",
    description:
      "AESIR tracks reach, SEN engagement, elderly service deployment, training participation, and observable progress signals across its care technology ecosystem.",
    metrics: [
      { value: "100,000+", label: "Annual Lives Reached", domain: "Reach" },
      { value: "98,000+", label: "SEN Users Supported", domain: "SEN" },
      { value: "2,000+", label: "Seniors Supported", domain: "Aging" },
      { value: "79", label: "SEN Service NGO Partners", domain: "Network" },
      { value: "43", label: "Elderly Service NGO Partners", domain: "Network" },
      { value: "50,000+", label: "Training Data Points Captured", domain: "Data" },
      { value: "90%+", label: "Students Demonstrating Measurable Progress via Gamified Learning", domain: "Progress" },
      { value: "50%+", label: "Behavioral and Social Adaptability Improvement", domain: "Behavior" }
    ]
  },
  targetStatusSection: {
    eyebrow: "Target Status",
    title: "Designed for real SEN and elderly care conditions.",
    statuses: [
      {
        title: "Target Status: SEN Learners",
        summary:
          "SEN learners often need higher repetition, clearer feedback, and stronger motivation than traditional worksheet-based or one-way training can provide.",
        points: [
          { label: "Learning Need", body: "Support literacy, pronunciation, attention, executive function, motor coordination, and social adaptability through multi-sensory practice." },
          { label: "Field Context", body: "Used across schools, NGOs, learning centres, and family-facing intervention settings where engagement and repeatability are critical." },
          { label: "Product Response", body: "Motion sensing, AR, VR, and adaptive game mechanics provide immediate feedback while capturing usable training signals." }
        ]
      },
      {
        title: "Target Status: Elderly Care",
        summary:
          "Older adults benefit from safe, low-impact, repeatable rehabilitation formats that make movement practice more engaging and easier for staff to observe.",
        points: [
          { label: "Care Need", body: "Support balance, reaction, mobility, confidence, and fall-risk awareness through guided activity that reduces fear of movement." },
          { label: "Field Context", body: "Applied in elderly service NGOs, day-care centres, community settings, and home-like care environments with frontline facilitation." },
          { label: "Product Response", body: "VR and motion-sensing experiences turn rehabilitation into guided scenarios with observable posture, comfort, and response data." }
        ]
      }
    ]
  },
  productEcosystemSection: {
    eyebrow: "Product Impact Modules",
    title: "A deeper product stack for learning, rehabilitation, and active play.",
    modules: [
      {
        eyebrow: "SEN-01 | Literacy Engine", title: "Magic Word Adventure",
        description: "Motion-sensing games support handwriting, spatial awareness, character recognition, and sustained practice through body movement and instant visual feedback.",
        tags: ["Literacy", "Motion", "Feedback"], image: "/impact-photos/sen-magic-word-battle.webp",
        imageAlt: "Child playing the Magic Word Adventure motion-sensing literacy game"
      },
      {
        eyebrow: "SEN-02 | Motor Layer", title: "Motor Skills Training",
        description: "Interactive training supports fine motor control, coordination, reaction, and hand-eye integration for students who need repeated, structured practice.",
        tags: ["Fine Motor", "Coordination", "Attention"], image: "/impact-photos/sen-motor-capability.webp",
        imageAlt: "Child using an interactive motor-skills training display"
      },
      {
        eyebrow: "SEN-03 | Body Literacy", title: "Chinese Body Literacy Game",
        description: "Movement-based learning connects Chinese phonetics, body action, and memory into one active experience for language acquisition and participation.",
        tags: ["Language", "Movement", "Memory"], image: "/impact-photos/sen-body-literacy.png",
        imageAlt: "Learner using a movement-based Chinese body literacy activity"
      },
      {
        eyebrow: "AGE-01 | Mobility Layer", title: "Elderly Fitness Games",
        description: "Motion-based exercises support balance, coordination, mobility, and confidence through repeatable routines that can be used in centres and care homes.",
        tags: ["Balance", "Mobility", "Confidence"], image: "/impact-photos/elderly-fitness-session.webp",
        imageAlt: "Older adults taking part in a guided fitness session"
      },
      {
        eyebrow: "AGE-02 | Risk Simulation", title: "Fall Prevention VR Game",
        description: "Immersive balance training creates safer practice environments for movement control, confidence building, and fall-risk exposure without high-impact physical strain.",
        tags: ["VR", "Fall Risk", "Rehab"], image: "/impact-photos/elderly-fall-prevention-vr-2.webp",
        imageAlt: "Older adult using a virtual-reality headset for fall-prevention training"
      },
      {
        eyebrow: "SPORT-01 | Immersive Training", title: "AR/VR Sports Training",
        description: "AR, VR, and motion sensing extend physical training beyond conventional spaces, turning reaction, participation, and coaching feedback into measurable activity.",
        tags: ["AR", "VR", "Sports Data"], image: "/impact-photos/sports-vr-training.jpg",
        imageAlt: "Participant using virtual reality for sports training"
      }
    ]
  },
  founderStory: {
    eyebrow: "Founders' Spotlight",
    title: "Technology becomes meaningful when it starts at the frontline.",
    founders: ["Ernest Chan", "Zero Wong"],
    summary: "AESIR's founders chose social impact over a conventional corporate path. For more than a decade, they have worked alongside special-education and elderly-care communities to understand the systems, routines, and barriers that shape everyday care.",
    promise: "The AESIR promise: transforming clinical rigor into accessible human empowerment.",
    image: "/impact-photos/founder-ai-launch.jpeg",
    imageAlt: "Group photograph from an AI technology launch event",
    imageOverlay: "Built from the ground up for the realities of learning, rehabilitation, and care.",
    principles: [
      { title: "Research is the key", body: "Every interactive platform is designed as a measurable intervention, grounded in psychological and clinical validation rather than entertainment alone." },
      { title: "Innovation with conscience", body: "AESIR channels technological progress back into accessible tools and systemic relief for communities with fewer resources." }
    ]
  },
  socialInnovation: {
    eyebrow: "The Architecture of Social Innovation",
    title: "The convergence of science and play.",
    statement: "We do not build games to entertain. We engineer immersive, clinically validated ecosystems that turn repetitive therapeutic exercises into cognitive and motor milestones.",
    frictionLabel: "The Friction",
    challenge: "Conventional rehabilitation and special-education programmes can be repetitive, hard to sustain, and difficult to personalise. That friction can reduce confidence, participation, and continuity of care.",
    responseLabel: "The Response",
    response: "AESIR combines evidence-based cognitive-behavioural principles, sensory-motor integration, and neural plasticity with gamified environments. The result is a safer, engaging practice loop that encourages people to play, learn, and heal.",
    fieldPracticeLabel: "FIELD PRACTICE",
    images: [
      { src: "/impact-photos/social-elderly-vr-outreach.jpeg", alt: "Older adults participating in a virtual-reality outreach session" },
      { src: "/impact-photos/social-ar-game.webp", alt: "Participant engaging with an augmented-reality game" }
    ]
  },
  aiEcosystem: {
    eyebrow: "The AI Agent Ecosystem",
    title: "From static software to an adaptive digital co-therapist.",
    description: "Each session connects assessment, environmental adjustment, and actionable feedback so practitioners can make better-informed care decisions without interrupting the experience.",
    feedbackLoop: ["Real-time assessment", "Dynamic environmental adjustment", "Continuous data-driven feedback"],
    capabilityLabel: "CAPABILITY",
    capabilities: [
      { title: "Adaptive Difficulty", body: "Real-time calibration matches challenge thresholds to each learner's capability, helping sessions remain achievable and meaningful." },
      { title: "Multimodal Analytics", body: "Computer vision captures joint angles, motor skills, and contextual movement signals in the same training moment." },
      { title: "Automated Analytics", body: "Raw activity signals become visual progress reports that help educators and clinicians interpret each session." },
      { title: "Predictive Intelligence", body: "Longitudinal cognitive and motor patterns support earlier visibility into developmental milestones and changing care needs." }
    ],
    foundationLabel: "Operating Foundation",
    foundations: [
      "Clinically validated cognitive and motor frameworks",
      "Proprietary computer vision and AI agent model infrastructure",
      "NGO, school, and clinical data integration"
    ]
  },
  productAtlas: {
    careConditionLabel: "Care Condition",
    responseLabel: "AESIR Response",
    fieldDeploymentLabel: "FIELD DEPLOYMENT",
    categoryImages: [
      { src: "/impact-photos/category-sen-ar-book.jpg", alt: "Learner using an augmented-reality book experience" },
      { src: "/impact-photos/category-elderly-new-life-vr.webp", alt: "Older adult using the New Life virtual-reality platform" },
      { src: "/impact-photos/category-sports-vr-fencing.jpeg", alt: "Virtual-reality fencing technology demonstration" }
    ],
    categories: [
      {
        label: "Category 01", title: "SEN Support",
        challenge: "Students with autism, ADHD, dyslexia, developmental coordination differences, and executive-function needs can require personalised, repeatable practice across movement, language, attention, and social participation.",
        response: "Multi-sensory games and assistive technology translate structured training into accessible practice loops with immediate feedback.",
        products: [
          { name: "Magic Word Adventure", description: "A motion-sensing desktop suite that uses a wireless mouse as a magic wand for character drawing, radical recognition, and spatial-awareness training.", outcomes: ["Handwriting practice", "Character recognition", "Spatial awareness"] },
          { name: "Motor Skills Toys", description: "Light Spot, Neuro Pulse, and Cognigrid combine physical play with memory, sensory regulation, spatial reasoning, and precise finger manipulation.", outcomes: ["Cognitive-motor integration", "Sensory regulation", "Fine-motor control"] },
          { name: "FingerFarm and Monkey and Banana", description: "Mobile applications for finger isolation, hand strength, gripping, and touchscreen-based pinching and dragging exercises.", outcomes: ["Finger strength", "Gripping", "Hand therapy"] },
          { name: "Chinese Body Literacy Game", description: "A movement-based literacy experience that connects body action, visual cues, and auditory feedback to Chinese characters.", outcomes: ["Kinesthetic learning", "Memory and recall", "Whole-body engagement"] },
          { name: "New Life VR and Eye-Learning Platform", description: "Immersive and eye-tracking tools for emotional regulation, cognitive flexibility, visual attention, reaction inhibition, and objective progress reporting.", outcomes: ["Safe practice", "Sustained attention", "Teacher reporting"] },
          { name: "Little Rice Growth Story", description: "A narrative-led mobile app that supports all nine core executive functions through continuous, game-based assessment.", outcomes: ["Executive function", "Personalised journey", "Family support"] }
        ]
      },
      {
        label: "Category 02", title: "Elderly Care & Rehabilitation",
        challenge: "Older adults can face muscle loss, reduced balance, fall risk, lower confidence, and the difficulty of sustaining conventional physiotherapy routines.",
        response: "Motion-sensing and VR experiences create safe, repeatable rehabilitation activities that make movement visible, engaging, and easier for care teams to guide.",
        products: [
          { name: "Elderly Fitness Games", description: "Kinect-enabled movement games for stepping, stretching, and sit-to-stand practice in supported community and care settings.", outcomes: ["Balance and coordination", "Muscle strength", "Motivation to practise"] },
          { name: "Fall Prevention VR Game", description: "An immersive virtual programme that trains balance, mobility, spatial awareness, and confident movement in a controlled setting.", outcomes: ["Fall-risk awareness", "Proprioception", "Anxiety reduction"] }
        ]
      },
      {
        label: "Category 03", title: "Physical & Sports Technology",
        challenge: "Many children and young adults need a more approachable route into sustained physical activity, especially when conventional sport feels intimidating or inaccessible.",
        response: "AR, VR, and motion-sensing sports combine physical exertion with game structure, coaching signals, and an engaging sense of progression.",
        products: [
          { name: "Football Games", description: "Interactive AR and motion-sensing football games including goal, running, penalty, striker, and goalkeeper challenges.", outcomes: ["Cardiovascular fitness", "Reaction time", "Cognitive flexibility"] },
          { name: "Taekwondo Games", description: "Three motion-sensing experiences that teach martial-arts fundamentals through whole-body kicks and punches.", outcomes: ["Gross-motor skills", "Strength and agility", "Focus"] },
          { name: "VR Sports", description: "Immersive sports including badminton, pickleball, tennis, golf, and fencing for full-body movement and skill development.", outcomes: ["Hand-eye coordination", "Strategic thinking", "Safe practice"] }
        ]
      }
    ]
  },
  partnerValidation: {
    eyebrow: "Validated in the Field",
    title: "A social-enterprise model designed to compound public value.",
    body: "AESIR's model is built with universities, research professionals, frontline NGOs, schools, rehabilitation centres, and elderly-care facilities. Its impact is measured through reach, repeatable practice, and the quality of collaboration around each deployment.",
    imageAlt: "AESIR team facilitating a session with elderly service participants",
    imageOverlay: "Care technology is only effective when it strengthens the people and organisations around each participant.",
    proofs: [
      { value: "2014", label: "Founded in Hong Kong" },
      { value: "500,000+", label: "Cumulative individuals served" },
      { value: "122", label: "NGO partners across SEN and elderly care" }
    ],
    network: ["University and research collaboration", "Special schools and learning centres", "NGO rehabilitation services", "Elderly-care facilities and frontline teams"]
  },
  roadmap: {
    eyebrow: "2026 Roadmap",
    title: "A more preventive, accessible impact system.",
    description: "The next chapter moves beyond measuring a completed session toward earlier insight and more inclusive access to technology-enabled care.",
    items: [
      { number: "01", title: "Predictive & Preventive AI", body: "Advance from real-time behavioural tracking to earlier visibility into developmental trajectories and cognitive or motor decline, while reducing administrative burden for care teams." },
      { number: "02", title: "Universal Accessibility", body: "Extend clinical validation and inclusive technology access through schools, rehabilitation centres, NGOs, and international research partnerships." }
    ],
    directionLabel: "Direction of Travel",
    direction: "Measure what matters. Anticipate what is next. Keep technology accessible to the communities it is built to serve."
  },
  cta: {
    eyebrow: "Next System State",
    title: "From software products to a clinical-grade impact platform.",
    body: "Build an ecosystem where every session can teach, measure, adapt, and improve the next intervention.",
    primary: "Explore Impact",
    secondary: "Contact AESIR"
  }
} satisfies SiteContent;
