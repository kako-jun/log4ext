// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "log4ext" is now active!');

  //   vscode.workspace.openTextDocument({ content: "{}" }).then((document) => {
  //     vscode.window.showTextDocument(document);
  //     vscode.languages.setTextDocumentLanguage(document, "json");
  //   });
  const openedEvent = vscode.workspace.onDidOpenTextDocument((document: vscode.TextDocument) => {
    // keepFileExtがfalseの場合
    const patterns = [
      /\.log\.\d+$/, // .log.999
      /\.log\.\d{4}-\d{2}-\d{2}/, // .log.YYYY-MM-DD
      /\.log\.\d{2}-\d{2}-\d{4}/, // .log.MM-DD-YYYY .log.DD-MM-YYYY
      /\.log\.\d{4}_\d{2}_\d{2}/, // .log.YYYY_MM_DD
      /\.log\.\d{2}_\d{2}_\d{4}/, // .log.MM_DD_YYYY .log.DD_MM_YYYY
      /\.log\.\d{4}\d{2}\d{2}/, // .log.YYYYMMDD .log.MMDDYYYY .log.DDMMYYYY
      /\.log\.\d{2}\d{2}\d{2}/, // .log.YYMMDD .log.MMDDYY .log.DDMMYY
    ];

    for (const pattern of patterns) {
      const matched = document.fileName.match(pattern);
      if (matched && matched.length === 1) {
        vscode.languages.setTextDocumentLanguage(document, "log");
        break;
      }
    }
  });

  context.subscriptions.push(openedEvent);

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("log4ext.helloWorld", () => {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    vscode.window.showInformationMessage("Hello VS Code from log4ext!");
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
