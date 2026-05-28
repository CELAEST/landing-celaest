"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { GLTFLoader, MeshSurfaceSampler, SVGLoader } from "three-stdlib";
import * as THREE from "three";
import { CELAEST_LOGO_PATH_D } from "@/components/ui/logo-path";

// requestIdleCallback isn't in lib.dom for some setups and Safari lacks it.
type IdleHandle = number;
type IdleDeadline = { didTimeout: boolean; timeRemaining(): number };
type IdleWindow = Window & {
  requestIdleCallback?: (cb: (d: IdleDeadline) => void, opts?: { timeout: number }) => IdleHandle;
  cancelIdleCallback?: (handle: IdleHandle) => void;
};

function scheduleIdle(cb: () => void, timeout = 200): () => void {
  if (typeof window === "undefined") return () => {};
  const w = window as IdleWindow;
  if (typeof w.requestIdleCallback === "function") {
    const handle = w.requestIdleCallback(cb, { timeout });
    return () => w.cancelIdleCallback?.(handle);
  }
  const id = window.setTimeout(cb, 0);
  return () => window.clearTimeout(id);
}

// Module-level GLTFLoader so multiple mounts share parsing cache
const gltfLoader = new GLTFLoader();

type SecurityNode = "verified" | "encryption" | "infrastructure" | "all" | null;
type PointerRef = React.MutableRefObject<{ x: number; y: number }>;

const PARTICLE_COUNT = 6000;
const SPHERE_RADIUS = 0.9;
const LOCK_TARGET_SIZE = 2.05; // diameter the padlock should occupy after centring/scaling
const LOCK_Y_OFFSET  = 0.33;  // shift the whole lock upward (view-space)
const LOCK_YAW = 1.4;   // around Y
const LOCK_PITCH = 0; // around X

const SHIELD_TARGET_SIZE = 2.0;
const SHIELD_Y_OFFSET = 0.33;
const GLOBE_TARGET_SIZE  = 1.95;
const GLOBE_Y_OFFSET = 0.33;
const LOGO_TARGET_SIZE   = 2.0;
const LOGO_Y_OFFSET = 0.33;

function getTargetDir(node: SecurityNode): THREE.Vector3 {
  if (node === "verified") return new THREE.Vector3(-0.95, 0.65, 0).normalize();
  if (node === "encryption") return new THREE.Vector3(0.95, 0.65, 0).normalize();
  if (node === "infrastructure") return new THREE.Vector3(0, -1, 0).normalize();
  return new THREE.Vector3(0, 0, 0);
}

// ---- Shaders ---------------------------------------------------------

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uHover;
  uniform float uMorphLock;   // weight: morph toward padlock
  uniform float uMorphShield; // weight: morph toward shield (verified)
  uniform float uMorphGlobe;  // weight: morph toward globe (infrastructure)
  uniform float uMorphLogo;   // weight: morph toward CELAEST logo (centre hover)
  uniform vec3  uTargetDir;
  uniform vec3  uMousePos;
  uniform vec3  uColorMain;
  uniform vec3  uColorAccent;

  attribute vec3  aNormal;
  attribute vec3  aLockPos;   // resting position when morphed into padlock
  attribute vec3  aShieldPos; // resting position when morphed into shield
  attribute vec3  aGlobePos;  // resting position when morphed into globe
  attribute vec3  aLogoPos;   // resting position when morphed into the CELAEST logo
  attribute float aSeed;
  attribute float aPhase;

  varying float vAlpha;
  varying vec3  vColor;

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
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
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
    float totalMorph = clamp(uMorphLock + uMorphShield + uMorphGlobe + uMorphLogo, 0.0, 1.0);
    vec3 weightedTarget =
        aLockPos   * uMorphLock
      + aShieldPos * uMorphShield
      + aGlobePos  * uMorphGlobe
      + aLogoPos   * uMorphLogo;
    float wSum = uMorphLock + uMorphShield + uMorphGlobe + uMorphLogo;
    if (wSum > 0.0001) weightedTarget /= wSum;
    vec3 origin = mix(position, weightedTarget, totalMorph);
    vec3 pos = origin;

    // ---- Lifetime cycle (Linear Fade In, Lifetime Infinite) ----
    float life = fract(aPhase + uTime * 0.10);

    // When morphed into any shape we suppress most of the shape-distorting motion
    float motion = 1.0 - totalMorph;                
    float subtleMotion = 1.0 - totalMorph * 0.85;   

    // ---- Surface drift (curl noise flow) ----
    vec3 flow = curlNoise(origin * 0.8 + uTime * 0.12 + aSeed * 6.2831);
    pos += flow * 0.10 * (0.4 + life * 0.7) * subtleMotion;

    // ---- Radial breathing (only sphere) ----
    pos += normalize(origin) * sin(uTime * 0.55 + aSeed * 6.28) * 0.04 * motion;

    // ---- Hover lean: sphere stretches toward the active card ----
    float targetMag = length(uTargetDir);
    if (targetMag > 0.0001) {
      vec3 dir = uTargetDir / targetMag;
      float facing = dot(normalize(origin), dir);
      float pull = uHover * smoothstep(-0.2, 0.9, facing);
      pos += dir * pull * 0.55 * motion; 
    }

    // ---- Cursor force ----
    vec3 toMouse = uMousePos - pos;
    float dist = length(toMouse);
    float influence = smoothstep(1.7, 0.0, dist) * subtleMotion;
    vec3 swirl = curlNoise(pos * 1.4 + uTime * 0.8);
    pos += swirl * influence * 0.30;
    pos += normalize(toMouse + vec3(0.0001)) * influence * 0.18;

    // ---- Slow auto rotation around Y ----
    float angle = uTime * 0.07 * motion; 
    float c = cos(angle);
    float s = sin(angle);
    pos = vec3(c * pos.x + s * pos.z, pos.y, -s * pos.x + c * pos.z);

    // ---- Silhouette / rim lighting ----
    vec4 sampledMV  = modelViewMatrix * vec4(origin, 1.0);
    vec3 viewNormal = normalize(normalMatrix * aNormal);
    vec3 viewDir    = normalize(-sampledMV.xyz);
    float facing    = dot(viewNormal, viewDir);
    float front     = smoothstep(-0.30, 0.35, facing);   
    float rim       = pow(1.0 - abs(facing), 1.6);        
    float sphereSilhouette = front * 0.30 + rim * 0.85;
    float silhouette = mix(sphereSilhouette, 0.65, totalMorph);

    // ---- Color ----
    vColor = mix(uColorMain, uColorAccent, uHover * 0.20 * aSeed);
    float brightness = 0.55 + 0.45 * pow(1.0 - life, 1.4);
    vColor *= brightness;

    // ---- Alpha ----
    float lifeFade = life * smoothstep(1.0, 0.92, life);
    vAlpha  = silhouette;
    vAlpha *= lifeFade;
    vAlpha *= (0.40 + aSeed * 0.60);
    vAlpha *= 1.0 + uHover * 0.25;
    vAlpha  = clamp(vAlpha, 0.0, 1.0);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    float depth = -mv.z;
    gl_PointSize = (1.0 + aSeed * 1.0) * (12.0 / depth);
    gl_Position = projectionMatrix * mv;
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

// ---- Procedural target geometries ---------------------------------------

function buildShieldGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(-1, 1);
  shape.lineTo(1, 1);
  shape.bezierCurveTo(1, 0.25, 0.92, -0.35, 0.72, -0.7);
  shape.bezierCurveTo(0.45, -1.05, 0.18, -1.32, 0, -1.4);
  shape.bezierCurveTo(-0.18, -1.32, -0.45, -1.05, -0.72, -0.7);
  shape.bezierCurveTo(-0.92, -0.35, -1, 0.25, -1, 1);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.32,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.06,
    bevelSegments: 3,
    curveSegments: 24,
  });
  geo.translate(0, 0, -0.16); 
  return geo;
}

function buildGlobeGeometries(): THREE.BufferGeometry[] {
  const radius = 1;
  const tube = 0.028;
  const out: THREE.BufferGeometry[] = [];
  const latCount = 6;
  for (let i = 1; i < latCount; i++) {
    const t = i / latCount;
    const phi = t * Math.PI;
    const y = Math.cos(phi) * radius;
    const r = Math.sin(phi) * radius;
    if (r < 0.02) continue;
    const torus = new THREE.TorusGeometry(r, tube, 6, 56);
    torus.rotateX(Math.PI / 2);
    torus.translate(0, y, 0);
    out.push(torus);
  }
  const meridianCount = 8;
  for (let i = 0; i < meridianCount; i++) {
    const angle = (i / meridianCount) * Math.PI;
    const torus = new THREE.TorusGeometry(radius, tube, 6, 72);
    torus.rotateY(angle);
    out.push(torus);
  }
  return out;
}

function normalizePositions(
  out: Float32Array,
  count: number,
  targetSize: number,
  yOffset: number,
) {
  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
  for (let i = 0; i < count; i++) {
    minX = Math.min(minX, out[i * 3]);     maxX = Math.max(maxX, out[i * 3]);
    minY = Math.min(minY, out[i * 3 + 1]); maxY = Math.max(maxY, out[i * 3 + 1]);
    minZ = Math.min(minZ, out[i * 3 + 2]); maxZ = Math.max(maxZ, out[i * 3 + 2]);
  }
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const cz = (minZ + maxZ) / 2;
  const span = Math.max(maxX - minX, maxY - minY, maxZ - minZ) || 1;
  const scale = targetSize / span;
  for (let i = 0; i < count; i++) {
    out[i * 3]     = (out[i * 3]     - cx) * scale;
    out[i * 3 + 1] = (out[i * 3 + 1] - cy) * scale + yOffset;
    out[i * 3 + 2] = (out[i * 3 + 2] - cz) * scale;
  }
}

function buildLogoGeometriesFromPath(d: string): THREE.BufferGeometry[] {
  const loader = new SVGLoader();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 503"><path d="${d}"/></svg>`;
  const data = loader.parse(svg);
  const geos: THREE.BufferGeometry[] = [];
  for (const p of data.paths) {
    const shapes = SVGLoader.createShapes(p);
    for (const shape of shapes) {
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: 12,
        bevelEnabled: false,
        curveSegments: 18,
      });
      geo.scale(1, -1, 1); 
      geos.push(geo);
    }
  }
  return geos;
}

function sampleGeometryList(
  geos: THREE.BufferGeometry[],
  count: number,
  targetSize: number,
  yOffset: number,
): Float32Array {
  type Entry = { sampler: MeshSurfaceSampler; weight: number };
  const samplers: Entry[] = [];
  let totalWeight = 0;
  for (const geo of geos) {
    const posAttr = geo.attributes.position;
    if (!posAttr) continue;
    const triCount = (geo.index ? geo.index.count : posAttr.count) / 3;
    const tempMesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial());
    samplers.push({ sampler: new MeshSurfaceSampler(tempMesh).build(), weight: triCount });
    totalWeight += triCount;
  }

  const out = new Float32Array(count * 3);
  if (samplers.length === 0) return out;

  const tmp = new THREE.Vector3();
  for (let i = 0; i < count; i++) {
    let pick = Math.random() * totalWeight;
    let chosen = samplers[0];
    for (const s of samplers) {
      pick -= s.weight;
      if (pick <= 0) { chosen = s; break; }
    }
    chosen.sampler.sample(tmp);
    out[i * 3]     = tmp.x;
    out[i * 3 + 1] = tmp.y;
    out[i * 3 + 2] = tmp.z;
  }
  normalizePositions(out, count, targetSize, yOffset);
  return out;
}

function sampleLockPositions(scene: THREE.Object3D, count: number): Float32Array {
  type Entry = { sampler: MeshSurfaceSampler; weight: number };
  const samplers: Entry[] = [];
  let totalWeight = 0;

  scene.updateMatrixWorld(true);
  scene.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh)) return;
    if (!obj.name.toLowerCase().includes("lock")) return;

    const geo = obj.geometry.clone();
    geo.applyMatrix4(obj.matrixWorld);

    const posAttr = geo.attributes.position;
    if (!posAttr) return;
    const triCount = (geo.index ? geo.index.count : posAttr.count) / 3;
    const tempMesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial());
    const sampler = new MeshSurfaceSampler(tempMesh).build();
    samplers.push({ sampler, weight: triCount });
    totalWeight += triCount;
  });

  const out = new Float32Array(count * 3);
  if (samplers.length === 0 || totalWeight === 0) {
    return out; 
  }

  const tempPos = new THREE.Vector3();
  for (let i = 0; i < count; i++) {
    let pick = Math.random() * totalWeight;
    let chosen = samplers[0];
    for (const item of samplers) {
      pick -= item.weight;
      if (pick <= 0) {
        chosen = item;
        break;
      }
    }
    chosen.sampler.sample(tempPos);
    out[i * 3] = tempPos.x;
    out[i * 3 + 1] = tempPos.y;
    out[i * 3 + 2] = tempPos.z;
  }

  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
  for (let i = 0; i < count; i++) {
    minX = Math.min(minX, out[i * 3]);     maxX = Math.max(maxX, out[i * 3]);
    minY = Math.min(minY, out[i * 3 + 1]); maxY = Math.max(maxY, out[i * 3 + 1]);
    minZ = Math.min(minZ, out[i * 3 + 2]); maxZ = Math.max(maxZ, out[i * 3 + 2]);
  }
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const cz = (minZ + maxZ) / 2;
  const span = Math.max(maxX - minX, maxY - minY, maxZ - minZ) || 1;
  const scale = LOCK_TARGET_SIZE / span;

  const cy1 = Math.cos(LOCK_YAW);
  const sy1 = Math.sin(LOCK_YAW);
  const cx1 = Math.cos(LOCK_PITCH);
  const sx1 = Math.sin(LOCK_PITCH);

  for (let i = 0; i < count; i++) {
    let px = (out[i * 3]     - cx) * scale;
    let py = (out[i * 3 + 1] - cy) * scale;
    let pz = (out[i * 3 + 2] - cz) * scale;

    const xr = cy1 * px + sy1 * pz;
    const zr = -sy1 * px + cy1 * pz;
    px = xr;
    pz = zr;

    const yr = cx1 * py - sx1 * pz;
    const zr2 = sx1 * py + cx1 * pz;
    py = yr;
    pz = zr2;

    py += LOCK_Y_OFFSET;

    out[i * 3]     = px;
    out[i * 3 + 1] = py;
    out[i * 3 + 2] = pz;
  }
  return out;
}

let cachedLogoPositions: Float32Array | null = null;
function getLogoPositionsSync(count: number): Float32Array {
  if (cachedLogoPositions && cachedLogoPositions.length === count * 3) {
    return cachedLogoPositions;
  }
  try {
    const geos = buildLogoGeometriesFromPath(CELAEST_LOGO_PATH_D);
    if (geos.length === 0) {
      cachedLogoPositions = new Float32Array(count * 3);
      return cachedLogoPositions;
    }
    const positions = sampleGeometryList(geos, count, LOGO_TARGET_SIZE, LOGO_Y_OFFSET);
    geos.forEach((g) => g.dispose());
    cachedLogoPositions = positions;
    return positions;
  } catch {
    cachedLogoPositions = new Float32Array(count * 3);
    return cachedLogoPositions;
  }
}

function ParticleSphere({ activeNode, pointer }: { activeNode: SecurityNode; pointer: PointerRef }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const normals = new Float32Array(PARTICLE_COUNT * 3);
    const seeds = new Float32Array(PARTICLE_COUNT);
    const phases = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      let u: number, v: number, s: number;
      do {
        u = Math.random() * 2 - 1;
        v = Math.random() * 2 - 1;
        s = u * u + v * v;
      } while (s >= 1 || s === 0);
      const factor = 2 * Math.sqrt(1 - s);
      const x = u * factor;
      const y = v * factor;
      const z = 1 - 2 * s;

      const r = SPHERE_RADIUS * (0.82 + Math.random() * 0.36);
      positions[i * 3]     = x * r;
      positions[i * 3 + 1] = y * r;
      positions[i * 3 + 2] = z * r;
      normals[i * 3]     = x;
      normals[i * 3 + 1] = y;
      normals[i * 3 + 2] = z;
      seeds[i] = Math.random();
      phases[i] = Math.random();
    }

    const lockPositions   = new Float32Array(positions);
    const shieldPositions = new Float32Array(positions);
    const globePositions  = new Float32Array(positions);
    const logoPositions   = new Float32Array(getLogoPositionsSync(PARTICLE_COUNT));

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aNormal", new THREE.BufferAttribute(normals, 3));
    geo.setAttribute("aLockPos",   new THREE.BufferAttribute(lockPositions,   3));
    geo.setAttribute("aShieldPos", new THREE.BufferAttribute(shieldPositions, 3));
    geo.setAttribute("aGlobePos",  new THREE.BufferAttribute(globePositions,  3));
    geo.setAttribute("aLogoPos",   new THREE.BufferAttribute(logoPositions,   3));
    geo.setAttribute("aSeed",  new THREE.BufferAttribute(seeds,  1));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    return geo;
  }, []);

  const writeTarget = (name: string, data: Float32Array): boolean => {
    const attr = geometryRef.current?.attributes[name] as THREE.BufferAttribute | undefined;
    if (!attr) return false;
    (attr.array as Float32Array).set(data);
    attr.needsUpdate = true;
    return true;
  };

  useEffect(() => {
    let cancelled = false;
    const cleanups: Array<() => void> = [];

    gltfLoader
      .loadAsync("/magic_lock.gltf")
      .then((gltf) => {
        if (cancelled) return;
        const positions = sampleLockPositions(gltf.scene as THREE.Object3D, PARTICLE_COUNT);
        writeTarget("aLockPos", positions);
        
        gltf.scene.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry?.dispose?.();
            const mat = obj.material as THREE.Material | THREE.Material[] | undefined;
            if (Array.isArray(mat)) mat.forEach((m) => m.dispose?.());
            else mat?.dispose?.();
          }
        });
      })
      .catch((err) => console.warn("[ParticleCore] padlock GLTF failed:", err));

    cleanups.push(scheduleIdle(() => {
      if (cancelled) return;
      const shieldGeo = buildShieldGeometry();
      const positions = sampleGeometryList([shieldGeo], PARTICLE_COUNT, SHIELD_TARGET_SIZE, SHIELD_Y_OFFSET);
      shieldGeo.dispose();
      writeTarget("aShieldPos", positions);
    }));

    cleanups.push(scheduleIdle(() => {
      if (cancelled) return;
      const globeGeos = buildGlobeGeometries();
      const positions = sampleGeometryList(globeGeos, PARTICLE_COUNT, GLOBE_TARGET_SIZE, GLOBE_Y_OFFSET);
      globeGeos.forEach((g) => g.dispose());
      writeTarget("aGlobePos", positions);
    }));

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
      geometryRef.current?.dispose();
    };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
      uMorphLock:   { value: 0 },
      uMorphShield: { value: 0 },
      uMorphGlobe:  { value: 0 },
      uMorphLogo:   { value: 1 },
      uTargetDir: { value: new THREE.Vector3(0, 0, 0) },
      uMousePos: { value: new THREE.Vector3(999, 999, 999) },
      uColorMain: { value: new THREE.Color("#FFFFFF") },
      uColorAccent: { value: new THREE.Color("#22d3ee") },
    }),
    [],
  );

  const desiredDir = useMemo(() => new THREE.Vector3(), []);
  const desiredMouse = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const m = materialRef.current;
    if (!m) return;

    m.uniforms.uTime.value = state.clock.elapsedTime;

    const hoverTarget = activeNode ? 1 : 0;
    m.uniforms.uHover.value = THREE.MathUtils.lerp(
      m.uniforms.uHover.value,
      hoverTarget,
      Math.min(1, delta * 4.5),
    );

    const targetLock   = activeNode === "encryption" ? 1 : 0;
    const targetShield = activeNode === "verified" ? 1 : 0;
    const targetGlobe  = activeNode === "infrastructure" ? 1 : 0;
    const targetLogo   = activeNode === "all" || activeNode == null ? 1 : 0;
    const morphLerp    = Math.min(1, delta * 3);
    m.uniforms.uMorphLock.value   = THREE.MathUtils.lerp(m.uniforms.uMorphLock.value,   targetLock,   morphLerp);
    m.uniforms.uMorphShield.value = THREE.MathUtils.lerp(m.uniforms.uMorphShield.value, targetShield, morphLerp);
    m.uniforms.uMorphGlobe.value  = THREE.MathUtils.lerp(m.uniforms.uMorphGlobe.value,  targetGlobe,  morphLerp);
    m.uniforms.uMorphLogo.value   = THREE.MathUtils.lerp(m.uniforms.uMorphLogo.value,   targetLogo,   morphLerp);

    desiredDir.copy(getTargetDir(activeNode));
    m.uniforms.uTargetDir.value.lerp(desiredDir, Math.min(1, delta * 4.5));

    const px = THREE.MathUtils.clamp(pointer.current.x, -1, 1);
    const py = THREE.MathUtils.clamp(pointer.current.y, -1, 1);
    desiredMouse.set(px * 2.6, py * 1.9, 1.4);
    m.uniforms.uMousePos.value.lerp(desiredMouse, Math.min(1, delta * 9));
  });

  return (
    <points
      ref={(node) => {
        geometryRef.current = node ? (node.geometry as THREE.BufferGeometry) : null;
      }}
      geometry={geometry}
      frustumCulled={false}
    >
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
}

interface ParticleCoreCanvasProps {
  activeNode: SecurityNode;
  visible: boolean;
}

export default function ParticleCoreCanvas({ activeNode, visible }: ParticleCoreCanvasProps) {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!visible) return;

    const handleMove = (event: MouseEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [visible]);

  return (
    <Canvas
      camera={{ position: [0, 0, 5.4], fov: 38, near: 0.1, far: 100 }}
      dpr={[1, 1.75]}
      frameloop={visible ? "always" : "never"}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: false,
      }}
    >
      <ParticleSphere activeNode={activeNode} pointer={pointer} />
    </Canvas>
  );
}
