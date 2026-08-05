import { MotionReveal } from "@/components/MotionReveal";
import { roadmapItems } from "@/lib/content";

export function RoadmapSection() {
  return (
    <section className="relative overflow-hidden px-6 py-28 md:py-36" id="roadmap">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_55%_0%,rgba(0,242,254,0.12),transparent_36%),radial-gradient(circle_at_15%_100%,rgba(138,43,226,0.13),transparent_34%)]" />
      <div className="relative mx-auto max-w-7xl">
        <MotionReveal className="grid gap-7 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-neon-purple">
              2026 Roadmap
            </p>
            <h2 className="mt-5 max-w-5xl text-balance font-display text-4xl font-semibold leading-tight text-white md:text-6xl">
              A more preventive, accessible impact system.
            </h2>
          </div>
          <p className="max-w-lg text-lg leading-8 text-report-muted lg:col-span-4 lg:pb-1">
            The next chapter moves beyond measuring a completed session toward
            earlier insight and more inclusive access to technology-enabled care.
          </p>
        </MotionReveal>

        <ol className="mt-16 grid gap-5 lg:grid-cols-2">
          {roadmapItems.map((item, index) => (
            <MotionReveal delay={index * 0.08} key={item.number}>
              <li className="min-h-80 border border-white/10 bg-dark-base/65 p-7 shadow-glass-panel md:p-10">
                <p className="font-display text-6xl leading-none text-accent-neon-cyan/45 md:text-8xl">
                  {item.number}
                </p>
                <h3 className="mt-10 max-w-md text-3xl font-semibold leading-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-5 max-w-xl text-base leading-7 text-report-muted">
                  {item.body}
                </p>
              </li>
            </MotionReveal>
          ))}
        </ol>

        <MotionReveal className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between" delay={0.1}>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">
            Direction of Travel
          </p>
          <p className="max-w-3xl text-right text-sm leading-6 text-white/70">
            Measure what matters. Anticipate what is next. Keep technology
            accessible to the communities it is built to serve.
          </p>
        </MotionReveal>
      </div>
    </section>
  );
}
