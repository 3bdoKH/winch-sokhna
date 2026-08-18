const fs = require('fs');
let content = fs.readFileSync('src/data/areas.js', 'utf8');

// Replace all instances of empty keywords arrays with generated keywords
content = content.replace(/name:\s*"([^"]+)",\s*keywords:\s*\[\s*\],/g, (match, name) => {
    return `name: "${name}",\n    keywords: ["ونش انقاذ ${name}", "رقم ونش انقاذ ${name}", "ارخص ونش سيارات في ${name}"],`;
});

fs.writeFileSync('src/data/areas.js', content, 'utf8');
console.log('Keywords populated for all areas in areas.js');
