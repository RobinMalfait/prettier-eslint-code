import {
    TextDocument,
    commands,
    window
} from 'vscode';

import { formatDocument, registerOutputHandler } from './utils';

export const registerPrettierESLintCommand = (validLanguages) => {
    return commands.registerCommand('prettier-eslint.format', () => {
        formatDocument(
            validLanguages,
            window.activeTextEditor.document,
            window.activeTextEditor
        );
    });
}

export const registerPrettierESLintCommandOutput = () => {
    const outputChannel = window.createOutputChannel('Prettier ESLint');

    registerOutputHandler((output) => {
        outputChannel.clear();
        outputChannel.append(output);
    });

    return commands.registerCommand('prettier-eslint.open-output', () => {
        outputChannel.show();
    });
};
