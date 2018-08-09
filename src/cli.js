#!/usr/bin/env node

import program from 'commander';
import path from 'path';
import fs from 'fs-extra';
import { generateCSS } from '@battery/core';
import { parseJS, parseHTML } from './parse-files';

const writeCssFile = (styles, outDir) => {
  fs.outputFile(path.join(outDir,'styles.css'),styles,'utf8');
}

program
  .version('0.0.2');

program
  .command('generate [config]')
  .option('-s --static','Parse static HTML files')
  .option('-d --dir <dir>','Target directory to parse for class names')
  .option('-w --watch','Watch the target directory for changes')
  .option('-o --out-dir <dir>','Output directory for the final CSS file')
  .action((config, options) => {
    if (!path.resolve('./battery.config.js') && !options.config) {
      console.log('no default config found at ./battery.config.js');
      console.log('Options');
      console.log('    - Add the default config file');
      console.log('    - Pass the path to the config via the -c and --config flag');
      process.exit(1);
    }
    const configPath = path.resolve(config ? config : './battery.config.js')
    const importedConfig = __non_webpack_require__(configPath).default;

    // Target Directory to parse for class names
    const targetDir = path.resolve(options.dir ? options.dir : './');

    // Output directory for .css file
    const outDir = path.resolve(options.outDir ? options.outDir : 'styles');


    const parseFn = options.static ? parseHTML : parseJS;
    const css = generateCSS(parseFn(targetDir),importedConfig)
    writeCssFile(css,outDir);
  });


program.parse(process.argv)
