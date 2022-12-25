const fs = require("fs");
const IEEE754 = require("./export");

let input = fs.readFileSync("in.txt", "utf8");
let output = "";

let flMode = process.argv[2];

switch (flMode) {
    case '1':
        output = IEEE754.createIEEE754(input);
        break;
    case '+':
        output = IEEE754.add(input);
        output = output + ' ~ ' + IEEE754.norm(output);
        break;
    case '-':
        output = IEEE754.sub(input);
        output = output + ' ~ ' + IEEE754.norm(output);
        break;
    default:
        throw new Error("Incorrect mode");
        break;
}

fs.writeFileSync("out.txt", output);