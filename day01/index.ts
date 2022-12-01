import { readFileAsText } from '../utils/readFile';

const contents = await readFileAsText(import.meta.dir);
const rows = contents.split('\n');

// part 1
const cals: number[] = [];
let currElf = 0;
rows.forEach((row) => {
  if (row.length) {
    if (!cals[currElf]) {
      cals[currElf] = 0;
    }
    cals[currElf] += parseInt(row);
  } else {
    currElf++;
  }
});

console.log('Part 1:', Math.max(...cals));

// part 2
const sorted = cals.sort((a, b) => b - a);
const sum = sorted.slice(0, 3).reduce((acc, curr) => (acc += curr), 0);

console.log('Part 2:', sum);
