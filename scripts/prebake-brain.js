/**
 * CELAEST · Brain Particles Pre-Baking Utility
 * Pre-computes 27,000 3D positions and normals from particle_ui_brain.gltf
 * and packs them into a high-performance binary buffer (DMA direct load).
 */
global.ProgressEvent = class ProgressEvent {};
const fs = require("fs");
const path = require("path");
const THREE = require("three");
const { GLTFLoader, MeshSurfaceSampler } = require("three-stdlib");

const BRAIN_TARGET_SIZE = 6.2;
const LAYER_A_COUNT = 18000;
const LAYER_B_COUNT = 9000;

const loader = new GLTFLoader();
const gltfPath = path.join(__dirname, "../public/particle_ui_brain.gltf");
const data = fs.readFileSync(gltfPath);

loader.parse(
  data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength),
  "",
  (gltf) => {
    let brainMesh = null;
    gltf.scene.traverse((child) => {
      if (child.isMesh && child.name && child.name.toLowerCase().includes("brain")) {
        brainMesh = child;
      }
    });

    if (!brainMesh) {
      console.error("Brain mesh not found in GLTF!");
      process.exit(1);
    }

    const geo = brainMesh.geometry.clone();
    geo.computeBoundingBox();
    const box = geo.boundingBox;
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = BRAIN_TARGET_SIZE / maxDim;
    geo.translate(-center.x, -center.y, -center.z);
    geo.scale(scale, scale, scale);

    const tempMesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial());
    const sampler = new MeshSurfaceSampler(tempMesh).build();

    function sampleLayer(count) {
      const positions = new Float32Array(count * 3);
      const normals = new Float32Array(count * 3);
      const tempPos = new THREE.Vector3();
      const tempNormal = new THREE.Vector3();

      for (let i = 0; i < count; i++) {
        sampler.sample(tempPos, tempNormal);
        positions[i * 3] = tempPos.x;
        positions[i * 3 + 1] = tempPos.y;
        positions[i * 3 + 2] = tempPos.z;
        normals[i * 3] = tempNormal.x;
        normals[i * 3 + 1] = tempNormal.y;
        normals[i * 3 + 2] = tempNormal.z;
      }
      return { positions, normals };
    }

    console.log("Pre-sampling Layer A (18,000 points)...");
    const layerA = sampleLayer(LAYER_A_COUNT);
    console.log("Pre-sampling Layer B (9,000 points)...");
    const layerB = sampleLayer(LAYER_B_COUNT);

    const headerSize = 32;
    const totalBytes = headerSize + LAYER_A_COUNT * 24 + LAYER_B_COUNT * 24;
    const outBuffer = Buffer.alloc(totalBytes);

    outBuffer.write("CELAEST_BRAIN_V1", 0, 16, "ascii");
    outBuffer.writeUInt32LE(1, 16);
    outBuffer.writeUInt32LE(LAYER_A_COUNT, 20);
    outBuffer.writeUInt32LE(LAYER_B_COUNT, 24);
    outBuffer.writeUInt32LE(0, 28);

    let offset = headerSize;
    Buffer.from(layerA.positions.buffer).copy(outBuffer, offset);
    offset += LAYER_A_COUNT * 12;
    Buffer.from(layerA.normals.buffer).copy(outBuffer, offset);
    offset += LAYER_A_COUNT * 12;
    Buffer.from(layerB.positions.buffer).copy(outBuffer, offset);
    offset += LAYER_B_COUNT * 12;
    Buffer.from(layerB.normals.buffer).copy(outBuffer, offset);

    const outDir = path.join(__dirname, "../public/data");
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const outPath = path.join(outDir, "brain-particles.bin");
    fs.writeFileSync(outPath, outBuffer);
    console.log("Success! Generated:", outPath, "(", outBuffer.length, "bytes )");
  },
  (err) => {
    console.error("GLTF Parse Error:", err);
    process.exit(1);
  }
);

