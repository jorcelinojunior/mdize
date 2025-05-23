/**
 * Entry point for integration tests. Launches VS Code Extension Development Host
 * and runs all compiled test suites.
 */

import * as path from 'path';
import { runTests } from '@vscode/test-electron';

async function main() {
  try {
    // The folder containing the extension manifest (package.json)
    const extensionDevelopmentPath = path.resolve(__dirname, '../../');
    // The path to the compiled test runner script
    const extensionTestsPath = path.resolve(__dirname, '../../out/test/suite/index');
    await runTests({ extensionDevelopmentPath, extensionTestsPath });
  } catch (err) {
    console.error('Failed to run integration tests:', err);
    process.exit(1);
  }
}

main();
