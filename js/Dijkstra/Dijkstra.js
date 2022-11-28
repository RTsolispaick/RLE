function createPolsk(str) {
        let stringOutput = "";
        let stringNow = "";
        let stekOper = new Array();
        
        for (i in str) {
            if (!Number.isInteger(str[i] * 1)) {
                stringOutput += stringNow;
                stringNow = "";
                if (str[i] == "(") {
                    stekOper.push(str[i]);
                    continue;
                }
                if (str[i] == ")") {
                    while (0 < stekOper.length) {
                        if (stekOper[stekOper.length - 1] == "(") {
                            stekOper.pop();
                            continue;
                        }
                        stringOutput += stekOper.pop();
                    }
                }
                if (str[i] == "+" || str[i] == "-") {
                    while (!(stekOper[stekOper.length - 1] == "(") && 0 < stekOper.length) {
                        stringOutput += stekOper.pop();
                    }
                    stekOper.push(str[i]);
                    continue;
                }
                if (str[i] == "*" || str[i] == "/") {
                    while (!(stekOper[stekOper.length - 1] == "+" || stekOper[stekOper.length - 1] == "-" || stekOper[stekOper.length - 1] == "(") && 0 < stekOper.length) {
                        stringOutput += stekOper.pop();
                    }
                    stekOper.push(str[i]);
                    continue;
                }
                if (str[i] == "^") {
                    stekOper.push(str[i]);
                    continue;
                }
            }
            if (!(str[i] == ")")) stringNow += str[i];
        }
        stringOutput += stringNow;
        while (0 < stekOper.length) {
            stringOutput += stekOper.pop();
        }
        return stringOutput;
}

function vihisZapis(str) {
        let stekNumb = new Array();
        for (i in str) {
            if (Number.isInteger(str[i] * 1)) {
                stekNumb.push(str[i] * 1);
                continue;
            }
            switch (str[i]) {
                case "+":
                    stekNumb[stekNumb.length - 2] += stekNumb.pop();
                    break;
                case "-":
                    stekNumb[stekNumb.length - 2] -= stekNumb.pop();
                    break;
                case "*":
                    stekNumb[stekNumb.length - 2] *= stekNumb.pop();
                    break;
                case "/":
                    stekNumb[stekNumb.length - 2] /= stekNumb.pop();
                    break;
                case "^":
                    stekNumb[stekNumb.length - 2] **= stekNumb.pop();
                    break;
                default:
                    console.log("Error");
                    break;
            }
        }
        return stekNumb[0];
}

let str = process.argv[2];
console.log("Pol: " + createPolsk(str));
console.log("Meaning of the expression in Polish notation: " + vihisZapis(createPolsk(str)));
console.log("Eval: " + eval(str));