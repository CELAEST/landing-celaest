/**
 * CELAEST Robot Binary DMA Loader with CacheStorage Support
 * Delivers single-request DMA batch loading with 0ms repeat-visit persistence.
 */

const CACHE_NAME = "celaest-robot-assets-v1";

export async function loadRobotBinaryBundle(
  url: string,
  expectedMagic: "CGAZ" | "CSAL",
): Promise<Blob[]> {
  let res: Response | undefined;

  // 1. Try serving directly from local browser CacheStorage (0ms local retrieval)
  if (typeof window !== "undefined" && "caches" in window) {
    try {
      const cache = await window.caches.open(CACHE_NAME);
      const cached = await cache.match(url);
      if (cached) {
        res = cached;
      } else {
        const networkRes = await fetch(url);
        if (networkRes.ok) {
          // Asynchronously persist to CacheStorage without blocking execution
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

  // 2. Direct network fetch fallback if not obtained from cache
  if (!res) {
    res = await fetch(url);
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

  return blobs;
}
