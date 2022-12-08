import { part1, part2 } from '../utils/print';
import { readFileAsText } from '../utils/readFile';

const contents = await readFileAsText(import.meta.dir);
const rows = contents.split('\n');
const grid = rows.map((r) => r.split('').map((n) => parseInt(n, 10)));

const numRows = grid.length;
const numCols = grid.at(0).length;

const exterior = numRows * 2 + numCols * 2 - 4;

function range(size: number, startAt = 0) {
  return [...Array(size).keys()].map((i) => i + startAt);
}

// part 1
let p1 = 0;
for (let r = 1; r < numRows - 1; r++) {
  for (let c = 1; c < numCols - 1; c++) {
    const height = grid[r][c];
    const left = range(c).map((i) => grid[r][i]);
    if (left.every((tree) => tree < height)) {
      p1++;
      continue;
    }
    const right = range(numCols - c - 1, c + 1).map((i) => grid[r][i]);
    if (right.every((tree) => tree < height)) {
      p1++;
      continue;
    }
    const top = range(r).map((i) => grid[i][c]);
    if (top.every((tree) => tree < height)) {
      p1++;
      continue;
    }
    const bottom = range(numRows - r - 1, r + 1).map((i) => grid[i][c]);
    if (bottom.every((tree) => tree < height)) {
      p1++;
      continue;
    }
  }
}
part1(p1 + exterior);

function countTrees(trees: number[], height: number): number {
  let visible = 1;
  for (let i = 0; i < trees.length; i++) {
    if (trees[i] >= height) return visible;
    visible++;
  }
  return visible - 1;
}

// part 2
let p2 = 0;
for (let r = 1; r < numRows - 1; r++) {
  for (let c = 1; c < numCols - 1; c++) {
    const height = grid[r][c];
    const left = range(c).map((i) => grid[r][i]);
    left.reverse();
    const leftTrees = countTrees(left, height);
    const right = range(numCols - c - 1, c + 1).map((i) => grid[r][i]);
    const rightTrees = countTrees(right, height);
    const top = range(r).map((i) => grid[i][c]);
    top.reverse();
    const topTrees = countTrees(top, height);
    const bottom = range(numRows - r - 1, r + 1).map((i) => grid[i][c]);
    const bottomTrees = countTrees(bottom, height);

    const scenicScore = leftTrees * rightTrees * topTrees * bottomTrees;
    if (scenicScore > p2) p2 = scenicScore;
  }
}
part2(p2);
