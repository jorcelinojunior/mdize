/**
 * Mocha test runner. Discovers and runs all *.test.js files in this directory.
 */

import * as path from 'path';
import Mocha from 'mocha';
import { glob } from 'glob';

export function run(): Promise<void> {
  const mocha = new Mocha({ ui: 'tdd', color: true });
  const testsRoot = __dirname;

  return new Promise((resolve, reject) => {
    glob('**/*.test.js', { cwd: testsRoot }).then(files => {
      files.forEach(f => mocha.addFile(path.resolve(testsRoot, f)));
      try {
        mocha.run(failures => {
          if (failures > 0) {reject(new Error(`${failures} tests failed.`));}
          else {resolve();}
        });
      } catch (err) {
        reject(err);
      }
    }).catch(reject);
  });
}
