import assert from "node:assert/strict";
import { access, constants } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const contentPath = new URL("../lib/content.ts", import.meta.url);
const pagePath = new URL("../app/page.tsx", import.meta.url);
const productAtlasPath = new URL("../components/ProductAtlasSection.tsx", import.meta.url);
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
    "aiCapabilities",
    "productAtlasCategories",
    "partnerValidation",
    "roadmapItems",
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
    [contentPath, productAtlasPath, productAtlasCategoryPath, partnerValidationPath].map((path) =>
      readFile(path, "utf8")
    )
  );
  const photos = sources.flatMap((source) =>
    [...source.matchAll(/\/impact-photos\/[\w-]+\.(?:jpg|jpeg|png)/g)].map((match) => match[0])
  );

  assert.equal(new Set(photos).size, photos.length);
  assert.equal(photos.length, 16);

  await Promise.all(
    photos.map((photo) => assertFileExists(new URL(`../public${photo}`, import.meta.url)))
  );
});

test("renders the founder story and social-innovation sections after the hero", async () => {
  const pageSource = await readFile(pagePath, "utf8");

  for (const token of ["FounderStorySection", "SocialInnovationSection"]) {
    assert.match(pageSource, new RegExp(token));
  }

  assert.ok(
    pageSource.indexOf("<HeroSection />") <
      pageSource.indexOf("<FounderStorySection />") &&
      pageSource.indexOf("<FounderStorySection />") <
        pageSource.indexOf("<SocialInnovationSection />")
  );
});

test("renders the AI ecosystem after impact metrics", async () => {
  const pageSource = await readFile(pagePath, "utf8");

  assert.match(pageSource, /AIAgentEcosystemSection/);
  assert.ok(
    pageSource.indexOf("<ImpactMetricsSection />") <
      pageSource.indexOf("<AIAgentEcosystemSection />")
  );
});

test("renders three dedicated product atlas pages after the product ecosystem", async () => {
  const pageSource = await readFile(pagePath, "utf8");

  assert.match(pageSource, /ProductAtlasCategorySection/);
  assert.ok(pageSource.indexOf("Product Ecosystem") < pageSource.indexOf("SEN Support"));
  assert.ok(pageSource.indexOf("SEN Support") < pageSource.indexOf("Elderly Care & Rehabilitation"));
  assert.ok(pageSource.indexOf("Elderly Care & Rehabilitation") < pageSource.indexOf("Physical & Sports Technology"));
});

test("uses an early viewport reveal threshold for each product atlas page", async () => {
  const source = await readFile(productAtlasCategoryPath, "utf8");

  assert.match(source, /viewportAmount=\{0\.05\}/);
});

test("renders partner validation and roadmap before the final CTA", async () => {
  const pageSource = await readFile(pagePath, "utf8");

  for (const token of ["PartnerValidationSection", "RoadmapSection"]) {
    assert.match(pageSource, new RegExp(token));
  }

  assert.ok(
    pageSource.indexOf("<ProductAtlasSection />") <
      pageSource.indexOf("<PartnerValidationSection />") &&
      pageSource.indexOf("<PartnerValidationSection />") <
        pageSource.indexOf("<RoadmapSection />") &&
      pageSource.indexOf("<RoadmapSection />") < pageSource.indexOf("<CTASection />")
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
  assert.match(fluidHero, /CLOUD_LOBE_COUNT = 6/);
  assert.match(fluidHero, /CLOUD_PHASE_OFFSET = Math\.PI/);
  assert.match(fluidHero, /addOrbitClouds/);
  assert.match(fluidHero, /lobeIndex < CLOUD_LOBE_COUNT/);
  assert.match(fluidHero, /0\.5 - Math\.sin\(phase\)/);
  assert.match(fluidHero, /data-cloud-count="2"/);
  assert.match(fluidHero, /data-cloud-lobes="6"/);
  assert.doesNotMatch(fluidHero, /createRandomSplat/);
  assert.doesNotMatch(fluidHero, /index < 34/);
  assert.match(fluidHero, /IntersectionObserver/);
  assert.match(fluidHero, /prefers-reduced-motion/);
});

test("keeps report sections connected without outer divider lines", async () => {
  const sources = await Promise.all(
    [socialInnovationPath, aiAgentEcosystemPath, roadmapPath].map((path) =>
      readFile(path, "utf8")
    )
  );

  for (const source of sources) {
    const sectionOpeningTag = source.match(/<section[\s\S]*?>/)?.[0] ?? "";
    assert.doesNotMatch(sectionOpeningTag, /border-y/);
  }
});

test("renders the report as one continuous page with chapter navigation", async () => {
  const [page, deck] = await Promise.all([
    readFile(pagePath, "utf8"),
    readFile(chapterDeckPath, "utf8").catch(() => "")
  ]);

  assert.match(page, /ChapterDeck/);
  assert.match(deck, /IntersectionObserver/);
  assert.match(deck, /chapters\.map/);
  assert.match(deck, /chapter-deck__flow/);
  assert.match(deck, /chapter-deck__chapter/);
  assert.match(deck, /href=\{`#\$\{chapter\.id\}`\}/);
  assert.match(deck, /aria-current/);
  assert.doesNotMatch(deck, /AnimatePresence/);
  assert.doesNotMatch(deck, /onWheel/);
  assert.doesNotMatch(deck, /preventDefault/);
  assert.doesNotMatch(deck, /chapter-deck-enabled/);

  const styles = await readFile(globalsPath, "utf8");
  assert.match(styles, /\.chapter-deck\s*\{[\s\S]*?min-height:\s*100vh;/);
  assert.match(styles, /\.chapter-deck__chapter\s*\{[\s\S]*?scroll-margin-top:\s*0;/);
  assert.doesNotMatch(styles, /overflow-y:\s*hidden/);
});

test("keeps the existing report sections as individually addressable chapter pages", async () => {
  const page = await readFile(pagePath, "utf8");

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
