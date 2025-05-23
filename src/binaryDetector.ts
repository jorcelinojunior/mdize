import * as fs from "fs";

/**
 * Utility class to detect whether a file is binary based on byte analysis.
 */
export class BinaryDetector {
  private static readonly BUFFER_SIZE = 8192; // 8 KB
  private static readonly NULL_THRESHOLD = 0.1; // 10%
  private static readonly CONTROL_THRESHOLD = 0.1; // 10%

  /** Control characters considered safe (e.g. tab, line feed, carriage return, form feed) */
  private static readonly ALLOWED_CONTROL_CHARS = new Set([9, 10, 13, 12]);

  /** In-memory cache for binary detection results to avoid reprocessing */
  private static readonly cache = new Map<string, boolean>();

  /**
   * Checks whether the specified file is binary.
   * Falls back to assuming binary on read errors.
   */
  static isFileBinary(filePath: string): boolean {
    const cached = this.cache.get(filePath);
    if (cached !== undefined) {return cached;}

    let result = false;

    try {
      const fd = fs.openSync(filePath, "r");
      const buffer = Buffer.alloc(this.BUFFER_SIZE);
      const bytesRead = fs.readSync(fd, buffer, 0, this.BUFFER_SIZE, 0);
      fs.closeSync(fd);

      result = this.isBinaryBuffer(buffer.subarray(0, bytesRead));
    } catch (err) {
      console.error(`Error checking binary content for ${filePath}:`, err);
      result = true;
    }

    this.setCache(filePath, result);
    return result;
  }

  /**
   * Heuristically determines whether a buffer contains binary content.
   */
  private static isBinaryBuffer(buffer: Buffer): boolean {
    let nulls = 0;
    let controls = 0;
    const total = buffer.length;

    for (let i = 0; i < total; i++) {
      const byte = buffer[i];

      // NULL byte is a strong binary indicator
      if (byte === 0) {
        if (++nulls / total > this.NULL_THRESHOLD) {return true;}
        continue;
      }

      // Control characters not in the allowlist may indicate binary
      if (byte < 32 && !this.ALLOWED_CONTROL_CHARS.has(byte)) {
        if (++controls / total > this.CONTROL_THRESHOLD) {return true;}
      }

      // Malformed UTF-8 high bits (starts with 0b11111xxx)
      if ((byte & 0xf8) === 0xf8) {
        return true;
      }
    }

    return false;
  }

  /**
   * Adds the result to cache and trims it if it grows too large.
   */
  private static setCache(filePath: string, isBinary: boolean): void {
    this.cache.set(filePath, isBinary);

    // Prevent cache bloat by trimming when exceeding 1000 entries
    if (this.cache.size > 1000) {
      const keys = this.cache.keys();
      for (let i = 0; i < 200; i++) {
        const next = keys.next();
        if (next.done) {break;}
        this.cache.delete(next.value);
      }
    }
  }

  /**
   * Clears the internal binary result cache.
   */
  static clearCache(): void {
    this.cache.clear();
  }
}
