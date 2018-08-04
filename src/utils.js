import fs from 'fs';
import path from 'path';

export const walkSync = (dir) => {
  if (fs.lstatSync(dir).isDirectory()) {
    return fs
      .readdirSync(dir)
      .map(f => walkSync(path.resolve(path.join(dir,f))))
      .reduce((xs,x) => xs.concat(x),[])
  } else {
    return dir;
  }
}


export const getPaths = (dir, filterFn = x => x) => {
  return walkSync(path.resolve(dir)).filter(filterFn)
}