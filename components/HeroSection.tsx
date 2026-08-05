import { FluidHeroBackground } from "@/components/FluidHeroBackground";
import { MotionReveal } from "@/components/MotionReveal";

const headingWords = ["AI", "care", "systems", "for", "a", "measurable", "world."];
const sublineWords =
  "A premium, cinematic view of AESIR's SEN intervention, active aging, rehabilitation, and sports technology ecosystem.".split(
    " "
  );

export function HeroSection() {
  return (
    <section className="relative flex h-screen min-h-[760px] items-center justify-center overflow-hidden px-6">
      <div
        aria-hidden="true"
        className="hero-static-background pointer-events-none absolute inset-0 overflow-hidden bg-hero-radial"
      >
        <div className="absolute left-[8%] top-[20%] h-72 w-72 rounded-full bg-accent-neon-cyan/10 blur-[110px] md:h-96 md:w-96" />
        <div className="absolute bottom-[10%] right-[6%] h-80 w-80 rounded-full bg-accent-neon-purple/10 blur-[120px] md:h-[30rem] md:w-[30rem]" />
        <div className="absolute left-1/2 top-[48%] h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]" />
        <div className="absolute left-1/2 top-[48%] h-[27rem] w-[27rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-neon-cyan/10" />
      </div>
      <FluidHeroBackground />
      <div aria-hidden="true" className="hero-fluid-scrim pointer-events-none absolute inset-0 z-[1]" />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 text-center">
        <MotionReveal immediate delay={0.32}>
          <p className="mx-auto w-fit border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-bold uppercase tracking-[0.32em] text-accent-neon-cyan backdrop-blur-md">
            AESIR Impact Report
          </p>
        </MotionReveal>
        <h1
          aria-label="AI care systems for a measurable world."
          className="text-balance font-display text-6xl font-semibold leading-[0.92] tracking-normal text-white md:text-8xl lg:text-9xl"
        >
          {headingWords.map((word, index) => (
            <span
              aria-hidden="true"
              className={`hero-word-reveal ${word === "measurable" ? "text-gradient-neon" : ""}`}
              key={word}
              style={{ animationDelay: `${480 + index * 85}ms` }}
            >
              {word}&nbsp;
            </span>
          ))}
        </h1>
        <p
          aria-label="A premium, cinematic view of AESIR's SEN intervention, active aging, rehabilitation, and sports technology ecosystem."
          className="mx-auto max-w-3xl text-lg leading-8 text-report-muted md:text-xl"
        >
          {sublineWords.map((word, index) => (
            <span
              aria-hidden="true"
              className="hero-word-reveal hero-word-reveal--subline"
              key={`${word}-${index}`}
              style={{ animationDelay: `${1150 + index * 22}ms` }}
            >
              {word}&nbsp;
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
