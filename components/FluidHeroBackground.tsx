"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const MAX_SPLATS = 12;
const ORBIT_START_DELAY = 700;
const ORBIT_SPEED = 0.026;

type Splat = {
  color: THREE.Color;
  force: THREE.Vector2;
  point: THREE.Vector2;
  strength: number;
};

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const simulationShader = `
  precision highp float;

  varying vec2 vUv;
  uniform sampler2D uPrevious;
  uniform vec2 uResolution;
  uniform float uAspect;
  uniform float uDelta;
  uniform float uTime;
  uniform int uSplatCount;
  uniform vec2 uSplatPoint[${MAX_SPLATS}];
  uniform vec2 uSplatForce[${MAX_SPLATS}];
  uniform vec3 uSplatColor[${MAX_SPLATS}];
  uniform float uSplatStrength[${MAX_SPLATS}];

  void main() {
    vec2 centred = vUv - 0.5;
    centred.x *= uAspect;

    float breath = 0.72 + 0.28 * sin(uTime * 0.37);
    vec2 flow = vec2(-centred.y, centred.x) * 0.00055 * breath;
    flow += vec2(
      sin(vUv.y * 18.0 + uTime * 0.73) + cos(vUv.y * 9.0 - uTime * 0.51),
      cos(vUv.x * 17.0 - uTime * 0.67) - sin(vUv.x * 8.0 + uTime * 0.43)
    ) * 0.00042;

    for (int index = 0; index < ${MAX_SPLATS}; index++) {
      if (index < uSplatCount) {
        vec2 offset = vUv - uSplatPoint[index];
        offset.x *= uAspect;
        float distanceSquared = dot(offset, offset);
        float influence = exp(-distanceSquared / 0.032);
        vec2 tangent = vec2(-offset.y, offset.x);
        vec2 directional = normalize(uSplatForce[index] + vec2(0.0001));
        float force = min(length(uSplatForce[index]) * 0.012, 1.0);
        flow += tangent * influence * (0.0028 + force * 0.0045);
        flow += directional * influence * force * 0.0018;
      }
    }

    vec2 sampleUv = clamp(vUv - flow, vec2(0.001), vec2(0.999));
    vec3 colour = texture2D(uPrevious, sampleUv).rgb;
    colour *= pow(0.958, max(uDelta, 0.001) * 60.0);

    for (int index = 0; index < ${MAX_SPLATS}; index++) {
      if (index < uSplatCount) {
        vec2 offset = vUv - uSplatPoint[index];
        offset.x *= uAspect;
        vec2 direction = normalize(uSplatForce[index] + vec2(0.0001));
        offset -= direction * dot(offset, direction) * 0.28;
        float ink = exp(-dot(offset, offset) / 0.0022);
        colour += uSplatColor[index] * ink * uSplatStrength[index];
      }
    }

    gl_FragColor = vec4(min(colour, vec3(8.0)), 1.0);
  }
`;

const displayShader = `
  precision highp float;

  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec2 uTexel;

  void main() {
    vec3 colour = texture2D(uTexture, vUv).rgb;
    vec3 left = texture2D(uTexture, vUv - vec2(uTexel.x, 0.0)).rgb;
    vec3 right = texture2D(uTexture, vUv + vec2(uTexel.x, 0.0)).rgb;
    vec3 top = texture2D(uTexture, vUv + vec2(0.0, uTexel.y)).rgb;
    vec3 bottom = texture2D(uTexture, vUv - vec2(0.0, uTexel.y)).rgb;
    float dx = length(right) - length(left);
    float dy = length(top) - length(bottom);
    vec3 normal = normalize(vec3(dx, dy, max(length(uTexel), 0.001)));
    colour *= clamp(dot(normal, normalize(vec3(-0.25, 0.35, 1.0))) + 0.82, 0.7, 1.16);
    colour = vec3(1.0) - exp(-colour * 1.2);
    float vignette = smoothstep(0.92, 0.18, length(vUv - 0.5));
    colour *= mix(0.68, 1.0, vignette);
    gl_FragColor = vec4(colour, 1.0);
  }
`;

function createColour() {
  return new THREE.Color().setHSL(0.5 + Math.random() * 0.42, 0.95, 0.56);
}

function createRandomSplat(): Splat {
  return {
    color: createColour(),
    force: new THREE.Vector2((Math.random() - 0.5) * 110, (Math.random() - 0.5) * 110),
    point: new THREE.Vector2(Math.random(), Math.random()),
    strength: 1.8 + Math.random() * 1.8
  };
}

export function FluidHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const currentCanvas = canvasRef.current;
    if (!currentCanvas) return;
    const canvasElement: HTMLCanvasElement = currentCanvas;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: false,
        antialias: false,
        canvas: canvasElement,
        powerPreference: "high-performance"
      });
    } catch {
      canvasElement.dataset.fallback = "true";
      return;
    }

    renderer.setClearColor(0x04050c, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const zeroPoints = Array.from({ length: MAX_SPLATS }, () => new THREE.Vector2());
    const zeroForces = Array.from({ length: MAX_SPLATS }, () => new THREE.Vector2());
    const zeroColours = Array.from({ length: MAX_SPLATS }, () => new THREE.Color());
    const zeroStrengths = Array.from({ length: MAX_SPLATS }, () => 0);

    const simulationUniforms = {
      uPrevious: { value: null as THREE.Texture | null },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uAspect: { value: 1 },
      uDelta: { value: 1 / 60 },
      uTime: { value: 0 },
      uSplatCount: { value: 0 },
      uSplatPoint: { value: zeroPoints },
      uSplatForce: { value: zeroForces },
      uSplatColor: { value: zeroColours },
      uSplatStrength: { value: zeroStrengths }
    };
    const simulationMaterial = new THREE.ShaderMaterial({
      fragmentShader: simulationShader,
      uniforms: simulationUniforms,
      vertexShader
    });
    const simulationScene = new THREE.Scene();
    simulationScene.add(new THREE.Mesh(geometry, simulationMaterial));

    const displayUniforms = {
      uTexture: { value: null as THREE.Texture | null },
      uTexel: { value: new THREE.Vector2(1, 1) }
    };
    const displayMaterial = new THREE.ShaderMaterial({
      fragmentShader: displayShader,
      uniforms: displayUniforms,
      vertexShader
    });
    const displayScene = new THREE.Scene();
    displayScene.add(new THREE.Mesh(geometry, displayMaterial));

    const targetOptions: THREE.RenderTargetOptions = {
      depthBuffer: false,
      format: THREE.RGBAFormat,
      magFilter: THREE.LinearFilter,
      minFilter: THREE.LinearFilter,
      stencilBuffer: false,
      type: THREE.HalfFloatType,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping
    };

    let readTarget = new THREE.WebGLRenderTarget(2, 2, targetOptions);
    let writeTarget = new THREE.WebGLRenderTarget(2, 2, targetOptions);
    let frameHandle = 0;
    let isVisible = true;
    let isDestroyed = false;
    let canvasWidth = 1;
    let canvasHeight = 1;
    let lastFrameTime = performance.now();
    const startedAt = lastFrameTime;
    let orbitAngle = 0;
    let previousOrbit = new THREE.Vector2(0.5, 0.5);
    let orbitSeeded = false;
    let reducedMotionFrames = 100;
    const splatQueue: Splat[] = [];

    for (let index = 0; index < 34; index += 1) splatQueue.push(createRandomSplat());
    for (let wave = 0; wave < 8; wave += 1) {
      const waveSize = 10 + Math.floor(Math.random() * 10);
      for (let index = 0; index < waveSize; index += 1) splatQueue.push(createRandomSplat());
    }

    function clearTargets() {
      const previousColour = renderer.getClearColor(new THREE.Color());
      const previousAlpha = renderer.getClearAlpha();
      renderer.setClearColor(0x04050c, 1);
      renderer.setRenderTarget(readTarget);
      renderer.clear();
      renderer.setRenderTarget(writeTarget);
      renderer.clear();
      renderer.setRenderTarget(null);
      renderer.setClearColor(previousColour, previousAlpha);
    }

    function resize() {
      const rect = canvasElement.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));
      if (width === canvasWidth && height === canvasHeight) return;

      canvasWidth = width;
      canvasHeight = height;
      renderer.setSize(width, height, false);

      const aspect = width / height;
      const baseResolution = width < 640 ? 320 : 512;
      const targetWidth = aspect >= 1 ? Math.round(baseResolution * aspect) : baseResolution;
      const targetHeight = aspect >= 1 ? baseResolution : Math.round(baseResolution / aspect);

      if (readTarget.width !== targetWidth || readTarget.height !== targetHeight) {
        readTarget.dispose();
        writeTarget.dispose();
        readTarget = new THREE.WebGLRenderTarget(targetWidth, targetHeight, targetOptions);
        writeTarget = new THREE.WebGLRenderTarget(targetWidth, targetHeight, targetOptions);
        simulationUniforms.uResolution.value.set(targetWidth, targetHeight);
        simulationUniforms.uAspect.value = aspect;
        displayUniforms.uTexel.value.set(1 / targetWidth, 1 / targetHeight);
        clearTargets();
      }
    }

    function queuePointerSplat(clientX: number, clientY: number, movementX: number, movementY: number) {
      const rect = canvasElement.getBoundingClientRect();
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        return;
      }

      splatQueue.push({
        color: createColour(),
        force: new THREE.Vector2(movementX * 5, -movementY * 5),
        point: new THREE.Vector2(
          (clientX - rect.left) / rect.width,
          1 - (clientY - rect.top) / rect.height
        ),
        strength: 2.2
      });

      if (reducedMotion) {
        reducedMotionFrames = 24;
        scheduleFrame();
      }
    }

    let previousTouch: { x: number; y: number } | null = null;
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      queuePointerSplat(event.clientX, event.clientY, event.movementX, event.movementY);
    };
    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) previousTouch = { x: touch.clientX, y: touch.clientY };
    };
    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch || !previousTouch) return;
      queuePointerSplat(
        touch.clientX,
        touch.clientY,
        (touch.clientX - previousTouch.x) * 1.6,
        (touch.clientY - previousTouch.y) * 1.6
      );
      previousTouch = { x: touch.clientX, y: touch.clientY };
    };
    const handleTouchEnd = () => {
      previousTouch = null;
    };

    function addOrbitSplat(now: number) {
      if (reducedMotion || now - startedAt < ORBIT_START_DELAY) return;

      const radiusPixels = Math.min(300, canvasWidth * 0.35, canvasHeight * 0.35);
      const radiusX = radiusPixels / canvasWidth;
      const radiusY = radiusPixels / canvasHeight;
      const breathing = 0.72 + 0.28 * Math.sin(orbitAngle * 0.37);
      orbitAngle += ORBIT_SPEED;
      const point = new THREE.Vector2(
        0.5 + Math.cos(orbitAngle) * radiusX * breathing,
        0.5 + Math.sin(orbitAngle) * radiusY * breathing
      );

      if (!orbitSeeded) {
        orbitSeeded = true;
        previousOrbit = point;
        return;
      }

      const force = point.clone().sub(previousOrbit).multiplyScalar(1200);
      previousOrbit = point;
      splatQueue.push({ color: createColour(), force, point, strength: 1.35 });
    }

    function scheduleFrame() {
      if (!frameHandle && !isDestroyed && isVisible && !document.hidden) {
        frameHandle = requestAnimationFrame(renderFrame);
      }
    }

    function renderFrame(now: number) {
      frameHandle = 0;
      if (isDestroyed || !isVisible || document.hidden) return;

      resize();
      addOrbitSplat(now);
      const splats = splatQueue.splice(0, MAX_SPLATS);
      const delta = Math.min((now - lastFrameTime) / 1000, 0.034);
      lastFrameTime = now;

      simulationUniforms.uPrevious.value = readTarget.texture;
      simulationUniforms.uDelta.value = Math.max(delta, 1 / 120);
      simulationUniforms.uTime.value = (now - startedAt) / 1000;
      simulationUniforms.uSplatCount.value = splats.length;

      for (let index = 0; index < MAX_SPLATS; index += 1) {
        const splat = splats[index];
        if (splat) {
          zeroPoints[index].copy(splat.point);
          zeroForces[index].copy(splat.force);
          zeroColours[index].copy(splat.color);
          zeroStrengths[index] = splat.strength;
        } else {
          zeroPoints[index].set(0, 0);
          zeroForces[index].set(0, 0);
          zeroColours[index].setRGB(0, 0, 0);
          zeroStrengths[index] = 0;
        }
      }

      renderer.setRenderTarget(writeTarget);
      renderer.render(simulationScene, camera);
      displayUniforms.uTexture.value = writeTarget.texture;
      renderer.setRenderTarget(null);
      renderer.render(displayScene, camera);

      const previousTarget = readTarget;
      readTarget = writeTarget;
      writeTarget = previousTarget;

      if (!reducedMotion || reducedMotionFrames > 0) {
        if (reducedMotion) reducedMotionFrames -= 1;
        scheduleFrame();
      }
    }

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          lastFrameTime = performance.now();
          scheduleFrame();
        }
      },
      { threshold: 0.01 }
    );
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        lastFrameTime = performance.now();
        scheduleFrame();
      }
    };

    visibilityObserver.observe(canvasElement);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    resize();
    clearTargets();
    scheduleFrame();

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(frameHandle);
      visibilityObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      readTarget.dispose();
      writeTarget.dispose();
      simulationMaterial.dispose();
      displayMaterial.dispose();
      geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      aria-hidden="true"
      className="hero-fluid-canvas pointer-events-none absolute inset-0 z-0 h-full w-full"
      data-fluid-background="true"
      ref={canvasRef}
    />
  );
}
