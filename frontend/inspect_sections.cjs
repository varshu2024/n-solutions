const fs = require('fs');
const path = 'C:\\Users\\varsh\\.gemini\\antigravity-ide\\brain\\c643d6ae-2707-4154-9803-1ddd1cd0dc03\\extracted';

const files = ['Home.js', 'About.js', 'Products.js', 'Services.js', 'Projects.js', 'Media.js', 'Careers.js', 'Contact.js', 'Admin.js'];

files.forEach(f => {
  const content = fs.readFileSync(`${path}\\${f}`, 'utf8');
  // Match string literals that look like section titles, headings, or content
  const texts = content.match(/[`"'][A-Za-z0-9\s&,.\-\/\(\)\:\'\?\!]{5,100}[`"']/g) || [];
  const uniqueTexts = [...new Set(texts.map(t => t.slice(1, -1).trim()))].filter(t => 
    !t.includes('className') && !t.includes('style') && !t.includes('http') && !t.includes('px') && !t.includes('rgb')
  );
  console.log(`\n=================== ${f} ===================`);
  console.log(uniqueTexts.slice(0, 35).join('\n'));
});
