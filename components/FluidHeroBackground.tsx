"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const MAX_SPLATS = 16;
const CLOUD_COUNT = 2;
const CLOUD_LOBE_COUNT = 6;
const CLOUD_PHASE_OFFSET = Math.PI;
const CLOUD_ORBIT_SPEED = 0.014;

type Splat = {
  color: THREE.Color;
  force: THREE.Vector2;
  point: THREE.Vector2;
  radius: number;
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
  uniform float uSplatRadius[${MAX_SPLATS}];
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
        float radius = max(uSplatRadius[index], 0.0001);
        float influence = exp(-distanceSquared / (radius * 7.5));
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
        vec2 turbulentOffset = offset + vec2(
          sin(offset.y * 118.0 + uTime * 0.72 + float(index) * 1.7),
          cos(offset.x * 106.0 - uTime * 0.58 + float(index) * 1.3)
        ) * 0.0068;
        float edgeRipple =
          0.74 +
          0.2 * sin(
            (turbulentOffset.x + turbulentOffset.y) * 146.0 +
            uTime * 0.64 +
            float(index) * 2.1
          ) +
          0.12 * sin(turbulentOffset.x * 232.0 - turbulentOffset.y * 174.0);
        float ink = exp(
          -dot(turbulentOffset, turbulentOffset) /
          max(uSplatRadius[index] * edgeRipple, 0.0001)
        );
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
    colour = vec3(1.0) - exp(-colour * 0.82);
    float luminance = dot(colour, vec3(0.2126, 0.7152, 0.0722));
    colour = clamp(mix(vec3(luminance), colour, 1.34), 0.0, 1.0);
    colour = pow(colour, vec3(0.9));
    float vignette = smoothstep(0.92, 0.18, length(vUv - 0.5));
    colour *= mix(0.68, 1.0, vignette);
    gl_FragColor = vec4(colour, 1.0);
  }
`;

function createInteractionColour() {
  const usesCoolAccent = Math.random() < 0.2;
  const hue = usesCoolAccent
    ? 0.53 + Math.random() * 0.1
    : 0.78 + Math.random() * 0.16;
  return new THREE.Color().setHSL(hue, 0.98, 0.53);
}

function createCloudColour(cloudIndex: number, elapsedSeconds: number, accent = false) {
  if (accent) {
    const hue = cloudIndex === 0 ? 0.54 : 0.62;
    return new THREE.Color().setHSL(hue, 0.98, 0.52);
  }

  const baseHue = cloudIndex === 0 ? 0.82 : 0.91;
  const hueDrift = Math.sin(elapsedSeconds * 0.52 + cloudIndex * 1.7) * 0.025;
  return new THREE.Color().setHSL(baseHue + hueDrift, 0.99, 0.52);
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
    const zeroRadii = Array.from({ length: MAX_SPLATS }, () => 0);
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
      uSplatRadius: { value: zeroRadii },
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
    const previousOrbits = Array.from(
      { length: CLOUD_COUNT },
      () => new THREE.Vector2(0.5, 0.5)
    );
    const orbitSeeded = Array.from({ length: CLOUD_COUNT }, () => false);
    let reducedMotionFrames = 100;
    const splatQueue: Splat[] = [];

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
        color: createInteractionColour(),
        force: new THREE.Vector2(movementX * 5, -movementY * 5),
        point: new THREE.Vector2(
          (clientX - rect.left) / rect.width,
          1 - (clientY - rect.top) / rect.height
        ),
        radius: 0.0026,
        strength: 0.72
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

    function addOrbitClouds(now: number) {
      if (reducedMotion) return;

      const elapsed = (now - startedAt) / 1000;
      const entrance = 1 - Math.exp(-elapsed * 1.8);
      const radiusPixels = Math.min(340, canvasWidth * 0.35, canvasHeight * 0.35);
      const radiusX = radiusPixels / canvasWidth;
      const radiusY = radiusPixels / canvasHeight;
      orbitAngle += CLOUD_ORBIT_SPEED;
      for (let cloudIndex = 0; cloudIndex < CLOUD_COUNT; cloudIndex += 1) {
        const phase = orbitAngle + cloudIndex * CLOUD_PHASE_OFFSET;
        const breathing = 0.9 + 0.1 * Math.sin(elapsed * 0.58 + cloudIndex * Math.PI);
        const point = new THREE.Vector2(
          0.5 + Math.cos(phase) * radiusX * breathing,
          0.5 - Math.sin(phase) * radiusY * breathing
        );

        if (!orbitSeeded[cloudIndex]) {
          orbitSeeded[cloudIndex] = true;
          previousOrbits[cloudIndex].copy(point);
          continue;
        }

        const force = point.clone().sub(previousOrbits[cloudIndex]).multiplyScalar(1500);
        previousOrbits[cloudIndex].copy(point);
        const cloudSpreadPixels = Math.min(
          190,
          Math.max(86, Math.min(canvasWidth, canvasHeight) * 0.24)
        );

        for (let lobeIndex = 0; lobeIndex < CLOUD_LOBE_COUNT; lobeIndex += 1) {
          const lobeProgress = lobeIndex / (CLOUD_LOBE_COUNT - 1);
          const lobePhase =
            elapsed * (0.34 + lobeProgress * 0.16) +
            cloudIndex * 2.4 +
            lobeIndex * 1.91;
          const trailPixels =
            10 - lobeProgress * cloudSpreadPixels + Math.sin(lobePhase) * 11;
          const crossPixels =
            Math.sin(lobeIndex * 2.31 + elapsed * 0.38 + cloudIndex * 1.7) *
            cloudSpreadPixels *
            (0.34 + lobeProgress * 0.26);
          const lobePoint = new THREE.Vector2(
            point.x +
              (-Math.sin(phase) * trailPixels + Math.cos(phase) * crossPixels) /
                canvasWidth,
            point.y +
              (-Math.cos(phase) * trailPixels - Math.sin(phase) * crossPixels) /
                canvasHeight
          );
          const isCoolAccent = lobeIndex === 2;
          const radius =
            0.0012 +
            (0.5 + 0.5 * Math.cos(lobePhase * 1.17)) * 0.0013 +
            (1 - lobeProgress) * 0.0006;
          const strength =
            (isCoolAccent ? 0.14 : 0.17) *
            (1 - lobeProgress * 0.35) *
            (0.86 + 0.14 * Math.sin(lobePhase * 0.83)) *
            entrance;

          splatQueue.push({
            color: createCloudColour(
              cloudIndex,
              elapsed + lobeIndex * 0.21,
              isCoolAccent
            ),
            force: force.clone().multiplyScalar(0.46 + (1 - lobeProgress) * 0.22),
            point: lobePoint,
            radius,
            strength
          });
        }
      }
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
      addOrbitClouds(now);
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
          zeroRadii[index] = splat.radius;
          zeroStrengths[index] = splat.strength;
        } else {
          zeroPoints[index].set(0, 0);
          zeroForces[index].set(0, 0);
          zeroColours[index].setRGB(0, 0, 0);
          zeroRadii[index] = 0;
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
      data-cloud-count="2"
      data-cloud-lobes="6"
      data-fluid-background="true"
      ref={canvasRef}
    />
  );
}
