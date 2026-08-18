const fs = require('fs');
const glob = require('fs').readdirSync('build/winch', {withFileTypes: true});
glob.filter(d => d.isDirectory()).slice(0, 3).forEach(d => {
  const h = fs.readFileSync('build/winch/' + d.name + '/index.html', 'utf8');
  const m = h.match(/<title>(.*?)<\/title>/);
  console.log('Dir:', d.name);
  console.log('Title:', m ? m[1] : 'no title');
  const m2 = h.match(/og:image.*?content="(.*?)"/);
  console.log('Image:', m2 ? m2[1] : 'no img');
  console.log('---');
});
