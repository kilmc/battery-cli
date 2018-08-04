#!/usr/bin/env node

import program from 'commander';
import path from 'path';
import fs from 'fs';
import { generateCSS } from '@battery/core';
import { parseJS, parseHTML } from './parse-files';

const writeCssFile = (styles,outDir) => {
  fs.writeFile('styles.css',styles,'utf8');
}

program
  .command('build <config>')
  .option('-s --static','Parse static HTML files')
  .option('-d --dir <dir>','Target directory')
  .option('-o --out-dir <dir>','Output directory for the final CSS file')
  .action((config, options) => {
    const parsedConfig = __non_webpack_require__(path.resolve(config)).default;
    const targetDir = path.resolve(options.dir ? options.dir : __dirname);
    const outDir = path.resolve(options.outDir ? options.outDir : __dirname);
    const parseFn = options.static ? parseHTML : parseJS;
    const css = generateCSS(parseFn(targetDir),parsedConfig)
    writeCssFile(css,outDir);
  });


program.parse(process.argv)
