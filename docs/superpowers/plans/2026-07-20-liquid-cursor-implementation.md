# Liquid Cursor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a desktop-only cyan and violet liquid cursor that is visually responsive without adding persistent work to touch or reduced-motion experiences.

**Architecture:** A client-side `LiquidCursor` component owns pointer listeners and a single idle-stopping animation loop. It writes transforms and opacity directly to three fixed, decorative DOM layers. The root layout mounts it once, while global CSS controls the fine-pointer-only native cursor hiding rule and the liquid visual treatment.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, CSS transforms, requestAnimationFrame, Node test runner.

## Global Constraints

- Use `#00F2FE` cyan, `#8A2BE2` violet, and restrained white highlights.
- Do not use Canvas, scroll listeners, backdrop sampling, or continuous idle animation.
- Do not mount on `(max-width: 768px)`, coarse pointers, or `prefers-reduced-motion: reduce`.
- Keep the cursor layer `pointer-events: none` and preserve mobile native cursor/touch behaviour.
- Verify desktop hover behaviour, mobile absence, no horizontal overflow, and no console errors.

---

### Task 1: Add the guarded liquid cursor layer

**Files:**
- Create: `components/LiquidCursor.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Modify: `tests/report-content.test.mjs`

**Interfaces:**
- Produces: `LiquidCursor(): JSX.Element | null`, mounted once in `RootLayout`.
- Consumes: browser `matchMedia`, `pointermove`, `pointerleave`, and existing root CSS tokens.

- [ ] **Step 1: Write the failing source-level test**

```js
test("mounts a guarded liquid cursor layer from the root layout", async () => {
  const [layout, cursor] = await Promise.all([
    readFile(layoutPath, "utf8"),
    readFile(cursorPath, "utf8")
  ]);

  assert.match(layout, /LiquidCursor/);
  assert.match(cursor, /prefers-reduced-motion: reduce/);
  assert.match(cursor, /\(hover: hover\) and \(pointer: fine\)/);
  assert.match(cursor, /requestAnimationFrame/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm test`

Expected: FAIL because `LiquidCursor` is not imported by `app/layout.tsx` and the component does not exist.

- [ ] **Step 3: Implement the minimal guarded component and root mount**

```tsx
export function LiquidCursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrowViewport = window.matchMedia("(max-width: 768px)");
    const sync = () => setEnabled(
      finePointer.matches && !reducedMotion.matches && !narrowViewport.matches
    );
    sync();
    return () => { /* remove change and pointer listeners, cancel frame */ };
  }, []);

  return enabled ? <div aria-hidden="true" className="liquid-cursor" /> : null;
}
```

Mount `<LiquidCursor />` directly inside `<body>` after `{children}`. Add CSS for the cyan core, violet blob, white glint, fine-pointer native cursor hiding, and opacity/scale hover state.

- [ ] **Step 4: Run the tests and production checks**

Run: `pnpm test && pnpm lint && pnpm build`

Expected: all tests pass, ESLint exits 0, and Next.js production build succeeds.

- [ ] **Step 5: Verify runtime behaviour**

Run the production server and verify:

```js
await viewport.set({ width: 1440, height: 960 });
// Move the fine pointer over empty space, then a CTA link.
// Confirm .liquid-cursor is present and its interactive state changes.
await viewport.set({ width: 390, height: 844 });
// Confirm .liquid-cursor is absent and scroll width equals viewport width.
```

Expected: desktop cursor is present and expands over controls; mobile cursor is absent; no console errors or overflow.

## Self-Review

- Spec coverage: Task 1 covers the three-layer effect, desktop guards, idle animation policy, root mounting, source-level test, and desktop/mobile runtime verification.
- Placeholder scan: no TODO or deferred implementation items remain.
- Type consistency: `LiquidCursor` is the same named export in the component, layout import, and test.
