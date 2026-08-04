"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { AdaptiveDpr, Preload } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import type { Mesh, MeshPhysicalMaterial, TorusKnotGeometry } from "three";
import { TorusKnotGeometry as ThreeTorusKnotGeometry } from "three";

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-12 w-12 rounded-full border border-accent-neon-cyan/30 border-t-accent-neon-cyan shadow-neon-cyan" />
    </div>
  );
}

function useIsMobileViewport() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 768px)");
    const syncViewport = () => setIsMobile(query.matches);

    syncViewport();
    query.addEventListener("change", syncViewport);

    return () => query.removeEventListener("change", syncViewport);
  }, []);

  return isMobile;
}

function useHeroVisibility() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "30% 0px" }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return { containerRef, isVisible };
}

type FloatingGlassKnotProps = {
  readonly scrollRotationX: MotionValue<number>;
  readonly scrollRotationY: MotionValue<number>;
};

function FloatingGlassKnot({
  scrollRotationX,
  scrollRotationY
}: FloatingGlassKnotProps) {
  const meshRef = useRef<Mesh<TorusKnotGeometry, MeshPhysicalMaterial>>(null);
  const { viewport } = useThree();
  const geometry = useMemo(
    () => new ThreeTorusKnotGeometry(1.05, 0.28, 128, 24, 2, 3),
    []
  );
  const isCompact = viewport.width < 5;
  const sceneScale = isCompact ? 0.58 : 0.78;
  const scenePosition: [number, number, number] = isCompact
    ? [0.05, -0.24, -0.35]
    : [1.08, 0.03, -0.25];

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;

    if (!mesh) {
      return;
    }

    const elapsed = clock.getElapsedTime();
    mesh.rotation.x =
      0.48 + scrollRotationX.get() + Math.sin(elapsed * 0.38) * 0.12;
    mesh.rotation.y = scrollRotationY.get() + elapsed * 0.22;
    mesh.rotation.z = Math.sin(elapsed * 0.24) * 0.08;
    mesh.position.y = Math.sin(elapsed * 0.72) * 0.14;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={scenePosition}
      scale={sceneScale}
    >
      <meshPhysicalMaterial
        color="#DDFBFF"
        roughness={0.28}
        clearcoat={0.85}
        transparent
        opacity={0.58}
        metalness={0.08}
        envMapIntensity={1.2}
      />
    </mesh>
  );
}

type HeroSceneProps = {
  readonly scrollRotationX: MotionValue<number>;
  readonly scrollRotationY: MotionValue<number>;
};

function HeroScene({ scrollRotationX, scrollRotationY }: HeroSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 36 }}
      dpr={[1, 1.35]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
      }}
    >
      <ambientLight intensity={0.2} />
      <directionalLight
        color="#00F2FE"
        intensity={3.1}
        position={[5, 5, 5]}
      />
      <directionalLight
        color="#8A2BE2"
        intensity={2.65}
        position={[-5, -5, -5]}
      />
      <pointLight color="#FFFFFF" intensity={0.85} position={[0, 1.5, 3.5]} />
      <FloatingGlassKnot
        scrollRotationX={scrollRotationX}
        scrollRotationY={scrollRotationY}
      />
      <AdaptiveDpr pixelated />
      <Preload all />
    </Canvas>
  );
}

function MobileHeroFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden md:hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_26%,rgba(0,242,254,0.22),transparent_34%),radial-gradient(circle_at_75%_62%,rgba(138,43,226,0.24),transparent_38%),linear-gradient(180deg,rgba(13,13,17,0)_0%,rgba(7,8,11,0.86)_100%)]" />
      <div className="grid-overlay absolute inset-0 opacity-35" />
      <div className="absolute left-1/2 top-[42%] h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-neon-cyan/18 shadow-neon-cyan" />
      <div className="absolute left-[58%] top-[45%] h-[15rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-neon-purple/20 shadow-neon-purple" />
      <div className="mobile-orbit-label left-[7%] top-[9%]">SEN SIGNAL</div>
      <div className="mobile-orbit-label right-[5%] top-[22%] delay-300">
        DATA LOOP
      </div>
      <div className="mobile-orbit-label bottom-[8%] left-[8%] delay-700">
        CARE OS
      </div>
    </div>
  );
}

function DesktopHero3DLayer() {
  const { scrollYProgress } = useScroll();
  const scrollRotationX = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);
  const scrollRotationY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="absolute inset-0 opacity-75">
        <HeroScene
          scrollRotationX={scrollRotationX}
          scrollRotationY={scrollRotationY}
        />
      </div>
    </Suspense>
  );
}

export function Hero3DCanvas() {
  const isMobile = useIsMobileViewport();
  const { containerRef, isVisible } = useHeroVisibility();

  return (
    <div
      aria-hidden="true"
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-hero-radial"
    >
      <div className="grid-overlay absolute inset-0 opacity-50" />
      <div className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-neon-cyan/15 shadow-neon-cyan" />
      <div className="absolute left-[54%] top-[48%] h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-neon-purple/20 shadow-neon-purple" />
      <div className="absolute left-[18%] top-[24%] h-32 w-32 rounded-full bg-accent-neon-cyan/20 blur-3xl" />
      <div className="absolute bottom-[16%] right-[18%] h-40 w-40 rounded-full bg-accent-neon-purple/20 blur-3xl" />
      {isMobile === false && isVisible ? <DesktopHero3DLayer /> : null}
      {isMobile === true ? <MobileHeroFallback /> : null}
    </div>
  );
}
