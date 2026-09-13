const fs = require('fs');
const home = fs.readFileSync('C:\\Users\\varsh\\.gemini\\antigravity-ide\\brain\\c643d6ae-2707-4154-9803-1ddd1cd0dc03\\extracted\\Home.js', 'utf8');

// Find how images are loaded
const imgMatches = home.match(/unsplash[^\s`\"'\)]*/g) || [];
console.log('Unsplash matches:', imgMatches.slice(0, 10));

// Find any image helper function
const helperMatch = home.match(/[a-zA-Z0-9_]+\s*=\s*e\s*=>\s*[`"']https:\/\/images\.unsplash\.com[^`"']+/);
console.log('Helper:', helperMatch ? helperMatch[0] : 'None');
