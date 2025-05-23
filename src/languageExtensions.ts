import * as mime from "mime-types";
import * as path from "path";
import { BinaryDetector } from "./binaryDetector";

/**
 * Defines language mappings for file extensions and MIME types.
 */
interface LanguageConfig {
  extensions: string[]
  mimeTypes: string[]
}

const languageExtensions: Record<string, LanguageConfig> = {
  typescript: {
    extensions: [".ts", ".tsx"],
    mimeTypes: ["application/typescript", "text/typescript"],
  },
  javascript: {
    extensions: [".js", ".jsx", ".mjs"],
    mimeTypes: [
      "application/javascript",
      "text/javascript",
      "application/x-javascript",
      "application/ecmascript",
    ],
  },
  python: {
    extensions: [".py", ".pyw", ".pyi"],
    mimeTypes: ["text/x-python", "application/x-python"],
  },
  java: {
    extensions: [".java"],
    mimeTypes: ["text/x-java-source", "application/x-java"],
  },
  cpp: {
    extensions: [".cpp", ".cc", ".cxx", ".hpp", ".h", ".c"],
    mimeTypes: ["text/x-c", "text/x-c++"],
  },
  csharp: {
    extensions: [".cs"],
    mimeTypes: ["text/x-csharp"],
  },
  go: {
    extensions: [".go"],
    mimeTypes: ["text/x-go"],
  },
  rust: {
    extensions: [".rs"],
    mimeTypes: ["text/x-rust"],
  },
  ruby: {
    extensions: [".rb", ".rake", ".gemspec"],
    mimeTypes: ["text/x-ruby", "application/x-ruby"],
  },
  php: {
    extensions: [".php", ".phtml", ".php3", ".php4", ".php5", ".phps"],
    mimeTypes: ["application/x-httpd-php", "text/x-php"],
  },
  swift: {
    extensions: [".swift"],
    mimeTypes: ["text/x-swift"],
  },
  kotlin: {
    extensions: [".kt", ".kts"],
    mimeTypes: ["text/x-kotlin"],
  },
  html: {
    extensions: [".html", ".htm", ".xhtml"],
    mimeTypes: ["text/html", "application/xhtml+xml"],
  },
  css: {
    extensions: [".css"],
    mimeTypes: ["text/css"],
  },
  scss: {
    extensions: [".scss"],
    mimeTypes: ["text/x-scss"],
  },
  less: {
    extensions: [".less"],
    mimeTypes: ["text/x-less"],
  },
  xml: {
    extensions: [".xml", ".xsd", ".xsl", ".xslt"],
    mimeTypes: ["text/xml", "application/xml"],
  },
  json: {
    extensions: [".json"],
    mimeTypes: ["application/json"],
  },
  yaml: {
    extensions: [".yml", ".yaml"],
    mimeTypes: ["text/yaml", "application/x-yaml", "application/yaml"],
  },
  markdown: {
    extensions: [".md", ".markdown", ".mdown"],
    mimeTypes: ["text/markdown"],
  },
  shell: {
    extensions: [".sh", ".bash", ".zsh", ".fish"],
    mimeTypes: ["text/x-shellscript", "application/x-sh"],
  },
  sql: {
    extensions: [".sql"],
    mimeTypes: ["text/x-sql", "application/x-sql"],
  },
  graphql: {
    extensions: [".graphql", ".gql"],
    mimeTypes: ["application/graphql"],
  },
  dockerfile: {
    extensions: ["dockerfile", ".dockerfile"],
    mimeTypes: ["text/x-dockerfile"],
  },
  plaintext: {
    extensions: [".txt", ".text"],
    mimeTypes: ["text/plain"],
  },
};

// Known binary file patterns to exclude explicitly
const EXCLUDED_PATTERNS: RegExp[] = [/\.DS_Store/, /Thumbs\.db/];

/**
 * Determines the appropriate language/format for a given file path.
 * Returns `null` if the file is binary or unknown.
 */
export function getFileFormat(filePath: string): string | null {
  if (isExcluded(filePath)) {return null;}

  const ext = path.extname(filePath).toLowerCase();
  const knownLang = getLanguageByExtension(ext);
  if (knownLang) {return knownLang;}

  const mimeType = mime.lookup(filePath);
  if (mimeType && (mimeType.startsWith("text/") || isTextMimeType(mimeType))) {
    return ext.startsWith(".") ? ext.slice(1) : ext;
  }

  return BinaryDetector.isFileBinary(filePath)
    ? null
    : ext.startsWith(".")
    ? ext.slice(1)
    : ext;
}

/**
 * Looks up a language name from a known extension.
 */
function getLanguageByExtension(ext: string): string | null {
  for (const [language, config] of Object.entries(languageExtensions)) {
    if (config.extensions.includes(ext)) {return language;}
  }
  return null;
}

/**
 * Determines if a MIME type is text-based, including certain `application/*` types.
 */
function isTextMimeType(mimeType: string): boolean {
  const knownTextApplications = [
    "application/json",
    "application/xml",
    "application/javascript",
    "application/typescript",
    "application/x-yaml",
    "application/graphql",
  ];

  return (
    knownTextApplications.includes(mimeType) ||
    Object.values(languageExtensions).some(config =>
      config.mimeTypes.includes(mimeType)
    )
  );
}

/**
 * Returns true if the file should be excluded entirely from processing.
 */
function isExcluded(filePath: string): boolean {
  return EXCLUDED_PATTERNS.some(pattern => pattern.test(filePath));
}
