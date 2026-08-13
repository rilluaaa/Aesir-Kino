export type Language = "en" | "traditional" | "simplified";

export type FeatureCard = {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly metric: string;
  readonly metricLabel: string;
};

export type ImpactMetric = {
  readonly value: string;
  readonly label: string;
  readonly domain: string;
};

export type TargetStatus = {
  readonly title: string;
  readonly summary: string;
  readonly points: readonly {
    readonly label: string;
    readonly body: string;
  }[];
};

export type ProductModule = {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly image: string;
  readonly imageAlt: string;
};

export type FounderStory = {
  readonly eyebrow: string;
  readonly title: string;
  readonly founders: readonly string[];
  readonly summary: string;
  readonly promise: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly imageOverlay: string;
  readonly principles: readonly {
    readonly title: string;
    readonly body: string;
  }[];
};

export type SocialInnovation = {
  readonly eyebrow: string;
  readonly title: string;
  readonly statement: string;
  readonly frictionLabel: string;
  readonly challenge: string;
  readonly responseLabel: string;
  readonly response: string;
  readonly fieldPracticeLabel: string;
  readonly images: readonly {
    readonly src: string;
    readonly alt: string;
  }[];
};

export type AICapability = {
  readonly title: string;
  readonly body: string;
};

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

export type PartnerValidation = {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly imageAlt: string;
  readonly imageOverlay: string;
  readonly proofs: readonly {
    readonly value: string;
    readonly label: string;
  }[];
  readonly network: readonly string[];
};

export type RoadmapItem = {
  readonly number: string;
  readonly title: string;
  readonly body: string;
};

export type SiteContent = {
  readonly metadata: {
    readonly title: string;
    readonly description: string;
  };
  readonly languageSelector: {
    readonly compact: string;
    readonly selectLanguage: string;
    readonly language: string;
  };
  readonly chapters: readonly {
    readonly id: string;
    readonly label: string;
  }[];
  readonly accessibility: {
    readonly chapterNavigation: string;
    readonly goToChapter: string;
  };
  readonly hero: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly headingSegments: readonly string[];
    readonly description: string;
    readonly descriptionSegments: readonly string[];
    readonly spacedSegments: boolean;
  };
  readonly featuresSection: {
    readonly eyebrow: string;
    readonly title: string;
    readonly features: readonly FeatureCard[];
  };
  readonly impactMetricsSection: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly metrics: readonly ImpactMetric[];
  };
  readonly targetStatusSection: {
    readonly eyebrow: string;
    readonly title: string;
    readonly statuses: readonly TargetStatus[];
  };
  readonly productEcosystemSection: {
    readonly eyebrow: string;
    readonly title: string;
    readonly modules: readonly ProductModule[];
  };
  readonly founderStory: FounderStory;
  readonly socialInnovation: SocialInnovation;
  readonly aiEcosystem: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly feedbackLoop: readonly string[];
    readonly capabilityLabel: string;
    readonly capabilities: readonly AICapability[];
    readonly foundationLabel: string;
    readonly foundations: readonly string[];
  };
  readonly productAtlas: {
    readonly careConditionLabel: string;
    readonly responseLabel: string;
    readonly fieldDeploymentLabel: string;
    readonly categoryImages: readonly {
      readonly src: string;
      readonly alt: string;
    }[];
    readonly categories: readonly ProductAtlasCategory[];
  };
  readonly partnerValidation: PartnerValidation;
  readonly roadmap: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly items: readonly RoadmapItem[];
    readonly directionLabel: string;
    readonly direction: string;
  };
  readonly cta: {
    readonly eyebrow: string;
    readonly title: string;
    readonly body: string;
    readonly primary: string;
    readonly secondary: string;
  };
};
