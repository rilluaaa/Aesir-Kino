import { CTASection } from "@/components/CTASection";
import { AIAgentEcosystemSection } from "@/components/AIAgentEcosystemSection";
import { ChapterDeck, type Chapter } from "@/components/ChapterDeck";
import { FeaturesSection } from "@/components/FeaturesSection";
import { FounderStorySection } from "@/components/FounderStorySection";
import { HeroSection } from "@/components/HeroSection";
import { ImpactMetricsSection } from "@/components/ImpactMetricsSection";
import { ProductEcosystemSection } from "@/components/ProductEcosystemSection";
import { ProductAtlasCategorySection } from "@/components/ProductAtlasCategorySection";
import { PartnerValidationSection } from "@/components/PartnerValidationSection";
import { RoadmapSection } from "@/components/RoadmapSection";
import { SocialInnovationSection } from "@/components/SocialInnovationSection";
import { TargetStatusSection } from "@/components/TargetStatusSection";
import { productAtlasCategories } from "@/lib/content";

const chapters: Chapter[] = [
  { id: "hero", label: "AESIR Impact Report", content: <HeroSection /> },
  { id: "founder-story", label: "Founder’s Spotlight", content: <FounderStorySection /> },
  { id: "social-innovation", label: "Social Innovation Manifesto", content: <SocialInnovationSection /> },
  { id: "features", label: "Care Capabilities", content: <FeaturesSection /> },
  { id: "impact-metrics", label: "Impact Metrics", content: <ImpactMetricsSection /> },
  { id: "ai-ecosystem", label: "AI Ecosystem", content: <AIAgentEcosystemSection /> },
  { id: "target-status", label: "Target Status", content: <TargetStatusSection /> },
  { id: "product-ecosystem", label: "Product Ecosystem", content: <ProductEcosystemSection /> },
  { id: "sen-support", label: "SEN Support", content: <ProductAtlasCategorySection category={productAtlasCategories[0]} categoryIndex={0} /> },
  { id: "elderly-care", label: "Elderly Care & Rehabilitation", content: <ProductAtlasCategorySection category={productAtlasCategories[1]} categoryIndex={1} /> },
  { id: "physical-sports", label: "Physical & Sports Technology", content: <ProductAtlasCategorySection category={productAtlasCategories[2]} categoryIndex={2} /> },
  { id: "partner-validation", label: "Partner Validation", content: <PartnerValidationSection /> },
  { id: "roadmap", label: "Roadmap", content: <RoadmapSection /> },
  { id: "cta", label: "Contact AESIR", content: <CTASection /> }
];

export default function HomePage() {
  return <ChapterDeck chapters={chapters} />;
}
