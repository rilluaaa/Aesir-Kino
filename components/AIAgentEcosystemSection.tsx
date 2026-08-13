import { MotionReveal } from "@/components/MotionReveal";
import type { SiteContent } from "@/lib/i18n";

type AIAgentEcosystemSectionProps = {
  readonly content: SiteContent["aiEcosystem"];
};

export function AIAgentEcosystemSection({ content }: AIAgentEcosystemSectionProps) {
  return (
    <section
      className="relative overflow-hidden px-6 py-28 md:py-36"
      id="ai-ecosystem"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(0,242,254,0.14),transparent_30%),radial-gradient(circle_at_20%_84%,rgba(138,43,226,0.14),transparent_32%)]" />
      <div className="relative mx-auto max-w-7xl">
        <MotionReveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="i18n-label text-xs font-bold uppercase tracking-[0.3em] text-accent-neon-cyan">
              {content.eyebrow}
            </p>
            <h2 className="mt-5 max-w-5xl text-balance font-display text-4xl font-semibold leading-tight text-white md:text-6xl">
              {content.title}
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-report-muted lg:col-span-4 lg:pb-1">
            {content.description}
          </p>
        </MotionReveal>

        <MotionReveal className="mt-14" delay={0.06}>
          <div className="border-y border-white/10 py-7">
            <div className="grid gap-6 md:grid-cols-3 md:gap-0">
              {content.feedbackLoop.map((step, index) => (
                <div
                  className="relative border-white/10 px-0 md:px-8 md:first:pl-0 md:not-last:border-r"
                  key={step}
                >
                  <span className="text-xs font-bold tracking-[0.22em] text-accent-neon-purple">
                    0{index + 1}
                  </span>
                  <p className="mt-4 text-xl font-semibold text-white">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </MotionReveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {content.capabilities.map((capability, index) => (
            <MotionReveal delay={(index % 4) * 0.06} key={capability.title}>
              <article className="glass-panel min-h-72 p-6 shadow-glass-panel md:p-7">
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <span className="i18n-label text-xs font-bold tracking-[0.22em] text-accent-neon-cyan">
                    {content.capabilityLabel}
                  </span>
                  <span className="font-display text-2xl text-white/35">0{index + 1}</span>
                </div>
                <h3 className="mt-8 text-2xl font-semibold leading-tight text-white">
                  {capability.title}
                </h3>
                <p className="mt-5 text-base leading-7 text-report-muted">
                  {capability.body}
                </p>
              </article>
            </MotionReveal>
          ))}
        </div>

        <MotionReveal className="mt-14 border-t border-white/10 pt-6" delay={0.12}>
          <p className="i18n-label text-xs font-bold uppercase tracking-[0.24em] text-white/45">
            {content.foundationLabel}
          </p>
          <div className="mt-5 grid gap-x-8 gap-y-4 md:grid-cols-3">
            {content.foundations.map((foundation, index) => (
              <p className="border-l border-accent-neon-cyan/70 pl-4 text-sm leading-6 text-white/70" key={foundation}>
                <span className="mr-2 font-display text-accent-neon-cyan">0{index + 1}</span>
                {foundation}
              </p>
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
