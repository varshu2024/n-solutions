const fs = require('fs');
const bundle = fs.readFileSync('C:\\Users\\varsh\\.gemini\\antigravity-ide\\brain\\c643d6ae-2707-4154-9803-1ddd1cd0dc03\\.system_generated\\steps\\30\\content.md', 'utf8');

const markers = [
  { name: 'Header', start: 399130, end: 407374 },
  { name: 'Footer', start: 407374, end: 418056 },
  { name: 'Home', start: 418056, end: 468978 },
  { name: 'About', start: 468978, end: 484906 },
  { name: 'Products', start: 484906, end: 496505 },
  { name: 'Services', start: 496505, end: 508007 },
  { name: 'Projects', start: 508007, end: 520328 },
  { name: 'Media', start: 520328, end: 533792 },
  { name: 'Careers', start: 533792, end: 546201 },
  { name: 'Contact', start: 546201, end: 558627 },
  { name: 'Admin', start: 558627, end: 580567 },
  { name: 'App', start: 580567, end: 582500 }
];

const outDir = 'C:\\Users\\varsh\\.gemini\\antigravity-ide\\brain\\c643d6ae-2707-4154-9803-1ddd1cd0dc03\\extracted';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

markers.forEach(m => {
  const text = bundle.slice(m.start, m.end);
  fs.writeFileSync(`${outDir}\\${m.name}.js`, text);
  console.log(`Saved ${m.name}.js (${text.length} chars)`);
});
