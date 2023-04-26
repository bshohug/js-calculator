const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// Calculate first and seceond values depending on operator
const calculate = {
  '/': (firstNumber, seceondNumber) => firstNumber / seceondNumber,

  '*': (firstNumber, seceondNumber) => firstNumber * seceondNumber,

  '+': (firstNumber, seceondNumber) => firstNumber + seceondNumber,

  '-': (firstNumber, seceondNumber) => firstNumber - seceondNumber,

  '=': (firstNumber, seceondNumber) => seceondNumber,
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === '0' ? number : displayValue + number;
  }
}

function addDecimal() {
  //If operator pressed, don't add decimal
  if (awaitingNextValue) return;
  // if no decimal, add one
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  // Prevent multiple operator
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  // Assign firtsValue if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  //Ready for next value, store operator
  awaitingNextValue = true;
  operatorValue = operator;
}

// Reset all values, Display
function resetAll() {
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  calculatorDisplay.textContent = '0';
}

// Add Event Listeners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtns) => {
  if (inputBtns.classList.length === 0) {
    inputBtns.addEventListener('click', () => sendNumberValue(inputBtns.value));
  } else if (inputBtns.classList.contains('operator')) {
    inputBtns.addEventListener('click', () => useOperator(inputBtns.value));
  } else if (inputBtns.classList.contains('decimal')) {
    inputBtns.addEventListener('click', () => addDecimal());
  }
});

// Event Listener
clearBtn.addEventListener('click', resetAll);
