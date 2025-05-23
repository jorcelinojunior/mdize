export interface FileProcessingResult {
  content: string
  relativePath: string
  language: string
}

/**
 * Formats file content, optionally adding line numbers (with automatic padding).
 */
export function formatContent(
  result: FileProcessingResult,
  withLineNumbers: boolean
): string {
  const codeBlock = result.language === "markdown" ? "``````" : "```";
  const lines = result.content.split("\n");
  let contentBlock: string;

  if (withLineNumbers) {
    const padLength = lines.length.toString().length;
    contentBlock = lines
      .map((line, idx) => `${String(idx + 1).padStart(padLength, "0")}: ${line}`)
      .join("\n");
  } else {
    contentBlock = result.content;
  }

  return `### \`${result.relativePath}\`\n\n${codeBlock}${result.language}\n${contentBlock}\n${codeBlock}\n\n`;
}
