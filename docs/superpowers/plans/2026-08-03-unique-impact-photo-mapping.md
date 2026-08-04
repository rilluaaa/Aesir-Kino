# Unique Impact Photo Mapping Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every repeated report photo with a unique, contextually matched image supplied by the user.

**Architecture:** Static image references remain centralised in `lib/content.ts` where possible, with the two presentation components retaining their local category-image arrays. Selected desktop assets are copied once into `public/impact-photos` using ASCII web filenames, then all 16 report image references are rewired so no photo path appears twice.

**Tech Stack:** Next.js 15, React 19, TypeScript, `next/image`, Node.js test runner, ESLint, Vercel.

## Global Constraints

- Source images must come from `C:\Users\User\Desktop\照片impact report`.
- Destination files must use descriptive ASCII filenames under `public/impact-photos`.
- No report photo source path may be used by more than one component or data entry.
- Existing copy, chapter order, animations, and dark visual overlays must remain unchanged.
- Run `pnpm test`, `pnpm lint`, and `pnpm build` before production deployment.

---

### Task 1: Copy the Unique Photo Set

**Files:**
- Create: `public/impact-photos/founder-ai-launch.jpeg`
- Create: `public/impact-photos/social-elderly-vr-outreach.jpeg`
- Create: `public/impact-photos/social-ar-game.png`
- Create: `public/impact-photos/sen-magic-word-battle.png`
- Create: `public/impact-photos/sen-motor-capability.png`
- Create: `public/impact-photos/sen-body-literacy.png`
- Create: `public/impact-photos/elderly-fitness-session.png`
- Create: `public/impact-photos/elderly-fall-prevention-vr-2.png`
- Create: `public/impact-photos/sports-vr-training.jpg`
- Create: `public/impact-photos/atlas-sen-child-ar.png`
- Create: `public/impact-photos/atlas-elderly-outreach-2.png`
- Create: `public/impact-photos/atlas-sports-vr-2.jpg`
- Create: `public/impact-photos/category-sen-ar-book.jpg`
- Create: `public/impact-photos/category-elderly-new-life-vr.png`
- Create: `public/impact-photos/category-sports-vr-fencing.jpeg`
- Create: `public/impact-photos/partner-elderly-outreach.jpg`

**Interfaces:**
- Consumes: User source files in `C:\Users\User\Desktop\照片impact report`.
- Produces: Sixteen unique public image paths for content and category presentation components.

- [ ] **Step 1: Verify all source files exist**

```powershell
$source = 'C:\Users\User\Desktop\照片impact report'
$files = @(
  '数码港全民AI启动礼（全员大合照）.jpeg', '带IVE学生去老人中心推广VR.JPEG', 'AR游戏.png',
  '魔法文字大作战.png', '运动能力小朋友.png', '身体识字法 (2).png', '老人运动.png',
  '2. Fall Prevention VR Game (2).png', '3. VR Sports.jpg', '小朋友玩AR.png',
  '老人院推广 (2).png', '3. VR Sports (2).jpg', 'AR书本学习.jpg', 'New Life VR Platform.png',
  '击剑世界锦标赛VR推广.JPEG', '老人院推广.jpg'
)
$files | ForEach-Object { Test-Path -LiteralPath (Join-Path $source $_) }
```

Expected: sixteen `True` values.

- [ ] **Step 2: Copy each source into its assigned web filename**

```powershell
$source = 'C:\Users\User\Desktop\照片impact report'
$destination = 'public\impact-photos'
$mapping = [ordered]@{
  '数码港全民AI启动礼（全员大合照）.jpeg' = 'founder-ai-launch.jpeg'
  '带IVE学生去老人中心推广VR.JPEG' = 'social-elderly-vr-outreach.jpeg'
  'AR游戏.png' = 'social-ar-game.png'
  '魔法文字大作战.png' = 'sen-magic-word-battle.png'
  '运动能力小朋友.png' = 'sen-motor-capability.png'
  '身体识字法 (2).png' = 'sen-body-literacy.png'
  '老人运动.png' = 'elderly-fitness-session.png'
  '2. Fall Prevention VR Game (2).png' = 'elderly-fall-prevention-vr-2.png'
  '3. VR Sports.jpg' = 'sports-vr-training.jpg'
  '小朋友玩AR.png' = 'atlas-sen-child-ar.png'
  '老人院推广 (2).png' = 'atlas-elderly-outreach-2.png'
  '3. VR Sports (2).jpg' = 'atlas-sports-vr-2.jpg'
  'AR书本学习.jpg' = 'category-sen-ar-book.jpg'
  'New Life VR Platform.png' = 'category-elderly-new-life-vr.png'
  '击剑世界锦标赛VR推广.JPEG' = 'category-sports-vr-fencing.jpeg'
  '老人院推广.jpg' = 'partner-elderly-outreach.jpg'
}
$mapping.GetEnumerator() | ForEach-Object {
  Copy-Item -LiteralPath (Join-Path $source $_.Key) -Destination (Join-Path $destination $_.Value) -Force
}
```

- [ ] **Step 3: Verify destination count and filenames**

```powershell
Get-ChildItem public\impact-photos -File -Name |
  Where-Object { $_ -match '^(founder-ai-launch|social-|sen-|elderly-|sports-|atlas-|category-|partner-)' } |
  Measure-Object
```

Expected: `Count` is `16`.

### Task 2: Rewire Central Content Images

**Files:**
- Modify: `lib/content.ts:123-238`
- Test: `tests/report-content.test.mjs`

**Interfaces:**
- Consumes: The sixteen copied paths from Task 1.
- Produces: Unique `image` and `src` values for product modules, founder story, and social innovation content.

- [ ] **Step 1: Add a failing uniqueness test**

```js
test("uses unique photography across report content and category pages", async () => {
  const sources = [
    await readFile(contentPath, "utf8"),
    await readFile(productAtlasCategoryPath, "utf8"),
    await readFile(new URL("../components/ProductAtlasSection.tsx", import.meta.url), "utf8")
  ].join("\n");
  const photos = [...sources.matchAll(/\/impact-photos\/([\w-]+\.(?:jpg|jpeg|png))/g)].map((match) => match[1]);
  assert.equal(new Set(photos).size, photos.length);
});
```

- [ ] **Step 2: Run the test and confirm it fails before rewiring**

Run: `node --test tests/report-content.test.mjs`

Expected: FAIL because existing sources repeat `sen-children-tablet.jpg`, `elderly-vr-care.jpg`, and `sports-international-demo.jpg`.

- [ ] **Step 3: Update `lib/content.ts` paths**

Replace the six `productModules` image fields, `founderStory.image`, and both `socialInnovation.images[].src` values with these unique paths, in order:

```ts
"/impact-photos/sen-magic-word-battle.png"
"/impact-photos/sen-motor-capability.png"
"/impact-photos/sen-body-literacy.png"
"/impact-photos/elderly-fitness-session.png"
"/impact-photos/elderly-fall-prevention-vr-2.png"
"/impact-photos/sports-vr-training.jpg"
"/impact-photos/founder-ai-launch.jpeg"
"/impact-photos/social-elderly-vr-outreach.jpeg"
"/impact-photos/social-ar-game.png"
```

- [ ] **Step 4: Update matching image alt text**

Use English descriptions that identify each scene accurately while preserving the existing `ProductModule`, `FounderStory`, and `SocialInnovation` interfaces.

- [ ] **Step 5: Run the targeted test**

Run: `node --test tests/report-content.test.mjs`

Expected: the uniqueness test may still fail until Task 3 updates category images; all pre-existing tests pass.

### Task 3: Rewire Category and Partner Images

**Files:**
- Modify: `components/ProductAtlasSection.tsx:5-18`
- Modify: `components/ProductAtlasCategorySection.tsx:5-18`
- Modify: `components/PartnerValidationSection.tsx:29`
- Test: `tests/report-content.test.mjs`

**Interfaces:**
- Consumes: The remaining seven unique public image paths from Task 1.
- Produces: Unique local `categoryImages` arrays and partner evidence image path.

- [ ] **Step 1: Update `ProductAtlasSection.tsx` gallery paths**

```ts
const categoryImages = [
  { src: "/impact-photos/atlas-sen-child-ar.png", alt: "Child participating in an augmented-reality learning activity" },
  { src: "/impact-photos/atlas-elderly-outreach-2.png", alt: "Older adults participating in an AESIR care-centre session" },
  { src: "/impact-photos/atlas-sports-vr-2.jpg", alt: "Participant experiencing a virtual-reality sports activity" }
] as const;
```

- [ ] **Step 2: Update `ProductAtlasCategorySection.tsx` page paths**

```ts
const categoryImages = [
  { src: "/impact-photos/category-sen-ar-book.jpg", alt: "Learner using an augmented-reality book experience" },
  { src: "/impact-photos/category-elderly-new-life-vr.png", alt: "Older adult using the New Life virtual-reality platform" },
  { src: "/impact-photos/category-sports-vr-fencing.jpeg", alt: "Virtual-reality fencing technology demonstration" }
] as const;
```

- [ ] **Step 3: Update the partner evidence image**

```tsx
src="/impact-photos/partner-elderly-outreach.jpg"
alt="AESIR team facilitating a session with elderly service participants"
```

- [ ] **Step 4: Run the image uniqueness test**

Run: `node --test tests/report-content.test.mjs`

Expected: PASS, with all photo paths used exactly once across the three inspected source files.

### Task 4: Validate and Publish

**Files:**
- Modify: `docs/superpowers/specs/2026-08-03-unique-impact-photo-mapping-design.md` only if an executed source mapping changes.

**Interfaces:**
- Consumes: Completed asset copies and component paths from Tasks 1-3.
- Produces: A production deployment whose report pages contain no repeated photos.

- [ ] **Step 1: Check for duplicate report photo paths**

```powershell
$paths = rg -o '/impact-photos/[A-Za-z0-9_-]+\.(jpg|jpeg|png)' lib components |
  ForEach-Object { ($_ -split ':')[-1] }
$duplicates = $paths | Group-Object | Where-Object Count -gt 1
if ($duplicates) { $duplicates | Format-Table Count, Name; exit 1 }
```

Expected: no output and exit code `0`.

- [ ] **Step 2: Run tests and lint**

Run: `pnpm test; pnpm lint`

Expected: all tests pass and ESLint exits `0`.

- [ ] **Step 3: Build production output**

Run: `pnpm build`

Expected: Next.js build completes with all static routes generated.

- [ ] **Step 4: Deploy and verify**

Run: `pnpm dlx vercel --prod --yes`

Expected: Vercel aliases the deployment to `https://aesir-next-3d.vercel.app`.
