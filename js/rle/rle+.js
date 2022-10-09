function codeRLE(string) {

    let i = 0, count = 1;
    let strCoder = "";

    while (i < string.length) {

        while (string[i] == string[i + count] && count < 255) count++;

        if (count > 3 || string[i] == "#") {
            strCoder += "#" + String.fromCharCode(count) + string[i];
        } 
        else {
            strCoder += string[i].repeat(count);
        }

        i += count;
        count = 1;
    }

    return strCoder;
}

function decodeRLE(string) {

    let i = 0, count = 0;
    let strDecoder = "";

    while (i < string.length) {

        if (string[i] == "#") {

            count = string[i + 1].charCodeAt(0);
            strDecoder += string[i + 2].repeat(count);

            i += 3;
        } else {

            strDecoder += string[i];

            i++;
        }

    }
    return strDecoder;
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