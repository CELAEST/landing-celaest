/**
 * CELAEST · Ultra-Fast Binary Brain Particle Loader
 * Loads 27,000 pre-baked 3D positions and normals directly into VRAM
 * Zero CPU sampling · Zero GLTF overhead · Sub-millisecond initialization
 */

export interface BrainParticleData {
  layerA: {
    positions: Float32Array;
    normals: Float32Array;
    count: number;
  };
  layerB: {
    positions: Float32Array;
    normals: Float32Array;
    count: number;
  };
}

let cachedPromise: Promise<BrainParticleData> | null = null;
let memoryCache: BrainParticleData | null = null;

export function getBrainParticleData(): Promise<BrainParticleData> {
  if (memoryCache) {
    return Promise.resolve(memoryCache);
  }

  if (!cachedPromise) {
    cachedPromise = fetch("/data/brain-particles.bin")
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load brain particles: ${res.statusText}`);
        return res.arrayBuffer();
      })
      .then((buffer) => {
        const headerSize = 32;
        const LAYER_A_COUNT = 18000;
        const LAYER_B_COUNT = 9000;

        // Byte offsets
        let offset = headerSize;
        const posA = new Float32Array(buffer, offset, LAYER_A_COUNT * 3);
        offset += LAYER_A_COUNT * 12;

        const normA = new Float32Array(buffer, offset, LAYER_A_COUNT * 3);
        offset += LAYER_A_COUNT * 12;

        const posB = new Float32Array(buffer, offset, LAYER_B_COUNT * 3);
        offset += LAYER_B_COUNT * 12;

        const normB = new Float32Array(buffer, offset, LAYER_B_COUNT * 3);

        const data: BrainParticleData = {
          layerA: {
            positions: posA,
            normals: normA,
            count: LAYER_A_COUNT,
          },
          layerB: {
            positions: posB,
            normals: normB,
            count: LAYER_B_COUNT,
          },
        };

        memoryCache = data;
        return data;
      });
  }

  return cachedPromise;
}

export function preloadBrainParticles(): void {
  if (typeof window === "undefined") return;
  getBrainParticleData().catch(() => {});
}

