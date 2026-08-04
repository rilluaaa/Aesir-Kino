# Scroll-Triggered Metric Count-Up Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Animate each report KPI from zero to its final formatted value when it first enters the viewport.

**Architecture:** A single client-side `CountUpMetric` component will parse the existing metric strings, observe its own visibility, and animate with `requestAnimationFrame`. `FeatureCard` and `ImpactMetricsSection` will render the component in place of raw value text.

**Tech Stack:** React 19, TypeScript, Next.js 15, browser DOM verification, ESLint.

## Global Constraints

- Preserve existing formats, including commas, `%`, and `+`.
- Animate only once and release animation resources after completion.
- Respect `prefers-reduced-motion` by rendering the final value immediately.
- Do not add dependencies or bring back scroll-time GPU effects.

---

### Task 1: Build the reusable count-up metric component

**Files:**
- Create: `components/CountUpMetric.tsx`
- Test: Browser DOM assertion at `http://127.0.0.1:3000/`

**Interfaces:**
- Produces: `CountUpMetric({ value, className, duration, delay })`.
- Consumes: metric strings such as `"98,000+"`, `"87%+"`, and `"79"`.

- [x] **Step 1: Write the failing browser assertion**

Run a browser evaluation that asserts `document.querySelectorAll("[data-count-up-metric]").length === 11`.

- [x] **Step 2: Confirm the assertion fails before the component exists**

Expected: the selector count is `0` because raw metric text has no count-up marker.

- [x] **Step 3: Implement the client component**

Create a component that uses `IntersectionObserver`, `requestAnimationFrame`, an ease-out interpolation, `Intl.NumberFormat`, and cleanup functions. The rendered metric span must include `data-count-up-metric` and set `aria-label` to the final value.

- [x] **Step 4: Verify the component compiles**

Run: `pnpm lint`

Expected: exit code `0`.

### Task 2: Connect every KPI and verify the scroll behavior

**Files:**
- Modify: `components/FeatureCard.tsx`
- Modify: `components/ImpactMetricsSection.tsx`
- Test: Browser DOM and scroll assertions at `http://127.0.0.1:3000/`

**Interfaces:**
- Consumes: `CountUpMetric` from `components/CountUpMetric.tsx`.
- Produces: 11 marked KPI nodes with the original final metric values.

- [x] **Step 1: Render `CountUpMetric` in the feature cards**

Replace the manual `+` string splitting with `CountUpMetric`, passing the existing `feature.metric` value and current typography classes.

- [x] **Step 2: Render `CountUpMetric` in the impact metric grid**

Replace raw `metric.value` output with `CountUpMetric`, passing a slight index-based delay.

- [x] **Step 3: Confirm the browser assertion now passes**

Assert the selector count is `11`, each node has a final-value `aria-label`, and the document has no horizontal overflow.

- [x] **Step 4: Verify production quality**

Run: `pnpm lint` and `pnpm build`.

Expected: both exit code `0`.

- [x] **Step 5: Verify scroll behavior visually**

Scroll to the feature and impact sections in a desktop browser, then confirm there are no console errors and the final formatted values are rendered after the entrance animation.
