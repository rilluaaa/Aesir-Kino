import Image from "next/image";
import { withBasePath } from "@/lib/base-path";
import { MotionReveal } from "@/components/MotionReveal";
import type { ProductAtlasCategory } from "@/lib/content";

const categoryImages = [
  {
    src: "/impact-photos/category-sen-ar-book.jpg",
    alt: "Learner using an augmented-reality book experience"
  },
  {
    src: "/impact-photos/category-elderly-new-life-vr.webp",
    alt: "Older adult using the New Life virtual-reality platform"
  },
  {
    src: "/impact-photos/category-sports-vr-fencing.jpeg",
    alt: "Virtual-reality fencing technology demonstration"
  }
] as const;

type ProductAtlasCategorySectionProps = {
  category: ProductAtlasCategory;
  categoryIndex: 0 | 1 | 2;
};

export function ProductAtlasCategorySection({
  category,
  categoryIndex
}: ProductAtlasCategorySectionProps) {
  const image = categoryImages[categoryIndex];

  return (
    <section className="relative overflow-hidden px-6 py-24 md:py-32" id={`product-atlas-${categoryIndex + 1}`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(138,43,226,0.14),transparent_28%),radial-gradient(circle_at_92%_78%,rgba(0,242,254,0.12),transparent_30%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 xl:grid-cols-12 xl:gap-16">
        <MotionReveal className="xl:col-span-4" viewportAmount={0.05}>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent-neon-cyan">
            {category.label}
          </p>
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold leading-tight text-white md:text-6xl">
            {category.title}
          </h2>
          <div className="mt-8 space-y-6 border-l border-accent-neon-purple pl-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">
                Care Condition
              </p>
              <p className="mt-2 text-base leading-7 text-report-muted">{category.challenge}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">
                AESIR Response
              </p>
              <p className="mt-2 text-base leading-7 text-report-muted">{category.response}</p>
            </div>
          </div>
          <div className="relative mt-9 aspect-[4/3] overflow-hidden border border-white/10">
            <Image
              alt={image.alt}
              className="object-cover"
              fill
              sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
              src={withBasePath(image.src)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-base/75 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 text-xs font-bold tracking-[0.18em] text-white/80">
              FIELD DEPLOYMENT / 0{categoryIndex + 1}
            </span>
          </div>
        </MotionReveal>

        <ol className="border-t border-white/10 xl:col-span-8 xl:mt-9">
          {category.products.map((product, productIndex) => (
            <MotionReveal
              className="border-b border-white/10 py-7 md:py-9"
              delay={productIndex * 0.04}
              key={product.name}
              viewportAmount={0.05}
            >
              <li className="grid gap-4 md:grid-cols-[4rem_minmax(0,1fr)]">
                <span className="font-display text-2xl text-accent-neon-cyan/75">
                  {String(productIndex + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-2xl font-semibold leading-tight text-white md:text-3xl">
                    {product.name}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-report-muted">{product.description}</p>
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
              </li>
            </MotionReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
