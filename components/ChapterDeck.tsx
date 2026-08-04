"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type TargetAndTransition,
  type Transition
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type TouchEvent,
  type UIEvent,
  type WheelEvent as ReactWheelEvent
} from "react";

export type ChapterTransition =
  | "dissolve"
  | "ripple"
  | "warp"
  | "elastic"
  | "cube"
  | "lens"
  | "sweep"
  | "resolve"
  | "cube-rebuild"
  | "compress-rotate"
  | "elastic-slide"
  | "flip-slide"
  | "monochrome-glitch"
  | "zoom-blur";

export type Chapter = {
  id: string;
  label: string;
  transition: ChapterTransition;
  content: ReactNode;
};

type ChapterDeckProps = {
  chapters: Chapter[];
};

type ChapterPose = {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
  transition: Transition;
};

const wheelThreshold = 18;
const transitionLockMs = 620;
const minimumReadableScrollDistance = 64;
const edgePauseMs = 380;
const wheelLineHeight = 18;

function ChapterTransitionFx({ effect, reducedMotion }: { effect: ChapterTransition; reducedMotion: boolean | null }) {
  if (reducedMotion) {
    return null;
  }

  if (effect === "cube-rebuild") {
    return (
      <div aria-hidden="true" className="chapter-deck__fx-cube">
        {Array.from({ length: 9 }, (_, index) => <span key={index} />)}
      </div>
    );
  }

  if (effect === "monochrome-glitch") {
    return (
      <div aria-hidden="true" className="chapter-deck__fx-monochrome">
        {Array.from({ length: 15 }, (_, index) => (
          <span key={index} style={{ "--tile-index": index } as React.CSSProperties} />
        ))}
      </div>
    );
  }

  return null;
}

function surfaceCanContinueReading(
  surface: HTMLDivElement | null,
  delta: number
) {
  if (!surface || surface.scrollHeight - surface.clientHeight < minimumReadableScrollDistance) {
    return false;
  }

  if (delta > 0) {
    return surface.scrollTop + surface.clientHeight < surface.scrollHeight - 2;
  }

  return surface.scrollTop > 2;
}

function normalizeWheelDelta(event: WheelEvent) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    return event.deltaY * wheelLineHeight;
  }

  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    return event.deltaY * window.innerHeight;
  }

  return event.deltaY;
}

function getChapterPose(
  effect: ChapterTransition,
  direction: number,
  reducedMotion: boolean | null
): ChapterPose {
  const travel = direction >= 0 ? 1 : -1;
  const standard: Transition = {
    duration: reducedMotion ? 0.18 : 0.58,
    ease: [0.22, 1, 0.36, 1] as const
  };
  const fade: ChapterPose = {
    initial: { opacity: 0, y: 34 * travel, filter: "blur(12px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -22 * travel, filter: "blur(10px)" },
    transition: standard
  };

  if (reducedMotion) {
    return fade;
  }

  switch (effect) {
    case "ripple":
      return {
        initial: { opacity: 0, scale: 0.84, clipPath: "circle(0% at 50% 50%)", filter: "blur(8px)" },
        animate: { opacity: 1, scale: 1, clipPath: "circle(150% at 50% 50%)", filter: "blur(0px)" },
        exit: { opacity: 0, scale: 1.08, clipPath: "circle(0% at 50% 50%)", filter: "blur(10px)" },
        transition: { duration: 0.74, ease: [0.2, 0.85, 0.2, 1] as const }
      };
    case "warp":
      return {
        initial: { opacity: 0, x: 128 * travel, scaleX: 1.22, skewX: -5 * travel, filter: "blur(18px)" },
        animate: { opacity: 1, x: 0, scaleX: 1, skewX: 0, filter: "blur(0px)" },
        exit: { opacity: 0, x: -96 * travel, scaleX: 0.82, skewX: 4 * travel, filter: "blur(16px)" },
        transition: { duration: 0.66, ease: [0.16, 0.86, 0.24, 1] as const }
      };
    case "elastic":
      return {
        initial: { opacity: 0, y: 92 * travel, scale: 0.9, filter: "blur(12px)" },
        animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
        exit: { opacity: 0, y: -62 * travel, scale: 0.96, filter: "blur(10px)" },
        transition: { type: "spring", stiffness: 155, damping: 19, mass: 0.82 }
      };
    case "cube":
      return {
        initial: { opacity: 0, rotateY: 82 * travel, rotateX: -4 * travel, scale: 0.88, z: -180, filter: "blur(10px)" },
        animate: { opacity: 1, rotateY: 0, rotateX: 0, scale: 1, z: 0, filter: "blur(0px)" },
        exit: { opacity: 0, rotateY: -74 * travel, rotateX: 4 * travel, scale: 0.9, z: -150, filter: "blur(12px)" },
        transition: { duration: 0.7, ease: [0.18, 0.82, 0.18, 1] as const }
      };
    case "lens":
      return {
        initial: { opacity: 0, scale: 1.15, filter: "blur(22px) saturate(1.7)" },
        animate: { opacity: 1, scale: 1, filter: "blur(0px) saturate(1)" },
        exit: { opacity: 0, scale: 0.94, filter: "blur(14px) saturate(1.4)" },
        transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] as const }
      };
    case "sweep":
      return {
        initial: { opacity: 0, clipPath: travel > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)", filter: "blur(8px)" },
        animate: { opacity: 1, clipPath: "inset(0 0% 0 0)", filter: "blur(0px)" },
        exit: { opacity: 0, clipPath: travel > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)", filter: "blur(8px)" },
        transition: { duration: 0.56, ease: [0.34, 1, 0.64, 1] as const }
      };
    case "resolve":
      return {
        initial: { opacity: 0, scale: 0.96, y: 26 * travel, filter: "blur(18px) brightness(1.8)" },
        animate: { opacity: 1, scale: 1, y: 0, filter: "blur(0px) brightness(1)" },
        exit: { opacity: 0, scale: 1.03, y: -20 * travel, filter: "blur(12px) brightness(1.4)" },
        transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] as const }
      };
    case "cube-rebuild":
      return {
        initial: { opacity: 0, scale: 0.72, rotateY: 92 * travel, rotateX: -12 * travel, z: -240, filter: "blur(16px) brightness(1.6)" },
        animate: { opacity: 1, scale: 1, rotateY: 0, rotateX: 0, z: 0, filter: "blur(0px) brightness(1)" },
        exit: { opacity: 0, scale: 0.82, rotateY: -74 * travel, rotateX: 9 * travel, z: -180, filter: "blur(14px) brightness(1.5)" },
        transition: { duration: 0.78, ease: [0.16, 0.86, 0.18, 1] as const }
      };
    case "compress-rotate":
      return {
        initial: { opacity: 0, scaleX: 0.14, scaleY: 1.28, rotate: 16 * travel, rotateZ: 16 * travel, filter: "blur(18px) contrast(1.45)" },
        animate: { opacity: 1, scaleX: 1, scaleY: 1, rotate: 0, rotateZ: 0, filter: "blur(0px) contrast(1)" },
        exit: { opacity: 0, scaleX: 0.2, scaleY: 1.18, rotate: -12 * travel, rotateZ: -12 * travel, filter: "blur(14px) contrast(1.3)" },
        transition: { duration: 0.68, ease: [0.22, 0.82, 0.18, 1] as const }
      };
    case "elastic-slide":
      return {
        initial: { opacity: 0, x: 150 * travel, scale: 0.9, filter: "blur(14px)" },
        animate: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" },
        exit: { opacity: 0, x: -110 * travel, scale: 0.95, filter: "blur(10px)" },
        transition: { type: "spring", stiffness: 240, damping: 18, mass: 0.72 }
      };
    case "flip-slide":
      return {
        initial: { opacity: 0, x: 108 * travel, rotateY: -86 * travel, rotateX: 7 * travel, z: -120, filter: "blur(10px)" },
        animate: { opacity: 1, x: 0, rotateY: 0, rotateX: 0, z: 0, filter: "blur(0px)" },
        exit: { opacity: 0, x: -84 * travel, rotateY: 72 * travel, rotateX: -5 * travel, z: -100, filter: "blur(10px)" },
        transition: { duration: 0.7, ease: [0.16, 0.88, 0.2, 1] as const }
      };
    case "monochrome-glitch":
      return {
        initial: { opacity: 0, scale: 1.07, filter: "grayscale(1) contrast(2.6) brightness(2.2) blur(6px)" },
        animate: { opacity: 1, scale: 1, filter: "grayscale(0) contrast(1) brightness(1) blur(0px)" },
        exit: { opacity: 0, scale: 0.96, filter: "grayscale(1) contrast(2.2) brightness(0.4) blur(8px)" },
        transition: { duration: 0.64, ease: [0.3, 0, 0.2, 1] as const }
      };
    case "zoom-blur":
      return {
        initial: { opacity: 0, scale: 1.48, y: 40 * travel, filter: "blur(32px) saturate(1.9) brightness(1.7)" },
        animate: { opacity: 1, scale: 1, y: 0, filter: "blur(0px) saturate(1) brightness(1)" },
        exit: { opacity: 0, scale: 0.8, y: -28 * travel, filter: "blur(24px) saturate(1.6) brightness(1.5)" },
        transition: { duration: 0.72, ease: [0.18, 0.8, 0.18, 1] as const }
      };
    case "dissolve":
    default:
      return fade;
  }
}

export function ChapterDeck({ chapters }: ChapterDeckProps) {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const activeSurfaceRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const wheelDeltaRef = useRef(0);
  const transitionLockRef = useRef(0);
  const edgeReachedAtRef = useRef(0);
  const touchStartRef = useRef<number | null>(null);

  const activateChapter = useCallback(
    (nextIndex: number) => {
      const boundedIndex = Math.max(0, Math.min(nextIndex, chapters.length - 1));
      const currentIndex = activeIndexRef.current;

      if (boundedIndex === currentIndex || Date.now() < transitionLockRef.current) {
        return;
      }

      transitionLockRef.current = Date.now() + transitionLockMs;
      wheelDeltaRef.current = 0;
      edgeReachedAtRef.current = 0;
      setDirection(boundedIndex > currentIndex ? 1 : -1);
      activeIndexRef.current = boundedIndex;
      setActiveIndex(boundedIndex);
    },
    [chapters.length]
  );

  useEffect(() => {
    document.documentElement.classList.add("chapter-deck-enabled");
    document.body.classList.add("chapter-deck-enabled");

    return () => {
      document.documentElement.classList.remove("chapter-deck-enabled");
      document.body.classList.remove("chapter-deck-enabled");
    };
  }, []);

  useEffect(() => {
    if (activeSurfaceRef.current) {
      activeSurfaceRef.current.scrollTop = 0;
    }
  }, [activeIndex]);

  const handleSurfaceScroll = (event: UIEvent<HTMLDivElement>) => {
    const surface = event.currentTarget;

    if (surface.scrollTop <= 2 || surface.scrollTop + surface.clientHeight >= surface.scrollHeight - 2) {
      edgeReachedAtRef.current = Date.now();
      wheelDeltaRef.current = 0;
      return;
    }

    edgeReachedAtRef.current = 0;
  };

  const handleSurfaceWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    const surface = event.currentTarget;
    const wheelDelta = normalizeWheelDelta(event.nativeEvent);

    if (Math.abs(wheelDelta) < 0.5) {
      wheelDeltaRef.current = 0;
      return;
    }

    if (surfaceCanContinueReading(surface, wheelDelta)) {
      wheelDeltaRef.current = 0;
      return;
    }

    event.preventDefault();
    const now = Date.now();
    if (now < transitionLockRef.current) {
      return;
    }

    if (!edgeReachedAtRef.current) {
      edgeReachedAtRef.current = now;
      wheelDeltaRef.current = 0;
      return;
    }

    if (now - edgeReachedAtRef.current < edgePauseMs) {
      wheelDeltaRef.current = 0;
      return;
    }

    wheelDeltaRef.current += wheelDelta;
    if (Math.abs(wheelDeltaRef.current) >= wheelThreshold) {
      activateChapter(activeIndexRef.current + (wheelDeltaRef.current > 0 ? 1 : -1));
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, [contenteditable='true']")) {
        return;
      }

      const isNext = event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ";
      const isPrevious = event.key === "ArrowUp" || event.key === "PageUp";
      if (!isNext && !isPrevious) {
        return;
      }

      event.preventDefault();
      activateChapter(activeIndexRef.current + (isNext ? 1 : -1));
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activateChapter]);

  const activeChapter = chapters[activeIndex];
  const pose = getChapterPose(activeChapter.transition, direction, reducedMotion);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartRef.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const startY = touchStartRef.current;
    const endY = event.changedTouches[0]?.clientY;
    touchStartRef.current = null;

    if (startY === null || endY === undefined) {
      return;
    }

    const delta = startY - endY;
    const canContinueReading = surfaceCanContinueReading(activeSurfaceRef.current, delta);

    if (Math.abs(delta) > 56 && !canContinueReading) {
      activateChapter(activeIndexRef.current + (delta > 0 ? 1 : -1));
    }
  };

  return (
    <main className="chapter-deck" onTouchEnd={handleTouchEnd} onTouchStart={handleTouchStart}>
      <div className="chapter-deck__status" aria-live="polite">
        <span>{String(activeIndex + 1).padStart(2, "0")}</span>
        <span className="chapter-deck__status-line" />
        <span>{activeChapter.label}</span>
      </div>

      <nav aria-label="Impact report chapters" className="chapter-deck__nav">
        {chapters.map((chapter, index) => (
          <button
            aria-current={index === activeIndex ? "page" : undefined}
            aria-label={`Go to ${chapter.label}`}
            className={index === activeIndex ? "is-active" : undefined}
            key={chapter.id}
            onClick={() => activateChapter(index)}
            type="button"
          />
        ))}
      </nav>

      <div className="chapter-deck__stage">
        <AnimatePresence initial={false} mode="sync">
          <motion.article
            animate={pose.animate}
            className={`chapter-deck__page chapter-deck__page--${activeChapter.transition}`}
            exit={pose.exit}
            initial={pose.initial}
            key={activeChapter.id}
            style={{ transformStyle: "preserve-3d" }}
            transition={pose.transition}
          >
            <ChapterTransitionFx effect={activeChapter.transition} reducedMotion={reducedMotion} />
            <div
              className="chapter-deck__scroll-surface"
              onScroll={handleSurfaceScroll}
              onWheelCapture={handleSurfaceWheel}
              ref={activeSurfaceRef}
            >
              <div className="chapter-deck__content">
                {activeChapter.content}
                <div aria-hidden="true" className="chapter-deck__scroll-runway" />
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </main>
  );
}
