const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, 'public', 'images');

async function aggressiveOptimize() {
  const files = fs.readdirSync(imagesDir);
  
  for (const file of files) {
    if (file.endsWith('.webp')) {
      const inputPath = path.join(imagesDir, file);
      // We will read it into a buffer, then overwrite
      const buffer = fs.readFileSync(inputPath);
      
      console.log(`Optimizing ${file}...`);
      
      try {
        let instance = sharp(buffer);
        
        if (file === 'hero.webp') {
          // Shrink hero image to max 1024px width and reduce quality further
          instance = instance.resize({ width: 1024, withoutEnlargement: true });
        } else {
          // The gallery images are displayed very small in a strip. We can resize them to 600px width.
          instance = instance.resize({ width: 600, withoutEnlargement: true });
        }
        
        await instance
          .webp({ quality: 60 }) // lower quality for massive savings
          .toFile(inputPath);
          
        console.log(`Successfully optimized ${file}`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
  console.log('Aggressive optimization complete!');
}

aggressiveOptimize();
