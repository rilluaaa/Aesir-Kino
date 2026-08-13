import Image from "next/image";
import { CjkText } from "@/components/CjkText";
import { withBasePath } from "@/lib/base-path";
import { MotionReveal } from "@/components/MotionReveal";
import type { ProductAtlasCategory, SiteContent } from "@/lib/i18n/types";

type ProductAtlasCategorySectionProps = {
  category: ProductAtlasCategory;
  categoryIndex: 0 | 1 | 2;
  common: SiteContent["productAtlas"];
};

export function ProductAtlasCategorySection({
  category,
  categoryIndex,
  common
}: ProductAtlasCategorySectionProps) {
  const image = common.categoryImages[categoryIndex];

  return (
    <section className="relative overflow-hidden px-6 py-24 md:py-32" id={`product-atlas-${categoryIndex + 1}`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(138,43,226,0.14),transparent_28%),radial-gradient(circle_at_92%_78%,rgba(0,242,254,0.12),transparent_30%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 xl:grid-cols-12 xl:gap-16">
        <MotionReveal className="xl:col-span-4" viewportAmount={0.05}>
          <p className="i18n-label text-xs font-bold uppercase tracking-[0.28em] text-accent-neon-cyan">
            <CjkText>{category.label}</CjkText>
          </p>
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold leading-tight text-white md:text-6xl">
            <CjkText>{category.title}</CjkText>
          </h2>
          <div className="mt-8 space-y-6 border-l border-accent-neon-purple pl-5">
            <div>
              <p className="i18n-label text-xs font-bold uppercase tracking-[0.2em] text-white/45">
              <CjkText>{common.careConditionLabel}</CjkText>
              </p>
              <p className="mt-2 text-base leading-7 text-report-muted"><CjkText>{category.challenge}</CjkText></p>
            </div>
            <div>
              <p className="i18n-label text-xs font-bold uppercase tracking-[0.2em] text-white/45">
              <CjkText>{common.responseLabel}</CjkText>
              </p>
              <p className="mt-2 text-base leading-7 text-report-muted"><CjkText>{category.response}</CjkText></p>
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
            <span className="i18n-label absolute bottom-4 left-4 text-xs font-bold tracking-[0.18em] text-white/80">
              <CjkText>{common.fieldDeploymentLabel}</CjkText> / 0{categoryIndex + 1}
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
                    <CjkText>{product.name}</CjkText>
                  </h3>
                  <p className="mt-4 text-base leading-7 text-report-muted"><CjkText>{product.description}</CjkText></p>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                    {product.outcomes.map((outcome) => (
                      <span
                        className="i18n-label border-l border-accent-neon-cyan/60 pl-3 text-xs font-bold uppercase tracking-[0.12em] text-white/65"
                        key={outcome}
                      >
                        <CjkText>{outcome}</CjkText>
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
