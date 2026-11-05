import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getSecurityParticleData, type SecurityParticleData } from "./security-data-loader";

export type ActiveSecurityPillar = "shield" | "lock" | "globe";

const MASTER_VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uMorphShield;
  uniform float uMorphLock;
  uniform float uMorphGlobe;
  uniform float uHover;
  uniform float uRotation;
  uniform vec3  uMousePos;
  uniform vec3  uColorMain;
  uniform vec3  uColorAccent;
  uniform vec3  uColorCore;

  attribute vec3  aNormal;
  attribute vec3  aShieldPos;
  attribute vec3  aLockPos;
  attribute vec3  aGlobePos;
  attribute float aSeed;
  attribute float aPhase;

  varying float vAlpha;
  varying vec3  vColor;

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
    float e = 0.08;
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
    vec3 spherePos = position * 0.95;

    // Centered lock position
    vec3 lockPos = aLockPos;
    lockPos.x += 0.11;

    // Fluid Multi-Target Interpolation across all 3 shapes
    vec3 targetPos = spherePos;
    targetPos = mix(targetPos, aShieldPos, clamp(uMorphShield, 0.0, 1.0));
    targetPos = mix(targetPos, lockPos,    clamp(uMorphLock,   0.0, 1.0));
    targetPos = mix(targetPos, aGlobePos,  clamp(uMorphGlobe,  0.0, 1.0));

    float totalMorph = max(max(uMorphShield, uMorphLock), uMorphGlobe);

    // Silky organic drift
    float life = fract(aPhase + uTime * 0.08);
    float breathe = sin(life * 3.14159) * 0.5 + 0.5;
    vec3 normalPush = aNormal * 0.015 * breathe;
    vec3 flow = curlNoise(targetPos * 0.6 + uTime * 0.08 + aSeed * 6.28);
    float driftStrength = mix(0.12, 0.02, totalMorph);
    vec3 pos = targetPos + normalPush + flow * driftStrength;

    // Smooth 3D tilt: keeps Shield and Lock facing forward (+/- 16 deg) while Globe spins continuously
    float swayAngle = sin(uTime * 0.5) * 0.26;
    float rotAngle = mix(swayAngle, uRotation, clamp(uMorphGlobe, 0.0, 1.0));
    float cosA = cos(rotAngle);
    float sinA = sin(rotAngle);
    float rotX = pos.x * cosA - pos.z * sinA;
    float rotZ = pos.x * sinA + pos.z * cosA;
    pos.x = mix(pos.x, rotX, totalMorph * 0.95);
    pos.z = mix(pos.z, rotZ, totalMorph * 0.95);

    // Gentle magnetic mouse attraction
    vec3 toCursor = uMousePos - pos;
    float dist = length(toCursor);
    float radius = 2.4;
    float attract = smoothstep(radius, 0.0, dist) * uHover;
    pos += toCursor * attract * 0.045;

    // High fidelity color grading
    float r = length(pos);
    vec3 c = mix(uColorCore, uColorMain, smoothstep(0.0, 1.3, r));
    c = mix(c, uColorAccent, step(0.70, aSeed));
    
    float sparkle = sin(uTime * 2.5 + aSeed * 20.0) * 0.5 + 0.5;
    c += uColorAccent * (sparkle * 0.25 * totalMorph);
    vColor = c;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    float depthAlpha = smoothstep(-14.0, -1.0, mvPosition.z);

    float baseAlpha = mix(0.28, 0.55, totalMorph);
    vAlpha = depthAlpha * baseAlpha * (0.4 + aSeed * 0.6);

    float baseSize = mix(1.15, 1.45, aSeed);
    gl_PointSize = baseSize * (7.0 / -mvPosition.z) * mix(0.95, 1.15, totalMorph);
    gl_Position  = projectionMatrix * mvPosition;
  }
`;

const MASTER_FRAGMENT_SHADER = /* glsl */ `
  varying vec3  vColor;
  varying float vAlpha;
  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.22, d) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor, a);
  }
`;

function MasterParticleMesh({
  data,
  activePillar,
  pointer,
  isHovered,
}: {
  data: SecurityParticleData;
  activePillar: ActiveSecurityPillar;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  isHovered: boolean;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const morphShield = useRef(activePillar === "shield" ? 1 : 0);
  const morphLock = useRef(activePillar === "lock" ? 1 : 0);
  const morphGlobe = useRef(activePillar === "globe" ? 1 : 0);
  const rotationAccum = useRef(0);
  const smoothedMouse = useRef(new THREE.Vector3(999, 999, 999));

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(data.spherePositions, 3));
    geo.setAttribute("aNormal", new THREE.BufferAttribute(data.normals, 3));
    geo.setAttribute("aShieldPos", new THREE.BufferAttribute(data.shieldPositions, 3));
    geo.setAttribute("aLockPos", new THREE.BufferAttribute(data.lockPositions, 3));
    geo.setAttribute("aGlobePos", new THREE.BufferAttribute(data.globePositions, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(data.seeds, 1));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(data.phases, 1));
    return geo;
  }, [data]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMorphShield: { value: 0 },
      uMorphLock: { value: 0 },
      uMorphGlobe: { value: 0 },
      uHover: { value: 0 },
      uRotation: { value: 0 },
      uMousePos: { value: new THREE.Vector3(999, 999, 999) },
      uColorCore: { value: new THREE.Color("#4c1d95") },
      uColorMain: { value: new THREE.Color("#a855f7") },
      uColorAccent: { value: new THREE.Color("#e9d5ff") },
    }),
    [],
  );

  useFrame((state, delta) => {
    const m = materialRef.current;
    if (!m) return;

    m.uniforms.uTime.value = state.clock.elapsedTime;

    // Smooth Multi-target crossfade
    const targetShield = activePillar === "shield" ? 1.0 : 0.0;
    const targetLock = activePillar === "lock" ? 1.0 : 0.0;
    const targetGlobe = activePillar === "globe" ? 1.0 : 0.0;

    morphShield.current = THREE.MathUtils.damp(morphShield.current, targetShield, 2.6, delta);
    morphLock.current = THREE.MathUtils.damp(morphLock.current, targetLock, 2.6, delta);
    morphGlobe.current = THREE.MathUtils.damp(morphGlobe.current, targetGlobe, 2.6, delta);

    m.uniforms.uMorphShield.value = morphShield.current;
    m.uniforms.uMorphLock.value = morphLock.current;
    m.uniforms.uMorphGlobe.value = morphGlobe.current;

    // Continuous rotation
    rotationAccum.current += delta * 0.32;
    m.uniforms.uRotation.value = rotationAccum.current;

    // Mouse smoothing
    const px = THREE.MathUtils.clamp(pointer.current.x, -1, 1);
    const py = THREE.MathUtils.clamp(pointer.current.y, -1, 1);
    const targetX = isHovered ? px * 2.5 : 999;
    const targetY = isHovered ? py * 1.8 : 999;

    smoothedMouse.current.x = THREE.MathUtils.damp(smoothedMouse.current.x, targetX, 4.0, delta);
    smoothedMouse.current.y = THREE.MathUtils.damp(smoothedMouse.current.y, targetY, 4.0, delta);
    m.uniforms.uMousePos.value.copy(smoothedMouse.current);

    // Color theme morphing based on pillar
    if (activePillar === "globe") {
      m.uniforms.uColorCore.value.lerp(new THREE.Color("#0369a1"), delta * 2.0);
      m.uniforms.uColorMain.value.lerp(new THREE.Color("#38bdf8"), delta * 2.0);
      m.uniforms.uColorAccent.value.lerp(new THREE.Color("#bae6fd"), delta * 2.0);
    } else if (activePillar === "shield") {
      m.uniforms.uColorCore.value.lerp(new THREE.Color("#3b0764"), delta * 2.0);
      m.uniforms.uColorMain.value.lerp(new THREE.Color("#8b5cf6"), delta * 2.0);
      m.uniforms.uColorAccent.value.lerp(new THREE.Color("#f5d0fe"), delta * 2.0);
    } else {
      m.uniforms.uColorCore.value.lerp(new THREE.Color("#4c1d95"), delta * 2.0);
      m.uniforms.uColorMain.value.lerp(new THREE.Color("#a855f7"), delta * 2.0);
      m.uniforms.uColorAccent.value.lerp(new THREE.Color("#e9d5ff"), delta * 2.0);
    }
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={MASTER_VERTEX_SHADER}
        fragmentShader={MASTER_FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

interface UnifiedParticleMasterStageProps {
  activePillar: ActiveSecurityPillar;
}

export function UnifiedParticleMasterStage({ activePillar }: UnifiedParticleMasterStageProps) {
  const [data, setData] = useState<SecurityParticleData | null>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getSecurityParticleData()
      .then((d) => setData(d))
      .catch((err) => console.error("Error loading particles", err));
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    pointer.current = { x: nx, y: ny };
  };

  return (
    <div
      ref={containerRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onPointerMove={handlePointerMove}
      className="sec-stage-canvas-inner"
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Dynamic atmospheric back aura */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          backgroundColor:
            activePillar === "globe"
              ? "rgba(56, 189, 248, 0.12)"
              : activePillar === "shield"
                ? "rgba(139, 92, 246, 0.12)"
                : "rgba(168, 85, 247, 0.15)",
          filter: "blur(60px)",
          pointerEvents: "none",
          transition: "background-color 0.8s ease",
        }}
      />

      {data && (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 4.2], fov: 42 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <MasterParticleMesh
            data={data}
            activePillar={activePillar}
            pointer={pointer}
            isHovered={isHovered}
          />
        </Canvas>
      )}
    </div>
  );
}
