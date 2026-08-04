import { MotionReveal } from "@/components/MotionReveal";

export function CTASection() {
  return (
    <section className="px-6 py-28 md:py-40">
      <MotionReveal>
        <div className="glass-panel mx-auto max-w-5xl px-8 py-16 text-center shadow-glass-panel md:px-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-neon-cyan">
            Next System State
          </p>
          <h2 className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-semibold leading-tight text-white md:text-6xl">
            From software products to a clinical-grade impact platform.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-report-muted">
            Build an ecosystem where every session can teach, measure, adapt, and
            improve the next intervention.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://aesir.hk/#AESIR"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-neon-button px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-dark-base shadow-neon-cyan transition hover:scale-[1.02]"
            >
              Explore Impact
            </a>
            <a
              href="https://aesir.hk/#contactus"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/12 px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:border-accent-neon-cyan/70 hover:text-accent-neon-cyan"
            >
              Contact AESIR
            </a>
          </div>
        </div>
      </MotionReveal>
    </section>
  );
}
