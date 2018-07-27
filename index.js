const classNameParser = require('./class-name-scraper').classNameParser;
const args = process.argv.slice(2);

const styleFnRegex = 'styles\\((.*?)\\)';
const classNameFnRegex = 'className=[\"\'](.*?)[\"\']'
const HTMLRegex = 'class=[\"\'](.*?)[\"\']';

console.log('React:',classNameParser({
  targetDir: args[0],
  regexArr: [styleFnRegex,classNameFnRegex],
  fileFilterFn: f => f.match(/\.js/)
}));

console.log('HTML:',classNameParser({
  targetDir: args[0],
  regexArr: [HTMLRegex],
  fileFilterFn: f => f.match(/\.html/)
}));