function showMessage() {
    const output = document.getElementById('output');
    const messages = ['Hello!', 'Welcome!', 'Click again!'];
    const index = Math.floor(Math.random() * messages.length);
    output.textContent = messages[index];
}

function clearOutput() {
    document.getElementById('output').textContent = '';
}

