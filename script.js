const calc = {
    operate: (num1 = "0", operator = "+", num2 = "0") => {
        num1 = Number(num1);
        num2 = Number(num2);
        if (isNaN(num1) || isNaN(num2)) return NaN;
        switch (operator) {
            case "+":
                return calc.add(num1, num2)
            case "-":
                return calc.sub(num1, num2)
            case "*":
                return calc.multi(num1, num2)
            case "/":
                return calc.div(num1, num2)
            default:
                return NaN;
        }
    },
    add: (num1, num2) => num1 + num2,
    sub: (num1, num2) => num1 - num2,
    multi: (num1, num2) => num1 * num2,
    div: (num1, num2) => num1 / num2
};

let numString1;
let numString2;
let operator;

console.log(calc.operate(numString1, operator, numString2))