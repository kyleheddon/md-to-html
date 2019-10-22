import fs  from 'fs';
import minimist  from 'minimist';
import { markdownToHtml } from './markdownToHtml';

const { file, logParsed } = minimist(process.argv.slice(2));

const input = fs.readFileSync(__dirname + '/' + file, 'utf8');
const html = markdownToHtml(input, logParsed);

console.log(html);
