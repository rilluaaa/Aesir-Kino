"use client";

import { useEffect, useRef, useState } from "react";

const interactiveSelector =
  "a, button, input, textarea, select, [role='button'], [data-liquid-cursor-interactive]";

type CursorPoint = {
  x: number;
  y: number;
};

export function LiquidCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLSpanElement>(null);
  const trailOneRef = useRef<HTMLSpanElement>(null);
  const trailTwoRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrowViewport = window.matchMedia("(max-width: 768px)");
    const sync = () => {
      setIsEnabled(
        finePointer.matches && !reducedMotion.matches && !narrowViewport.matches
      );
    };

    sync();
    finePointer.addEventListener("change", sync);
    reducedMotion.addEventListener("change", sync);
    narrowViewport.addEventListener("change", sync);

    return () => {
      finePointer.removeEventListener("change", sync);
      reducedMotion.removeEventListener("change", sync);
      narrowViewport.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("liquid-cursor-enabled", isEnabled);

    return () => {
      document.documentElement.classList.remove("liquid-cursor-enabled");
    };
  }, [isEnabled]);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const cursor = cursorRef.current;
    const blob = blobRef.current;
    const trailOne = trailOneRef.current;
    const trailTwo = trailTwoRef.current;

    if (!cursor || !blob || !trailOne || !trailTwo) {
      return;
    }

    const target: CursorPoint = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const blobPoint: CursorPoint = { ...target };
    const tailOnePoint: CursorPoint = { ...target };
    const tailTwoPoint: CursorPoint = { ...target };
    let frameId: number | null = null;
    let lastPointerMoveAt = 0;

    const setLayerPosition = (
      layer: HTMLSpanElement,
      point: CursorPoint,
    ) => {
      layer.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%) scale(var(--liquid-scale, 1))`;
    };

    const setTrailPosition = (
      layer: HTMLSpanElement,
      lead: CursorPoint,
      tail: CursorPoint
    ) => {
      const deltaX = lead.x - tail.x;
      const deltaY = lead.y - tail.y;
      const distance = Math.hypot(deltaX, deltaY);
      const angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;
      const stretch = Math.min(4.5, Math.max(1, distance / 44));
      const centerX = (lead.x + tail.x) / 2;
      const centerY = (lead.y + tail.y) / 2;

      layer.style.transform = `translate3d(${centerX}px, ${centerY}px, 0) translate(-50%, -50%) rotate(${angle}deg) scaleX(${stretch}) scale(var(--liquid-scale, 1))`;
    };

    const render = () => {
      blobPoint.x += (target.x - blobPoint.x) * 0.26;
      blobPoint.y += (target.y - blobPoint.y) * 0.26;
      tailOnePoint.x += (target.x - tailOnePoint.x) * 0.11;
      tailOnePoint.y += (target.y - tailOnePoint.y) * 0.11;
      tailTwoPoint.x += (target.x - tailTwoPoint.x) * 0.065;
      tailTwoPoint.y += (target.y - tailTwoPoint.y) * 0.065;

      setLayerPosition(blob, blobPoint);
      setTrailPosition(trailOne, blobPoint, tailOnePoint);
      setTrailPosition(trailTwo, tailOnePoint, tailTwoPoint);

      const distance = Math.max(
        Math.hypot(target.x - blobPoint.x, target.y - blobPoint.y),
        Math.hypot(target.x - tailOnePoint.x, target.y - tailOnePoint.y),
        Math.hypot(target.x - tailTwoPoint.x, target.y - tailTwoPoint.y)
      );
      const isPointerMoving = Date.now() - lastPointerMoveAt < 90;
      if (isPointerMoving || distance > 0.35) {
        frameId = window.requestAnimationFrame(render);
      } else {
        frameId = null;
      }
    };

    const requestRender = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") {
        return;
      }

      target.x = event.clientX;
      target.y = event.clientY;
      lastPointerMoveAt = Date.now();
      cursor.classList.add("is-visible");
      const targetElement = event.target instanceof Element ? event.target : null;
      cursor.classList.toggle(
        "is-interactive",
        Boolean(targetElement?.closest(interactiveSelector))
      );
      requestRender();
    };

    const hideCursor = () => {
      cursor.classList.remove("is-visible", "is-interactive");
      requestRender();
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) {
        hideCursor();
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", hideCursor);
    document.addEventListener("pointerout", handlePointerOut);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", hideCursor);
      document.removeEventListener("pointerout", handlePointerOut);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div aria-hidden="true" className="liquid-cursor" ref={cursorRef}>
      <span className="liquid-cursor__trail liquid-cursor__trail--far" ref={trailTwoRef} />
      <span className="liquid-cursor__trail liquid-cursor__trail--near" ref={trailOneRef} />
      <span className="liquid-cursor__blob" ref={blobRef} />
    </div>
  );
}
