import { MotionReveal } from "@/components/MotionReveal";
import { CjkText } from "@/components/CjkText";
import { CountUpMetric } from "@/components/CountUpMetric";
import type { SiteContent } from "@/lib/i18n";

type ImpactMetricsSectionProps = {
  readonly content: SiteContent["impactMetricsSection"];
};

export function ImpactMetricsSection({ content }: ImpactMetricsSectionProps) {
  return (
    <section className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        <MotionReveal className="mb-14 max-w-4xl">
          <p className="i18n-label text-xs font-bold uppercase tracking-[0.3em] text-accent-neon-cyan">
            <CjkText>{content.eyebrow}</CjkText>
          </p>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight text-white md:text-6xl">
            <CjkText>{content.title}</CjkText>
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-report-muted">
            <CjkText>{content.description}</CjkText>
          </p>
        </MotionReveal>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {content.metrics.map((metric, index) => (
            <MotionReveal
              delay={(index % 4) * 0.05}
              key={`${metric.domain}-${metric.label}`}
            >
              <article className="glass-panel min-h-64 p-6 shadow-glass-panel">
                <p className="i18n-label text-xs font-bold uppercase tracking-[0.22em] text-white/45">
                  <CjkText>{metric.domain}</CjkText>
                </p>
                <CountUpMetric
                  className="text-gradient-neon mt-8 block font-display text-5xl font-semibold leading-none tabular-nums md:text-6xl"
                  delay={(index % 4) * 65}
                  value={metric.value}
                />
                <p className="mt-6 text-xl font-semibold leading-8 text-white">
                  <CjkText>{metric.label}</CjkText>
                </p>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
