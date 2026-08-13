import { FeatureCard } from "@/components/FeatureCard";
import { CjkText } from "@/components/CjkText";
import { MotionReveal } from "@/components/MotionReveal";
import type { SiteContent } from "@/lib/i18n";

type FeaturesSectionProps = {
  readonly content: SiteContent["featuresSection"];
};

export function FeaturesSection({ content }: FeaturesSectionProps) {
  return (
    <section className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        <MotionReveal className="mb-14 max-w-3xl">
          <p className="i18n-label text-xs font-bold uppercase tracking-[0.3em] text-accent-neon-purple">
            <CjkText>{content.eyebrow}</CjkText>
          </p>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight text-white md:text-6xl">
            <CjkText>{content.title}</CjkText>
          </h2>
        </MotionReveal>
        <div className="grid gap-5 lg:grid-cols-3">
          {content.features.map((feature, index) => (
            <MotionReveal delay={index * 0.08} key={feature.eyebrow}>
              <FeatureCard feature={feature} />
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
