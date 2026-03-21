const fs = require('fs');
const content = fs.readFileSync('build_log.txt', 'utf16le');
const lines = content.split('\n');
let out = "";
lines.forEach(line => {
  if (line.includes('Error') || line.includes('fail') || line.includes('at ') || line.includes('line') || line.includes('Type') || line.includes('syntax') || line.includes('Exception') || line.includes(':')) {
    out += line + '\n';
  }
});
fs.writeFileSync('error_summary.txt', out);
console.log("Done writing error_summary.txt");
