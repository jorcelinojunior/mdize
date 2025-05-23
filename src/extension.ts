import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { getFileFormat } from "./languageExtensions";
import { collectFilesRecursive } from "./utils/files";

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 MB

interface FileProcessingResult {
  content: string;
  relativePath: string;
  language: string;
}

/**
 * Returns a list of selected files or the currently visible editor document.
 */
async function resolveTargetFiles(
  uri?: vscode.Uri,
  uris?: vscode.Uri[]
): Promise<vscode.Uri[]> {
  if (uris?.length) {
    return uris;
  }
  if (uri) {
    return [uri];
  }

  const visible = vscode.window.visibleTextEditors.map((e) => e.document.uri);
  if (visible.length > 0) {
    return visible;
  }

  const active = vscode.window.activeTextEditor?.document.uri;
  if (active) {
    return [active];
  }

  throw new Error("No files selected or open in the editor.");
}

/**
 * Verifies that a file can be processed (size and known type).
 */
function canProcessFile(filePath: string): boolean {
  try {
    const stats = fs.statSync(filePath);
    if (stats.size > MAX_FILE_SIZE) {
      vscode.window.showWarningMessage(`Skipped large file: ${filePath}`);
      return false;
    }

    return getFileFormat(filePath) !== null;
  } catch (err) {
    console.error(`Error checking file: ${filePath}`, err);
    return false;
  }
}

/**
 * Reads a text file and extracts content and metadata.
 */
function processFile(
  filePath: string,
  basePath: string
): FileProcessingResult | null {
  if (!canProcessFile(filePath)) {
    return null;
  }

  try {
    const content = fs.readFileSync(filePath, "utf8");
    const relativePath =
      path.relative(basePath, filePath) || path.basename(filePath);
    const language = getFileFormat(filePath)!;

    return { content, relativePath, language };
  } catch (err) {
    console.error(`Failed to read file: ${filePath}`, err);
    return null;
  }
}

/**
 * Formats a file’s contents, optionally with line numbers.
 */
function formatContent(
  result: FileProcessingResult,
  withLines: boolean
): string {
  const codeFence = result.language === "markdown" ? "``````" : "```";
  const lines = result.content.split("\n");

  const body = withLines
    ? lines
        .map(
          (line, i) =>
            `${String(i + 1).padStart(lines.length.toString().length, "0")}:${
              line.length ? " " : ""
            }${line}`
        )
        .join("\n")
    : result.content;

  return `### \`${result.relativePath}\`\n${codeFence}${result.language}\n${body}\n${codeFence}\n\n`;
}

/**
 * Processes a URI (file or folder) and returns an array of formatted content strings,
 * one for each processed file, and the count of processed files.
 */
async function renderContentAndCount(
  uri: vscode.Uri,
  withLines: boolean
): Promise<{
  contents: string[];
  processedFileCount: number;
}> {
  const contents: string[] = [];
  let processedFileCount = 0;

  try {
    const workspace = vscode.workspace.getWorkspaceFolder(uri);
    const base = workspace?.uri.fsPath ?? path.dirname(uri.fsPath);
    const stats = fs.statSync(uri.fsPath);

    if (stats.isDirectory()) {
      for (const file of collectFilesRecursive(uri.fsPath)) {
        const result = processFile(file, base);
        if (result) {
          contents.push(formatContent(result, withLines));
          processedFileCount++;
        }
      }
    } else {
      const result = processFile(uri.fsPath, base);
      if (result) {
        contents.push(formatContent(result, withLines));
        processedFileCount++;
      }
    }
  } catch (err) {
    console.error(`Error processing path: ${uri.fsPath}`, err);
  }
  return { contents, processedFileCount };
}

/**
 * Handles file copy command for both modes.
 */
async function copyToClipboard(
  withLineNumbers: boolean,
  uri?: vscode.Uri,
  uris?: vscode.Uri[]
) {
  try {
    const selectedUris = await resolveTargetFiles(uri, uris);
    const allContentBlocks: string[] = [];
    let totalProcessedFiles = 0;

    for (const selectedUri of selectedUris) {
      const { contents, processedFileCount } = await renderContentAndCount(
        selectedUri,
        withLineNumbers
      );
      if (contents.length > 0) {
        allContentBlocks.push(...contents);
      }
      totalProcessedFiles += processedFileCount;
    }

    if (allContentBlocks.length > 0) {
      await vscode.env.clipboard.writeText(allContentBlocks.join(""));

      const message =
        totalProcessedFiles === 1
          ? `Copied content of the file${
              withLineNumbers ? " with line numbers." : "."
            }`
          : `Copied content of ${totalProcessedFiles} files${
              withLineNumbers ? " with line numbers." : "."
            }`;

      vscode.window.showInformationMessage(message);
    } else {
      vscode.window.showInformationMessage(
        "No valid text files found to copy."
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    vscode.window.showErrorMessage(`Copy failed: ${message}`);
  }
}

/**
 * Registers the extension commands.
 */
export function activate(context: vscode.ExtensionContext) {
  const copyWithLines = vscode.commands.registerCommand(
    "mdize.copyWithLines",
    (uri, uris) => copyToClipboard(true, uri, uris)
  );

  const copyClean = vscode.commands.registerCommand(
    "mdize.copyClean",
    (uri, uris) => copyToClipboard(false, uri, uris)
  );

  context.subscriptions.push(copyWithLines, copyClean);
}

export function deactivate() {}
