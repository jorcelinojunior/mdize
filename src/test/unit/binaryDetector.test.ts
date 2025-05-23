import * as fs from "fs";
import * as assert from "assert";
import { BinaryDetector } from "../../binaryDetector";

describe("BinaryDetector", () => {
  it("should detect text file as not binary", () => {
    const tempPath = "./tmp_test_text.txt";
    fs.writeFileSync(tempPath, "hello\nworld\n");
    assert.strictEqual(BinaryDetector.isFileBinary(tempPath), false);
    fs.unlinkSync(tempPath);
  });

  it("should detect binary file as binary", () => {
    const tempPath = "./tmp_test_bin.bin";
    fs.writeFileSync(tempPath, Buffer.from([0, 1, 2, 3, 4, 0, 0, 0]));
    assert.strictEqual(BinaryDetector.isFileBinary(tempPath), true);
    fs.unlinkSync(tempPath);
  });

  it("should cache results and clear cache", () => {
    const tempPath = "./tmp_test_cache.txt";
    fs.writeFileSync(tempPath, "simple text");
    BinaryDetector.isFileBinary(tempPath);
    BinaryDetector.clearCache();
    fs.unlinkSync(tempPath);
  });
});
