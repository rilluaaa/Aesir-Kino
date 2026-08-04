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
  { id: "hero", label: "AESIR Impact Report", transition: "cube-rebuild", content: <HeroSection /> },
  { id: "founder-story", label: "Founder’s Spotlight", transition: "cube-rebuild", content: <FounderStorySection /> },
  { id: "social-innovation", label: "Social Innovation Manifesto", transition: "flip-slide", content: <SocialInnovationSection /> },
  { id: "features", label: "Care Capabilities", transition: "compress-rotate", content: <FeaturesSection /> },
  { id: "impact-metrics", label: "Impact Metrics", transition: "monochrome-glitch", content: <ImpactMetricsSection /> },
  { id: "ai-ecosystem", label: "AI Ecosystem", transition: "zoom-blur", content: <AIAgentEcosystemSection /> },
  { id: "target-status", label: "Target Status", transition: "elastic-slide", content: <TargetStatusSection /> },
  { id: "product-ecosystem", label: "Product Ecosystem", transition: "cube-rebuild", content: <ProductEcosystemSection /> },
  { id: "sen-support", label: "SEN Support", transition: "flip-slide", content: <ProductAtlasCategorySection category={productAtlasCategories[0]} categoryIndex={0} /> },
  { id: "elderly-care", label: "Elderly Care & Rehabilitation", transition: "compress-rotate", content: <ProductAtlasCategorySection category={productAtlasCategories[1]} categoryIndex={1} /> },
  { id: "physical-sports", label: "Physical & Sports Technology", transition: "elastic-slide", content: <ProductAtlasCategorySection category={productAtlasCategories[2]} categoryIndex={2} /> },
  { id: "partner-validation", label: "Partner Validation", transition: "monochrome-glitch", content: <PartnerValidationSection /> },
  { id: "roadmap", label: "Roadmap", transition: "zoom-blur", content: <RoadmapSection /> },
  { id: "cta", label: "Contact AESIR", transition: "cube-rebuild", content: <CTASection /> }
];

export default function HomePage() {
  return <ChapterDeck chapters={chapters} />;
}
