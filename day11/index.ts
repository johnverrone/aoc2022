import { part1, part2 } from '../utils/print';
import { readFileAsText } from '../utils/readFile';

const contents = await readFileAsText(import.meta.dir);
const monkeys = contents.split('\n\n');

type Monkey = {
  id: number;
  startingItems: number[];
  operation: (old: number) => number;
  test: (n: number) => number;
  inspectionCount: number;
};

const monkeyMap = monkeys.reduce<Record<number, Monkey>>((acc, monkey) => {
  const rows = monkey.split('\n');
  const id = parseInt(rows[0].match(/Monkey ([0-9]+):/)[1], 10);

  const startingItems = [];
  for (const item of rows[1].matchAll(/([0-9]+)/g)) {
    startingItems.push(parseInt(item[0], 10));
  }

  const [, operator, num] = rows[2].match(/.*= old ([\*\/\-\+]) (old|[0-9]+)/);
  const operation = (prev: number) => {
    let n = num === 'old' ? prev : parseInt(num, 10);
    switch (operator) {
      case '*':
        return prev * n;
      case '+':
        return prev + n;
      case '/':
        return prev / n;
      case '-':
        return prev - n;
      default:
        return prev;
    }
  };

  const [, testString] = rows[3].match(/.*by ([0-9]+)/);
  const [, trueMonkey] = rows[4].match(/.*monkey ([0-9]+)/);
  const [, falseMonkey] = rows[5].match(/.*monkey ([0-9]+)/);
  const test = (num: number) => {
    if (num % parseInt(testString, 10) === 0) {
      return parseInt(trueMonkey, 10);
    }
    return parseInt(falseMonkey, 10);
  };

  return {
    ...acc,
    [id]: { id, startingItems, operation, test, inspectionCount: 0 },
  };
}, {});

// part 1
for (let round = 0; round < 20; round++) {
  for (const key in monkeyMap) {
    const monkey = monkeyMap[key];
    monkey.startingItems.forEach((item) => {
      monkey.inspectionCount++;
      const newWorry = Math.floor(monkey.operation(item) / 3);
      const newMonkey = monkey.test(newWorry);
      monkeyMap[newMonkey].startingItems.push(newWorry);
    });

    monkey.startingItems = [];
  }
}
const [gold, silver] = Object.values(monkeyMap)
  .map((m) => m.inspectionCount)
  .sort((a, b) => b - a)
  .splice(0, 2);
const p1 = gold * silver;
part1(p1);

// part 2
for (let round = 0; round < 10000; round++) {
  for (const key in monkeyMap) {
    const monkey = monkeyMap[key];
    monkey.startingItems.forEach((item) => {
      monkey.inspectionCount++;
      const newWorry = monkey.operation(item);
      const newMonkey = monkey.test(newWorry);
      monkeyMap[newMonkey].startingItems.push(newWorry);
    });

    monkey.startingItems = [];
  }
}
const [gold2, silver2] = Object.values(monkeyMap)
  .map((m) => m.inspectionCount)
  .sort((a, b) => b - a)
  .splice(0, 2);
console.log(gold2, silver2);
let p2 = BigInt(gold2) * BigInt(silver2);
part2(p2);
