"use client";

import { AIAgentEcosystemSection } from "@/components/AIAgentEcosystemSection";
import { CTASection } from "@/components/CTASection";
import { ChapterDeck, type Chapter } from "@/components/ChapterDeck";
import { FeaturesSection } from "@/components/FeaturesSection";
import { FounderStorySection } from "@/components/FounderStorySection";
import { HeroSection } from "@/components/HeroSection";
import { ImpactMetricsSection } from "@/components/ImpactMetricsSection";
import { PartnerValidationSection } from "@/components/PartnerValidationSection";
import { ProductAtlasCategorySection } from "@/components/ProductAtlasCategorySection";
import { ProductEcosystemSection } from "@/components/ProductEcosystemSection";
import { RoadmapSection } from "@/components/RoadmapSection";
import { SocialInnovationSection } from "@/components/SocialInnovationSection";
import { TargetStatusSection } from "@/components/TargetStatusSection";
import { useLanguage } from "@/components/LanguageProvider";

export function LocalizedReport() {
  const { content } = useLanguage();
  const chapterContent = [
    <HeroSection content={content.hero} key="hero" />,
    <FounderStorySection content={content.founderStory} key="founder-story" />,
    <SocialInnovationSection content={content.socialInnovation} key="social-innovation" />,
    <FeaturesSection content={content.featuresSection} key="features" />,
    <ImpactMetricsSection content={content.impactMetricsSection} key="impact-metrics" />,
    <AIAgentEcosystemSection content={content.aiEcosystem} key="ai-ecosystem" />,
    <TargetStatusSection content={content.targetStatusSection} key="target-status" />,
    <ProductEcosystemSection content={content.productEcosystemSection} key="product-ecosystem" />,
    ...content.productAtlas.categories.map((category, index) => (
      <ProductAtlasCategorySection
        category={category}
        categoryIndex={index as 0 | 1 | 2}
        common={content.productAtlas}
        key={category.label}
      />
    )),
    <PartnerValidationSection content={content.partnerValidation} key="partner-validation" />,
    <RoadmapSection content={content.roadmap} key="roadmap" />,
    <CTASection content={content.cta} key="cta" />
  ];

  const chapters: Chapter[] = content.chapters.map((chapter, index) => ({
    ...chapter,
    content: chapterContent[index]
  }));

  return (
    <ChapterDeck
      accessibility={content.accessibility}
      chapters={chapters}
    />
  );
}
