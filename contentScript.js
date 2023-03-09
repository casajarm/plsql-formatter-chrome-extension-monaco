console.log('PLSQL Formatter for APEX .. entering contentScript.js');

// set up a listener for the message that monaca was found
document.addEventListener('monacoEditorReady', function (e) {

    console.log('document posted message that it found monaco');
    // now that we know monaco is in place we can add register the formatter
    injectRegister();
});

// inject code to find monaco
injectMonacoDetector();
injectFormatter();


function injectFormatter() {
    const scriptFormatter = document.createElement('script');
    //scriptFormatter.setAttribute("type", "module");
    scriptFormatter.setAttribute("async", false);
    scriptFormatter.setAttribute("defer", false);
    scriptFormatter.setAttribute("src", chrome.runtime.getURL('sql-formatter/sql-formatter.min.js'));
    console.log('url: ' + chrome.runtime.getURL('sql-formatter/sql-formatter.min.js'));
    let head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
    head.insertBefore(scriptFormatter, head.lastChild);
}

function injectMonacoDetector() {
    const scriptLocal = document.createElement('script');
    //scriptLocal.setAttribute("type", "module");
    scriptLocal.setAttribute("src", chrome.runtime.getURL('sqlFormatter.js'));
    console.log('url: ' + chrome.runtime.getURL('sqlFormatter.js'));
    head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
    head.insertBefore(scriptLocal, head.lastChild);
}


function injectRegister() {
    const scriptFormatter = document.createElement('script');
    //scriptFormatter.setAttribute("type", "module");
    scriptFormatter.setAttribute("src", chrome.runtime.getURL('registerFormatter.js'));
    console.log('url: ' + chrome.runtime.getURL('registerFormatter.js'));
    let head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
    head.insertBefore(scriptFormatter, head.lastChild);
}

function addSqlFormatter(monaco) {
    // Send a message to the background page to register the SQL formatter
    chrome.runtime.sendMessage({ action: 'registerSqlFormatter', editor: window.monaco.editor }, () => {
        // Once the SQL formatter is registered, update the editor options
        //monaco.editor.setTheme('vs-dark');
        //monaco.editor.defineTheme('sqlTheme', {
        //  base: 'vs-dark',
        //  inherit: true,
        //  rules: [{ token: 'comment', foreground: 'green' }],
        //});
        console.log('set theme and lang');
        monaco.setTheme('sqlTheme');
        monaco.setModelLanguage(editor.getModel(), 'plsql');
    });
}






/*
// Send a message to the background script to retrieve the Monaco editor instance
chrome.runtime.sendMessage({ type: 'getEditorInstance' }, (editor) => {
    console.log('getEditorInstance returning');
    if (editor) {
        addSqlFormatter(editor);
    }
    else {
        console.log('no editor found');
    }
});
*/

/*
window.onload = function () {
    console.log('adding window onload');

    const editor = '';

    var scr = document.createElement('script');
    //appending text to a function to convert it's src to string only works in Chrome
    scr.textContent = `(' + function () {
        var event = document.createEvent("CustomEvent");
        // add custom event details
        event.detail({ "passback": "check" });
        window.dispatchEvent(event);
    } + ')();`
        //cram that sucker in 
        (document.head || document.documentElement).appendChild(scr);

};
*/