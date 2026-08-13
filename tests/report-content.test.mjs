import assert from "node:assert/strict";
import { access, constants } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const contentPath = new URL("../lib/i18n/en.ts", import.meta.url);
const traditionalContentPath = new URL("../lib/i18n/traditional.ts", import.meta.url);
const simplifiedContentPath = new URL("../lib/i18n/simplified.ts", import.meta.url);
const i18nIndexPath = new URL("../lib/i18n/index.ts", import.meta.url);
const reportPath = new URL("../components/LocalizedReport.tsx", import.meta.url);
const languageProviderPath = new URL("../components/LanguageProvider.tsx", import.meta.url);
const languageSwitcherPath = new URL("../components/LanguageSwitcher.tsx", import.meta.url);
const productAtlasCategoryPath = new URL("../components/ProductAtlasCategorySection.tsx", import.meta.url);
const partnerValidationPath = new URL("../components/PartnerValidationSection.tsx", import.meta.url);
const layoutPath = new URL("../app/layout.tsx", import.meta.url);
const heroPath = new URL("../components/HeroSection.tsx", import.meta.url);
const fluidHeroPath = new URL("../components/FluidHeroBackground.tsx", import.meta.url);
const socialInnovationPath = new URL("../components/SocialInnovationSection.tsx", import.meta.url);
const aiAgentEcosystemPath = new URL("../components/AIAgentEcosystemSection.tsx", import.meta.url);
const roadmapPath = new URL("../components/RoadmapSection.tsx", import.meta.url);
const globalsPath = new URL("../app/globals.css", import.meta.url);
const chapterDeckPath = new URL("../components/ChapterDeck.tsx", import.meta.url);

function assertFileExists(path) {
  return new Promise((resolve, reject) => {
    access(path, constants.F_OK, (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

test("includes all approved report content groups", async () => {
  const source = await readFile(contentPath, "utf8");

  for (const token of [
    "founderStory",
    "socialInnovation",
    "capabilities",
    "categories",
    "partnerValidation",
    "roadmap",
    "Ernest Chan",
    "Zero Wong",
    "Magic Word Adventure",
    "Fall Prevention VR Game",
    "VR Sports"
  ]) {
    assert.match(source, new RegExp(token));
  }
});

test("uses unique impact photography across report content and category sections", async () => {
  const sources = await Promise.all(
    [contentPath, productAtlasCategoryPath, partnerValidationPath].map((path) =>
      readFile(path, "utf8")
    )
  );
  const photos = sources.flatMap((source) =>
    [...source.matchAll(/\/impact-photos\/[\w-]+\.(?:jpg|jpeg|png|webp)/g)].map((match) => match[0])
  );

  assert.equal(new Set(photos).size, photos.length);
  assert.equal(photos.length, 13);

  await Promise.all(
    photos.map((photo) => assertFileExists(new URL(`../public${photo}`, import.meta.url)))
  );
});

test("renders the founder story and social-innovation sections after the hero", async () => {
  const pageSource = await readFile(reportPath, "utf8");

  for (const token of ["FounderStorySection", "SocialInnovationSection"]) {
    assert.match(pageSource, new RegExp(token));
  }

  assert.ok(
    pageSource.indexOf("<HeroSection") <
      pageSource.indexOf("<FounderStorySection") &&
      pageSource.indexOf("<FounderStorySection") <
        pageSource.indexOf("<SocialInnovationSection")
  );
});

test("renders the AI ecosystem after impact metrics", async () => {
  const pageSource = await readFile(reportPath, "utf8");

  assert.match(pageSource, /AIAgentEcosystemSection/);
  assert.ok(
    pageSource.indexOf("<ImpactMetricsSection") <
      pageSource.indexOf("<AIAgentEcosystemSection")
  );
});

test("renders three dedicated product atlas pages after the product ecosystem", async () => {
  const [pageSource, englishContent] = await Promise.all([
    readFile(reportPath, "utf8"),
    readFile(contentPath, "utf8")
  ]);

  assert.match(pageSource, /ProductAtlasCategorySection/);
  assert.ok(englishContent.indexOf("Product Ecosystem") < englishContent.indexOf("SEN Support"));
  assert.ok(englishContent.indexOf("SEN Support") < englishContent.indexOf("Elderly Care & Rehabilitation"));
  assert.ok(englishContent.indexOf("Elderly Care & Rehabilitation") < englishContent.indexOf("Physical & Sports Technology"));
});

test("uses an early viewport reveal threshold for each product atlas page", async () => {
  const source = await readFile(productAtlasCategoryPath, "utf8");

  assert.match(source, /viewportAmount=\{0\.05\}/);
});

test("renders partner validation and roadmap before the final CTA", async () => {
  const pageSource = await readFile(reportPath, "utf8");

  for (const token of ["PartnerValidationSection", "RoadmapSection"]) {
    assert.match(pageSource, new RegExp(token));
  }

  assert.ok(
    pageSource.indexOf("ProductAtlasCategorySection") <
      pageSource.indexOf("<PartnerValidationSection") &&
      pageSource.indexOf("<PartnerValidationSection") <
        pageSource.indexOf("<RoadmapSection") &&
      pageSource.indexOf("<RoadmapSection") < pageSource.indexOf("<CTASection")
  );
});

test("uses an interactive fluid hero without restoring the rotating object or custom cursor", async () => {
  const [layout, hero, fluidHero, styles] = await Promise.all([
    readFile(layoutPath, "utf8"),
    readFile(heroPath, "utf8"),
    readFile(fluidHeroPath, "utf8"),
    readFile(globalsPath, "utf8")
  ]);

  assert.doesNotMatch(layout, /LiquidCursor/);
  assert.doesNotMatch(hero, /Hero3DCanvas/);
  assert.doesNotMatch(styles, /\.liquid-cursor/);
  assert.doesNotMatch(styles, /cursor:\s*none/);
  assert.match(hero, /hero-static-background/);
  assert.match(hero, /FluidHeroBackground/);
  assert.match(hero, /hero-fluid-scrim/);
  assert.match(hero, /hero-word-reveal/);
  assert.match(fluidHero, /data-fluid-background/);
  assert.match(fluidHero, /pointermove/);
  assert.match(fluidHero, /touchmove/);
  assert.match(fluidHero, /CLOUD_COUNT = 2/);
  assert.match(fluidHero, /CLOUD_PHASE_OFFSET = Math\.PI/);
  assert.match(fluidHero, /CLOUD_TRAIL_DISSIPATION = 0\.946/);
  assert.match(fluidHero, /addOrbitClouds/);
  assert.match(fluidHero, /0\.5 - Math\.sin\(phase\)/);
  assert.match(fluidHero, /data-cloud-count="2"/);
  assert.match(fluidHero, /data-cloud-palette="ice-blue-white"/);
  assert.match(fluidHero, /data-cloud-style="twin-thick-trails"/);
  assert.match(fluidHero, /FLOW_WAVE_POINT_COUNT = FLOW_WAVE_COLUMNS \* FLOW_WAVE_ROWS/);
  assert.match(fluidHero, /new Points/);
  assert.match(fluidHero, /blending: AdditiveBlending/);
  assert.doesNotMatch(fluidHero, /import \* as THREE/);
  assert.match(fluidHero, /data-flow-wave="optimized"/);
  assert.match(fluidHero, /data-flow-wave-visibility="bold"/);
  assert.match(fluidHero, /data-renderer-count="1"/);
  assert.doesNotMatch(fluidHero, /UnrealBloomPass/);
  assert.match(styles, /hero-fluid-scrim[\s\S]*rgba\(4, 5, 12, 0\.48\)/);
  assert.match(fluidHero, /radius = 0\.0062/);
  assert.match(fluidHero, /radius = 0\.013/);
  assert.match(fluidHero, /const splatPool: Splat\[\] = \[\]/);
  assert.doesNotMatch(fluidHero, /createRandomSplat/);
  assert.doesNotMatch(fluidHero, /index < 34/);
  assert.match(fluidHero, /IntersectionObserver/);
  assert.match(fluidHero, /if \(!isVisible \|\| event\.pointerType === "touch"\) return/);
  assert.match(fluidHero, /handleTouchMove[\s\S]*if \(!isVisible\) return/);
  assert.match(fluidHero, /prefers-reduced-motion/);
});

test("replays all hero text without remounting the fluid background on language changes", async () => {
  const [report, hero, styles] = await Promise.all([
    readFile(reportPath, "utf8"),
    readFile(heroPath, "utf8"),
    readFile(globalsPath, "utf8")
  ]);

  assert.match(report, /const \{ content, language \} = useLanguage\(\)/);
  assert.match(
    report,
    /<HeroSection content=\{content\.hero\} language=\{language\} key="hero" \/>/
  );
  assert.match(hero, /readonly language: Language/);
  assert.match(hero, /key=\{language\}/);

  const backgroundIndex = hero.indexOf("<FluidHeroBackground />");
  const textResetIndex = hero.indexOf("key={language}");
  const textContainerEndIndex = hero.indexOf("</section>");

  assert.ok(backgroundIndex >= 0 && backgroundIndex < textResetIndex);
  assert.ok(textResetIndex < textContainerEndIndex);
  assert.match(hero, /480 \+ index \* 85/);
  assert.match(hero, /1150 \+ index \* 22/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.hero-word-reveal \{[\s\S]*?animation: none;/);
});

test("keeps report sections connected without outer divider lines", async () => {
  const sources = await Promise.all(
    [socialInnovationPath, aiAgentEcosystemPath, roadmapPath, productAtlasCategoryPath].map((path) =>
      readFile(path, "utf8")
    )
  );

  for (const source of sources) {
    const sectionOpeningTag = source.match(/<section[\s\S]*?>/)?.[0] ?? "";
    assert.doesNotMatch(sectionOpeningTag, /border-y/);
    assert.doesNotMatch(sectionOpeningTag, /bg-black\/20/);
  }
});

test("renders the report as one continuous page with chapter navigation", async () => {
  const [page, deck] = await Promise.all([
    readFile(reportPath, "utf8"),
    readFile(chapterDeckPath, "utf8").catch(() => "")
  ]);

  assert.match(page, /ChapterDeck/);
  assert.match(deck, /IntersectionObserver/);
  assert.match(deck, /chapters\.map/);
  assert.match(deck, /chapter-deck__flow/);
  assert.match(deck, /data-section-continuity="gradient"/);
  assert.match(deck, /chapter-deck__chapter/);
  assert.match(deck, /href=\{`#\$\{chapter\.id\}`\}/);
  assert.match(deck, /aria-current/);
  assert.doesNotMatch(deck, /AnimatePresence/);
  assert.doesNotMatch(deck, /onWheel/);
  assert.doesNotMatch(deck, /preventDefault/);
  assert.doesNotMatch(deck, /chapter-deck-enabled/);

  const styles = await readFile(globalsPath, "utf8");
  const flowStyles = styles.match(/\.chapter-deck__flow\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
  const bridgeStyles =
    styles.match(/\.chapter-deck__chapter:not\(:last-child\)::after\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
  assert.match(styles, /\.chapter-deck\s*\{[\s\S]*?min-height:\s*100vh;/);
  assert.match(styles, /\.chapter-deck__chapter\s*\{[\s\S]*?scroll-margin-top:\s*0;/);
  assert.match(flowStyles, /linear-gradient\(/);
  assert.doesNotMatch(flowStyles, /radial-gradient\(/);
  assert.match(styles, /\.chapter-deck__chapter:not\(:last-child\)::after/);
  assert.match(bridgeStyles, /linear-gradient\(/);
  assert.doesNotMatch(bridgeStyles, /radial-gradient\(/);
  assert.doesNotMatch(styles, /overflow-y:\s*hidden/);
});

test("keeps the existing report sections as individually addressable chapter pages", async () => {
  const page = await readFile(reportPath, "utf8");

  for (const section of [
    "HeroSection",
    "FounderStorySection",
    "SocialInnovationSection",
    "FeaturesSection",
    "ImpactMetricsSection",
    "AIAgentEcosystemSection",
    "TargetStatusSection",
    "ProductEcosystemSection",
    "ProductAtlasCategorySection",
    "PartnerValidationSection",
    "RoadmapSection",
    "CTASection"
  ]) {
    assert.match(page, new RegExp(section));
  }
});

test("provides complete English, Traditional Chinese, and Simplified Chinese dictionaries", async () => {
  const [english, traditional, simplified] = await Promise.all([
    readFile(contentPath, "utf8"),
    readFile(traditionalContentPath, "utf8"),
    readFile(simplifiedContentPath, "utf8")
  ]);

  for (const source of [english, traditional, simplified]) {
    for (const section of [
      "metadata",
      "languageSelector",
      "chapters",
      "hero",
      "featuresSection",
      "impactMetricsSection",
      "targetStatusSection",
      "productEcosystemSection",
      "founderStory",
      "socialInnovation",
      "aiEcosystem",
      "productAtlas",
      "partnerValidation",
      "roadmap",
      "cta"
    ]) {
      assert.match(source, new RegExp(`${section}:`));
    }
    assert.match(source, /satisfies SiteContent/);
  }

  assert.match(traditional, /AESIR 影響力報告/);
  assert.match(traditional, /前線實踐/);
  assert.match(traditional, /探索影響力/);
  assert.match(simplified, /AESIR 影响力报告/);
  assert.match(simplified, /一线实践/);
  assert.match(simplified, /探索影响力/);
});

test("persists only valid manual language choices and exposes an accessible custom menu", async () => {
  const [index, provider, switcher] = await Promise.all([
    readFile(i18nIndexPath, "utf8"),
    readFile(languageProviderPath, "utf8"),
    readFile(languageSwitcherPath, "utf8")
  ]);

  assert.match(index, /aesir-kino-language/);
  assert.match(index, /"en",\s*"traditional",\s*"simplified"/);
  assert.match(provider, /localStorage\.getItem/);
  assert.match(provider, /isLanguage/);
  assert.match(provider, /document\.documentElement\.lang/);
  assert.match(provider, /document\.title/);
  assert.match(switcher, /aria-haspopup="menu"/);
  assert.match(switcher, /aria-expanded/);
  assert.match(switcher, /role="menuitemradio"/);
  assert.match(switcher, /Escape/);
  assert.match(switcher, /pointerdown/);
});

test("uses manual language-aware hero segments without splitting Chinese on spaces", async () => {
  const [hero, traditional, simplified] = await Promise.all([
    readFile(heroPath, "utf8"),
    readFile(traditionalContentPath, "utf8"),
    readFile(simplifiedContentPath, "utf8")
  ]);

  assert.doesNotMatch(hero, /split\(" "\)/);
  assert.match(traditional, /headingSegments: \["為", "可量化的世界", "打造", "AI", "照護系統。"\]/);
  assert.match(simplified, /headingSegments: \["为", "可量化的世界", "打造", "AI", "照护系统。"\]/);
});
