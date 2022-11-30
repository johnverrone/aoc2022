import { readFileAsText } from '../utils/readFile';

const contents = await readFileAsText(import.meta.dir);

console.log(contents);
