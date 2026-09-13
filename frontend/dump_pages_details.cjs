const fs = require('fs');
const path = 'C:\\Users\\varsh\\.gemini\\antigravity-ide\\brain\\c643d6ae-2707-4154-9803-1ddd1cd0dc03\\extracted';

const files = ['Home.js', 'About.js', 'Products.js', 'Services.js', 'Projects.js', 'Media.js', 'Careers.js', 'Contact.js', 'Admin.js'];

let fullReport = '';

files.forEach(f => {
  const content = fs.readFileSync(`${path}\\${f}`, 'utf8');
  fullReport += `\n\n=========================================\nFILE: ${f}\n=========================================\n`;
  
  // Extract all template literals and strings of length > 8
  const strRegex = /[`"']([^`"'\\]{10,250})[`"']/g;
  let match;
  const seen = new Set();
  while ((match = strRegex.exec(content)) !== null) {
    const s = match[1].trim();
    if (!seen.has(s) && !s.includes('class') && !s.includes('style') && !s.includes('width') && !s.includes('http') && !s.includes('px') && !s.startsWith('0 ') && !s.startsWith('M') && !s.startsWith('/src')) {
      seen.add(s);
      fullReport += s + '\n';
    }
  }
});

fs.writeFileSync('C:\\Users\\varsh\\.gemini\\antigravity-ide\\brain\\c643d6ae-2707-4154-9803-1ddd1cd0dc03\\extracted_texts.txt', fullReport);
console.log('Saved extracted_texts.txt, length:', fullReport.length);
