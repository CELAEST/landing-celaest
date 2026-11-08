/**
 * CELAEST Robot Binary DMA Loader with CacheStorage & In-Flight Deduplication
 * Guarantees zero duplicate network requests, promise deduplication, and 0ms repeat retrieval.
 */

const CACHE_NAME = "celaest-robot-assets-v1";

// Level 1: Memory cache of parsed blobs to avoid re-parsing ArrayBuffers
const memoryBlobCache = new Map<string, Blob[]>();

// In-flight singleton promises to guarantee NO duplicate concurrent network requests
const inFlightRequests = new Map<string, Promise<Blob[]>>();

export function clearRobotBinaryMemoryCache(): void {
  memoryBlobCache.clear();
  inFlightRequests.clear();
}

export async function isBundleInCache(url: string): Promise<boolean> {
  if (memoryBlobCache.has(url)) return true;
  if (typeof window !== "undefined" && "caches" in window) {
    try {
      const cache = await window.caches.open(CACHE_NAME);
      const matched = await cache.match(url);
      return Boolean(matched);
    } catch {
      return false;
    }
  }
  return false;
}

export async function loadRobotBinaryBundle(
  url: string,
  expectedMagic: "CGAZ" | "CSAL",
): Promise<Blob[]> {
  // 1. Instant Level 1 Memory Cache (0ms, 0 allocations)
  const cachedBlobs = memoryBlobCache.get(url);
  if (cachedBlobs) {
    return cachedBlobs;
  }

  // 2. In-Flight Request Deduplication: if already being loaded, return same Promise
  const inFlight = inFlightRequests.get(url);
  if (inFlight) {
    return inFlight;
  }

  const loadPromise = (async () => {
    let res: Response | undefined;

    // 3. Level 2: Browser CacheStorage (0ms local disk/SSD retrieval)
    if (typeof window !== "undefined" && "caches" in window) {
      try {
        const cache = await window.caches.open(CACHE_NAME);
        const cached = await cache.match(url);
        if (cached && cached.ok) {
          res = cached;
        } else {
          // Level 3: Network fetch with force-cache and async storage persistence
          const networkRes = await fetch(url, { cache: "force-cache" });
          if (networkRes.ok) {
            cache.put(url, networkRes.clone()).catch(() => {
              // Ignore cache storage errors on private/incognito quota limits
            });
            res = networkRes;
          }
        }
      } catch {
        // Fallback to direct network fetch if CacheStorage is blocked/restricted
      }
    }

    if (!res) {
      res = await fetch(url, { cache: "force-cache" });
    }

    if (!res.ok) {
      throw new Error(`Failed to load robot binary container: ${url} (${res.status})`);
    }

    const arrayBuffer = await res.arrayBuffer();
    const dataView = new DataView(arrayBuffer);

    // Validate Magic: 4 bytes ASCII
    const magic = String.fromCharCode(
      dataView.getUint8(0),
      dataView.getUint8(1),
      dataView.getUint8(2),
      dataView.getUint8(3),
    );

    if (magic !== expectedMagic) {
      throw new Error(`Invalid robot bundle magic: expected ${expectedMagic}, got ${magic}`);
    }

    const frameCount = dataView.getUint16(6, true);
    const HEADER_SIZE = 8;
    const INDEX_ENTRY_SIZE = 8;

    const blobs: Blob[] = new Array(frameCount);

    for (let i = 0; i < frameCount; i++) {
      const entryOffset = HEADER_SIZE + i * INDEX_ENTRY_SIZE;
      const fileOffset = dataView.getUint32(entryOffset, true);
      const fileLength = dataView.getUint32(entryOffset + 4, true);

      blobs[i] = new Blob([arrayBuffer.slice(fileOffset, fileOffset + fileLength)], {
        type: "image/webp",
      });
    }

    // Persist in Level 1 memory cache
    memoryBlobCache.set(url, blobs);
    return blobs;
  })().finally(() => {
    // Clean up in-flight tracker once settled
    inFlightRequests.delete(url);
  });

  inFlightRequests.set(url, loadPromise);
  return loadPromise;
}
