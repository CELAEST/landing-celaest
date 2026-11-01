import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("CELAEST Prebaked Binary Assets Verification", () => {
  const brainBinPath = path.resolve(process.cwd(), "public/data/brain-particles.bin");
  const securityBinPath = path.resolve(process.cwd(), "public/data/security-particles.bin");

  it("verifies brain-particles.bin exists and has exact binary specification", () => {
    expect(fs.existsSync(brainBinPath)).toBe(true);
    const buffer = fs.readFileSync(brainBinPath);

    // 32 header + (18000 + 18000 + 9000 + 9000) * 12 bytes = 648032 bytes
    const expectedSize = 32 + (18000 * 2 + 9000 * 2) * 12;
    expect(buffer.byteLength).toBe(expectedSize);

    // Verify header string
    const headerStr = buffer.subarray(0, 16).toString("ascii").replace(/\0+$/, "");
    expect(headerStr).toBe("CELAEST_BRAIN_V1");

    // Read Float32Arrays and verify no NaNs or Infinities
    let offset = 32;
    const posA = new Float32Array(buffer.buffer, buffer.byteOffset + offset, 18000 * 3);
    offset += 18000 * 12;
    const normA = new Float32Array(buffer.buffer, buffer.byteOffset + offset, 18000 * 3);
    offset += 18000 * 12;
    const posB = new Float32Array(buffer.buffer, buffer.byteOffset + offset, 9000 * 3);
    offset += 9000 * 12;
    const normB = new Float32Array(buffer.buffer, buffer.byteOffset + offset, 9000 * 3);

    expect(posA.length).toBe(54000);
    expect(normA.length).toBe(54000);
    expect(posB.length).toBe(27000);
    expect(normB.length).toBe(27000);

    // Sample checks for numerical sanity
    for (let i = 0; i < 1000; i++) {
      expect(Number.isFinite(posA[i])).toBe(true);
      expect(Number.isFinite(normA[i])).toBe(true);
      expect(Number.isFinite(posB[i])).toBe(true);
      expect(Number.isFinite(normB[i])).toBe(true);
    }
  });

  it("verifies security-particles.bin exists and contains all 4 morph targets + resting sphere", () => {
    expect(fs.existsSync(securityBinPath)).toBe(true);
    const buffer = fs.readFileSync(securityBinPath);

    // 32 header + 6000 particles * 3 coords * 4 bytes * 6 vec3 layers + 6000 particles * 4 bytes * 2 scalar layers = 480032 bytes
    const expectedSize = 32 + 6000 * 12 * 6 + 6000 * 4 * 2;
    expect(buffer.byteLength).toBe(expectedSize);

    // Verify header string
    const headerStr = buffer.subarray(0, 16).toString("ascii").replace(/\0+$/, "");
    expect(headerStr).toBe("CELAEST_SEC_V2");

    let offset = 32;
    const count = 6000;
    const sphere = new Float32Array(buffer.buffer, buffer.byteOffset + offset, count * 3);
    offset += count * 12;
    const normals = new Float32Array(buffer.buffer, buffer.byteOffset + offset, count * 3);
    offset += count * 12;
    const seeds = new Float32Array(buffer.buffer, buffer.byteOffset + offset, count);
    offset += count * 4;
    const phases = new Float32Array(buffer.buffer, buffer.byteOffset + offset, count);
    offset += count * 4;
    const lock = new Float32Array(buffer.buffer, buffer.byteOffset + offset, count * 3);
    offset += count * 12;
    const shield = new Float32Array(buffer.buffer, buffer.byteOffset + offset, count * 3);
    offset += count * 12;
    const globe = new Float32Array(buffer.buffer, buffer.byteOffset + offset, count * 3);
    offset += count * 12;
    const logo = new Float32Array(buffer.buffer, buffer.byteOffset + offset, count * 3);

    expect(sphere.length).toBe(18000);
    expect(normals.length).toBe(18000);
    expect(seeds.length).toBe(6000);
    expect(phases.length).toBe(6000);
    expect(lock.length).toBe(18000);
    expect(shield.length).toBe(18000);
    expect(globe.length).toBe(18000);
    expect(logo.length).toBe(18000);

    // Check numerical validity across all attributes
    for (let i = 0; i < 500; i++) {
      expect(Number.isFinite(sphere[i])).toBe(true);
      expect(Number.isFinite(normals[i])).toBe(true);
      expect(Number.isFinite(seeds[i])).toBe(true);
      expect(Number.isFinite(phases[i])).toBe(true);
      expect(Number.isFinite(lock[i])).toBe(true);
      expect(Number.isFinite(shield[i])).toBe(true);
      expect(Number.isFinite(globe[i])).toBe(true);
      expect(Number.isFinite(logo[i])).toBe(true);
    }
  });
});

