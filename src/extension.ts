import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const flexParentDecorator = vscode.window.createTextEditorDecorationType({
        backgroundColor: 'rgba(0, 123, 255, 0.25)',
        border: '2px dotted rgba(0,123,255,0.2)',
    });
    const gridParentDecorator = vscode.window.createTextEditorDecorationType({
        backgroundColor: 'rgba(255, 50, 50, 0.25)',
        border: '2px dotted rgba(255,50,50,0.2)',
    });
    const commonParentDecor = vscode.window.createTextEditorDecorationType({
        backgroundColor: 'rgba(255, 255, 0, 0.25)',
        border: '2px dotted rgba(255,255,0,0.2)',
    });

    const flexChildDecorator = vscode.window.createTextEditorDecorationType({
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
    });
    const gridChildDecorator = vscode.window.createTextEditorDecorationType({
        backgroundColor: 'rgba(255, 50, 50, 0.1)',
    });
    const commonChildDecor = vscode.window.createTextEditorDecorationType({
        backgroundColor: 'rgba(255, 255, 0, 0.1)',
    });

    function updateDecorations(editor: vscode.TextEditor) {
        if (
            !editor ||
            (editor.document.languageId !== 'css' &&
                editor.document.languageId !== 'scss' &&
                editor.document.languageId !== 'less')
        ) {
            return;
        }
        const text = editor.document.getText();

        // Container properties
        const flexContainerProps =
            /\b(display: flex)|(flex-direction|flex-wrap|flex-flow|display\s*:\s*inline-flex|display\s*:\s*flex)\s*:/g;
        const gridContainerProps =
            /\b(place-items|place-content|display: grid)|(grid-template-(rows|columns|areas)|grid-template|grid-auto-(rows|columns|flow)|grid|justify-items|display\s*:\s*grid|display\s*:\s*inline-grid)\s*:/g;
        const commonContainerProps =
            /\b(justify-content|align-items|align-content|gap|row-gap|column-gap)\s*:/g;

        // Child properties
        const flexChildProps =
            /\b(order|flex-grow|flex-shrink|flex-basis|flex|align-self)\b\s*:/g;
        const gridChildProps =
            /\b(grid-row|grid-column|grid-row-start|grid-row-end|grid-column-start|grid-column-end|grid-area|justify-self|align-self|place-self)\b\s*:/g;
        const commonChildProps = /\b(align-self)\b\s*:/g;

        const flexContainerMatches: vscode.DecorationOptions[] = [];
        const gridContainerMatches: vscode.DecorationOptions[] = [];
        const flexChildMatches: vscode.DecorationOptions[] = [];
        const gridChildMatches: vscode.DecorationOptions[] = [];

        const commonParentMatches: vscode.DecorationOptions[] = [];
        const commonChildMatches: vscode.DecorationOptions[] = [];

        for (let line = 0; line < editor.document.lineCount; line++) {
            const lineText = editor.document.lineAt(line).text;
            let match: RegExpExecArray | null;

            while ((match = flexContainerProps.exec(lineText))) {
                const startPosition = new vscode.Position(line, match.index);
                const endPosition = new vscode.Position(
                    line,
                    match.index + match[0].length
                );
                flexContainerMatches.push({
                    range: new vscode.Range(startPosition, endPosition),
                });
            }
            while ((match = flexChildProps.exec(lineText))) {
                const startPosition = new vscode.Position(line, match.index);
                const endPosition = new vscode.Position(
                    line,
                    match.index + match[0].length
                );
                flexChildMatches.push({
                    range: new vscode.Range(startPosition, endPosition),
                });
            }
            while ((match = gridContainerProps.exec(lineText))) {
                const startPosition = new vscode.Position(line, match.index);
                const endPosition = new vscode.Position(
                    line,
                    match.index + match[0].length
                );
                gridContainerMatches.push({
                    range: new vscode.Range(startPosition, endPosition),
                });
            }
            while ((match = gridChildProps.exec(lineText))) {
                const startPosition = new vscode.Position(line, match.index);
                const endPosition = new vscode.Position(
                    line,
                    match.index + match[0].length
                );
                gridChildMatches.push({
                    range: new vscode.Range(startPosition, endPosition),
                });
            }
            while ((match = commonContainerProps.exec(lineText))) {
                const startPosition = new vscode.Position(line, match.index);
                const endPosition = new vscode.Position(
                    line,
                    match.index + match[0].length
                );
                commonParentMatches.push({
                    range: new vscode.Range(startPosition, endPosition),
                });
            }
            while ((match = commonChildProps.exec(lineText))) {
                const startPosition = new vscode.Position(line, match.index);
                const endPosition = new vscode.Position(
                    line,
                    match.index + match[0].length
                );
                commonChildMatches.push({
                    range: new vscode.Range(startPosition, endPosition),
                });
            }
            editor.setDecorations(flexParentDecorator, flexContainerMatches);
            editor.setDecorations(flexChildDecorator, flexChildMatches);
            editor.setDecorations(gridParentDecorator, gridContainerMatches);
            editor.setDecorations(gridChildDecorator, gridChildMatches);
            editor.setDecorations(commonParentDecor, commonParentMatches);
            editor.setDecorations(commonChildDecor, commonChildMatches);
        }
    }
    vscode.window.onDidChangeActiveTextEditor(
        (editor) => {
            if (editor) {
                updateDecorations(editor);
            }
        },
        null,
        context.subscriptions
    );

    vscode.workspace.onDidSaveTextDocument(
        (doc) => {
            const editor = vscode.window.visibleTextEditors.find(
                (e) => e.document === doc
            );
            if (editor) {
                updateDecorations(editor);
            }
        },
        null,
        context.subscriptions
    );

    vscode.workspace.onDidOpenTextDocument(
        (doc) => {
            const editor = vscode.window.visibleTextEditors.find(
                (e) => e.document === doc
            );
            if (editor) {
                updateDecorations(editor);
            }
        },
        null,
        context.subscriptions
    );

    if (vscode.window.activeTextEditor) {
        updateDecorations(vscode.window.activeTextEditor);
    }
}
