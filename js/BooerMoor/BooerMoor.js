const fs = require('fs');

//kolokol v kolokol
let string = fs.readFileSync('str.txt', 'utf8');
//kolokol
let pattern = fs.readFileSync('pattern.txt', 'utf8');

let m = pattern.length;
let vhoh = new Array();
let rpr = new Array();
let Shift2 = new Array();
let Shift1;

//Bad suffix N(char)
let N = new Array()
for (let j = 0; j < pattern.length; j++)
    N[pattern.charAt(j)] = j;

//Good suffix
let patternMore = '*'.repeat(m) + pattern;

for (let i = 0; i <= pattern.length; i++) {
    rpr[i] = m;
    k = m - i;
    while (true) {
        if (compare(patternMore.substring(k + m - 1, k + m + i - 1), pattern.substring(m - i, m))
            && (k > 1 && pattern[k - 2] != pattern[m - i - 1] || k <= 1)) break;
        k--;
    }
    rpr[i] = k;
}

for (let i = 0; i <= pattern.length; i++) {
    Shift2[i] = m - rpr[i] - i;
}

//Search
let j = 0;
for (let i = pattern.length - 1; i <= string.length - 1;) {
    while (string[i - j] == pattern[pattern.length - 1 - j]) {
        if (j == pattern.length - 1) {
            vhoh.push(i - pattern.length + 1);
            break;
        }
        j++
    }
    if (!N[string[i - j]]) N[string[i - j]] = 0;
    Shift1 = Math.max(pattern.length - N[string[i - j]] - j - 1, 1);
    S = Math.max(Shift1, Shift2[j]);
    i += S;
    j = 0;
}

//Output
for (i in vhoh) {
    let str = "Index of occurrence: " + vhoh[i] + '\n';
    fs.writeFileSync('index.txt',
        str,
        { encoding: "utf-8", flag: "a" });
}

//Compair T* and T
function compare(t1, t2) {
    for (let i = 0; i < t1.length; i++) {
        if (t1[i] == '*' || t2[i] == '*' || t1[i] == t2[i]) {
            continue;
        }
        return false;
    }
    return true;
}
