import { part1, part2 } from '../utils/print';
import { readFileAsText } from '../utils/readFile';

const contents = await readFileAsText(import.meta.dir);
const rows = contents.split('\n');

// part 1
let p1 = 0;
rows.forEach((row) => {
  const [e1s, e1e, e2s, e2e] = row.split(/[,-]/);
  const elf1Start = parseInt(e1s);
  const elf1End = parseInt(e1e);
  const elf2Start = parseInt(e2s);
  const elf2End = parseInt(e2e);

  if (
    (elf1Start >= elf2Start && elf1End <= elf2End) ||
    (elf2Start >= elf1Start && elf2End <= elf1End)
  ) {
    p1++;
  }
});
part1(p1);

// part 2
let p2 = 0;
rows.forEach((row) => {
  const [e1s, e1e, e2s, e2e] = row.split(/[,-]/);
  const elf1Start = parseInt(e1s);
  const elf1End = parseInt(e1e);
  const elf2Start = parseInt(e2s);
  const elf2End = parseInt(e2e);

  if (elf1End < elf2Start || elf2End < elf1Start) {
    return;
  }
  p2++;
});
part2(p2);
