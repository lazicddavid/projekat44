function showMessage() {
    const output = document.getElementById('output');
    const messages = ['Hello from JavaScript!', 'Welcome to Projekat 44!', 'Click again!'];
    const index = Math.floor(Math.random() * messages.length);
    output.textContent = messages[index];
}

