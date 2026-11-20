/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

function createIco(pngBuffers, sizes) {
  const numImages = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = ICO
  header.writeUInt16LE(numImages, 4);

  let offset = 6 + 16 * numImages;
  const dirEntries = [];
  for (let i = 0; i < numImages; i++) {
    const size = sizes[i];
    const buf = pngBuffers[i];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(buf.length, 8);
    entry.writeUInt32LE(offset, 12);
    dirEntries.push(entry);
    offset += buf.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers]);
}

async function run() {
  const svgPath = path.join(__dirname, "../src/app/icon.svg");
  const publicDir = path.join(__dirname, "../public");
  const svgBuffer = fs.readFileSync(svgPath);

  // 1. Multi-resolution favicon.ico & favicon-v2.ico (16, 32, 48) - strictly opaque RGB
  const icoSizes = [16, 32, 48];
  const pngBuffers = await Promise.all(
    icoSizes.map((size) =>
      sharp(svgBuffer, { density: 300 })
        .resize(size, size)
        .flatten({ background: "#05050A" })
        .png()
        .toBuffer(),
    ),
  );

  const icoBuffer = createIco(pngBuffers, icoSizes);
  fs.writeFileSync(path.join(publicDir, "favicon.ico"), icoBuffer);
  fs.writeFileSync(path.join(publicDir, "favicon-v2.ico"), icoBuffer);
  fs.writeFileSync(path.join(publicDir, "icon-v2.svg"), svgBuffer);

  // 2. High-res opaque PNG icons for Google Search Favicon (48, 192), Apple (180), and Knowledge Graph (512)
  const pngTargets = [
    { name: "icon-48.png", size: 48 },
    { name: "icon-48-v2.png", size: 48 },
    { name: "apple-icon.png", size: 180 },
    { name: "apple-icon-v2.png", size: 180 },
    { name: "icon-192.png", size: 192 },
    { name: "icon-192-v2.png", size: 192 },
    { name: "icon-512.png", size: 512 },
    { name: "icon-512-v2.png", size: 512 },
  ];

  for (const target of pngTargets) {
    await sharp(svgBuffer, { density: 300 })
      .resize(target.size, target.size)
      .flatten({ background: "#05050A" })
      .png({ quality: 95, compressionLevel: 9 })
      .toFile(path.join(publicDir, target.name));
  }

  console.log("Generated opaque v1 & v2 favicons and PNG icons");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
