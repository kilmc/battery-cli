import fs from 'fs';
import path from 'path'
import { getPaths } from './utils';

const flatten = (items) => items
  .reduce((flat,item) => {
    Array.isArray(item)
      ? flat.push(...flatten(item))
      : flat.push(item)
    return flat
  },[]);


const extractClassNames = (str,regexArr) => {
  const stringMatch = '[\'\"](.*?)[\'\"]';

  return flatten(regexArr
    .map(regex => {
      const matches = str.match(new RegExp(regex,'g'))
      if (!matches) return [];

      return matches
        .map(x => x.match(new RegExp(regex))[1])
        .reduce((xs,x) => {
          const dirty = x.match(new RegExp(stringMatch,'g'));
          dirty
            ? xs.push(dirty.map(y => y
              .match(new RegExp(stringMatch))[1]
              .split(' ')))
            : xs.push(x.split(' '))
          return xs;
        },[])
    }));
};

const classNameParser = ({
  regexArr,
  fileFilterFn
}) => (targetDir) => {
  const files = getPaths(path.resolve(targetDir),fileFilterFn);
  const extractedClassNames = files.map(file => {
    return extractClassNames(
      fs.readFileSync(file, "utf8"),
      regexArr
    )
  })
  .reduce((xs,x) => xs.concat(x),[]);

  return [...new Set(extractedClassNames)];
};

export const parseHTML = classNameParser({
  regexArr: [
    'class=[\"\'](.*?)[\"\']'
  ],
  fileFilterFn: f => f.match(/\.html/)
});

export const parseJS = classNameParser({
  regexArr: [
    'styles\\(([^)]+)',
    'className=[\"\'](.*?)[\"\']'
  ],
  fileFilterFn: f => f.match(/\.js/)
});