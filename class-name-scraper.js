const fs = require('fs');
const path = require('path');

const extractClassNames = (str,regexArr) => {
  const stringMatch = '[\'\"](.*?)[\'\"]';

  return regexArr
    .map(regex => {
      const matches = str.match(new RegExp(regex,'g'))
      if (!matches) return [];

      return matches
        .map(x => x.match(new RegExp(regex))[1])
        .reduce((xs,x) => {
          const dirty = x.match(new RegExp(stringMatch,'g'));
          dirty
            ? xs.push(dirty.map(y => y.match(new RegExp(stringMatch))[1]))
            : xs.push(x.split(' '))
          return xs;
        },[])
        .reduce((xs,x) => xs.concat(x),[])
    })
    .reduce((xs,x) => xs.concat(x),[]);
}

const walkSync = (dir) =>
  fs.lstatSync(dir).isDirectory()
    ? fs
      .readdirSync(dir)
      .map(f => walkSync(path.join(dir, f)))
      .reduce((xs,x) => xs.concat(x),[])
    : dir;

const getPaths = (dir, filterFn = x => x) => {
  return walkSync(dir).filter(filterFn)
}

const classNameParser = ({
  regexArr,
  targetDir,
  fileFilterFn
}) => {
  const files = getPaths(targetDir,fileFilterFn);

  const extractedClassNames = files.map(file => {
    const contents = fs.readFileSync(file, "utf8");
    return extractClassNames(contents,regexArr)
  })
  .reduce((xs,x) => xs.concat(x),[]);

  return [...new Set(extractedClassNames)];
};

module.exports.classNameParser = classNameParser;