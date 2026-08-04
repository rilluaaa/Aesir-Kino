import { Hero3DCanvas } from "@/components/Hero3DCanvas";
import { MotionReveal } from "@/components/MotionReveal";

export function HeroSection() {
  return (
    <section className="relative flex h-screen min-h-[760px] items-center justify-center overflow-hidden px-6">
      <Hero3DCanvas />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 text-center">
        <MotionReveal immediate>
          <p className="mx-auto w-fit border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-bold uppercase tracking-[0.32em] text-accent-neon-cyan backdrop-blur-md">
            AESIR Impact Report
          </p>
        </MotionReveal>
        <MotionReveal immediate delay={0.12}>
          <h1 className="text-balance font-display text-6xl font-semibold leading-[0.92] tracking-normal text-white md:text-8xl lg:text-9xl">
            AI care systems for a{" "}
            <span className="text-gradient-neon">measurable</span> world.
          </h1>
        </MotionReveal>
        <MotionReveal immediate delay={0.24}>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-report-muted md:text-xl">
            A premium, cinematic view of AESIR&apos;s SEN intervention, active
            aging, rehabilitation, and sports technology ecosystem.
          </p>
        </MotionReveal>
      </div>
    </section>
  );
}
