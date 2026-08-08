const calc = {
    operate: (num1 = "0", operator = "+", num2 = "0") => {
        num1 = parseInt(num1);
        num2 = parseInt(num2);
        if (num1 == NaN || num2 == NaN) return NaN;
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
