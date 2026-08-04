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
const liquidCursorPath = new URL("../components/LiquidCursor.tsx", import.meta.url);
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

test("mounts a guarded liquid cursor layer from the root layout", async () => {
  const [layout, cursor] = await Promise.all([
    readFile(layoutPath, "utf8"),
    readFile(liquidCursorPath, "utf8").catch(() => "")
  ]);

  assert.match(layout, /LiquidCursor/);
  assert.match(cursor, /prefers-reduced-motion: reduce/);
  assert.match(cursor, /\(hover: hover\) and \(pointer: fine\)/);
  assert.match(cursor, /requestAnimationFrame/);
});

test("cleans up the liquid cursor pointerout listener", async () => {
  const cursor = await readFile(liquidCursorPath, "utf8");

  assert.match(cursor, /const handlePointerOut/);
  assert.match(cursor, /document\.removeEventListener\("pointerout", handlePointerOut\)/);
});

test("stops the liquid cursor animation loop after pointer movement settles", async () => {
  const cursor = await readFile(liquidCursorPath, "utf8");

  assert.match(cursor, /let lastPointerMoveAt = 0/);
  assert.match(cursor, /Date\.now\(\) - lastPointerMoveAt < 90/);
  assert.doesNotMatch(cursor, /pointerIsInside \|\| distance/);
});

test("renders the liquid cursor as a single halo without core or glint dots", async () => {
  const cursor = await readFile(liquidCursorPath, "utf8");

  assert.doesNotMatch(cursor, /liquid-cursor__core/);
  assert.doesNotMatch(cursor, /liquid-cursor__glint/);
});

test("renders luminous liquid cursor trails without restoring hard cursor dots", async () => {
  const cursor = await readFile(liquidCursorPath, "utf8");

  assert.match(cursor, /liquid-cursor__trail/);
  assert.match(cursor, /tailOnePoint/);
  assert.match(cursor, /tailTwoPoint/);
  assert.doesNotMatch(cursor, /liquid-cursor__core/);
  assert.doesNotMatch(cursor, /liquid-cursor__glint/);
});

test("bridges fast liquid cursor motion with stretched directional trails", async () => {
  const cursor = await readFile(liquidCursorPath, "utf8");

  assert.match(cursor, /const setTrailPosition/);
  assert.match(cursor, /Math\.atan2/);
  assert.match(cursor, /scaleX\(/);
  assert.doesNotMatch(cursor, /trailOnePoint, -12, 10/);
});

test("uses a compact 20px high-energy liquid cursor treatment", async () => {
  const styles = await readFile(globalsPath, "utf8");

  assert.match(styles, /\.liquid-cursor__blob\s*\{[\s\S]*?width:\s*20px;/);
  assert.match(styles, /\.liquid-cursor__blob\s*\{[\s\S]*?height:\s*20px;/);
  assert.match(styles, /rgba\(0,\s*242,\s*254,\s*1\)/);
  assert.match(styles, /0 0 64px rgba\(138,\s*43,\s*226,\s*0\.82\)/);
});

test("organizes the report into one full-screen navigable chapter deck", async () => {
  const [page, deck] = await Promise.all([
    readFile(pagePath, "utf8"),
    readFile(chapterDeckPath, "utf8").catch(() => "")
  ]);

  assert.match(page, /ChapterDeck/);
  assert.match(deck, /AnimatePresence/);
  assert.match(deck, /mode="sync"/);
  assert.match(deck, /onWheelCapture=\{handleSurfaceWheel\}/);
  assert.match(deck, /onScroll=\{handleSurfaceScroll\}/);
  assert.doesNotMatch(deck, /window\.addEventListener\("wheel"/);
  assert.match(deck, /chapter-deck-enabled/);
  assert.match(deck, /minimumReadableScrollDistance/);
  assert.match(deck, /chapter-deck__content/);
  assert.match(deck, /chapter-deck__scroll-runway/);
  assert.match(deck, /surfaceCanContinueReading\(surface, wheelDelta\)/);
  assert.match(deck, /const edgePauseMs = 380/);
  assert.match(deck, /edgeReachedAtRef/);

  const styles = await readFile(globalsPath, "utf8");
  assert.match(styles, /\.chapter-deck__content\s*\{[\s\S]*?min-height:\s*118svh;/);

  for (const transition of ["dissolve", "ripple", "warp", "elastic", "cube", "lens", "sweep", "resolve"]) {
    assert.match(deck, new RegExp(transition));
  }
});

test("normalizes line-based mouse wheel input before scrolling a chapter", async () => {
  const deck = await readFile(chapterDeckPath, "utf8");

  assert.match(deck, /function normalizeWheelDelta\(/);
  assert.match(deck, /event\.deltaMode === WheelEvent\.DOM_DELTA_LINE/);
  assert.match(deck, /const wheelDelta = normalizeWheelDelta\(event\.nativeEvent\)/);
  assert.match(deck, /if \(surfaceCanContinueReading\(surface, wheelDelta\)\)/);
});

test("implements cinematic cube, compression, flip, monochrome, and zoom transition layers", async () => {
  const deck = await readFile(chapterDeckPath, "utf8");

  for (const transition of [
    "cube-rebuild",
    "compress-rotate",
    "elastic-slide",
    "flip-slide",
    "monochrome-glitch",
    "zoom-blur",
    "chapter-deck__fx-cube",
    "chapter-deck__fx-monochrome"
  ]) {
    assert.match(deck, new RegExp(transition));
  }
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
