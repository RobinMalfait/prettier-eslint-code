'use strict';

import {
    languages,
    ExtensionContext,
    DocumentSelector,
    window,
    workspace,
} from 'vscode';
import EditProvider from './PrettierESLintEditProvider';
import { registerPrettierESLintCommand, formatOnSave } from './commands';

const VALID_LANG: DocumentSelector = ['javascript', 'javascriptreact'];

export function activate(context: ExtensionContext) {
    const editProvider = new EditProvider()

    const disposables = [
        // Register all content providers
        languages.registerDocumentRangeFormattingEditProvider(VALID_LANG, editProvider),
        languages.registerDocumentFormattingEditProvider(VALID_LANG, editProvider),

        // Register all commands
        registerPrettierESLintCommand(VALID_LANG),

        // Register all event listeners
        workspace.onDidSaveTextDocument((document) => {
            formatOnSave(VALID_LANG, document);
        })
    ];

    context.subscriptions.push(...disposables);
}

export function deactivate() {
}