/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * CELAEST Robot Sequences Binary DMA Packager
 * Packs separate WebP image frames into a single binary DMA container with header & index table.
 */
const fs = require("fs");
const path = require("path");

function packSequence(inputDir, outputFile, magic) {
  const files = fs
    .readdirSync(inputDir)
    .filter((f) => f.endsWith(".webp"))
    .sort();

  const frameCount = files.length;
  console.log(`Packing ${frameCount} frames from ${inputDir} -> ${outputFile}...`);

  const fileBuffers = files.map((file) => fs.readFileSync(path.join(inputDir, file)));

  // Header: 8 bytes
  // - 4 bytes: Magic ("CGAZ" or "CSAL")
  // - 1 byte: Version (1)
  // - 1 byte: Reserved (0)
  // - 2 bytes: FrameCount (uint16 LE)
  const HEADER_SIZE = 8;
  const INDEX_ENTRY_SIZE = 8; // offset (uint32) + length (uint32)
  const indexTableSize = frameCount * INDEX_ENTRY_SIZE;
  const dataStartOffset = HEADER_SIZE + indexTableSize;

  let totalSize = dataStartOffset;
  for (const buf of fileBuffers) {
    totalSize += buf.length;
  }

  const outBuf = Buffer.alloc(totalSize);

  // Write Magic
  outBuf.write(magic, 0, 4, "ascii");
  // Write Version & Reserved
  outBuf.writeUInt8(1, 4);
  outBuf.writeUInt8(0, 5);
  // Write FrameCount
  outBuf.writeUInt16LE(frameCount, 6);

  // Write Index Table & Data
  let currentDataOffset = dataStartOffset;
  for (let i = 0; i < frameCount; i++) {
    const frameBuf = fileBuffers[i];
    const indexEntryOffset = HEADER_SIZE + i * INDEX_ENTRY_SIZE;

    // Write offset (uint32 LE)
    outBuf.writeUInt32LE(currentDataOffset, indexEntryOffset);
    // Write length (uint32 LE)
    outBuf.writeUInt32LE(frameBuf.length, indexEntryOffset + 4);

    // Copy frame bytes into payload
    frameBuf.copy(outBuf, currentDataOffset);
    currentDataOffset += frameBuf.length;
  }

  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, outBuf);

  console.log(
    `✓ Successfully generated ${outputFile} (${(totalSize / 1024 / 1024).toFixed(2)} MB, ${frameCount} frames)`,
  );
}

// 1. Pack Gaze Sequence
packSequence(
  path.join(__dirname, "../public/robot_hero_gaze"),
  path.join(__dirname, "../public/data/robot-gaze.bin"),
  "CGAZ",
);

// 2. Pack Saludo Sequence
packSequence(
  path.join(__dirname, "../public/robot_hero_saludo"),
  path.join(__dirname, "../public/data/robot-saludo.bin"),
  "CSAL",
);
