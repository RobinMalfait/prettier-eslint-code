'use strict';

import * as vscode from 'vscode';
const formatPrettierESLint = require('prettier-eslint');

const allowedLanguages = ['javascript'];

function fullDocumentRange(document: vscode.TextDocument): vscode.Range {
    const lastLineId = document.lineCount - 1;
    return new vscode.Range(0, 0, lastLineId, document.lineAt(lastLineId).text.length);
}

let statusbar = undefined;

function showStatusBarMessage (message, tooltip) {
    if (statusbar === undefined) {
        statusbar = vscode.window.createStatusBarItem();
    }

    statusbar.text = message;
    statusbar.tooltip = tooltip;
    statusbar.show();
}

function format (textDocument: vscode.TextDocument) {
    // Get information from the document
    const language = textDocument.languageId;

    // It is not an allowed language
    if (allowedLanguages.indexOf(language) === -1) {
        return;
    }

    const filePath = textDocument.fileName;
    const text = textDocument.getText();

    // Try to format the code
    try {
        let formattedOutput = formatPrettierESLint({ text, filePath });

        // It is the same output now
        if (formattedOutput === text) {
            showStatusBarMessage(`Prettier ESLint: $(check)`, 'All good!');
            return;
        }

        const documentRange = fullDocumentRange(textDocument);

        const editor = vscode.window.activeTextEditor;
        editor
            .edit((editBuilder) => editor.edit((editBuilder) => editBuilder.replace(documentRange, formattedOutput)))
            .then(() => textDocument.save())
            .then(
                () => showStatusBarMessage('Prettier ESLint: $(check)', 'All good!'),
                (err) => showStatusBarMessage('Prettier ESLint: $(x)', err.toString())
            );
    } catch (err) {
        showStatusBarMessage('Prettier ESLint: $(x)', err.toString());
    }
}

const registerDisposable = (context) => (cb = () => {}) => {
    context.subscriptions.push(cb());
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Create register function
    const register = registerDisposable(context);

    // Register change listener
    register(() => {
        return vscode.workspace.onDidSaveTextDocument((document) => {
            format(document);
        });
    });

    // Register manual format listener
    register(() => {
        return vscode.commands.registerCommand('prettier-eslint.format', () => {
            format(vscode.window.activeTextEditor.document);
        });
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}