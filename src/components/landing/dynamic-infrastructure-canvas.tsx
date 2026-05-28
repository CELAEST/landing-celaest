"use client";

import React, { Suspense, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { MeshSurfaceSampler } from "three-stdlib";

// =====================================================================
// CELAEST · Particle UI Brain Canvas Component
// Réplica fiel de la escena Spline (dos emisores + force collider).
// =====================================================================

const BRAIN_TARGET_SIZE = 6.2;
const LAYER_A_COUNT = 18000; // estructura (Particle Emitter 2)
const LAYER_B_COUNT = 9000;  // superficie con flujo (Particle Emitter)

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uHover;
  uniform vec3  uMousePos;
  uniform vec3  uColorMain;
  uniform vec3  uColorAccent;
  uniform float uAccentMix;   // proporción de partículas con color de acento (0..1)
  uniform float uDrift;       // intensidad del flujo curl-noise
  uniform float uSize;        // tamaño base de la partícula
  uniform float uLifeSpeed;   // velocidad del ciclo de vida

  attribute vec3  aNormal;
  attribute float aSeed;
  attribute float aPhase;

  varying vec3  vColor;
  varying float vAlpha;

  // ---- Simplex 3D noise (Ashima / Ian McEwan) ----
  vec3 mod289(vec3 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x){ return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g  = step(x0.yzx, x0.xyz);
    vec3 l  = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute( permute( permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j  = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x  = x_ * ns.x + ns.yyyy;
    vec4 y  = y_ * ns.x + ns.yyyy;
    vec4 h  = 1.0 - abs(x) - abs(y);
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
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  // ---- Curl noise (campo vectorial sin divergencia, flujo orgánico) ----
  vec3 curlNoise(vec3 p) {
    float e = 0.1;
    vec3 dx = vec3(e, 0.0, 0.0);
    vec3 dy = vec3(0.0, e, 0.0);
    vec3 dz = vec3(0.0, 0.0, e);
    float p_x0 = snoise(p - dx);
    float p_x1 = snoise(p + dx);
    float p_y0 = snoise(p - dy);
    float p_y1 = snoise(p + dy);
    float p_z0 = snoise(p - dz);
    float p_z1 = snoise(p + dz);
    float x = p_y1 - p_y0 - p_z1 + p_z0;
    float y = p_z1 - p_z0 - p_x1 + p_x0;
    float z = p_x1 - p_x0 - p_y1 + p_y0;
    return normalize(vec3(x, y, z) + 1e-5);
  }

  void main() {
    vec3 pos = position;

    // ---- Ciclo de vida (Lifetime infinito, Linear Fade Out) ----
    float life = fract(aPhase + uTime * uLifeSpeed);

    // ---- Drift orgánico sutil: respiro mínimo para que la forma mande ----
    float breathe = sin(life * 3.14159) * 0.5 + 0.15; // 0..1 con pico a la mitad
    vec3 normalPush = aNormal * (0.015 + aSeed * 0.04) * breathe;
    vec3 flow       = curlNoise(pos * 0.5 + uTime * 0.16 + aSeed * 6.2831);
    vec3 drift      = normalPush + flow * breathe * uDrift * (0.4 + aSeed * 0.7);
    pos += drift;

    // ---- Force Attract: las partículas se UNEN hacia el cursor (gather + swirl) ----
    vec3  toCursor    = uMousePos - pos;
    float dist        = length(toCursor);
    float radius      = 2.2;
    float attract     = smoothstep(radius, 0.0, dist) * uHover;
    vec3  swirlNoise  = curlNoise(pos * 1.6 + uTime * 0.7 + aSeed * 3.14);
    pos += toCursor * attract * 0.40 * (0.7 + aSeed * 0.5);
    pos += swirlNoise * attract * 0.45;

    // ---- Color (mezcla principal/acento según seed) ----
    float accent = step(1.0 - uAccentMix, aSeed);
    vColor       = mix(uColorMain, uColorAccent, accent);

    // =====================================================================
    //  SILUETA 3D · Rim lighting + backface fade (clave para ver el cerebro)
    //  - viewNormal: la normal del vértice transformada al espacio de cámara
    //  - facing > 0 → mira a la cámara | facing < 0 → da la espalda
    //  - rim = 1 - |facing| → pico en el contorno silueta
    // =====================================================================
    vec4 sampledMV  = modelViewMatrix * vec4(position, 1.0);
    vec3 viewNormal = normalize(normalMatrix * aNormal);
    vec3 viewDir    = normalize(-sampledMV.xyz);
    float facing    = dot(viewNormal, viewDir);
    float front     = smoothstep(-0.35, 0.30, facing); // back → invisible, front → visible
    float rim       = pow(1.0 - abs(facing), 1.4);     // pico en el borde
    float silhouette = front * 0.45 + rim * 0.85;       // bordes más brillantes que el centro

    // ---- Brillo: variación por seed + halo en hover ----
    float brightness = 0.55 + 0.5 * pow(1.0 - life, 1.4);
    brightness      += attract * 1.2;
    vColor *= brightness;

    // ---- Alpha: silueta + fade vital + variación por seed ----
    vAlpha  = silhouette;
    vAlpha *= (1.0 - life * 0.85);
    vAlpha *= (0.40 + aSeed * 0.60);   // dispersión de visibilidad → textura orgánica
    vAlpha *= (1.0 + attract * 0.6);
    vAlpha  = clamp(vAlpha, 0.0, 1.0);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize    = (uSize + aSeed * 1.0) * (11.0 / -mvPosition.z);
    gl_Position     = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  varying vec3  vColor;
  varying float vAlpha;
  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor, a);
  }
`;

type LayerProps = {
  count: number;
  config: {
    colorMain: string;
    colorAccent: string;
    accentMix: number;
    drift: number;
    size: number;
    lifeSpeed: number;
  };
  brainGeometry: THREE.BufferGeometry;
  isHovered: boolean;
  pointer3D: React.MutableRefObject<THREE.Vector3>;
};

const ParticleLayer = ({ count, config, brainGeometry, isHovered, pointer3D }: LayerProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const tempMesh = new THREE.Mesh(brainGeometry, new THREE.MeshBasicMaterial());
    const sampler = new MeshSurfaceSampler(tempMesh).build();

    const positions = new Float32Array(count * 3);
    const normals = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const phases = new Float32Array(count);

    const tempPos = new THREE.Vector3();
    const tempNormal = new THREE.Vector3();
    for (let i = 0; i < count; i++) {
      sampler.sample(tempPos, tempNormal);
      positions[i * 3] = tempPos.x;
      positions[i * 3 + 1] = tempPos.y;
      positions[i * 3 + 2] = tempPos.z;
      normals[i * 3] = tempNormal.x;
      normals[i * 3 + 1] = tempNormal.y;
      normals[i * 3 + 2] = tempNormal.z;
      seeds[i] = Math.random();
      phases[i] = Math.random();
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aNormal", new THREE.BufferAttribute(normals, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    return geo;
  }, [brainGeometry, count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
      uMousePos: { value: new THREE.Vector3(999, 999, 999) },
      uColorMain: { value: new THREE.Color(config.colorMain) },
      uColorAccent: { value: new THREE.Color(config.colorAccent) },
      uAccentMix: { value: config.accentMix },
      uDrift: { value: config.drift },
      uSize: { value: config.size },
      uLifeSpeed: { value: config.lifeSpeed },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame((state, delta) => {
    const m = materialRef.current;
    if (!m) return;
    m.uniforms.uTime.value = state.clock.elapsedTime;
    // Hover blend: enter is much faster than exit so the reaction feels
    // instant when the cursor arrives, while the release decays smoothly.
    const target = isHovered ? 1.0 : 0.0;
    const speed = isHovered ? 18 : 5;
    m.uniforms.uHover.value = THREE.MathUtils.lerp(
      m.uniforms.uHover.value,
      target,
      Math.min(1, delta * speed),
    );
    m.uniforms.uMousePos.value.lerp(pointer3D.current, Math.min(1, delta * 22));
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const ParticleBrain = ({
  isHovered,
  pointer3D,
  scaleMultiplier = 1,
}: {
  isHovered: boolean;
  pointer3D: React.MutableRefObject<THREE.Vector3>;
  scaleMultiplier?: number;
}) => {
  const gltf = useGLTF("/particle_ui_brain.gltf") as any;

  // Geometría del cerebro centrada y escalada (una sola vez)
  const brainGeometry = useMemo(() => {
    let brainMesh: THREE.Mesh | null = null;
    let firstMesh: THREE.Mesh | null = null;
    Object.values(gltf.nodes).forEach((n: any) => {
      if (n?.isMesh) {
        if (!firstMesh) firstMesh = n;
        if (n.name?.toLowerCase().includes("brain")) brainMesh = n;
      }
    });
    const baseMesh = brainMesh ?? firstMesh;
    if (!baseMesh) return null;

    const geo = (baseMesh as THREE.Mesh).geometry.clone();
    geo.computeBoundingBox();
    const box = geo.boundingBox!;
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = BRAIN_TARGET_SIZE / maxDim;
    geo.translate(-center.x, -center.y, -center.z);
    geo.scale(scale, scale, scale);
    geo.computeVertexNormals();
    return geo;
  }, [gltf]);

  if (!brainGeometry) return null;

  // Vista fija ligeramente sesgada en Y para mostrar profundidad 3D sin rotación animada
  return (
    <group rotation={[0, 0.35, 0]} scale={[scaleMultiplier, scaleMultiplier, scaleMultiplier]}>
      {/* Capa A · Estructura densa interior (Particle Emitter 2) */}
      <ParticleLayer
        count={LAYER_A_COUNT}
        brainGeometry={brainGeometry}
        isHovered={isHovered}
        pointer3D={pointer3D}
        config={{
          colorMain: "#FFFFFF",   // blanco puro
          colorAccent: "#E2E8F0", // gris claro (textura sutil)
          accentMix: 0.18,
          drift: 0.10,
          size: 1.7,
          lifeSpeed: 0.12,
        }}
      />
      {/* Capa B · Flujo de superficie (Particle Emitter) */}
      <ParticleLayer
        count={LAYER_B_COUNT}
        brainGeometry={brainGeometry}
        isHovered={isHovered}
        pointer3D={pointer3D}
        config={{
          colorMain: "#F8FAFC",   // brand-ice (blanco hueso)
          colorAccent: "#CBD5E1", // gris azulado sutil
          accentMix: 0.30,
          drift: 0.28,
          size: 2.2,
          lifeSpeed: 0.18,
        }}
      />
    </group>
  );
};

// Tracker: convierte el cursor 2D → 3D sobre el plano Z=0 (centro del cerebro)
const PointerTracker = ({
  isHovered,
  pointer3D,
}: {
  isHovered: boolean;
  pointer3D: React.MutableRefObject<THREE.Vector3>;
}) => {
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const idle = useMemo(() => new THREE.Vector3(999, 999, 999), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const wasHovered = useRef(false);

  useFrame((state) => {
    if (!isHovered) {
      pointer3D.current.lerp(idle, 0.08);
      wasHovered.current = false;
      return;
    }
    raycaster.setFromCamera(state.pointer, state.camera);
    raycaster.ray.intersectPlane(plane, target);
    // On the first frame after hover starts, snap directly to the cursor so
    // there's no "catch up" delay from the (999,999,999) idle position.
    if (!wasHovered.current) {
      pointer3D.current.copy(target);
      wasHovered.current = true;
      return;
    }
    pointer3D.current.lerp(target, 0.55);
  });

  return null;
};

interface DynamicInfrastructureCanvasProps {
  isHovered: boolean;
  visible: boolean;
  scaleMultiplier: number;
}

export default function DynamicInfrastructureCanvas({
  isHovered,
  visible,
  scaleMultiplier,
}: DynamicInfrastructureCanvasProps) {
  const pointer3D = useRef(new THREE.Vector3(999, 999, 999));

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 1.5]}
      frameloop={visible ? "always" : "never"}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance", stencil: false }}
    >
      <Suspense fallback={null}>
        <ParticleBrain isHovered={isHovered} pointer3D={pointer3D} scaleMultiplier={scaleMultiplier} />
        <PointerTracker isHovered={isHovered} pointer3D={pointer3D} />
      </Suspense>
    </Canvas>
  );
}
