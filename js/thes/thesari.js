const fs = require("fs");

let str = fs.readFileSync("case.txt", "utf8");
let alph = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let alphUp = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let CF = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0, j: 0, k: 0, l: 0, m: 0, n: 0, o: 0, p: 0, q: 0, r: 0, s: 0, t: 0, u: 0, v: 0, w: 0, x: 0, y: 0, z: 0 };
let FF = { a: 0.082, b: 0.015, c: 0.028, d: 0.043, e: 0.13, f: 0.022, g: 0.02, h: 0.061, i: 0.07, j: 0.0015, k: 0.0077, l: 0.04, m: 0.024, n: 0.067, o: 0.075, p: 0.019, q: 0.00095, r: 0.06, s: 0.063, t: 0.091, u: 0.028, v: 0.0098, w: 0.024, x: 0.0015, y: 0.02, z: 0.00074 };

let now = CoderThes(str);

fs.writeFileSync("codeThes.txt", now, "utf8");
fs.writeFileSync("decodeThes.txt", DecoderThes(now), "utf8");

function CoderThes(str) {
    let now = "";
    let sdvig = process.argv[2] * 1;
    for (i in str) {
        if (alph.indexOf(str[i]) != -1) {
            now += alph[(alph.indexOf(str[i]) + sdvig) % alph.length];
            continue;
        }
        if (alphUp.indexOf(str[i]) != -1) {
            now += alphUp[(alphUp.indexOf(str[i]) + sdvig) % alphUp.length]
            continue;
        }
        now += str[i];
    }
    return now;
}

function SdvigThes(str) {
    let count = 0;
    let SMin = 0;
    let SdvMin = 0;
    for (i in str) {
        if (str[i].match(/[a-z]/i)) {
            if (str[i].toLowerCase() in CF) CF[str[i].toLowerCase()]++;
            count++;
        }
    }
    for (i in CF) {
        CF[i] /= count;
        SMin += (CF[i] - FF[i]) * (CF[i] - FF[i]); 
    }
    let sdvig = 1;
    let sum = 0;
    while (sdvig < 26) {
        for (i in CF) {
            sum += (CF[i] - FF[alph[(alph.indexOf(i) + sdvig) % 26]]) * (CF[i] - FF[alph[(alph.indexOf(i) + sdvig) % 26]]);
        }
        if (sum < SMin) {
            SMin = sum;
            SdvMin = sdvig;
        }
        sdvig++;
        sum = 0;
    }
    return 26 - SdvMin;
}

function DecoderThes(str) {
    let nowe = "";
    let sdvig = SdvigThes(str);
    for (i in str) {
        if (alph.indexOf(str[i]) != -1) {
            nowe += alph[((alph.indexOf(str[i]) - sdvig) % alph.length + alph.length) % alph.length];
            continue;
        }
        if (alphUp.indexOf(str[i]) != -1) {
            nowe += alphUp[((alphUp.indexOf(str[i]) - sdvig) % alphUp.length + alphUp.length) % alphUp.length]
            continue;
        }
        nowe += str[i];
    }
    return nowe;
}
