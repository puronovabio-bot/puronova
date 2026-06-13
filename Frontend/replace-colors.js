const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replaceInFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace text colors
  content = content.replace(/color:\s*var\(--puro-green-(deep|forest|leaf)\)/g, 'color: var(--puro-charcoal)');
  content = content.replace(/color:\s*'#2c3e2c'/g, "color: 'var(--puro-charcoal)'");
  content = content.replace(/color:\s*"#2c3e2c"/g, 'color: "var(--puro-charcoal)"');
  
  // Also inline styles in JSX
  content = content.replace(/color:\s*'var\(--puro-green-(deep|forest|leaf)\)'/g, "color: 'var(--puro-charcoal)'");
  content = content.replace(/color:\s*"var\(--puro-green-(deep|forest|leaf)\)"/g, 'color: "var(--puro-charcoal)"');

  // Change --text-light in index.css
  if (filePath.endsWith('index.css')) {
    content = content.replace(/--text-light:\s*#5C6D64;/g, '--text-light: #555555;');
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
};

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    const dirent = fs.statSync(dirFile);
    if (dirent.isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.css') || dirFile.endsWith('.jsx')) {
        filelist.push(dirFile);
      }
    }
  }
  return filelist;
};

const allFiles = walkSync(directoryPath);
allFiles.forEach(replaceInFile);
console.log('Done replacing colors.');
