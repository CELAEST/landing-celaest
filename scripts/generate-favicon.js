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
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buf.length, 8); // image size
    entry.writeUInt32LE(offset, 12); // image offset
    dirEntries.push(entry);
    offset += buf.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers]);
}

async function run() {
  const svgPath = path.join(__dirname, "../src/app/icon.svg");
  const outPath = path.join(__dirname, "../public/favicon.ico");

  const svgBuffer = fs.readFileSync(svgPath);

  const sizes = [16, 32, 48];
  const pngBuffers = [];

  for (const size of sizes) {
    // Render icon with subtle margin on transparent background for crisp display
    const padding = Math.max(1, Math.round(size * 0.08));
    const innerSize = size - padding * 2;

    const innerPng = await sharp(svgBuffer)
      .resize(innerSize, innerSize, { fit: "contain" })
      .png()
      .toBuffer();

    const finalPng = await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([{ input: innerPng, gravity: "centre" }])
      .png()
      .toBuffer();

    pngBuffers.push(finalPng);
  }

  const icoBuffer = createIco(pngBuffers, sizes);
  fs.writeFileSync(outPath, icoBuffer);
  console.log(`Created ${outPath} (${icoBuffer.length} bytes) with sizes: ${sizes.join(", ")}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
