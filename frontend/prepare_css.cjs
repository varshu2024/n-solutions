const fs = require('fs');

const raw = fs.readFileSync('C:\\Users\\varsh\\.gemini\\antigravity-ide\\brain\\c643d6ae-2707-4154-9803-1ddd1cd0dc03\\.system_generated\\steps\\50\\content.md', 'utf8');

// The CSS starts after '---'
const idx = raw.indexOf('---');
if (idx !== -1) {
  const css = raw.slice(idx + 3).trim();
  fs.writeFileSync('c:\\Users\\varsh\\OneDrive\\Desktop\\solar\\css\\prototype.css', css);
  console.log('Saved prototype.css, size:', css.length);
} else {
  console.log('--- not found');
}
