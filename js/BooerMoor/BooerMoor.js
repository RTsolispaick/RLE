const fs = require('fs');

//kolokol v kolokol
let string = fs.readFileSync('str.txt', 'utf8');
//kolokol
let pattern = fs.readFileSync('pattern.txt', 'utf8');
let vhoh = new Array();

let N = new Array()
for (let j = 0; j < pattern.length; j++)
    N[pattern.charAt(j)] = j;

let Shift1;
let j = 0;
for (let i = pattern.length - 1; i <= string.length - 1;) {
    console.log(i);
    while (string[i - j] == pattern[pattern.length - 1 - j]) {
        if (j == pattern.length - 1) {
            vhoh.push(i - pattern.length + 1);
            break;
        }
        j++
    }
    if (!N[string[i - j]]) N[string[i - j]] = 0;
    Shift1 = Math.max(pattern.length - N[string[i - j]] - j - 1, 1);
    i += Shift1;
    j = 0;
}

for (i in vhoh) {
    let str = "Index of occurrence: " + vhoh[i] + '\n';
    fs.writeFileSync('index.txt',
        str,
        { encoding: "utf-8", flag: "a" });
}