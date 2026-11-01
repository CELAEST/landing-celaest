"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getSecurityParticleData, SecurityParticleData } from "./security-data-loader";

// =====================================================================
// CELAEST · Ultra-Fast Binary Security Core Particle Canvas
// GPU Direct Binary Stream · 60 FPS Locked · 0ms Sampling Overhead
// =====================================================================

type SecurityNode = "verified" | "encryption" | "infrastructure" | "all" | null;
type PointerRef = React.MutableRefObject<{ x: number; y: number }>;

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
    vec3 spherePos = position;

    // Combined morphing
    vec3 basePos = spherePos;
    basePos = mix(basePos, aLockPos,   clamp(uMorphLock,   0.0, 1.0));
    basePos = mix(basePos, aShieldPos, clamp(uMorphShield, 0.0, 1.0));
    basePos = mix(basePos, aGlobePos,  clamp(uMorphGlobe,  0.0, 1.0));
    basePos = mix(basePos, aLogoPos,   clamp(uMorphLogo,   0.0, 1.0));

    // Breathing motion
    float life   = fract(aPhase + uTime * 0.12);
    float breathe = sin(life * 3.14159) * 0.5 + 0.5;
    vec3 normalPush = aNormal * 0.02 * breathe;
    vec3 flow       = curlNoise(basePos * 0.6 + uTime * 0.12 + aSeed * 6.28);
    float activeMorph = max(max(uMorphLock, uMorphShield), max(uMorphGlobe, uMorphLogo));
    float driftStrength = mix(0.18, 0.03, activeMorph);
    vec3 pos = basePos + normalPush + flow * driftStrength;

    // Directional pull toward active node
    pos += uTargetDir * 0.28 * uHover * (0.6 + aSeed * 0.5);

    // Subtle cursor attraction
    vec3 toCursor = uMousePos - pos;
    float dist = length(toCursor);
    float radius = 2.4;
    float attract = smoothstep(radius, 0.0, dist) * uHover;
    pos += toCursor * attract * 0.16;

    // Color & Alpha
    float accentMix = step(0.72, aSeed);
    vColor = mix(uColorMain, uColorAccent, accentMix);
    vColor *= (0.75 + attract * 0.6);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    float depthAlpha = smoothstep(-10.0, -1.0, mvPosition.z);
    vAlpha = depthAlpha * (0.45 + aSeed * 0.55);
    vAlpha *= (1.0 + attract * 0.4);

    gl_PointSize = (1.8 + aSeed * 1.4) * (8.0 / -mvPosition.z);
    gl_Position  = projectionMatrix * mvPosition;
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

function ParticleSphere({
  activeNode,
  pointer,
  data,
}: {
  activeNode: SecurityNode;
  pointer: PointerRef;
  data: SecurityParticleData;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position",   new THREE.BufferAttribute(data.spherePositions, 3));
    geo.setAttribute("aNormal",    new THREE.BufferAttribute(data.normals, 3));
    geo.setAttribute("aLockPos",   new THREE.BufferAttribute(data.lockPositions,   3));
    geo.setAttribute("aShieldPos", new THREE.BufferAttribute(data.shieldPositions, 3));
    geo.setAttribute("aGlobePos",  new THREE.BufferAttribute(data.globePositions,  3));
    geo.setAttribute("aLogoPos",   new THREE.BufferAttribute(data.logoPositions,   3));
    geo.setAttribute("aSeed",      new THREE.BufferAttribute(data.seeds, 1));
    geo.setAttribute("aPhase",     new THREE.BufferAttribute(data.phases, 1));
    return geo;
  }, [data]);

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
      uColorAccent: { value: new THREE.Color("#a78bfa") },
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
}

interface ParticleCoreCanvasProps {
  activeNode: SecurityNode;
  visible: boolean;
}

export default function ParticleCoreCanvas({ activeNode, visible }: ParticleCoreCanvasProps) {
  const pointer = useRef({ x: 0, y: 0 });
  const [data, setData] = useState<SecurityParticleData | null>(null);

  useEffect(() => {
    let active = true;
    getSecurityParticleData().then((res) => {
      if (active) setData(res);
    });
    return () => {
      active = false;
    };
  }, []);

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
      dpr={[1, 1.5]}
      frameloop={visible ? "always" : "never"}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: false,
      }}
    >
      {data && <ParticleSphere activeNode={activeNode} pointer={pointer} data={data} />}
    </Canvas>
  );
}
