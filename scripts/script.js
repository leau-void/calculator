let display = document.querySelector("#display");
let container = document.querySelector("#container");
let keyboardGuide = document.querySelector("#keyboard");
let currentOperator;
let lastOperator;
let currentNumber = 0;
let lastNumber;

container.addEventListener("click", () => {
  let target = event.target;
  if (target.value) {
    if (currentNumber != null && currentNumber != undefined) {
      lastNumber = currentNumber;
      currentNumber = null;
      display.textContent = "";
    }
    displayNum(target.value);

  } else if (target.classList.contains("operators")) {

    if (!Number(display.textContent)) return;
    
    currentNumber = Number(display.textContent);
    if (currentOperator == "equal") currentOperator = null;

    lastOperator = currentOperator;
    currentOperator = target.id;
    if (lastOperator) {
      
      if (lastNumber == null || lastNumber == undefined) {
        lastNumber = currentNumber;
        currentNumber = Number(display.textContent);
        }
      
      displayResult(operate(lastOperator, lastNumber, currentNumber));
      lastOperator = null;
      lastNumber = null;
    }
    
    currentNumber = Number(display.textContent);

    
  } else if (target.id == "clear")
  {
   currentNumber = null;
   lastNumber = null;
   currentOperator = null;
   lastOperator = null;
   display.textContent = "0";
    
  } else if (target.id == "decimal") {
    if(display.textContent.indexOf(".") != -1) return;
    display.textContent += ".";
    currentNumber = null;

  } else if (target.id == "plus-minus") {
    if (display.textContent === "0") return;
    if (!Number(display.textContent)) return;
    if (display.textContent.indexOf("-") != -1) {
      display.textContent = display.textContent.substring(1);
    } else display.textContent = "-" + display.textContent;

  } else if (target.id == "percentage") {
    if (!Number(display.textContent)) return;
    if (display.textContent.length > 7) return;
    display.textContent = (Number(display.textContent) / 100);

  } else if (target.id == "backspace") {
    display.textContent = display.textContent.slice(0, -1);
  }
})

keyboardGuide.addEventListener("click", () => {
  if (keyboardGuide.classList.contains("toggle-active")) {
    keyboardGuide.classList.remove("toggle-active");
  } else {
    keyboardGuide.classList.add("toggle-active");
  }
})

document.addEventListener("keyup", () => {
  let keyCode = event.keyCode;
  document.querySelector(`button[data-key='${keyCode}']`).click();
})


function displayNum(value) {
 
  if (display.textContent === "0") display.textContent = "";
  if (display.textContent.length <= 7) {
    display.textContent += value;
  }

}

function displayResult(result) {
   
  let resultAsString = result.toString();
	let resultLen = resultAsString.length;
	
	if (resultLen > 7) {
		let whereDecimal = resultAsString.indexOf(".");

		if (whereDecimal > 7 || whereDecimal == -1) {
			result = Math.round(result)
		} else {
			let whereToRound = 7 - whereDecimal;
			whereToRound = 10 ** whereToRound
			result = Math.round(result * whereToRound) / whereToRound;
		}
		
	}

  resultAsString = result.toString();
  resultLen = resultAsString.length;
  if (resultLen > 8) {
    result = "Sorry..."
    currentNumber = null;
    lastNumber = null;
    currentOperator = null;
    lastOperator = null;
  }
  display.textContent = result;
}

function operate(operator, num1, num2) {
  let output;
  switch (operator) {
    case "add":
      output = add(num1, num2);
      break;

    case "substract":
      output = substract(num1, num2);
      break;

    case "multiply":
      output = multiply(num1, num2);
      break;

    case "divide":
      output = divide(num1, num2);
      break;
  }
  return output;
}

function add(a, b) {
return a + b;
}

function substract(a, b) {
return a - b;
}

function multiply(a, b) {
return a * b;
}

function divide(a, b) {
if (b === 0) return "ERROR!"
return a / b;
}
