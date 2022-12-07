import { part1, part2 } from '../utils/print';
import { readFileAsText } from '../utils/readFile';

const contents = await readFileAsText(import.meta.dir);
const rows = contents.split('\n');

const dirSize: { [key: string]: number } = { root: 0 };
const currentDir = ['root'];
rows.forEach((row) => {
  if (row.startsWith('$')) {
    const [, cmd, dir] = row.split(' ');
    if (cmd === 'ls') {
      return;
    }
    if (dir === '..') {
      currentDir.pop();
    } else if (dir === '/') {
      currentDir.splice(0, currentDir.length, 'root');
    } else {
      currentDir.push(dir);
    }
  } else {
    // this is ls output
    const [size, name] = row.split(' ');
    if (size === 'dir') return;
    const sizeNum = parseInt(size, 10);
    currentDir.forEach((_, i, a) => {
      const key = a.slice(0, i + 1).join('/');
      if (!dirSize[key]) dirSize[key] = 0;
      dirSize[key] += sizeNum;
    });
  }
});

// part 1
const dirSizesToSum = Object.values<number>(dirSize).filter(
  (ds) => ds <= 100000
);
const p1 = dirSizesToSum.reduce((acc, curr) => acc + curr, 0);
part1(p1);

// part 2
const totalDiskSpace = 70000000;
const need = 30000000;
const used = dirSize.root;
const minToDelete = used + need - totalDiskSpace;

const potential = Object.values(dirSize).filter((d) => d >= minToDelete);
const p2 = Math.min(...potential);
part2(p2);
