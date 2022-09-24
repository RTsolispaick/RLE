function codeRLE(string) {
    let count = 1
    for (i = 0; i < string.length; ) {
        while (string.charAt(i) === string.charAt(i + count) && (count < 255)) count++;
        if (count > 3) {
            string = string.replaceAll(string.charAt(i), (Symbol, indexSymbol) => {
                if (i == indexSymbol) {
                    return "#";
                } else {
                    return Symbol;
                }
            });
            string = string.replaceAll(string.charAt(i + 1), (Symbol, indexSymbol) => {
                if (i + 1 == indexSymbol) {
                    return String.fromCharCode(count);
                } else {
                    return Symbol;
                }
            });
            for (j = 3; j < count; j++) {
                string = string.replaceAll(string.charAt(i + 2), (Symbol, indexSymbol) => {
                    if (i + 2 == indexSymbol) {
                        return "";
                    } else {
                        return Symbol;
                    }
                });
            }
            i += 3;
        } else {
            i++;
        }
        count = 1;
    }
    return string;
}

function decodeRLE(string) {
    let count = 0;
    for (i = 0; i < string.length; i += count) {
        if (string.charAt(i) == "#") {
            count = string.charAt(i + 1).charCodeAt(0);
            string = string.replaceAll("#" + string.charAt(i + 1) + string.charAt(i + 2), (stringNow, indexString) => {
                if (i == indexString) {
                    return string.charAt(i + 2).repeat(count);
                } else {
                    return stringNow;
                }
            });
        } else {
            count = 1;
        }
    }
    return string;
}

const fs = require("fs");

try {
    if (process.argv[2] == "code") {

        string = fs.readFileSync(process.argv[3], "utf8");
        string = codeRLE(string);
        fs.writeFileSync(process.argv[4], string);

    } else if (process.argv[2] == "decode") {

        string = fs.readFileSync(process.argv[3], "utf8");
        string = decodeRLE(string);
        fs.writeFileSync(process.argv[4], string);

    } 
} catch (ERROR) {
    console.log(ERROR.message);
}
