import { MotionReveal } from "@/components/MotionReveal";
import { aiCapabilities, aiFeedbackLoop } from "@/lib/content";

const foundations = [
  "Clinically validated cognitive and motor frameworks",
  "Proprietary computer vision and AI agent model infrastructure",
  "NGO, school, and clinical data integration"
] as const;

export function AIAgentEcosystemSection() {
  return (
    <section
      className="relative overflow-hidden border-y border-white/8 bg-black/20 px-6 py-28 md:py-36"
      id="ai-ecosystem"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(0,242,254,0.14),transparent_30%),radial-gradient(circle_at_20%_84%,rgba(138,43,226,0.14),transparent_32%)]" />
      <div className="relative mx-auto max-w-7xl">
        <MotionReveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-neon-cyan">
              The AI Agent Ecosystem
            </p>
            <h2 className="mt-5 max-w-5xl text-balance font-display text-4xl font-semibold leading-tight text-white md:text-6xl">
              From static software to an adaptive digital co-therapist.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-report-muted lg:col-span-4 lg:pb-1">
            Each session connects assessment, environmental adjustment, and
            actionable feedback so practitioners can make better-informed care
            decisions without interrupting the experience.
          </p>
        </MotionReveal>

        <MotionReveal className="mt-14" delay={0.06}>
          <div className="border-y border-white/10 py-7">
            <div className="grid gap-6 md:grid-cols-3 md:gap-0">
              {aiFeedbackLoop.map((step, index) => (
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
          {aiCapabilities.map((capability, index) => (
            <MotionReveal delay={(index % 4) * 0.06} key={capability.title}>
              <article className="glass-panel min-h-72 p-6 shadow-glass-panel md:p-7">
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <span className="text-xs font-bold tracking-[0.22em] text-accent-neon-cyan">
                    CAPABILITY
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
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/45">
            Operating Foundation
          </p>
          <div className="mt-5 grid gap-x-8 gap-y-4 md:grid-cols-3">
            {foundations.map((foundation, index) => (
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
