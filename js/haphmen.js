
let alph = new Array();
let str = "aaaaaabbbbbbbbbbbbbssbbbbbba";

for (i = 0; i < str.length; i++) {
    if (str[i] in alph) {
        alph[str[i]]++;
    } else {
        alph[str[i]] = 1;
    }
}

function compareNumeric(a, b) {
    if (a > b) return -1;
    if (a == b) return 0;
    if (a < b) return 1;
}

console.log(alph);

alph.sort(compareNumeric);

console.log(alph);