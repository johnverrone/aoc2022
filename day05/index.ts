import { part1, part2 } from '../utils/print';
import { readFileAsText } from '../utils/readFile';

const contents = await readFileAsText(import.meta.dir);
const [initial, instructions] = contents
  .split('\n\n')
  .map((r) => r.split('\n'));

const stackCount = parseInt(
  initial[initial.length - 1].trim().split('   ').at(-1),
  10
);

// populate stack
let stacks = Array.from(Array(stackCount)).map(() => [] as string[]);
let stacks2 = Array.from(Array(stackCount)).map(() => [] as string[]);
initial.pop();
initial.forEach((row) => {
  const cratesAtRow = row.match(/(\s{4}|[A-Z])/g).map((r) => r.trim());
  cratesAtRow.forEach((crate, i) => {
    if (crate.length) {
      stacks[i].unshift(crate);
      stacks2[i].unshift(crate);
    }
  });
});

// part 1
let p1 = '';
instructions.forEach((inst) => {
  const [_, count, source, destination] = inst
    .match(/move (?<count>\d*) from (?<source>\d+) to (?<destination>\d+)/)
    .map((p) => parseInt(p, 10));

  for (let b = 1; b <= count; b++) {
    const box = stacks[source - 1].pop();
    stacks[destination - 1].push(box);
  }
});
stacks.forEach((s) => (p1 += s.at(-1)));
part1(p1);

// part 2
let p2 = '';
instructions.forEach((inst) => {
  const [_, count, source, destination] = inst
    .match(/move (?<count>\d*) from (?<source>\d+) to (?<destination>\d+)/)
    .map((p) => parseInt(p, 10));

  const boxes = stacks2[source - 1].splice(-1 * count, count);
  stacks2[destination - 1].push(...boxes);
});
stacks2.forEach((s) => (p2 += s.at(-1)));
part2(p2);
