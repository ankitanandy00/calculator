const resultDisplay = document.getElementById('result');
const operationDisplay = document.getElementById('operation');
let currentInput = '';
let previousInput = '';
let operator = '';

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        // Handling operations
        if (value === 'AC') {
            currentInput = '';
            previousInput = '';
            operator = '';
            operationDisplay.textContent = '';
            resultDisplay.textContent = '0';
        } else if (value === '⌫') {
            currentInput = currentInput.slice(0, -1);
            resultDisplay.textContent = currentInput || '0';
        } else if (value === '=') {
            if (currentInput && previousInput && operator) {
                const result = calculate(previousInput, currentInput, operator);
                resultDisplay.textContent = result;
                operationDisplay.textContent = `${previousInput} ${operator} ${currentInput}`;
                previousInput = result;
                currentInput = '';
                operator = '';
            }
        } else if (['+', '−', '×', '÷'].includes(value)) {
            if (currentInput) {
                if (previousInput && operator) {
                    previousInput = calculate(previousInput, currentInput, operator);
                    resultDisplay.textContent = previousInput;
                } else {
                    previousInput = currentInput;
                }
                operator = value;
                currentInput = '';
                operationDisplay.textContent =`${previousInput} ${operator}`;
            }
        } else {
            if (value === '.' && currentInput.includes('.')) return;
            currentInput += value;
            resultDisplay.textContent = currentInput;
        }
    });
});

// Function to handle basic arithmetic
function calculate(a, b, operator) {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    switch (operator) {
        case '+': return numA + numB;
        case '−': return numA - numB;
        case '×': return numA * numB;
        case '÷': return numA / numB;
        default: return b;
    }
}

// Theme switcher (Light/Dark)
const themeSwitch = document.getElementById('theme-switch');
themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark');
});