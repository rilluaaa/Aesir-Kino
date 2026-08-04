# Liquid Cursor Design

## Objective

Add a desktop-only liquid cursor effect that matches the AESIR impact report's
cyan and violet visual system without degrading long-page scroll performance.

## Interaction Model

- Render a fixed, pointer-events-none cursor layer above the application.
- Replace the native cursor only when the device reports a fine pointer and
  hover capability.
- Use a cyan core, a violet trailing blob, and a restrained white highlight.
- Expand the liquid shape when the pointer is over links, buttons, or controls.
- Fade out when the pointer leaves the viewport and fade back in on entry.

## Performance and Accessibility

- Do not mount the component on touch-first or narrow viewports.
- Do not mount it when reduced motion is requested.
- Use one requestAnimationFrame loop only while the pointer is moving or the
  trailing positions are still converging; stop the loop when idle.
- Update only CSS transforms and opacity. Do not use Canvas, filters that force
  backdrop sampling, or scroll listeners.
- Keep native cursor behaviour for touch devices and assistive-motion settings.

## Component Boundary

- `LiquidCursor` is a client component mounted once in the root layout.
- It owns pointer listeners, interactive-target detection, and animation-loop
  cleanup.
- Global CSS provides the fine-pointer cursor hiding rule and the visual
  presentation of the three liquid layers.

## Validation

- A source-level test confirms the component is mounted in the application and
  contains reduced-motion and fine-pointer guards.
- Run the existing test suite, ESLint, and production build.
- Verify desktop rendering, hover expansion, page-end scroll, and absence of
  horizontal overflow or console errors.
- Verify that the component is absent on a 390px viewport and that the native
  mobile experience remains unchanged.
