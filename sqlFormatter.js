// sqlFormatter.js
console.log('sqlFormatter.js');

// Wait for the Monaco editor to be available on the page
let intervalCount = 0;
const intervalId = setInterval(findEditor, 100);

function findEditor() {
    intervalCount += 1;
    if (intervalCount < 20) { // try 20 times and quit
        if (window.monaco) {
            console.log('found monaco');
            if (window.monaco.editor) {
                let monaco = window.monaco.editor;
                clearInterval(intervalId);
                console.log('found monaco editor...register the provider');
                // send a message to the background script to register the SQL formatter
                document.dispatchEvent(new CustomEvent('monacoEditorReady'));
                }
        }
    }
    else {
        clearInterval(intervalId);
    }
}