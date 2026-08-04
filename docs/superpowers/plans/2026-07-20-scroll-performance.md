# Scroll Performance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove persistent off-screen WebGL work and reduce compositing cost so the impact report scrolls smoothly while preserving its premium visual language.

**Architecture:** The Hero canvas will be activated only while its section intersects the viewport. The 3D scene will use a lower-cost geometry/material configuration and a capped device-pixel ratio. Glass panels will retain translucent borders and shadows, but use a low-cost solid alpha background instead of universal backdrop blur.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, React Three Fiber, Framer Motion.

## Global Constraints

- Keep the desktop 3D hero and the existing mobile CSS fallback.
- Keep all report content and supplied photos unchanged.
- Preserve `prefers-reduced-motion` behavior.
- Verify desktop and mobile with the local preview before review.

---

### Task 1: Make Hero Rendering Visibility-Aware

**Files:**
- Modify: `components/Hero3DCanvas.tsx`
- Modify: `tailwind.config.js`
- Test: browser check at `http://127.0.0.1:3000/`

**Interfaces:**
- Consumes: the Hero section bounding box through `IntersectionObserver`.
- Produces: an off-screen Hero without a mounted `<canvas>` and lower-cost glass panels throughout the report.

- [ ] **Step 1: Reproduce the failure**

Open the local preview, scroll beyond the Hero section, and inspect `document.querySelectorAll("canvas").length`.

Expected before the fix: `1`, proving WebGL remains mounted after the Hero is no longer visible.

- [ ] **Step 2: Implement the minimum rendering policy**

Use `IntersectionObserver` to mount the desktop canvas only while the Hero container is near the viewport. Cap DPR at `1.35`, reduce TorusKnot segments, and avoid expensive transparent transmission while the report is scrollable.

- [ ] **Step 3: Reduce compositing pressure**

Change `.glass-panel` from universal `backdrop-filter: blur(16px)` to an opaque translucent panel treatment. Keep the Hero badge as the single blurred glass element.

- [ ] **Step 4: Verify the corrected behavior**

On desktop, after scrolling beyond the Hero: canvas count is `0`; after returning to top: canvas count is `1`. On mobile: canvas count remains `0`, no horizontal overflow, and all three fallback labels remain visible.

- [ ] **Step 5: Run quality checks**

Run `pnpm lint` and `pnpm build`; inspect browser console logs for errors.
