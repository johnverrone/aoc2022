# Advent of Code 2022

Using [bun](https://bun.sh/) as a TypeScript runtime this year.

To run a puzzle, ensure `bun` is installed and run `bun dayX/index.ts`

### Day 01

Always an easy one to kick off of AoC. I spent majority of the time writing `console.log`s trying to understand why my solution wasn't working only to realize I wasn't initializing a value for `cals[currElf]` if it was the first row for an elf so `NaN` was happenning when trying to add values.

Also accidentally submitted my answer from the test input so I had to wait to submit again with the solution from the real puzzle input.

### Day 02

Rock, paper, scissors is always a problem that I feel could be solved with an enum and modulus math or some other logical bit shifting wizardry with little to no lines of code, but I went with a trusty verbose and type safe solution for this one. Typical helper functions filled with conditionals to determine who won, a basic JS object map to decode the raw input into Rock, Paper, and Scissors, and a reducer to sum everything up.

Would be interested in optimizing this a little bit but I think I'll leave my solutions as they are when I got the right answer for historical purposes.

### Day 03

Got part 1 pretty confidently and quickly, just needed to Google ascii code values for the alphabet. Part 2 tripped me up a bit. Was torn on how to do it with a single for loop. Ended up not loving the way I filtered down the 'badgeSearch' using a regex match (which I also Googled) because it would sometime result in the 'found badge' being the same character twice (eg. 'rr') so then I had to do some extra boundary checking when getting the point value. Did it with a single loop though so all good. Also did this one late.

### Day 04

Wow I struggled really hard to think of some creative solution to find the overlapping sections (even after I wrote the code to parse the elves start and end positions) efficiently before realizing it could be done with a simple conditional. Annoying part of this problem was parsing the text input into integers.

Part 2 was super easy as you only needed to check one two sets of numbers. Glad I got this one done quick. Especially before KK and Alex ;)

### Day 05

Annoying parsing this one. I struggled hard with mutable JS array functions (because I typically avoid these) and RegEx (couldn't get the `.groups` working ??). Anyways. Typical stack data structure which made parsing the instructions super simple. Just getting the arrays populated was a pain. Curious if there was a more optimal way get to the data structure setup I wanted.

Also extremely frustrating that I couldn't 'reset' the stack for part 2. Any array cloning solution I could think of or find only duplicated by reference meaning my "cloned" stack for part 2 that should have matched the initial state was mutated by part 1's `.push` and `.unshift` calls. Hopefully tomorrows doesn't take quite this long 😅

### Day 06

Phew. Way easier that yesterydays. Nice not to parse a bunch of stuff haha. This was pretty straightforwad. Glad I used a set to check unique-ness in part 1 -- it made for an easy part 2. My biggest hiccup was trying to get an `Array.prototype.forEach` function to return early once it found the index. Ended up switching back to a good ole for loop.

### Day 07

Got a solution working in a few minutes for the practice input, but it was apparently incorrect for the main input. Have been struggling for over an hour now and it's way too late. Will pick back up tomorrow but this is frustrating.

Came back to it this morning and (with some Googling, ugh) realized that my approach of tracking directory sizes in a flat way (without the full file path) was likely causing some conflicts and therefore numbers weren't adding up correctly. Using almost an identical approach but storing the size map as `fullDirPath => size` instead of `dirName => size` ended up giving me the correct answer. So frustrating.

Part 2 was easy from there but I also got tripped on how to calculate `usedSpace + wantedSpace - totalDiskSpace` to figure out what the minimum needed to delete was.

### Day 08

Well I definitely didn't opimize my runtime. This solution has loops inside of loops inside of looops 😂 But it was fine. I felt like I got part 1 pretty quickly actually. Part 2 stumped me a lot because I couldn't figure out how to count trees that were in view where _one_ and only one tree of the same height could be counted. I kept getting 0 when I wanted 1 and 3 when I wanted 2. Ended up refactoring the tree counting logic into it's own function and it made it a lot easier.

### Day 09

Wow this one took a LONG time. Part 1 I did in a pretty ugly way. Brute force, confusing conditionals in each direction. bleh. but I got the answer. I knew pt 2 was going to be extending the rope but for the life of me I could not get the physics right. I finally got something looking right but realized I was still doing conditional logic per direction (eg, I would only let a knot move left if the direction was L). Once I realized that the rules for a knot moving are independent of what direction the head was moving, I finally got the answer correct. Cool problem but sheesh. Took too long.

### Day 10

Was torn on if I shold approach this from a cycle standpoint or from an instruction standpoint. Ended up going with the latter and I think it messed me up a bit for part 2. Ended up just having random math and off by one issues, but other than that I thought it was pretty straightforward. Not a very elegant solution though.
