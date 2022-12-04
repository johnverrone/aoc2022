import { readFileAsText } from '../utils/readFile';

const contents = await readFileAsText(import.meta.dir);
const rows = contents.split('\n');

const letterToPriority = (str: string) => {
  if (str.length !== 1) throw new Error('too long of a string bruv');
  const code = str.charCodeAt(0);
  if (code >= 97) {
    return code - 96;
  }
  return code - 64 + 26;
};

// part 1
const sum = rows.reduce((acc, row) => {
  const firstSack = row.substring(0, row.length / 2);
  const secondSack = row.substring(row.length / 2);
  for (const toy of secondSack) {
    if (firstSack.includes(toy)) {
      acc += letterToPriority(toy);
      return acc;
    }
  }
}, 0);
console.log('Part 1:', sum);

// part 2
let sum2 = 0;
let badgeSearch = '';
rows.forEach((sack, i) => {
  if (i % 3 === 0) {
    const prevPoints = badgeSearch.length
      ? letterToPriority(badgeSearch.at(0))
      : 0;
    sum2 += prevPoints;

    badgeSearch = sack;
    return;
  }
  badgeSearch = badgeSearch.match(new RegExp(`[${sack}]`, 'g')).join('');
});

const prevPoints = letterToPriority(badgeSearch.at(0));
sum2 += prevPoints;

console.log('Part 2:', sum2);
