import { MotionReveal } from "@/components/MotionReveal";
import { targetStatuses } from "@/lib/content";

export function TargetStatusSection() {
  return (
    <section className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        <MotionReveal className="mb-14 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-neon-purple">
            Target Status
          </p>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight text-white md:text-6xl">
            Designed for real SEN and elderly care conditions.
          </h2>
        </MotionReveal>
        <div className="grid gap-5 lg:grid-cols-2">
          {targetStatuses.map((status, index) => (
            <MotionReveal delay={index * 0.08} key={status.title}>
              <article className="glass-panel p-7 shadow-glass-panel md:p-9">
                <h3 className="text-3xl font-semibold text-white">
                  {status.title}
                </h3>
                <p className="mt-5 text-lg leading-8 text-report-muted">
                  {status.summary}
                </p>
                <div className="mt-8 grid gap-4">
                  {status.points.map((point) => (
                    <div
                      className="border-t border-white/10 pt-5"
                      key={`${status.title}-${point.label}`}
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-neon-cyan">
                        {point.label}
                      </p>
                      <p className="mt-3 text-base leading-7 text-report-muted">
                        {point.body}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
