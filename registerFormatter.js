registerSqlFormatter(window.monaco, window.sqlFormatter);

function registerSqlFormatter(monaco, formatter) {

    let index = -1;
    //alter the formatter object array to remove some place where a carriage return is better
    // DECLARE, BEGIN, EXCEPTION
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
}