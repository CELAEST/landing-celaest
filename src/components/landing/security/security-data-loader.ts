/**
 * CELAEST · Ultra-Fast Binary Security Core Particle Loader
 * Pre-baked 6,000 particles across 4 targets (lock, shield, globe, logo) + resting sphere
 * 100% faithful to original design · Sub-millisecond initialization · Zero CPU sampling
 */

export interface SecurityParticleData {
  spherePositions: Float32Array;
  normals: Float32Array;
  seeds: Float32Array;
  phases: Float32Array;
  lockPositions: Float32Array;
  shieldPositions: Float32Array;
  globePositions: Float32Array;
  logoPositions: Float32Array;
  count: number;
}

let cachedPromise: Promise<SecurityParticleData> | null = null;
let memoryCache: SecurityParticleData | null = null;

export function getSecurityParticleData(): Promise<SecurityParticleData> {
  if (memoryCache) {
    return Promise.resolve(memoryCache);
  }

  if (!cachedPromise) {
    cachedPromise = fetch("/data/security-particles.bin")
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load security particles: ${res.statusText}`);
        return res.arrayBuffer();
      })
      .then((buffer) => {
        const headerSize = 32;
        const PARTICLE_COUNT = 6000;
        const vec3Bytes = PARTICLE_COUNT * 12;
        const scalarBytes = PARTICLE_COUNT * 4;

        let offset = headerSize;
        const spherePositions = new Float32Array(buffer, offset, PARTICLE_COUNT * 3);
        offset += vec3Bytes;

        const normals = new Float32Array(buffer, offset, PARTICLE_COUNT * 3);
        offset += vec3Bytes;

        const seeds = new Float32Array(buffer, offset, PARTICLE_COUNT);
        offset += scalarBytes;

        const phases = new Float32Array(buffer, offset, PARTICLE_COUNT);
        offset += scalarBytes;

        const lockPositions = new Float32Array(buffer, offset, PARTICLE_COUNT * 3);
        offset += vec3Bytes;

        const shieldPositions = new Float32Array(buffer, offset, PARTICLE_COUNT * 3);
        offset += vec3Bytes;

        const globePositions = new Float32Array(buffer, offset, PARTICLE_COUNT * 3);
        offset += vec3Bytes;

        const logoPositions = new Float32Array(buffer, offset, PARTICLE_COUNT * 3);

        const data: SecurityParticleData = {
          spherePositions,
          normals,
          seeds,
          phases,
          lockPositions,
          shieldPositions,
          globePositions,
          logoPositions,
          count: PARTICLE_COUNT,
        };

        memoryCache = data;
        return data;
      });
  }

  return cachedPromise;
}

export function preloadSecurityParticles(): void {
  if (typeof window === "undefined") return;
  getSecurityParticleData().catch(() => {});
}
