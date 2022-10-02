const fs = require("fs");
let text = fs.readFileSync("input.txt", "utf8");

const code = codeObject(tree(sort(alph(text))));

console.log("Frequency:");
console.log(sort(alph(text)));
console.log("CodeHap:");
console.log(code);
console.log("CodeString:");
console.log(coderString(text));
console.log("DecodeString:");
console.log(decoderString(coderString(text)));

function alph(text, array = [], place = []) {
    for (i = 0; i < text.length; i++) {
        if (text[i] in array) {
            array[text[i]]++;
        } else {
            array[text[i]] = 1;
        }
    }
    for (i in array) {
        place.push([i, array[i]]);
    }

    return place;
}

function sort(arr) {
    if (arr.length == 1) {
        return arr;
    } else {
        return arr.sort((a, b) => a[1] - b[1]);
    }
}

function tree(arr) {
    if (arr.length > 1) {
        return tree(sort([[arr.slice(0, 2), arr[0][1] + arr[1][1]]].concat(arr.slice(2))));
    } else {
        return arr[0];
    }
}

function codeObject(arr, codeHap = "") {
    if (arr[0] instanceof Array) {
        return Object.assign(codeObject(arr[0][0], codeHap + "0"), codeObject(arr[0][1], codeHap + "1"));
    } else {
        if (codeHap == "") {
            return { [arr[0]]: "0" }
        } 
        return { [arr[0]]: codeHap };
    }
}

function coderString(str, codeString = "") {
    for (i = 0; i < str.length; i++) {
        codeString += code[str[i]];
    }
    
    return codeString;
}

function decoderString(str) {
    for (j = 0; j < str.length; j++) {
        for (i in code) {
            str = str.replace(code[i], (a, b) => {
                if (b == j) {
                    return i;
                } else {
                    return code[i];
                }
            });
        }
    }

    return str;
}
