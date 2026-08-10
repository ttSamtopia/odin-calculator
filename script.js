const NUMBER_INPUTS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ","];
const OPERATOR_INPUTS = ["+", "-", "*", "/"];

const domDisplayArray = document.querySelectorAll("span");
const domNumPad = document.querySelector("#numPad")

let stringNum1 = "";
let stringNum2 = "";
let stringOperator = "";
let lastUsedInput = "";

const calc = {
    operate (num1 = "0", operator = "+", num2 = "0") {
        num1 = Number(num1);
        num2 = Number(num2);
        if (isNaN(num1) || isNaN(num2)) return "Error, please clear";
        switch (operator) {
            case "+":
                return String(calc.add(num1, num2))
            case "-":
                return String(calc.sub(num1, num2))
            case "*":
                return String(calc.multi(num1, num2))
            case "/":
                return String(calc.div(num1, num2))
            default:
                return "Error, please clear";
        }
    },
    add: (num1, num2) => num1 + num2,
    sub: (num1, num2) => num1 - num2,
    multi: (num1, num2) => num1 * num2,
    div (num1, num2) {
        if (num2 === 0) return "Error, please clear";
        return num1 / num2;
    },

    updateDisplay (num1 = "", operator = "", num2 = "") {
        let updatedDisplayArray = [num1, operator, num2];
        updatedDisplayArray.forEach(
            (value, i) => domDisplayArray[i].textContent = value
        );
    },
    handleInput (input) {
        let num1Present = stringNum1 ? true : false;
        let operatorPresent = stringOperator ? true : false;
        let num2Present = stringNum2 ? true : false;
        
        if (stringNum1 === "Error, please clear" && input !== "C") {
            return;
        } else if (NUMBER_INPUTS.includes(input)) {
            if (input === ",") input = ".";
            if (!operatorPresent) {
                if (input === "." && stringNum1.includes(".")) return;
                if (stringNum1.length >= 20) return;
                if (lastUsedInput === "=" || lastUsedInput === "Enter") stringNum1 = "";
                stringNum1 += input;
                calc.updateDisplay(stringNum1);
                return;
            } else {
                if (input === "." && stringNum2.includes(".")) return;
                if (stringNum2.length >= 20) return;
                stringNum2 += input;
                calc.updateDisplay(stringNum1, stringOperator, stringNum2);
                return;
            }
        } else if (OPERATOR_INPUTS.includes(input)) {
            if (!num1Present) {
                return;
            } else if (num2Present) {
                stringNum1 = calc.operate(stringNum1, stringOperator, stringNum2);
                stringOperator = input;
                stringNum2 = "";
                calc.updateDisplay(stringNum1, stringOperator)
                return;
            } else {
                stringOperator = input;
                calc.updateDisplay(stringNum1, stringOperator)
                return;
            }
        } else if (input === "=" || input === "Enter") {
            if (num1Present && operatorPresent && num2Present) {
                stringNum1 = calc.operate(stringNum1, stringOperator, stringNum2);
                stringOperator = "";
                stringNum2 = "";
                calc.updateDisplay(stringNum1)
                return;
            }
        } else if (input.toLowerCase() === "c") {
            stringNum1 = "";
            stringNum2 = "";
            stringOperator = "";
            calc.updateDisplay();
            return;
        } else if (input === "←" || input === "Backspace") {
            if (num2Present) {
                stringNum2 = stringNum2.slice(0, -1);
                calc.updateDisplay(stringNum1, stringOperator, stringNum2);
                return;
            } else if (operatorPresent) {
                stringOperator = "";
                calc.updateDisplay(stringNum1, stringOperator);
            } else if (num1Present) {
                stringNum1 = stringNum1.slice(0, -1);
                calc.updateDisplay(stringNum1);
            } else {
                return;
            }
        }
    }
};

domNumPad.addEventListener("click", (e) => {
    let input = e.target.textContent;
    calc.handleInput(input);
    lastUsedInput = input;
    return;
});

document.addEventListener("keydown", (e) => {
    e.preventDefault()
    let input = e.key;
    calc.handleInput(input);
    lastUsedInput = input;
    return;
});