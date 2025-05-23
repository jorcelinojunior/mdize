/**
 * Integration tests for MDize extension.
 * These tests validate activation and command registration.
 */

import * as assert from "assert";
import * as vscode from "vscode";

suite("MDize Integration", () => {
  test("commands are registered", async () => {
    // Force extension activation by executing the command (may fail if no files are open)
    try {
      await vscode.commands.executeCommand(
        "mdize.copyWithLines"
      );
    } catch {
      // Ignore errors if the command fails due to missing context
    }

    const commands = await vscode.commands.getCommands(true);
    assert.ok(
      commands.includes("mdize.copyWithLines"),
      "copyWithLines command should be registered"
    );

    assert.ok(
      commands.includes("mdize.copyClean"),
      "copyClean command should be registered"
    );
  });

  test("runs gracefully with no files open", async () => {
    // Commands should not throw even if no files are open
    await vscode.commands.executeCommand("mdize.copyWithLines");
    await vscode.commands.executeCommand(
      "mdize.copyClean"
    );
  });
});
