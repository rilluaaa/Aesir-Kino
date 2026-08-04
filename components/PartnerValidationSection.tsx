import Image from "next/image";
import { CountUpMetric } from "@/components/CountUpMetric";
import { MotionReveal } from "@/components/MotionReveal";
import { partnerValidation } from "@/lib/content";

export function PartnerValidationSection() {
  return (
    <section className="relative px-6 py-28 md:py-36" id="partner-validation">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <MotionReveal className="lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-neon-cyan">
              {partnerValidation.eyebrow}
            </p>
            <h2 className="mt-5 max-w-4xl text-balance font-display text-4xl font-semibold leading-tight text-white md:text-6xl">
              {partnerValidation.title}
            </h2>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-report-muted">
              {partnerValidation.body}
            </p>
          </MotionReveal>

          <MotionReveal className="relative aspect-[4/3] overflow-hidden border border-white/10 lg:col-span-5" delay={0.08}>
            <Image
              alt="AESIR team facilitating a session with elderly service participants"
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              src="/impact-photos/partner-elderly-outreach.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-base/90 via-dark-base/10 to-transparent" />
            <p className="absolute bottom-5 left-5 max-w-xs text-sm font-medium leading-6 text-white/85">
              Care technology is only effective when it strengthens the people
              and organisations around each participant.
            </p>
          </MotionReveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
          {partnerValidation.proofs.map((proof, index) => (
            <MotionReveal className="bg-dark-base/95 p-7 md:p-9" delay={index * 0.06} key={proof.label}>
              <CountUpMetric
                className="text-gradient-neon block font-display text-5xl font-semibold leading-none tabular-nums md:text-6xl"
                delay={index * 80}
                value={proof.value}
              />
              <p className="mt-5 text-base font-semibold leading-7 text-white">
                {proof.label}
              </p>
            </MotionReveal>
          ))}
        </div>

        <MotionReveal className="mt-14 border-y border-white/10 py-7" delay={0.12}>
          <div className="grid gap-5 md:grid-cols-4">
            {partnerValidation.network.map((partner, index) => (
              <p className="border-l border-accent-neon-purple pl-4 text-sm leading-6 text-white/70" key={partner}>
                <span className="mr-2 font-display text-accent-neon-purple">0{index + 1}</span>
                {partner}
              </p>
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
