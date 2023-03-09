registerSqlFormatter(window.monaco, window.sqlFormatter);


function registerSqlFormatter(monaco, formatter) {
    // add the language
    //monaco.languages.register({ id: 'plsql'});

    //alter the formatter object array to remove some place where a return is better
    // DECALRE, BEGIN, EXCEPTION
    index = window.sqlFormatter.plsql.formatOptions.onelineClauses.indexOf('BEGIN');
    window.sqlFormatter.plsql.formatOptions.onelineClauses.splice(index, 1);
    index = window.sqlFormatter.plsql.formatOptions.onelineClauses.indexOf('EXCEPTION');
    window.sqlFormatter.plsql.formatOptions.onelineClauses.splice(index, 1);
    index = window.sqlFormatter.plsql.formatOptions.onelineClauses.indexOf('DECLARE');
    window.sqlFormatter.plsql.formatOptions.onelineClauses.splice(index, 1);


    // add formatter library to monaco
    monaco.languages.registerDocumentFormattingEditProvider('sql', {
        provideDocumentFormattingEdits: function (model, options, token) {
            const text = model.getValue();
            const formattedText = formatter.format(text, {"language": "plsql"});
            return [
                {
                    range: model.getFullModelRange(),
                    text: formattedText
                },
            ];
        }
    });
    // set the language
    //monaco.editor.setModelLanguage(monaco.editor.getModels[0], 'sql');

}