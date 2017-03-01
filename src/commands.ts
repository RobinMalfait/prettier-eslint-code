import {
    TextDocument,
    commands,
    window
} from 'vscode';

import { formatDocument } from './utils';

export const registerPrettierESLintCommand = (validLanguages) => {
    return commands.registerCommand('prettier-eslint.format', () => {
        formatDocument(
            validLanguages,
            window.activeTextEditor.document,
            window.activeTextEditor
        );
    });
}
