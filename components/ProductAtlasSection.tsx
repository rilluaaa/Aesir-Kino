import Image from "next/image";
import { MotionReveal } from "@/components/MotionReveal";
import { productAtlasCategories } from "@/lib/content";

const categoryImages = [
  {
    src: "/impact-photos/atlas-sen-child-ar.png",
    alt: "Child participating in an augmented-reality learning activity"
  },
  {
    src: "/impact-photos/atlas-elderly-outreach-2.png",
    alt: "Older adults participating in an AESIR care-centre session"
  },
  {
    src: "/impact-photos/atlas-sports-vr-2.jpg",
    alt: "Participant experiencing a virtual-reality sports activity"
  }
] as const;

export function ProductAtlasSection() {
  return (
    <section className="relative overflow-hidden border-y border-white/8 bg-black/20 px-6 py-28 md:py-36" id="product-atlas">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_8%,rgba(138,43,226,0.12),transparent_25%),radial-gradient(circle_at_94%_65%,rgba(0,242,254,0.1),transparent_28%)]" />
      <div className="relative mx-auto max-w-7xl">
        <MotionReveal className="max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-neon-purple">
            Product Atlas
          </p>
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold leading-tight text-white md:text-6xl">
            Systems built around the real conditions of care.
          </h2>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-report-muted">
            AESIR&apos;s product portfolio turns clinical, educational, and
            movement goals into approachable practice. Each category is
            designed to meet people where support is needed most.
          </p>
        </MotionReveal>

        <div className="mt-20">
          {productAtlasCategories.map((category, categoryIndex) => {
            const image = categoryImages[categoryIndex];

            return (
              <MotionReveal
                className="border-t border-white/10 py-12 first:pt-0 md:py-16"
                delay={0.04}
                key={category.title}
                viewportAmount={0.05}
              >
                <article className="grid gap-10 xl:grid-cols-12 xl:gap-16">
                  <div className="xl:col-span-4">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent-neon-cyan">
                      {category.label}
                    </p>
                    <h3 className="mt-5 text-3xl font-semibold leading-tight text-white md:text-4xl">
                      {category.title}
                    </h3>
                    <div className="mt-7 space-y-5 border-l border-accent-neon-purple pl-5">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">
                          Care Condition
                        </p>
                        <p className="mt-2 text-base leading-7 text-report-muted">
                          {category.challenge}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">
                          AESIR Response
                        </p>
                        <p className="mt-2 text-base leading-7 text-report-muted">
                          {category.response}
                        </p>
                      </div>
                    </div>
                    <div className="relative mt-8 aspect-[4/3] overflow-hidden border border-white/10">
                      <Image
                        alt={image.alt}
                        className="object-cover"
                        fill
                        sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
                        src={image.src}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-base/75 via-transparent to-transparent" />
                      <span className="absolute bottom-4 left-4 text-xs font-bold tracking-[0.18em] text-white/80">
                        FIELD DEPLOYMENT / 0{categoryIndex + 1}
                      </span>
                    </div>
                  </div>

                  <ol className="xl:col-span-8">
                    {category.products.map((product, productIndex) => (
                      <li
                        className={
                          productIndex === 0
                            ? "border-t border-white/10 py-7 first:pt-0"
                            : "border-t border-white/10 py-7"
                        }
                        key={product.name}
                      >
                        <div className="grid gap-4 md:grid-cols-[4rem_minmax(0,1fr)]">
                          <span className="font-display text-2xl text-accent-neon-cyan/75">
                            {String(productIndex + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <h4 className="text-2xl font-semibold leading-tight text-white">
                              {product.name}
                            </h4>
                            <p className="mt-4 text-base leading-7 text-report-muted">
                              {product.description}
                            </p>
                            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                              {product.outcomes.map((outcome) => (
                                <span
                                  className="border-l border-accent-neon-cyan/60 pl-3 text-xs font-bold uppercase tracking-[0.12em] text-white/65"
                                  key={outcome}
                                >
                                  {outcome}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </article>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
