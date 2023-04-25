const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

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
  // if no decimal, add one
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  // Assign firtsValue if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    console.log('currentValue', currentValue);
  }
  //Ready for next value, store operator
  awaitingNextValue = true;
  operatorValue = operator;
  console.log('firstValue', firstValue);
  console.log('operator', operatorValue);
}

// Add Event Listeners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtns) => {
  if (inputBtns.classList.length === 0) {
    inputBtns.addEventListener('click', () => sendNumberValue(inputBtns.value));
  } else if (inputBtns.classList.contains('operator')) {
    inputBtns.addEventListener('click', () => sendNumberValue(inputBtns.value));
  } else if (inputBtns.classList.contains('decimal')) {
    inputBtns.addEventListener('click', () => addDecimal());
  }
});

// Reset all values, Display
function resetAll() {
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  calculatorDisplay.textContent = '0';
}

// Event Listener
clearBtn.addEventListener('click', resetAll);
