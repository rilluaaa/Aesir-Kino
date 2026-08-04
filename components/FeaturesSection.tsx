import { FeatureCard } from "@/components/FeatureCard";
import { MotionReveal } from "@/components/MotionReveal";
import { features } from "@/lib/content";

export function FeaturesSection() {
  return (
    <section className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        <MotionReveal className="mb-14 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-neon-purple">
            Impact Architecture
          </p>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight text-white md:text-6xl">
            Three connected layers of care, learning, and intelligence.
          </h2>
        </MotionReveal>
        <div className="grid gap-5 lg:grid-cols-3">
          {features.map((feature, index) => (
            <MotionReveal delay={index * 0.08} key={feature.eyebrow}>
              <FeatureCard feature={feature} />
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
