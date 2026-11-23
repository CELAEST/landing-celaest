import { describe, expect, it, vi } from "vitest";
import worker, { parseByteRange } from "../worker.js";

describe("Worker HTTP 206 Range Support for /videos/*", () => {
  const payload = new Uint8Array([10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);

  const mockAssetsEnv = {
    ASSETS: {
      fetch: async () =>
        new Response(payload, {
          status: 200,
          headers: {
            "Content-Type": "video/mp4",
            "Content-Length": String(payload.byteLength),
          },
        }),
    },
  };

  it("parses standard, open-ended, suffix, and out-of-bounds Range headers", () => {
    expect(parseByteRange("bytes=0-1", 10)).toEqual({ start: 0, end: 1 });
    expect(parseByteRange("bytes=5-", 10)).toEqual({ start: 5, end: 9 });
    expect(parseByteRange("bytes=-3", 10)).toEqual({ start: 7, end: 9 });
    expect(parseByteRange("bytes=10-12", 10)).toBeNull();
    expect(parseByteRange("bytes=5-2", 10)).toBeNull();
  });

  it("returns 200 with Accept-Ranges: bytes for full GET requests", async () => {
    const res = await worker.fetch(
      new Request("https://celaest.com/videos/demo.mp4"),
      mockAssetsEnv,
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("accept-ranges")).toBe("bytes");
    expect(new Uint8Array(await res.arrayBuffer())).toEqual(payload);
  });

  it("returns exact 206 Partial Content slice for Safari/Chrome byte ranges", async () => {
    const res = await worker.fetch(
      new Request("https://celaest.com/videos/demo.mp4", {
        headers: { Range: "bytes=2-5" },
      }),
      mockAssetsEnv,
    );
    expect(res.status).toBe(206);
    expect(res.headers.get("accept-ranges")).toBe("bytes");
    expect(res.headers.get("content-range")).toBe("bytes 2-5/10");
    expect(res.headers.get("content-length")).toBe("4");
    expect(new Uint8Array(await res.arrayBuffer())).toEqual(new Uint8Array([12, 13, 14, 15]));
  });

  it("returns 416 Range Not Satisfiable on invalid offset", async () => {
    const res = await worker.fetch(
      new Request("https://celaest.com/videos/demo.mp4", {
        headers: { Range: "bytes=99-120" },
      }),
      mockAssetsEnv,
    );
    expect(res.status).toBe(416);
    expect(res.headers.get("content-range")).toBe("bytes */10");
  });

  it("pings all Render health endpoints on scheduled cron execution", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("ok", { status: 200 }));
    const pending: Promise<unknown>[] = [];

    await worker.scheduled(
      {},
      {},
      {
        waitUntil: (promise: Promise<unknown>) => {
          pending.push(promise);
        },
      },
    );

    await Promise.all(pending);

    expect(fetchSpy).toHaveBeenCalledTimes(3);
    const calledUrls = fetchSpy.mock.calls.map(([input]) => String(input));
    expect(calledUrls).toEqual([
      "https://celaest-back.onrender.com/health",
      "https://celaest-english-back-8xpa.onrender.com/health",
      "https://celaest-core-c4o7.onrender.com/health",
    ]);

    fetchSpy.mockRestore();
  });
});
