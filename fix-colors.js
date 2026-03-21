const fs = require('fs');
const path = require('path');

const replacements = {
  '\\[#060606\\]': 'brand-surface-alt',
  '\\[#a1a1aa\\]': 'zinc-400',
  '\\[#71717a\\]': 'zinc-500',
  '\\[#8b8b98\\]': 'zinc-400',
  '\\[#e4e4e7\\]': 'zinc-200',
  '\\[#111\\]': 'neutral-900',
  '\\[#111111\\]': 'neutral-900',
  '\\[#555\\]': 'neutral-500',
  '\\[#555555\\]': 'neutral-500',
  '\\[#ededed\\]': 'neutral-200',
  '\\[#10b981\\]': 'emerald-500',
  '\\[#34d399\\]': 'emerald-400',
  '\\[#3f3f46\\]': 'zinc-700',
  '\\[#27272a\\]': 'zinc-800',
  '\\[#0d0d0d\\]': 'brand-surface-alt',
  '\\[#080808\\]': 'brand-surface-alt',
  '\\[#0a0a0c\\]': 'brand-gray',
  '\\[#040404\\]': 'brand-deep',
  '\\[#030303\\]': 'brand-deep',
  '\\[#0F172A\\]': 'slate-900',
  '\\[#D1D5DB\\]': 'gray-300'
};

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const [key, value] of Object.entries(replacements)) {
        const regex = new RegExp(key, 'gi'); // Case-insensitive
        if (regex.test(content)) {
          content = content.replace(regex, value);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Updated ' + file);
      }
    }
  }
}

processDir(path.join(process.cwd(), 'src'));
