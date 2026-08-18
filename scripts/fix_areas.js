const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/areas.js');
let content = fs.readFileSync(filePath, 'utf-8');

const regex = /\{\s*name:\s*"القاهرة",/;
const match = content.match(regex);
if (match) {
    const cairoIndex = match.index;
    const endIndex = content.lastIndexOf('];');
    
    let before = content.substring(0, cairoIndex);
    let toComment = content.substring(cairoIndex, endIndex);
    let after = content.substring(endIndex);
    
    let commented = toComment.split('\n').map(line => {
        if (line.trim() === '') return line;
        if (line.trim().startsWith('//')) return line;
        return '// ' + line;
    }).join('\n');
    
    fs.writeFileSync(filePath, before + commented + after);
    console.log('Successfully commented out extra areas in areas.js');
} else {
    console.log('Could not find القاهرة block.');
}
