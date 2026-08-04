import type { FeatureCard as FeatureCardType } from "@/lib/content";
import { CountUpMetric } from "@/components/CountUpMetric";

type FeatureCardProps = {
  readonly feature: FeatureCardType;
};

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <article className="glass-panel group min-h-[29rem] p-7 shadow-glass-panel transition duration-300 hover:-translate-y-1 hover:border-accent-neon-cyan/35 hover:shadow-neon-cyan md:p-9">
      <div className="mb-8 flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-[0.26em] text-accent-neon-cyan">
          {feature.eyebrow}
        </p>
      </div>
      <div className="mb-9">
        <CountUpMetric
          className="text-gradient-neon block font-display text-[4.5rem] font-semibold leading-none tracking-normal tabular-nums md:text-[5.1rem] xl:text-[5.6rem]"
          value={feature.metric}
        />
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.22em] text-white/45">
          {feature.metricLabel}
        </p>
      </div>
      <h3 className="text-balance text-2xl font-semibold leading-tight text-white md:text-3xl">
        {feature.title}
      </h3>
      <p className="mt-6 text-base leading-8 text-report-muted">
        {feature.description}
      </p>
      <div className="mt-8 h-px w-full bg-gradient-to-r from-accent-neon-cyan/60 via-white/10 to-transparent" />
    </article>
  );
}
