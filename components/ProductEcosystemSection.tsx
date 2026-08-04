import Image from "next/image";
import { withBasePath } from "@/lib/base-path";
import { MotionReveal } from "@/components/MotionReveal";
import { productModules } from "@/lib/content";

export function ProductEcosystemSection() {
  return (
    <section className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        <MotionReveal className="mb-14 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-neon-cyan">
            Product Impact Modules
          </p>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight text-white md:text-6xl">
            A deeper product stack for learning, rehabilitation, and active play.
          </h2>
        </MotionReveal>
        <div className="grid gap-5 lg:grid-cols-2">
          {productModules.map((product, index) => (
            <MotionReveal delay={(index % 2) * 0.08} key={product.title}>
              <article className="glass-panel overflow-hidden shadow-glass-panel">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={withBasePath(product.image)}
                    alt={product.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover opacity-80 transition duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-base via-dark-base/30 to-transparent" />
                </div>
                <div className="p-7 md:p-9">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-neon-cyan">
                    {product.eyebrow}
                  </p>
                  <h3 className="mt-5 text-3xl font-semibold leading-tight text-white">
                    {product.title}
                  </h3>
                  <p className="mt-5 text-lg leading-8 text-report-muted">
                    {product.description}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        className="border border-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white/75"
                        key={`${product.title}-${tag}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
