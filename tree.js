const fs = require('fs');

// Nuskaitome failą
const data = fs.readFileSync('info/aplanku_medis.txt', 'utf-8');

const paths = data
  .split(/\r?\n/)
  .filter(line => line.trim() !== '');

function makeTree(paths) {
  const tree = {};
  paths.forEach(p => {
    // Pašalinam \\ ir padalinam per \
    const parts = p.replace(/^\\\\/, '').split('\\');

    // Sujungiame pirmus 3 segmentus į vieną "root" elementą
    const root = '\\\\' + parts.slice(0,3).join('\\');
    const rest = parts.slice(3);

    // Jei root dar neegzistuoja, sukuriam
    if (!tree[root]) tree[root] = {};

    let current = tree[root];
    rest.forEach(part => {
      if (!current[part]) current[part] = {};
      current = current[part];
    });
  });
  return tree;
}

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

console.log('Medis išsaugotas faile: info/done.txt');
