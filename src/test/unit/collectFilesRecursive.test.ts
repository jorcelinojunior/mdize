import { strict as assert } from "assert";
import * as fs from "fs";
import * as path from "path";
import { collectFilesRecursive } from "../../utils/files";

describe("collectFilesRecursive", () => {
  const root = "./tmp_test_folder";

  before(() => {
    fs.mkdirSync(root);
    fs.writeFileSync(path.join(root, "file1.txt"), "a");
    fs.mkdirSync(path.join(root, "sub"));
    fs.writeFileSync(path.join(root, "sub", "file2.txt"), "b");
  });

  after(() => {
    fs.unlinkSync(path.join(root, "sub", "file2.txt"));
    fs.rmdirSync(path.join(root, "sub"));
    fs.unlinkSync(path.join(root, "file1.txt"));
    fs.rmdirSync(root);
  });

  it("should find files recursively", () => {
    const files = collectFilesRecursive(root);
    assert.ok(files.some((f) => f.endsWith("file1.txt")));
    assert.ok(files.some((f) => f.endsWith("file2.txt")));
  });
});
