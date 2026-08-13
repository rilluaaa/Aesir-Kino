import Image from "next/image";
import { CjkText } from "@/components/CjkText";
import { withBasePath } from "@/lib/base-path";
import { MotionReveal } from "@/components/MotionReveal";
import type { FounderStory } from "@/lib/i18n/types";

type FounderStorySectionProps = {
  readonly content: FounderStory;
};

export function FounderStorySection({ content }: FounderStorySectionProps) {
  return (
    <section className="relative overflow-hidden px-6 py-28 md:py-36" id="founder-story">
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-35" />
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
        <MotionReveal className="lg:col-span-5">
          <p className="i18n-label text-xs font-bold uppercase tracking-[0.3em] text-accent-neon-purple">
            <CjkText>{content.eyebrow}</CjkText>
          </p>
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold leading-tight text-white md:text-6xl">
            <CjkText>{content.title}</CjkText>
          </h2>
          <div className="mt-7 flex flex-wrap gap-3">
            {content.founders.map((founder) => (
              <span
                className="border border-accent-neon-cyan/30 bg-accent-neon-cyan/5 px-4 py-2 text-sm font-semibold text-accent-neon-cyan"
                key={founder}
              >
                <CjkText>{founder}</CjkText>
              </span>
            ))}
          </div>
          <p className="mt-8 text-lg leading-8 text-report-muted">
            <CjkText>{content.summary}</CjkText>
          </p>
          <p className="mt-8 border-l-2 border-accent-neon-cyan pl-5 text-xl font-medium leading-8 text-white">
            <CjkText>{content.promise}</CjkText>
          </p>
        </MotionReveal>

        <MotionReveal className="lg:col-span-7" delay={0.1}>
          <div className="glass-panel relative overflow-hidden p-3 shadow-glass-panel md:p-5">
            <div className="relative aspect-[16/10] overflow-hidden border border-white/10">
              <Image
                alt={content.imageAlt}
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                src={withBasePath(content.image)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-base via-dark-base/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                <p className="max-w-xl text-balance text-xl font-semibold leading-7 text-white md:text-2xl">
                  <CjkText>{content.imageOverlay}</CjkText>
                </p>
              </div>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {content.principles.map((principle) => (
                <article
                  className="border border-white/10 bg-white/[0.025] p-5"
                  key={principle.title}
                >
                  <p className="i18n-label text-xs font-bold uppercase tracking-[0.22em] text-accent-neon-cyan">
                    <CjkText>{principle.title}</CjkText>
                  </p>
                  <p className="mt-3 text-sm leading-6 text-report-muted">
                    <CjkText>{principle.body}</CjkText>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
