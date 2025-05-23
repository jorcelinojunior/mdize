import { strict as assert } from "assert";
import { FileProcessingResult, formatContent } from "../../utils/format";

function lineExists(formatted: string, expected: string): boolean {
  return formatted.split("\n").some(line => line.startsWith(expected));
}

describe("formatContent", () => {
  const basicResult: FileProcessingResult = {
    content: "first line\nsecond line\nthird line",
    relativePath: "src/mock.ts",
    language: "typescript",
  };

  it("adds line numbers without zero-padding for less than 10 lines", () => {
    const formatted = formatContent(basicResult, true);
    assert.ok(lineExists(formatted, "1: first line"));
    assert.ok(lineExists(formatted, "2: second line"));
    assert.ok(lineExists(formatted, "3: third line"));
    assert.ok(!lineExists(formatted, "01: first line"));
  });

  it("adds line numbers with 2-digit zero-padding for 10 to 99 lines", () => {
    const content = Array.from({ length: 25 }, (_, i) => `line ${i + 1}`).join("\n");
    const result: FileProcessingResult = {
      content,
      relativePath: "src/twentyfive.ts",
      language: "typescript",
    };
    const formatted = formatContent(result, true);
    assert.ok(lineExists(formatted, "01: line 1"));
    assert.ok(lineExists(formatted, "25: line 25"));
    assert.ok(!lineExists(formatted, "1: line 1"));
  });

  it("adds line numbers with 3-digit zero-padding for 100 to 999 lines", () => {
    const content = Array.from({ length: 123 }, (_, i) => `line ${i + 1}`).join("\n");
    const result: FileProcessingResult = {
      content,
      relativePath: "src/onetwothree.ts",
      language: "typescript",
    };
    const formatted = formatContent(result, true);
    assert.ok(lineExists(formatted, "001: line 1"));
    assert.ok(lineExists(formatted, "123: line 123"));
    assert.ok(!lineExists(formatted, "01: line 1"));
  });

  it("adds line numbers with 4-digit zero-padding for 1000+ lines", () => {
    const content = Array.from({ length: 1001 }, (_, i) => `line ${i + 1}`).join("\n");
    const result: FileProcessingResult = {
      content,
      relativePath: "src/thousand.ts",
      language: "typescript",
    };
    const formatted = formatContent(result, true);
    assert.ok(lineExists(formatted, "0001: line 1"));
    assert.ok(lineExists(formatted, "1001: line 1001"));
    // Check that "001: line 1" as a prefix does NOT exist as a line
    assert.ok(!formatted.split("\n").some(line => /^001: line 1$/.test(line)));
  });

  it("does not add line numbers when disabled", () => {
    const formatted = formatContent(basicResult, false);
    assert.ok(!lineExists(formatted, "1:"));
    assert.ok(!lineExists(formatted, "01:"));
    assert.ok(formatted.includes("first line"));
  });
});
