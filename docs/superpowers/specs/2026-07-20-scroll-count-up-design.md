# Scroll-Triggered Metric Count-Up

## Goal

Give every report KPI a premium, scroll-triggered count-up animation without reintroducing scroll lag.

## Options Considered

1. Animate every metric continuously while it is on screen. This feels active but consumes rendering time and can be distracting.
2. Animate each metric once as it enters the viewport. This creates a clear presentation moment while keeping work bounded. **Selected.**
3. Animate all metrics on initial page load. This is simple but wastes the effect before the reader reaches most report sections.

## Design

Create a client-side `CountUpMetric` component that accepts the existing display string (for example `"98,000+"`, `"87%+"`, or `"79"`). The component will:

- Parse the first numeric portion and retain the original prefix and suffix.
- Use an `IntersectionObserver` to start once when the metric enters the viewport.
- Advance the number with `requestAnimationFrame` over a short, staggerable duration using an ease-out curve.
- Format integer values with commas and reattach `%` and `+` exactly as supplied.
- Show the final value immediately for users with `prefers-reduced-motion` enabled.
- Cancel pending animation frames and observers on unmount.

`FeatureCard` and `ImpactMetricsSection` will use this shared component. Other numbers embedded in prose, product names, and module identifiers will remain static because they are labels rather than KPIs.

## Acceptance Criteria

- All 11 KPI values in the feature cards and impact metric grid animate only once when scrolled into view.
- `98,000+`, `49,315+`, `87%+`, and plain integers preserve their display format.
- There is no continuous work after the count finishes or the section leaves the viewport.
- Reduced-motion users receive final values without animation.
- Lint and production build pass.
