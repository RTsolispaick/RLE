function codeRLE(string) {

    let i = 0, count = 1;
    let strCoder = "";

    while (i < string.length) {

        while (string[i] == string[i + count] && count < 255) count++;

        if (count > 3) {
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

function test() {

    try {
        
        let wordCode = codeRLE(fs.readFileSync("input+.txt", "utf8"));
        fs.writeFileSync("code+.txt", wordCode, "utf8");
        
        let wordDecode = decodeRLE(fs.readFileSync("code+.txt", "utf8"));
        fs.writeFileSync("decode+.txt", wordDecode, "utf8");

        if (fs.readFileSync("input+.txt", "utf8") == fs.readFileSync("decode+.txt", "utf8")) {
            console.log("true");
        } else {
            console.log("false");
        }

    } catch (err) {
        console.log(err);
    }

}

const fs = require("fs");
let testString = "";

for (i = 40; i < 256; i++) {
    testString += String.fromCharCode(i).repeat(500);
}

fs.writeFileSync("input+.txt", testString, "utf8");

test();