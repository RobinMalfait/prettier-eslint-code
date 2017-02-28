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

export const formatOnSave = (validLanguages, document: TextDocument) => {
    const FORMAT_FULL_DOCUMENT = true;

    window.showTextDocument(document)
        .then((editor) => formatDocument(validLanguages, document, editor, FORMAT_FULL_DOCUMENT))
        .then((hadChanges) => hadChanges && document.save());
}
