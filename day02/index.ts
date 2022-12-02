import { readFileAsText } from '../utils/readFile';

const contents = await readFileAsText(import.meta.dir);
const rows = contents.split('\n');

type RPSThrow = 'rock' | 'paper' | 'scissors';

const winnerPoints = (yourThrow: RPSThrow, theirThrow: RPSThrow): number => {
  if (yourThrow === theirThrow) return 3; // draw
  if (
    (yourThrow === 'paper' && theirThrow === 'rock') ||
    (yourThrow === 'rock' && theirThrow === 'scissors') ||
    (yourThrow === 'scissors' && theirThrow === 'paper')
  )
    return 6; // win

  return 0; // loss
};

const shapeScore: { [T in RPSThrow]: number } = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const decode: { [key: string]: RPSThrow } = {
  A: 'rock',
  B: 'paper',
  C: 'scissors',
  X: 'rock',
  Y: 'paper',
  Z: 'scissors',
};

// part 1
const totalScore = rows.reduce((acc, curr) => {
  const [abc, xyz] = curr.split(' ');
  const theirThrow = decode[abc];
  const yourThrow = decode[xyz];

  const throwPoints = shapeScore[yourThrow];
  const outcomePoints = winnerPoints(yourThrow, theirThrow);

  acc += throwPoints + outcomePoints;
  return acc;
}, 0);

console.log('Part 1:', totalScore);

// part 2
type Outcome = 'X' | 'Y' | 'Z'; // lose, draw, win

const whatToThrow = (theirThrow: RPSThrow, outcome: Outcome): RPSThrow => {
  if (outcome === 'Y') return theirThrow; // draw
  if (outcome === 'Z') {
    // gotta win
    if (theirThrow === 'rock') return 'paper';
    if (theirThrow === 'paper') return 'scissors';
    if (theirThrow === 'scissors') return 'rock';
  }
  // gotta lose
  if (theirThrow === 'rock') return 'scissors';
  if (theirThrow === 'paper') return 'rock';
  if (theirThrow === 'scissors') return 'paper';
};

const totalScore2 = rows.reduce((acc, curr) => {
  const [abc, xyz] = curr.split(' ');
  const theirThrow = decode[abc];
  const outcome = xyz as Outcome;

  const yourThrow = whatToThrow(theirThrow, outcome);
  const throwPoints = shapeScore[yourThrow];
  const outcomePoints = winnerPoints(yourThrow, theirThrow);

  acc += throwPoints + outcomePoints;
  return acc;
}, 0);

console.log('Part 2:', totalScore2);
