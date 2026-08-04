"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type CountUpMetricProps = {
  readonly value: string;
  readonly className?: string;
  readonly duration?: number;
  readonly delay?: number;
};

type ParsedMetric = {
  readonly prefix: string;
  readonly target: number;
  readonly suffix: string;
};

function parseMetric(value: string): ParsedMetric | null {
  const match = value.match(/^(\D*)(\d[\d,]*)(.*)$/);

  if (!match) {
    return null;
  }

  const target = Number(match[2].replaceAll(",", ""));

  if (!Number.isFinite(target)) {
    return null;
  }

  return { prefix: match[1], target, suffix: match[3] };
}

function formatMetric(metric: ParsedMetric, amount: number): string {
  return `${metric.prefix}${new Intl.NumberFormat("en-US").format(amount)}${metric.suffix}`;
}

export function CountUpMetric({
  value,
  className,
  duration = 1100,
  delay = 0
}: CountUpMetricProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasStartedRef = useRef(false);
  const metric = useMemo(() => parseMetric(value), [value]);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || !metric) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      setDisplayValue(metric.target);
      return;
    }

    let animationFrame: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasStartedRef.current) {
          return;
        }

        hasStartedRef.current = true;
        observer.disconnect();
        const startTime = performance.now() + delay;

        const animate = (timestamp: number) => {
          if (timestamp < startTime) {
            animationFrame = window.requestAnimationFrame(animate);
            return;
          }

          const progress = Math.min((timestamp - startTime) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 4);
          setDisplayValue(Math.round(metric.target * easedProgress));

          if (progress < 1) {
            animationFrame = window.requestAnimationFrame(animate);
          }
        };

        animationFrame = window.requestAnimationFrame(animate);
      },
      { threshold: 0.38 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();

      if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [delay, duration, metric]);

  if (!metric) {
    return <span className={className}>{value}</span>;
  }

  const isComplete = displayValue === metric.target;

  return (
    <span
      aria-label={value}
      className={className}
      data-count-up-complete={isComplete ? "true" : "false"}
      data-count-up-metric
      ref={containerRef}
    >
      {formatMetric(metric, displayValue)}
    </span>
  );
}
