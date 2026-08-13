import Image from "next/image";
import { withBasePath } from "@/lib/base-path";
import { MotionReveal } from "@/components/MotionReveal";
import type { SocialInnovation } from "@/lib/i18n/types";

type SocialInnovationSectionProps = {
  readonly content: SocialInnovation;
};

export function SocialInnovationSection({ content }: SocialInnovationSectionProps) {
  return (
    <section
      className="relative overflow-hidden px-6 py-28 md:py-36"
      id="social-innovation"
    >
      <div className="pointer-events-none absolute inset-0 bg-hero-radial opacity-45" />
      <div className="relative mx-auto max-w-7xl">
        <MotionReveal className="max-w-5xl">
          <p className="i18n-label text-xs font-bold uppercase tracking-[0.3em] text-accent-neon-cyan">
            {content.eyebrow}
          </p>
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold leading-tight text-white md:text-6xl">
            {content.title}
          </h2>
          <p className="mt-8 max-w-4xl border-l-2 border-accent-neon-purple pl-6 text-2xl font-medium leading-9 text-white/90 md:text-3xl md:leading-[1.35]">
            {content.statement}
          </p>
        </MotionReveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <MotionReveal className="glass-panel p-7 shadow-glass-panel lg:col-span-4 md:p-9">
            <p className="i18n-label text-xs font-bold uppercase tracking-[0.22em] text-accent-neon-purple">
              {content.frictionLabel}
            </p>
            <p className="mt-5 text-lg leading-8 text-report-muted">
              {content.challenge}
            </p>
          </MotionReveal>
          <MotionReveal className="glass-panel p-7 shadow-glass-panel lg:col-span-4 md:p-9" delay={0.08}>
            <p className="i18n-label text-xs font-bold uppercase tracking-[0.22em] text-accent-neon-cyan">
              {content.responseLabel}
            </p>
            <p className="mt-5 text-lg leading-8 text-report-muted">
              {content.response}
            </p>
          </MotionReveal>
          <MotionReveal className="grid gap-5 sm:grid-cols-2 lg:col-span-4" delay={0.16}>
            {content.images.map((image, index) => (
              <div
                className="relative min-h-56 overflow-hidden border border-white/10"
                key={image.src}
              >
                <Image
                  alt={image.alt}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 100vw"
                  src={withBasePath(image.src)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-base/80 to-transparent" />
                <span className="i18n-label absolute bottom-4 left-4 text-xs font-bold tracking-[0.2em] text-white/85">
                  0{index + 1} / {content.fieldPracticeLabel}
                </span>
              </div>
            ))}
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
