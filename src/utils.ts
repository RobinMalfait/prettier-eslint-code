import {
    TextDocument,
    Range,
    Selection,
    TextEditor,
    StatusBarItem,
    window,
    workspace
} from 'vscode';

const requireRelative = require('require-relative');

let statusbar: StatusBarItem = undefined;
let outputHandler: Function = () => { };

function showStatusBarMessage(message, output) {
    if (statusbar === undefined) {
        statusbar = window.createStatusBarItem();
    }

    outputHandler(output);

    statusbar.text = message;
    statusbar.command = 'prettier-eslint.open-output';
    statusbar.show();
}

export function registerOutputHandler(handler: Function = () => { }) {
    outputHandler = handler;
}

export function fullDocumentRange(document: TextDocument): Range {
    const lastLineId = document.lineCount - 1;
    return new Range(0, 0, lastLineId, document.lineAt(lastLineId).text.length);
}

export function fullDocumentSelection(document: TextDocument): Selection {
    return fullDocumentRange(document) as Selection;
}

const getPath = (path) => {
    const trimmedPath = path.trim();

    return trimmedPath === ""
        ? undefined
        : trimmedPath;
}

export function format(text: string = '', filePath: string) {
    try {
        const formatPrettierESLint = requirePrettierEslint(filePath);
        const prettierOptions = workspace.getConfiguration('prettier') as any;
        const prettierEslintOptions = workspace.getConfiguration('prettier-eslint') as any;

        const formattedOutput = formatPrettierESLint({
            text,
            filePath,
            eslintPath: getPath(prettierEslintOptions.eslintPath),
            prettierPath: getPath(prettierEslintOptions.prettierPath),
            prettierOptions
        });

        showStatusBarMessage('Prettier ESLint: $(check)', 'All good!');

        return formattedOutput;
    } catch (err) {
        showStatusBarMessage('Prettier ESLint: $(x)', err.toString());
        return text;
    }
}

export function formatDocument(validLanguages: any, document: TextDocument, editor: TextEditor): Thenable<any> {
    if (!validLanguages.includes(document.languageId)) {
        return Promise.reject('Language is not valid');
    }

    const { selections } = editor;

    const selectionsToBeReplaced = selections.filter((selection) => {
        return !(selection.start.line === selection.end.line
            && selection.start.character === selection.end.character);
    });
    const hasSelections = selectionsToBeReplaced.length > 0;

    if (!hasSelections) {
        selectionsToBeReplaced.push(fullDocumentSelection(document));
    }

    return Promise.all(selectionsToBeReplaced.map((selection) => {
        // Replace selection with new, formatted text
        return editor
            .edit((editBuilder) => editBuilder.replace(
                selection,
                format(document.getText(selection), document.fileName)
            ));
    }));
}

function requirePrettierEslint(filePath: string) {
    try {
        return requireRelative('prettier-eslint', filePath);
    } catch (err) {
        return require('prettier-eslint');
    }
}