const fs = require('fs');
const path = require('path');

// This script requires node-canvas
// Install with: npm install canvas

async function generateFavicon() {
  try {
    const { createCanvas, registerFont } = require('canvas');
    
    // Register the Calegar font
    const fontPath = path.join(__dirname, '../public/fonts/Calegar.otf');
    registerFont(fontPath, { family: 'Calegar' });
    
    // Create canvas for favicon (32x32 for standard favicon)
    const sizes = [16, 32, 48, 64, 128, 256];
    
    for (const size of sizes) {
      const canvas = createCanvas(size, size);
      const ctx = canvas.getContext('2d');
      
      // Draw background with rounded corners (white)
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      const radius = size * 0.1875; // 6px for 32px, scales proportionally
      ctx.roundRect(0, 0, size, size, radius);
      ctx.fill();
      
      // Draw the "C" with Calegar font (black)
      ctx.fillStyle = '#000000';
      ctx.font = `bold ${Math.floor(size * 0.6875)}px Calegar`; // 22px for 32px
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('C', size / 2, size / 2 + 1); // Slight vertical adjustment
      
      // Save as PNG
      const buffer = canvas.toBuffer('image/png');
      const outputPath = path.join(__dirname, `../public/favicon-${size}.png`);
      fs.writeFileSync(outputPath, buffer);
      console.log(`Generated favicon-${size}.png`);
    }
    
    // Generate ICO file (simplified - using 32x32)
    const ico32 = createCanvas(32, 32);
    const icoCtx = ico32.getContext('2d');
    icoCtx.fillStyle = '#FFFFFF';
    icoCtx.beginPath();
    icoCtx.roundRect(0, 0, 32, 32, 6);
    icoCtx.fill();
    icoCtx.fillStyle = '#000000';
    icoCtx.font = 'bold 22px Calegar';
    icoCtx.textAlign = 'center';
    icoCtx.textBaseline = 'middle';
    icoCtx.fillText('C', 16, 18);
    
    const icoBuffer = ico32.toBuffer('image/png');
    fs.writeFileSync(path.join(__dirname, '../app/favicon.ico'), icoBuffer);
    console.log('Generated favicon.ico');
    
    // Also create icon.png for Next.js
    const icon128 = createCanvas(128, 128);
    const iconCtx = icon128.getContext('2d');
    iconCtx.fillStyle = '#FFFFFF';
    iconCtx.beginPath();
    iconCtx.roundRect(0, 0, 128, 128, 24);
    iconCtx.fill();
    iconCtx.fillStyle = '#000000';
    iconCtx.font = 'bold 88px Calegar';
    iconCtx.textAlign = 'center';
    iconCtx.textBaseline = 'middle';
    iconCtx.fillText('C', 64, 72);
    
    const iconBuffer = icon128.toBuffer('image/png');
    fs.writeFileSync(path.join(__dirname, '../app/icon.png'), iconBuffer);
    console.log('Generated icon.png');
    
    console.log('\n✅ Favicon generation complete!');
    console.log('Next.js will automatically use app/icon.png as the favicon.');
    
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      console.error('\n❌ Error: canvas module not found');
      console.log('\nPlease install the required dependency:');
      console.log('npm install canvas');
      console.log('\nNote: On macOS, you may also need:');
      console.log('brew install pkg-config cairo pango libpng jpeg giflib librsvg');
    } else {
      console.error('Error generating favicon:', error);
    }
    process.exit(1);
  }
}

generateFavicon();

