import { part1, part2 } from '../utils/print';
import { readFileAsText } from '../utils/readFile';

const contents = await readFileAsText(import.meta.dir);

// part 1
let p1 = -1;
const chars = contents.split('');
for (let i = 0; i < chars.length; i++) {
  const last4 = contents.substring(Math.max(0, i - 4), i);
  const asSet = new Set(last4.split(''));
  if (last4.length === 4 && asSet.size === 4) {
    p1 = i;
    break;
  }
}
part1(p1);

// part 2
let p2 = -1;
const chars2 = contents.split('');
for (let i = 0; i < chars2.length; i++) {
  const last14 = contents.substring(Math.max(0, i - 14), i);
  const asSet = new Set(last14.split(''));
  if (last14.length === 14 && asSet.size === 14) {
    p2 = i;
    break;
  }
}
part2(p2);
