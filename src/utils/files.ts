import * as fs from "fs";
import * as path from "path";

/**
 * Recursively collects all file paths from a directory (including subfolders).
 * @param directoryPath - The root directory to start searching from.
 * @returns Array of absolute file paths.
 */
export function collectFilesRecursive(directoryPath: string): string[] {
  const results: string[] = [];
  const stack: string[] = [directoryPath];

  while (stack.length) {
    const current = stack.pop()!;
    const entries = fs.readdirSync(current, { withFileTypes: true });

    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
      } else if (entry.isFile()) {
        results.push(full);
      }
    }
  }

  return results;
}
