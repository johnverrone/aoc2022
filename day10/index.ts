import { part1, part2 } from '../utils/print';
import { readFileAsText } from '../utils/readFile';

const contents = await readFileAsText(import.meta.dir);
const rows = contents.split('\n');

// part 1
let prevCycle = null;
let cycle = 1;
let prevX = 1;
let x = 1;
let p1 = 0;

let info: { [key: number]: { x: number } } = {};

const signals = {
  20: 0,
  60: 0,
  100: 0,
  140: 0,
  180: 0,
  220: 0,
};

rows.forEach((inst) => {
  prevX = x;
  prevCycle = cycle;
  info[cycle] = { x };
  if (inst === 'noop') {
    cycle++;
  } else {
    cycle += 2;
    const [, v] = inst.split(' ').map((n) => parseInt(n, 10));
    x += v;
  }

  const signalsToCheck = Object.keys(signals).map((n) => parseInt(n, 10));
  signalsToCheck.forEach((s) => {
    let ss;
    if (prevCycle < s && cycle > s) {
      ss = s * prevX;
    } else if (prevCycle < s && cycle === s) {
      ss = s * x;
    }
    if (ss) {
      p1 += ss;
    }
  });
});

part1(p1);

// part 2
const cycles = [...Array(240)].map((_, i) => i + 1);
let p2 = '';
cycles.forEach((cycle) => {
  const curr = info[cycle] ?? info[cycle - 1];
  if (
    curr.x === cycle % 40 ||
    curr.x + 1 === cycle % 40 ||
    curr.x + 2 === cycle % 40
  ) {
    p2 += '#';
  } else {
    p2 += '.';
  }
  if (cycle % 40 === 0) {
    p2 += '\n';
  }
});
console.log(p2);
