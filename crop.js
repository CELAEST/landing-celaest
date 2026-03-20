const sharp = require('sharp');
const path = require('path');

async function processImages() {
  const scene2Path = 'C:\\Users\\user\\.gemini\\antigravity\\brain\\b8c9925c-5058-45cd-85f1-a42994613fae\\scene2_clean_1773935871096.png';
  const scene3Path = 'C:\\Users\\user\\.gemini\\antigravity\\brain\\b8c9925c-5058-45cd-85f1-a42994613fae\\scene3_clean_1773936057474.png';
  
  const width = 1200;
  const height = 800;
  const left = (1920 - width) / 2;
  const top = (991 - height) / 2;

  try {
    await sharp(scene2Path)
      .extract({ left: Math.floor(left), top: Math.floor(top), width, height })
      .webp({ quality: 90 })
      .toFile(path.join(__dirname, 'public', 'platform-ecosystem.webp'));

    await sharp(scene3Path)
      .extract({ left: Math.floor(left), top: Math.floor(top), width, height })
      .webp({ quality: 90 })
      .toFile(path.join(__dirname, 'public', 'platform-workflow.webp'));
      
    console.log('Images cropped and saved successfully as WebP.');
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

processImages();
