import { part1, part2 } from '../utils/print';
import { readFileAsText } from '../utils/readFile';

const contents = await readFileAsText(import.meta.dir);
const rows = contents.split('\n');
const moves = rows.map((row) => {
  const [move, countString] = row.split(' ');
  const count = parseInt(countString, 10);
  return [move, count];
});

// part 1
let [cx, cy] = [0, 0];
let [tx, ty] = [0, 0];
let v = new Set<string>();
v.add('0, 0');
moves.forEach(([move, count]) => {
  switch (move) {
    case 'R': {
      for (let i = 0; i < count; i++) {
        cx++;
        if (tx === cx - 1 || tx === cx) continue;
        ty = cy;
        tx = cx - 1;
        v.add(`${tx}, ${ty}`);
      }
      break;
    }
    case 'L': {
      for (let i = 0; i < count; i++) {
        cx--;
        if (tx === cx + 1 || tx === cx) continue;
        ty = cy;
        tx = cx + 1;
        v.add(`${tx}, ${ty}`);
      }
      break;
    }
    case 'U': {
      for (let i = 0; i < count; i++) {
        cy--;
        if (ty === cy + 1 || ty === cy) continue;
        tx = cx;
        ty = cy + 1;
        v.add(`${tx}, ${ty}`);
      }
      break;
    }
    case 'D': {
      for (let i = 0; i < count; i++) {
        cy++;
        if (ty === cy - 1 || ty === cy) continue;
        tx = cx;
        ty = cy - 1;
        v.add(`${tx}, ${ty}`);
      }
      break;
    }
  }
});
const p1 = v.size;
part1(p1);

// part 2
function isTouching([x1, y1]: [number, number], [x2, y2]: [number, number]) {
  if (x1 < x2 - 1) return false;
  if (x1 > x2 + 1) return false;
  if (y1 < y2 - 1) return false;
  if (y1 > y2 + 1) return false;
  return true;
}

function moveRope(rope: [number, number][]) {
  for (let knot = 1; knot < rope.length; knot++) {
    if (isTouching(rope[knot], rope[knot - 1])) break;
    const coldiff = rope[knot][0] - rope[knot - 1][0];
    const rowdiff = rope[knot][1] - rope[knot - 1][1];
    if (coldiff < 0) {
      // left of knot in front, increase x
      rope[knot][0]++;
    } else if (coldiff > 0) {
      // right of knot in front, decrease x
      rope[knot][0]--;
    }
    if (rowdiff < 0) {
      // above knot in front, increase y
      rope[knot][1]++;
    } else if (rowdiff > 0) {
      // below knot in front, decrease y
      rope[knot][1]--;
    }
  }
}

const ropeLength = 10;
let rope = [...Array(ropeLength)].map<[number, number]>((i) => [0, 0]);
const tailIdx = ropeLength - 1;
let v2 = new Set<string>();
v2.add('0, 0');
moves.forEach(([move, count]) => {
  switch (move) {
    case 'R': {
      for (let i = 0; i < count; i++) {
        //move the head
        rope[0][0]++;
        moveRope(rope);
        v2.add(`${rope[tailIdx][0]}, ${rope[tailIdx][1]}`);
      }
      break;
    }
    case 'L': {
      for (let i = 0; i < count; i++) {
        //move the head
        rope[0][0]--;
        moveRope(rope);
        v2.add(`${rope[tailIdx][0]}, ${rope[tailIdx][1]}`);
      }
      break;
    }
    case 'U': {
      for (let i = 0; i < count; i++) {
        //move the head
        rope[0][1]--;
        moveRope(rope);
        v2.add(`${rope[tailIdx][0]}, ${rope[tailIdx][1]}`);
      }
      break;
    }
    case 'D': {
      for (let i = 0; i < count; i++) {
        //move the head
        rope[0][1]++;
        moveRope(rope);
        v2.add(`${rope[tailIdx][0]}, ${rope[tailIdx][1]}`);
      }
      break;
    }
  }
});
const p2 = v2.size;
part2(p2);
