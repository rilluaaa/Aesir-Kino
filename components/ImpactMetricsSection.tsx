import { MotionReveal } from "@/components/MotionReveal";
import { CountUpMetric } from "@/components/CountUpMetric";
import { impactMetrics } from "@/lib/content";

export function ImpactMetricsSection() {
  return (
    <section className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        <MotionReveal className="mb-14 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-neon-cyan">
            Impact Intelligence Layer
          </p>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight text-white md:text-6xl">
            Frontline activity translated into measurable indicators.
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-report-muted">
            AESIR tracks reach, SEN engagement, elderly service deployment,
            training participation, and observable progress signals across its
            care technology ecosystem.
          </p>
        </MotionReveal>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {impactMetrics.map((metric, index) => (
            <MotionReveal
              delay={(index % 4) * 0.05}
              key={`${metric.domain}-${metric.label}`}
            >
              <article className="glass-panel min-h-64 p-6 shadow-glass-panel">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">
                  {metric.domain}
                </p>
                <CountUpMetric
                  className="text-gradient-neon mt-8 block font-display text-5xl font-semibold leading-none tabular-nums md:text-6xl"
                  delay={(index % 4) * 65}
                  value={metric.value}
                />
                <p className="mt-6 text-xl font-semibold leading-8 text-white">
                  {metric.label}
                </p>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
