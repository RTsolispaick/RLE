const fs = require("fs");
let str = "kolokolihak a kolokol";
let temp = "kolokol";
len = temp.length;
alph = new Array();

for (let i = 0; i < len; i++) {
    alph[temp.charAt(i)] = 0;
}

del = new Array(len + 1);

for (let j = 0; j <= len; j++) {
    del[j] = new Array();
}

for (i in alph) {
    del[0][i] = 0;
}

for (let j = 0; j < len; j++) {
    let prev = del[j][temp.charAt(j)];
    del[j][temp.charAt(j)] = j + 1;
    for (i in alph) del[j + 1][i] = del[prev][i];
}

let state = 0;
posit = new Array();
let time = performance.now();
for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) in alph) state = del[state][str.charAt(i)];
    else state = 0;

    if (state == len) {
        posit.push(i - state + 1);
    }
}
time = performance.now() - time;
console.log(time);
console.log(posit);
console.log(posit.length);