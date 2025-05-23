import * as fs from "fs";
import * as assert from "assert";
import { getFileFormat } from "../../languageExtensions";

describe("getFileFormat", () => {
  it("detects ts as typescript", () => {
    assert.strictEqual(getFileFormat("foo.ts"), "typescript");
  });

  it("returns null for unknown binary extensions", () => {
    // Mock console.error just for this test
    const originalConsoleError = console.error;
    console.error = () => {};

    const result = getFileFormat("foo.exe");
    assert.equal(result, null);

    // Restore original console.error
    console.error = originalConsoleError;
  });

  it("returns extension if not known but is text", () => {
    const temp = "./tmp_test.abc";
    fs.writeFileSync(temp, "hello");
    assert.strictEqual(getFileFormat(temp), "abc");
    fs.unlinkSync(temp);
  });
});
