const fs = require('fs');
const path = 'C:\\Users\\varsh\\.gemini\\antigravity-ide\\brain\\c643d6ae-2707-4154-9803-1ddd1cd0dc03\\extracted';

['Home.js', 'About.js', 'Products.js', 'Services.js', 'Projects.js', 'Media.js', 'Careers.js', 'Contact.js', 'Admin.js'].forEach(f => {
  const content = fs.readFileSync(`${path}\\${f}`, 'utf8');
  console.log(`\n================= DATA IN ${f} =================`);
  // Look for object array patterns like [{...}, {...}]
  const arrMatches = content.match(/\[\{[^\}]{10,500}\}\]/g) || [];
  console.log(`Found ${arrMatches.length} small arrays`);
  
  // Look for all object literals with properties like title:, label:, name:, etc.
  const titles = content.match(/title:[`"'][^`"']+[`"']/g) || [];
  const names = content.match(/name:[`"'][^`"']+[`"']/g) || [];
  const labels = content.match(/label:[`"'][^`"']+[`"']/g) || [];
  
  if (titles.length) console.log('Titles:', titles.slice(0, 10).join(', '));
  if (names.length) console.log('Names:', names.slice(0, 10).join(', '));
  if (labels.length) console.log('Labels:', labels.slice(0, 10).join(', '));
});
