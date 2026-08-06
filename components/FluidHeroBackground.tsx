"use client";

import { useEffect, useRef } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  ClampToEdgeWrapping,
  Color,
  HalfFloatType,
  LinearFilter,
  Mesh,
  OrthographicCamera,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  RGBAFormat,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
  WebGLRenderTarget,
  type RenderTargetOptions,
  type Texture
} from "three";

const MAX_SPLATS = 12;
const CLOUD_COUNT = 2;
const CLOUD_PHASE_OFFSET = Math.PI;
const CLOUD_ORBIT_SPEED = 0.014;
const CLOUD_TRAIL_DISSIPATION = 0.946;
const FLOW_WAVE_COLUMNS = 96;
const FLOW_WAVE_ROWS = 72;
const FLOW_WAVE_POINT_COUNT = FLOW_WAVE_COLUMNS * FLOW_WAVE_ROWS;

type Splat = {
  color: Color;
  force: Vector2;
  point: Vector2;
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
    colour *= pow(${CLOUD_TRAIL_DISSIPATION}, max(uDelta, 0.001) * 60.0);

    for (int index = 0; index < ${MAX_SPLATS}; index++) {
      if (index < uSplatCount) {
        vec2 offset = vUv - uSplatPoint[index];
        offset.x *= uAspect;
        vec2 direction = normalize(uSplatForce[index] + vec2(0.0001));
        offset -= direction * dot(offset, direction) * 0.28;
        float ink = exp(-dot(offset, offset) / max(uSplatRadius[index], 0.0001));
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
    colour = vec3(1.0) - exp(-colour * 0.62);
    float luminance = dot(colour, vec3(0.2126, 0.7152, 0.0722));
    colour = clamp(mix(vec3(luminance), colour, 1.28), 0.0, 1.0);
    colour = pow(colour, vec3(0.9));
    float vignette = smoothstep(0.92, 0.18, length(vUv - 0.5));
    colour *= mix(0.68, 1.0, vignette);
    gl_FragColor = vec4(colour, 1.0);
  }
`;

const flowWaveNoise = `
  vec4 permute(vec4 x) {
    return mod(((x * 34.0) + 1.0) * x, 289.0);
  }

  vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
  }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(
      permute(
        permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) +
        i.y + vec4(0.0, i1.y, i2.y, 1.0)
      ) + i.x + vec4(0.0, i1.x, i2.x, 1.0)
    );
    float n_ = 1.0 / 7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(
      dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)
    ));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(
      0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)),
      0.0
    );
    m *= m;
    return 42.0 * dot(
      m * m,
      vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3))
    );
  }
`;

const flowWaveVertexShader = `
  precision highp float;

  uniform float uAppear;
  uniform float uPixelRatio;
  uniform float uScroll;
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uPointerActivity;
  uniform vec3 uColourLow;
  uniform vec3 uColourHigh;
  varying float vAlpha;
  varying vec3 vColour;

  ${flowWaveNoise}

  void main() {
    vec3 point = position;
    float stream = uTime * 1.65;
    float wave = snoise(vec3(point.x * 0.14, (point.z + stream) * 0.11, uTime * 0.1)) * 1.6;
    wave += snoise(vec3(point.x * 0.28, (point.z + stream) * 0.22, uTime * 0.19)) * 0.62;
    point.y = wave * (1.0 + uScroll * 0.34) - 0.55;

    vec2 pointerPosition = vec2(
      uPointer.x * 8.5,
      mix(-2.0, -22.0, uPointer.y * 0.5 + 0.5)
    );
    vec2 away = point.xz - pointerPosition;
    float pointerDistance = length(away);
    float repel = (1.0 - smoothstep(0.0, 3.8, pointerDistance)) * uPointerActivity;
    point.xz += normalize(away + vec2(0.0001)) * repel * 1.25;
    point.y -= repel * 0.58;

    float heightMix = smoothstep(-2.7, 1.3, point.y);
    float edgeFade = 1.0 - smoothstep(9.0, 12.0, abs(point.x));
    float farFade = smoothstep(-31.0, -24.0, point.z);
    float nearFade = 1.0 - smoothstep(1.8, 4.0, point.z);
    vColour = mix(uColourLow, uColourHigh, heightMix);
    vAlpha = (0.34 + heightMix * 0.66) * edgeFade * farFade * nearFade * uAppear;

    vec4 modelViewPosition = modelViewMatrix * vec4(point, 1.0);
    gl_PointSize = (3.4 + heightMix * 5.8) * uPixelRatio * (9.0 / max(-modelViewPosition.z, 2.0));
    gl_PointSize = max(gl_PointSize, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
  }
`;

const flowWaveFragmentShader = `
  precision highp float;

  varying float vAlpha;
  varying vec3 vColour;

  void main() {
    vec2 point = gl_PointCoord - 0.5;
    float distanceFromCentre = length(point);
    if (distanceFromCentre > 0.5) discard;
    float glow = smoothstep(0.5, 0.02, distanceFromCentre);
    gl_FragColor = vec4(vColour * glow * 1.18, vAlpha * glow);
  }
`;

function createFlowWaveGeometry() {
  const positions = new Float32Array(FLOW_WAVE_POINT_COUNT * 3);

  for (let row = 0; row < FLOW_WAVE_ROWS; row += 1) {
    for (let column = 0; column < FLOW_WAVE_COLUMNS; column += 1) {
      const index = row * FLOW_WAVE_COLUMNS + column;
      const seededOffset = Math.sin(index * 12.9898) * 43758.5453;
      const jitter = (seededOffset - Math.floor(seededOffset) - 0.5) * 0.12;
      positions[index * 3] = -12 + (column / (FLOW_WAVE_COLUMNS - 1)) * 24 + jitter;
      positions[index * 3 + 1] = 0;
      positions[index * 3 + 2] = 3.5 - (row / (FLOW_WAVE_ROWS - 1)) * 35 + jitter;
    }
  }

  const flowWaveGeometry = new BufferGeometry();
  flowWaveGeometry.setAttribute("position", new BufferAttribute(positions, 3));
  return flowWaveGeometry;
}

function createInteractionColour(target = new Color()) {
  const usesWhiteHighlight = Math.random() < 0.28;
  if (usesWhiteHighlight) {
    return target.setHSL(0.55, 0.42, 0.88);
  }

  return target.setHSL(0.52 + Math.random() * 0.1, 0.96, 0.58);
}

function createCloudColour(
  cloudIndex: number,
  elapsedSeconds: number,
  accent = false,
  target = new Color()
) {
  if (accent) {
    const hue = cloudIndex === 0 ? 0.53 : 0.58;
    const saturation = cloudIndex === 0 ? 0.38 : 0.58;
    const lightness = cloudIndex === 0 ? 0.9 : 0.82;
    return target.setHSL(hue, saturation, lightness);
  }

  const baseHue = cloudIndex === 0 ? 0.53 : 0.61;
  const hueDrift = Math.sin(elapsedSeconds * 0.52 + cloudIndex * 1.7) * 0.018;
  return target.setHSL(baseHue + hueDrift, 0.94, 0.58);
}

export function FluidHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const currentCanvas = canvasRef.current;
    if (!currentCanvas) return;
    const canvasElement: HTMLCanvasElement = currentCanvas;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: WebGLRenderer;

    try {
      renderer = new WebGLRenderer({
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

    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new PlaneGeometry(2, 2);
    const zeroPoints = Array.from({ length: MAX_SPLATS }, () => new Vector2());
    const zeroForces = Array.from({ length: MAX_SPLATS }, () => new Vector2());
    const zeroColours = Array.from({ length: MAX_SPLATS }, () => new Color());
    const zeroRadii = Array.from({ length: MAX_SPLATS }, () => 0);
    const zeroStrengths = Array.from({ length: MAX_SPLATS }, () => 0);

    const simulationUniforms = {
      uPrevious: { value: null as Texture | null },
      uResolution: { value: new Vector2(1, 1) },
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
    const simulationMaterial = new ShaderMaterial({
      fragmentShader: simulationShader,
      uniforms: simulationUniforms,
      vertexShader
    });
    const simulationScene = new Scene();
    simulationScene.add(new Mesh(geometry, simulationMaterial));

    const displayUniforms = {
      uTexture: { value: null as Texture | null },
      uTexel: { value: new Vector2(1, 1) }
    };
    const displayMaterial = new ShaderMaterial({
      fragmentShader: displayShader,
      uniforms: displayUniforms,
      vertexShader
    });
    const displayScene = new Scene();
    displayScene.add(new Mesh(geometry, displayMaterial));

    const flowWaveCamera = new PerspectiveCamera(45, 1, 0.1, 80);
    const flowWaveScene = new Scene();
    const flowWaveGeometry = createFlowWaveGeometry();
    const flowWaveUniforms = {
      uAppear: { value: 0 },
      uColourHigh: { value: new Color("#f6feff") },
      uColourLow: { value: new Color("#147fb9") },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.5) },
      uPointer: { value: new Vector2() },
      uPointerActivity: { value: 0 },
      uScroll: { value: 0 },
      uTime: { value: 0 }
    };
    const flowWaveMaterial = new ShaderMaterial({
      blending: AdditiveBlending,
      depthTest: false,
      depthWrite: false,
      fragmentShader: flowWaveFragmentShader,
      transparent: true,
      uniforms: flowWaveUniforms,
      vertexShader: flowWaveVertexShader
    });
    const flowWavePoints = new Points(flowWaveGeometry, flowWaveMaterial);
    flowWavePoints.frustumCulled = false;
    flowWaveScene.add(flowWavePoints);

    const targetOptions: RenderTargetOptions = {
      depthBuffer: false,
      format: RGBAFormat,
      magFilter: LinearFilter,
      minFilter: LinearFilter,
      stencilBuffer: false,
      type: HalfFloatType,
      wrapS: ClampToEdgeWrapping,
      wrapT: ClampToEdgeWrapping
    };

    let readTarget = new WebGLRenderTarget(2, 2, targetOptions);
    let writeTarget = new WebGLRenderTarget(2, 2, targetOptions);
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
      () => new Vector2(0.5, 0.5)
    );
    const orbitSeeded = Array.from({ length: CLOUD_COUNT }, () => false);
    let cloudFrame = 0;
    let reducedMotionFrames = 100;
    let pointerMovedAt = -Infinity;
    let wavePointerActivity = 0;
    const splatQueue: Splat[] = [];
    const splatPool: Splat[] = [];
    const wavePointer = new Vector2();
    const wavePointerTarget = new Vector2();

    function acquireSplat() {
      return splatPool.pop() ?? {
        color: new Color(),
        force: new Vector2(),
        point: new Vector2(),
        radius: 0,
        strength: 0
      };
    }

    function clearTargets() {
      const previousColour = renderer.getClearColor(new Color());
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
      flowWaveCamera.aspect = aspect;
      flowWaveCamera.updateProjectionMatrix();
      flowWaveUniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 1.5);
      const baseResolution = width < 640 ? 320 : 512;
      const targetWidth = aspect >= 1 ? Math.round(baseResolution * aspect) : baseResolution;
      const targetHeight = aspect >= 1 ? baseResolution : Math.round(baseResolution / aspect);

      if (readTarget.width !== targetWidth || readTarget.height !== targetHeight) {
        readTarget.dispose();
        writeTarget.dispose();
        readTarget = new WebGLRenderTarget(targetWidth, targetHeight, targetOptions);
        writeTarget = new WebGLRenderTarget(targetWidth, targetHeight, targetOptions);
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

      const splat = acquireSplat();
      createInteractionColour(splat.color);
      splat.force.set(movementX * 5, -movementY * 5);
      splat.point.set(
        (clientX - rect.left) / rect.width,
        1 - (clientY - rect.top) / rect.height
      );
      splat.radius = 0.0026;
      splat.strength = 0.72;
      splatQueue.push(splat);
      wavePointerTarget.set(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        1 - ((clientY - rect.top) / rect.height) * 2
      );
      pointerMovedAt = performance.now();

      if (reducedMotion) {
        reducedMotionFrames = 24;
        scheduleFrame();
      }
    }

    let previousTouch: { x: number; y: number } | null = null;
    const handlePointerMove = (event: PointerEvent) => {
      if (!isVisible || event.pointerType === "touch") return;
      queuePointerSplat(event.clientX, event.clientY, event.movementX, event.movementY);
    };
    const handleTouchStart = (event: TouchEvent) => {
      if (!isVisible) return;
      const touch = event.touches[0];
      if (touch) previousTouch = { x: touch.clientX, y: touch.clientY };
    };
    const handleTouchMove = (event: TouchEvent) => {
      if (!isVisible) return;
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
      if (!isVisible) return;
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
      cloudFrame += 1;

      for (let cloudIndex = 0; cloudIndex < CLOUD_COUNT; cloudIndex += 1) {
        const phase = orbitAngle + cloudIndex * CLOUD_PHASE_OFFSET;
        const breathing = 0.9 + 0.1 * Math.sin(elapsed * 0.58 + cloudIndex * Math.PI);
        const pointX = 0.5 + Math.cos(phase) * radiusX * breathing;
        const pointY = 0.5 - Math.sin(phase) * radiusY * breathing;

        if (!orbitSeeded[cloudIndex]) {
          orbitSeeded[cloudIndex] = true;
          previousOrbits[cloudIndex].set(pointX, pointY);
          continue;
        }

        const previousOrbit = previousOrbits[cloudIndex];
        const forceX = (pointX - previousOrbit.x) * 1500;
        const forceY = (pointY - previousOrbit.y) * 1500;
        previousOrbit.set(pointX, pointY);
        const mistOffsetX = Math.cos(phase * 1.63 + cloudIndex) * 0.019;
        const mistOffsetY = Math.sin(phase * 1.41 + cloudIndex) * 0.019;

        const primarySplat = acquireSplat();
        createCloudColour(cloudIndex, elapsed, false, primarySplat.color);
        primarySplat.force.set(forceX, forceY);
        primarySplat.point.set(pointX, pointY);
        primarySplat.radius = 0.0062;
        primarySplat.strength = 0.26 * entrance;
        splatQueue.push(primarySplat);

        const mistSplat = acquireSplat();
        createCloudColour(cloudIndex, elapsed + 0.8, false, mistSplat.color);
        mistSplat.force.set(forceX * 0.72, forceY * 0.72);
        mistSplat.point.set(pointX + mistOffsetX, pointY + mistOffsetY);
        mistSplat.radius = 0.013;
        mistSplat.strength = 0.11 * entrance;
        splatQueue.push(mistSplat);

        if (cloudFrame % 3 === cloudIndex) {
          const accentSplat = acquireSplat();
          createCloudColour(cloudIndex, elapsed, true, accentSplat.color);
          accentSplat.force.set(forceX * 0.86, forceY * 0.86);
          accentSplat.point.set(
            pointX - mistOffsetX * 0.65,
            pointY - mistOffsetY * 0.65
          );
          accentSplat.radius = 0.0044;
          accentSplat.strength = 0.14 * entrance;
          splatQueue.push(accentSplat);
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
      const splatCount = Math.min(splatQueue.length, MAX_SPLATS);
      const delta = Math.min((now - lastFrameTime) / 1000, 0.034);
      lastFrameTime = now;

      simulationUniforms.uPrevious.value = readTarget.texture;
      simulationUniforms.uDelta.value = Math.max(delta, 1 / 120);
      simulationUniforms.uTime.value = (now - startedAt) / 1000;
      simulationUniforms.uSplatCount.value = splatCount;
      const elapsed = (now - startedAt) / 1000;
      const scrollProgress = Math.min(window.scrollY / Math.max(canvasHeight, 1), 1);
      const scrollEase = scrollProgress * scrollProgress * (3 - 2 * scrollProgress);
      wavePointer.lerp(wavePointerTarget, 0.08);
      wavePointerActivity +=
        ((now - pointerMovedAt < 1800 ? 1 : 0) - wavePointerActivity) * 0.06;
      flowWaveUniforms.uAppear.value = Math.min(1, Math.max(0, (elapsed - 0.25) / 1.35));
      flowWaveUniforms.uPointer.value.copy(wavePointer);
      flowWaveUniforms.uPointerActivity.value = wavePointerActivity;
      flowWaveUniforms.uScroll.value = scrollEase;
      flowWaveUniforms.uTime.value = reducedMotion ? 0.8 : elapsed;
      flowWaveCamera.position.set(
        wavePointer.x * 0.52,
        4.35 - scrollEase * 1.5 + wavePointer.y * 0.18,
        10.5 - scrollEase * 2.5
      );
      flowWaveCamera.lookAt(
        wavePointer.x * 0.26,
        -0.05 + scrollEase * 0.35,
        -8.5 - scrollEase * 4
      );

      for (let index = 0; index < MAX_SPLATS; index += 1) {
        const splat = index < splatCount ? splatQueue[index] : undefined;
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

      for (let index = 0; index < splatCount; index += 1) {
        splatPool.push(splatQueue[index]);
      }
      splatQueue.copyWithin(0, splatCount);
      splatQueue.length -= splatCount;

      renderer.setRenderTarget(writeTarget);
      renderer.render(simulationScene, camera);
      displayUniforms.uTexture.value = writeTarget.texture;
      renderer.setRenderTarget(null);
      renderer.render(displayScene, camera);
      renderer.autoClear = false;
      renderer.clearDepth();
      renderer.render(flowWaveScene, flowWaveCamera);
      renderer.autoClear = true;

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
      flowWaveGeometry.dispose();
      flowWaveMaterial.dispose();
      geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      aria-hidden="true"
      className="hero-fluid-canvas pointer-events-none absolute inset-0 z-0 h-full w-full"
      data-cloud-count="2"
      data-cloud-palette="ice-blue-white"
      data-cloud-style="twin-thick-trails"
      data-flow-wave-points={FLOW_WAVE_POINT_COUNT}
      data-flow-wave="optimized"
      data-flow-wave-visibility="bold"
      data-fluid-background="true"
      data-renderer-count="1"
      ref={canvasRef}
    />
  );
}
