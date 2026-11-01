/**
 * CELAEST · Ultra-Fast Binary Security Core Particle Loader
 * Pre-baked 6,000 particles across 4 targets (lock, shield, globe, logo)
 * Zero GLTF parsing · Zero CPU sampling · Sub-millisecond initialization
 */

export interface SecurityParticleData {
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
        const layerBytes = PARTICLE_COUNT * 12;

        let offset = headerSize;
        const lock = new Float32Array(buffer, offset, PARTICLE_COUNT * 3);
        offset += layerBytes;

        const shield = new Float32Array(buffer, offset, PARTICLE_COUNT * 3);
        offset += layerBytes;

        const globe = new Float32Array(buffer, offset, PARTICLE_COUNT * 3);
        offset += layerBytes;

        const logo = new Float32Array(buffer, offset, PARTICLE_COUNT * 3);

        const data: SecurityParticleData = {
          lockPositions: lock,
          shieldPositions: shield,
          globePositions: globe,
          logoPositions: logo,
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

