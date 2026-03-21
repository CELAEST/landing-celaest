const fs = require('fs');
const report = JSON.parse(fs.readFileSync('C:\\Users\\user\\AppData\\Local\\Temp\\chrome-devtools-mcp-ZeAMzx\\report.json', 'utf8'));

let out = "=== FAILING AUDITS BY CATEGORY ===\n";
for (const [catKey, cat] of Object.entries(report.categories)) {
  out += `\n\nCategory: ${catKey.toUpperCase()} (${cat.score * 100})\n`;
  
  cat.auditRefs.forEach(ref => {
    const audit = report.audits[ref.id];
    if (audit && audit.score !== null && audit.score < 1) {
      out += `  - Audit: ${ref.id} [Score: ${audit.score}]\n`;
      out += `    Title: ${audit.title}\n`;
      if (audit.explanation) out += `    Explanation: ${audit.explanation}\n`;
      if (audit.displayValue) out += `    Value: ${audit.displayValue}\n`;
    }
  });
}

fs.writeFileSync('C:\\Users\\user\\Music\\landing-celaest\\fail_report.txt', out);
console.log("Done writing fail_report.txt");

