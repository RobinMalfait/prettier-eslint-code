import {
    TextDocument,
    Range,
    Selection,
    TextEditor,
    window
} from 'vscode';

const formatPrettierESLint = require('prettier-eslint');

let statusbar = undefined;

function showStatusBarMessage(message, tooltip) {
    if (statusbar === undefined) {
        statusbar = window.createStatusBarItem();
    }

    statusbar.text = message;
    statusbar.tooltip = tooltip;
    statusbar.show();
}

export function fullDocumentRange(document: TextDocument): Range {
    const lastLineId = document.lineCount - 1;
    return new Range(0, 0, lastLineId, document.lineAt(lastLineId).text.length);
}

export function fullDocumentSelection(document: TextDocument): Selection {
    return fullDocumentRange(document) as Selection;
}

export function format(text: string = '', filePath: string) {
    try {
        const formattedOutput = formatPrettierESLint({ text, filePath });

        showStatusBarMessage('Prettier ESLint: $(check)', 'All good!');

        return formattedOutput;
    } catch (err) {
        showStatusBarMessage('Prettier ESLint: $(x)', err.toString());
        return text;
    }
}

export function formatDocument(validLanguages: any, document: TextDocument, editor: TextEditor, forceFullDocument: Boolean = false): Thenable<any> {
    if (!validLanguages.includes(document.languageId)) {
        return Promise.reject('Language is not valid');
    }

    const originalText = document.getText();

    let selectionsToBeReplaced = [fullDocumentSelection(document)];
    if (!forceFullDocument) {
        const { selections } = editor;
        
        selectionsToBeReplaced = selections.filter((selection) => {
            return !(selection.start.line === selection.end.line
                && selection.start.character === selection.end.character);
        });
        const hasSelections = selectionsToBeReplaced.length > 0;

        if (!hasSelections) {
            selectionsToBeReplaced.push(fullDocumentSelection(document));
        }    
    }

    return Promise.all(selectionsToBeReplaced.map((selection) => {
        const selectedText = document.getText(selection);
        const formattedText = format(selectedText, document.fileName);

        // No changes
        if (selectedText === formattedText) {
            return;
        }

        // Replace selection with new, formatted text
        return editor
            .edit((editBuilder) => editBuilder.replace(
                selection,
                formattedText
            ));
    }))
    .then(() => {
        const hasChanges = originalText !== document.getText();

        return hasChanges;
    });
}