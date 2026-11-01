/**
 * CELAEST · Security Core Particles Pre-Baking Utility (Faithful Reproduction)
 * Pre-computes EXACT original geometries and transforms:
 *  - Padlock: magic_lock.gltf sampled with original name filter, centering & pitch/yaw
 *  - Shield: original extruded procedural shield with identical curves and bevel
 *  - Globe: original 14 toruses (latitudes + meridians)
 *  - Logo: official CELAEST_LOGO_PATH_D from src/components/ui/logo-path.ts
 *  - Sphere: resting sphere positions, normals, seeds, phases
 * Outputs: public/data/security-particles.bin (480 KB uncompressed, ~130 KB gzipped)
 */

global.ProgressEvent = class ProgressEvent {};
const { JSDOM } = require("jsdom");
global.DOMParser = new JSDOM().window.DOMParser;
const fs = require("fs");
const path = require("path");
const THREE = require("three");
const { GLTFLoader, MeshSurfaceSampler, SVGLoader } = require("three-stdlib");

const PARTICLE_COUNT = 6000;
const SPHERE_RADIUS = 0.9;
const LOCK_TARGET_SIZE = 2.05;
const LOCK_Y_OFFSET = 0.33;
const LOCK_YAW = 1.4;
const LOCK_PITCH = 0;

const SHIELD_TARGET_SIZE = 2.0;
const SHIELD_Y_OFFSET = 0.33;
const GLOBE_TARGET_SIZE = 1.95;
const GLOBE_Y_OFFSET = 0.33;
const LOGO_TARGET_SIZE = 2.0;
const LOGO_Y_OFFSET = 0.33;

// Read CELAEST_LOGO_PATH_D directly from source of truth
const logoPathFile = fs.readFileSync(path.join(__dirname, "../src/components/ui/logo-path.ts"), "utf8");
const logoMatch = logoPathFile.match(/CELAEST_LOGO_PATH_D\s*=\s*"([^"]+)"/);
if (!logoMatch) {
  throw new Error("Could not extract CELAEST_LOGO_PATH_D from logo-path.ts");
}
const CELAEST_LOGO_PATH_D = logoMatch[1];
console.log("Extracted official CELAEST logo path, length:", CELAEST_LOGO_PATH_D.length);

// ---- Procedural target geometries (100% faithful to original) ----

function buildShieldGeometry() {
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

function buildGlobeGeometries() {
  const radius = 1;
  const tube = 0.028;
  const out = [];
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

function normalizePositions(out, count, targetSize, yOffset) {
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

function buildLogoGeometriesFromPath(d) {
  const loader = new SVGLoader();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 503"><path d="${d}"/></svg>`;
  const data = loader.parse(svg);
  const geos = [];
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

function sampleGeometryList(geos, count, targetSize, yOffset) {
  const samplers = [];
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

function sampleLockPositions(scene, count) {
  const samplers = [];
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
    out[i * 3]     = tempPos.x;
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

function generateSphereData(count) {
  const positions = new Float32Array(count * 3);
  const normals = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const phases = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    let u, v, s;
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

  return { positions, normals, seeds, phases };
}

async function run() {
  console.log("Generating resting sphere data...");
  const sphere = generateSphereData(PARTICLE_COUNT);

  console.log("Sampling Shield (original formula)...");
  const shieldGeo = buildShieldGeometry();
  const shieldPositions = sampleGeometryList([shieldGeo], PARTICLE_COUNT, SHIELD_TARGET_SIZE, SHIELD_Y_OFFSET);
  shieldGeo.dispose();

  console.log("Sampling Globe (original formula)...");
  const globeGeos = buildGlobeGeometries();
  const globePositions = sampleGeometryList(globeGeos, PARTICLE_COUNT, GLOBE_TARGET_SIZE, GLOBE_Y_OFFSET);
  globeGeos.forEach((g) => g.dispose());

  console.log("Sampling Logo (official CELAEST silhouette)...");
  const logoGeos = buildLogoGeometriesFromPath(CELAEST_LOGO_PATH_D);
  const logoPositions = sampleGeometryList(logoGeos, PARTICLE_COUNT, LOGO_TARGET_SIZE, LOGO_Y_OFFSET);
  logoGeos.forEach((g) => g.dispose());

  console.log("Sampling Padlock GLTF (original name-filtered meshes)...");
  const gltfLoader = new GLTFLoader();
  const lockData = fs.readFileSync(path.join(__dirname, "../public/magic_lock.gltf"));
  const gltf = await new Promise((resolve, reject) => {
    gltfLoader.parse(lockData.buffer.slice(lockData.byteOffset, lockData.byteOffset + lockData.byteLength), "", resolve, reject);
  });
  const lockPositions = sampleLockPositions(gltf.scene, PARTICLE_COUNT);

  // Binary Layout Specification (Header 32 bytes):
  // 0-16: Magic string "CELAEST_SEC_V2"
  // 16-20: Version uint32 = 2
  // 20-24: Particle count uint32 = 6000
  // 24-28: Reserved uint32 = 0
  // 28-32: Reserved uint32 = 0
  // Layers:
  // 1. spherePositions:  6000 * 3 * 4 = 72,000 bytes
  // 2. normals:          6000 * 3 * 4 = 72,000 bytes
  // 3. seeds:            6000 * 1 * 4 = 24,000 bytes
  // 4. phases:           6000 * 1 * 4 = 24,000 bytes
  // 5. lockPositions:    6000 * 3 * 4 = 72,000 bytes
  // 6. shieldPositions:  6000 * 3 * 4 = 72,000 bytes
  // 7. globePositions:   6000 * 3 * 4 = 72,000 bytes
  // 8. logoPositions:    6000 * 3 * 4 = 72,000 bytes
  // Total = 32 + 72000*6 + 24000*2 = 480,032 bytes
  const headerSize = 32;
  const vec3Bytes = PARTICLE_COUNT * 12;
  const scalarBytes = PARTICLE_COUNT * 4;
  const totalBytes = headerSize + vec3Bytes * 6 + scalarBytes * 2;
  const outBuffer = Buffer.alloc(totalBytes);

  outBuffer.write("CELAEST_SEC_V2", 0, 16, "ascii");
  outBuffer.writeUInt32LE(2, 16);
  outBuffer.writeUInt32LE(PARTICLE_COUNT, 20);
  outBuffer.writeUInt32LE(8, 24); // 8 attributes
  outBuffer.writeUInt32LE(0, 28);

  let offset = headerSize;
  Buffer.from(sphere.positions.buffer).copy(outBuffer, offset);
  offset += vec3Bytes;
  Buffer.from(sphere.normals.buffer).copy(outBuffer, offset);
  offset += vec3Bytes;
  Buffer.from(sphere.seeds.buffer).copy(outBuffer, offset);
  offset += scalarBytes;
  Buffer.from(sphere.phases.buffer).copy(outBuffer, offset);
  offset += scalarBytes;
  Buffer.from(lockPositions.buffer).copy(outBuffer, offset);
  offset += vec3Bytes;
  Buffer.from(shieldPositions.buffer).copy(outBuffer, offset);
  offset += vec3Bytes;
  Buffer.from(globePositions.buffer).copy(outBuffer, offset);
  offset += vec3Bytes;
  Buffer.from(logoPositions.buffer).copy(outBuffer, offset);

  const outPath = path.join(__dirname, "../public/data/security-particles.bin");
  fs.writeFileSync(outPath, outBuffer);
  console.log("Successfully generated:", outPath, "(", outBuffer.length, "bytes )");
}

run().catch(console.error);
