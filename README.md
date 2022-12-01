# Advent of Code 2022

Using [bun](https://bun.sh/) as a TypeScript runtime this year.

To run a puzzle, ensure `bun` is installed and run `bun dayX/index.ts`

### Day 01

Always an easy one to kick off of AoC. I spent majority of the time writing `console.log`s trying to understand why my solution wasn't working only to realize I wasn't initializing a value for `cals[currElf]` if it was the first row for an elf so `NaN` was happenning when trying to add values.

Also accidentally submitted my answer from the test input so I had to wait to submit again with the solution from the real puzzle input.
