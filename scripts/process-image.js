const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputImagePath = process.argv[2];
const outputDirectory = path.join(__dirname, '..', 'src', 'portraits');

if (!inputImagePath) {
  console.error('Usage: node process-image.js <path_to_input_image>');
  process.exit(1);
}

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}

const outputFileName = path.basename(inputImagePath);
const outputPath = path.join(outputDirectory, outputFileName);

sharp(inputImagePath)
  .resize({
    width: 2400,
    height: 2400,
    fit: sharp.fit.inside,
    withoutEnlargement: true,
  })
  .toFile(outputPath)
  .then(() => {
    console.log(`Processed image saved to: ${outputPath}`);
  })
  .catch(err => {
    console.error('Error processing image:', err);
    process.exit(1);
  });
