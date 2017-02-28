import {
    workspace,
    DocumentRangeFormattingEditProvider,
    DocumentFormattingEditProvider,
    Range,
    TextDocument,
    FormattingOptions,
    CancellationToken,
    TextEdit,
    window
} from 'vscode';

import {
    fullDocumentRange,
    format
} from './utils';

class PrettierEditProvider implements DocumentRangeFormattingEditProvider, DocumentFormattingEditProvider {
    provideDocumentRangeFormattingEdits(
        document: TextDocument,
        range: Range,
        options: FormattingOptions,
        token: CancellationToken
    ): TextEdit[] {
        return [TextEdit.replace(range, format(document.getText(range), document.fileName))];
    }

    provideDocumentFormattingEdits(
        document: TextDocument,
        options: FormattingOptions,
        token: CancellationToken
    ): TextEdit[] {
        return [TextEdit.replace(fullDocumentRange(document), format(document.getText(), document.fileName))];
    }
}

export default PrettierEditProvider;