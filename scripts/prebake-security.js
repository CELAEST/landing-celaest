/**
 * CELAEST · Security Core Particles Pre-Baking Utility
 * Pre-computes 6,000 particles across 4 morph targets:
 *  - Padlock (from magic_lock.gltf)
 *  - Shield (procedural extruded shield)
 *  - Globe (distributed network mesh)
 *  - Logo (CELAEST official emblem)
 * Packs them into a 288 KB binary buffer for 0ms GPU direct load.
 */

global.ProgressEvent = class ProgressEvent {};
const { JSDOM } = require("jsdom");
global.DOMParser = new JSDOM().window.DOMParser;
const fs = require("fs");
const path = require("path");
const THREE = require("three");
const { GLTFLoader, MeshSurfaceSampler, SVGLoader } = require("three-stdlib");

const PARTICLE_COUNT = 6000;
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

const CELAEST_LOGO_PATH_D =
  "M 190.00000 0.00000 C 187.71261 0.43575 186.20875 1.57948 184.23828 2.62891 C 177.30605 6.32130 168.10985 11.23307 163.66602 17.51367 C 158.46271 24.86790 157.06979 34.22557 155.67383 42.82227 C 152.88373 59.98687 150.09363 77.15147 147.30469 94.31641 C 137.91757 99.47950 128.53046 104.64259 119.14453 109.80664 C 111.45999 114.03225 103.77545 118.25785 96.09180 122.48438 C 94.49841 123.36015 93.36885 125.04505 92.51953 126.65430 C 87.82860 135.53982 82.35515 144.17931 80.05273 154.00977 C 78.43851 160.90226 78.44199 168.14088 77.72852 175.14844 C 77.26442 179.70479 78.50346 183.87679 81.36523 187.49805 C 83.95759 190.77884 87.49089 192.68417 90.96289 194.88672 C 109.12457 206.41773 127.28624 217.94874 145.44922 229.47852 C 147.37130 230.69769 149.60196 231.78202 151.78906 232.40820 C 153.68926 232.95252 155.45484 231.81055 156.97461 230.73047 C 167.38283 223.32833 177.79104 215.92620 188.19922 208.52344 C 189.70773 207.44976 190.87037 207.25146 192.65820 207.72461 C 204.09051 210.75013 214.73977 215.86790 226.06445 219.26172 C 228.02613 219.85042 229.80529 220.67295 231.79102 221.19727 C 234.34005 221.87012 235.53982 220.16521 236.43555 218.06445 C 242.02980 204.93963 247.62404 191.81482 253.21875 178.69141 C 254.49886 175.68953 255.46087 172.50201 257.06836 169.69141 C 258.94840 166.40427 261.64966 163.66698 264.84570 161.47461 C 275.92055 153.88219 286.99540 146.28976 298.07031 138.69727 C 300.99966 136.68940 302.26189 133.45494 302.72070 130.04688 C 303.39804 125.01529 303.37626 119.86659 301.99609 114.99805 C 298.81591 103.78440 291.56477 94.61863 283.07227 86.84570 C 275.40552 79.82902 267.73877 72.81233 260.07227 65.79492 C 257.36934 63.32115 254.67384 60.84055 251.97070 58.36719 C 251.52093 57.95543 250.77258 57.73031 250.29102 57.34570 C 230.19401 38.23047 210.09701 19.11523 190.00000 0.00000 Z";

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

function sampleGeometryList(geos, count, targetSize, yOffset) {
  const samplers = [];
  let totalWeight = 0;
  for (const geo of geos) {
    const posAttr = geo.attributes.position;
    if (!posAttr) continue;
    const triCount = (geo.index ? geo.index.count : posAttr.count) / 3;
    const tempMesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial());
    const sampler = new MeshSurfaceSampler(tempMesh).build();
    samplers.push({ sampler, weight: triCount });
    totalWeight += triCount;
  }

  const out = new Float32Array(count * 3);
  if (samplers.length === 0 || totalWeight === 0) return out;

  let outIdx = 0;
  const p = new THREE.Vector3();
  const n = new THREE.Vector3();
  for (let sIdx = 0; sIdx < samplers.length; sIdx++) {
    const { sampler, weight } = samplers[sIdx];
    const portion = sIdx === samplers.length - 1 ? count - outIdx : Math.round((weight / totalWeight) * count);
    for (let k = 0; k < portion && outIdx < count; k++) {
      sampler.sample(p, n);
      out[outIdx * 3]     = p.x;
      out[outIdx * 3 + 1] = p.y;
      out[outIdx * 3 + 2] = p.z;
      outIdx++;
    }
  }

  normalizePositions(out, count, targetSize, yOffset);
  return out;
}

function buildShieldGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 1.25);
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

function sampleLock(gltfScene, count) {
  const meshes = [];
  let totalTriCount = 0;
  gltfScene.traverse((obj) => {
    if (obj.isMesh && obj.geometry) {
      const geo = obj.geometry.clone();
      geo.applyMatrix4(obj.matrixWorld);
      const posAttr = geo.attributes.position;
      if (!posAttr) return;
      const triCount = (geo.index ? geo.index.count : posAttr.count) / 3;
      const tempMesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial());
      const sampler = new MeshSurfaceSampler(tempMesh).build();
      meshes.push({ sampler, weight: triCount });
      totalTriCount += triCount;
    }
  });

  const out = new Float32Array(count * 3);
  if (meshes.length === 0 || totalTriCount === 0) return out;

  let outIdx = 0;
  const p = new THREE.Vector3();
  const n = new THREE.Vector3();
  for (let mIdx = 0; mIdx < meshes.length; mIdx++) {
    const { sampler, weight } = meshes[mIdx];
    const portion = mIdx === meshes.length - 1 ? count - outIdx : Math.round((weight / totalTriCount) * count);
    for (let k = 0; k < portion && outIdx < count; k++) {
      sampler.sample(p, n);
      out[outIdx * 3]     = p.x;
      out[outIdx * 3 + 1] = p.y;
      out[outIdx * 3 + 2] = p.z;
      outIdx++;
    }
  }

  // Centering & Orientation
  normalizePositions(out, count, LOCK_TARGET_SIZE, LOCK_Y_OFFSET);
  const cosYaw = Math.cos(LOCK_YAW);
  const sinYaw = Math.sin(LOCK_YAW);
  for (let i = 0; i < count; i++) {
    const px = out[i * 3];
    const py = out[i * 3 + 1] - LOCK_Y_OFFSET;
    const pz = out[i * 3 + 2];
    out[i * 3]     = px * cosYaw + pz * sinYaw;
    out[i * 3 + 1] = py + LOCK_Y_OFFSET;
    out[i * 3 + 2] = -px * sinYaw + pz * cosYaw;
  }
  return out;
}

async function run() {
  console.log("Sampling Shield...");
  const shieldGeo = buildShieldGeometry();
  const shieldPositions = sampleGeometryList([shieldGeo], PARTICLE_COUNT, SHIELD_TARGET_SIZE, SHIELD_Y_OFFSET);
  shieldGeo.dispose();

  console.log("Sampling Globe...");
  const globeGeos = buildGlobeGeometries();
  const globePositions = sampleGeometryList(globeGeos, PARTICLE_COUNT, GLOBE_TARGET_SIZE, GLOBE_Y_OFFSET);
  globeGeos.forEach((g) => g.dispose());

  console.log("Sampling Logo...");
  const logoGeos = buildLogoGeometriesFromPath(CELAEST_LOGO_PATH_D);
  const logoPositions = sampleGeometryList(logoGeos, PARTICLE_COUNT, LOGO_TARGET_SIZE, LOGO_Y_OFFSET);
  logoGeos.forEach((g) => g.dispose());

  console.log("Sampling Padlock GLTF...");
  const gltfLoader = new GLTFLoader();
  const lockData = fs.readFileSync(path.join(__dirname, "../public/magic_lock.gltf"));
  const gltf = await new Promise((resolve, reject) => {
    gltfLoader.parse(lockData.buffer.slice(lockData.byteOffset, lockData.byteOffset + lockData.byteLength), "", resolve, reject);
  });
  const lockPositions = sampleLock(gltf.scene, PARTICLE_COUNT);

  // Pack all 4 into binary buffer
  // Header: 32 bytes
  // lock: 6000 * 12 bytes = 72000
  // shield: 72000
  // globe: 72000
  // logo: 72000
  // Total: 32 + 288,000 = 288,032 bytes
  const headerSize = 32;
  const layerBytes = PARTICLE_COUNT * 12;
  const totalBytes = headerSize + layerBytes * 4;
  const outBuffer = Buffer.alloc(totalBytes);

  outBuffer.write("CELAEST_SEC_V1", 0, 16, "ascii");
  outBuffer.writeUInt32LE(1, 16);
  outBuffer.writeUInt32LE(PARTICLE_COUNT, 20);
  outBuffer.writeUInt32LE(4, 24); // 4 targets
  outBuffer.writeUInt32LE(0, 28);

  let offset = headerSize;
  Buffer.from(lockPositions.buffer).copy(outBuffer, offset);
  offset += layerBytes;
  Buffer.from(shieldPositions.buffer).copy(outBuffer, offset);
  offset += layerBytes;
  Buffer.from(globePositions.buffer).copy(outBuffer, offset);
  offset += layerBytes;
  Buffer.from(logoPositions.buffer).copy(outBuffer, offset);

  const outPath = path.join(__dirname, "../public/data/security-particles.bin");
  fs.writeFileSync(outPath, outBuffer);
  console.log("Successfully generated:", outPath, "(", outBuffer.length, "bytes )");
}

run().catch(console.error);
