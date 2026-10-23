import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
if (fs.existsSync(distDir)) {
  fs.copyFileSync(path.join(distDir, 'index.html'), path.join(distDir, '404.html'));
  fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
  console.log('Post-build: created 404.html and .nojekyll in dist');
}
