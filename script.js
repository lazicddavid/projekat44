function showMessage() {
    const output = document.getElementById('output');
    const messages = ['Hi there!', 'Projekat 44', 'Nice click!'];
    const index = Math.floor(Math.random() * messages.length);
    output.textContent = messages[index];
}

function clearOutput() {
    document.getElementById('output').textContent = '';
}

