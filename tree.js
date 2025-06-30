const fs = require('fs');

// Nuskaitome failą
const data = fs.readFileSync('info/aplanku_medis.txt', 'utf-8');

const paths = data
  .split(/\r?\n/)
  .filter(line => line.trim() !== '');

function makeTree(paths) {
  const tree = {};
  paths.forEach(p => {
    const parts = p.replace(/^\\\\/, '').split('\\');
    let current = tree;
    parts.forEach(part => {
      if (!current[part]) current[part] = {};
      current = current[part];
    });
  });
  return tree;
}

// Sukursim eilutę su visu spausdinimu (vietoj console.log)
function printTreeToString(node, prefix = '') {
  let result = '';
  const keys = Object.keys(node).sort();
  keys.forEach((key, i) => {
    const num = prefix ? `${prefix}.${i + 1}` : `${i + 1}`;
    result += `${num}. ${key}\n`;
    result += printTreeToString(node[key], num);
  });
  return result;
}

const tree = makeTree(paths);
const output = printTreeToString(tree);

// Įrašome į failą
fs.writeFileSync('info/done.txt', output, 'utf-8');

console.log('Medis išsaugotas faile: done.txt');
