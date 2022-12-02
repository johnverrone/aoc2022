# Advent of Code 2022

Using [bun](https://bun.sh/) as a TypeScript runtime this year.

To run a puzzle, ensure `bun` is installed and run `bun dayX/index.ts`

### Day 01

Always an easy one to kick off of AoC. I spent majority of the time writing `console.log`s trying to understand why my solution wasn't working only to realize I wasn't initializing a value for `cals[currElf]` if it was the first row for an elf so `NaN` was happenning when trying to add values.

Also accidentally submitted my answer from the test input so I had to wait to submit again with the solution from the real puzzle input.

### Day 02

Rock, paper, scissors is always a problem that I feel could be solved with an enum and modulus math or some other logical bit shifting wizardry with little to no lines of code, but I went with a trusty verbose and type safe solution for this one. Typical helper functions filled with conditionals to determine who won, a basic JS object map to decode the raw input into Rock, Paper, and Scissors, and a reducer to sum everything up.

Would be interested in optimizing this a little bit but I think I'll leave my solutions as they are when I got the right answer for historical purposes.
