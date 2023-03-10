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