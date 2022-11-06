const fs = require("fs");

let strA = "";
let tempA = 'a';
tempA = tempA.repeat(100) + 'b';
let tempB = 'b' + tempA.repeat(100);

String.prototype.brute = function (adr, temp) {
    let str = fs.readFileSync(adr).toString();
    let i = 0;

    let time = performance.now();
    while (i <= str.length - temp.length) {
        j = 0;
        while (str[i + j] == temp[j]) {
            if (j == temp.length - 1) {
                break;
            }
            j++;
        }
        i++;
    }
    time = performance.now() - time;

    console.log(time);
    return 0;
}

String.prototype.hash = function (adr, temp) {
    let str = fs.readFileSync(adr).toString();
    let i = 0;
    let j = 0;
    let hashTem = 0;
    let hashStr = 0;

    let time = performance.now();
    while (i < temp.length) {
        hashTem += temp.charCodeAt(i);
        hashStr += str.charCodeAt(i);
        i++;
    }
    i = 0;
    while (i <= str.length - temp.length) {
        j = 0;
        if (hashTem == hashStr) {
            while (str[i + j] == temp[j]) {
                if (j == temp.length - 1) {
                    break;
                }
                j++;
            }
        }
        i++;
        hashStr = hashStr - str.charCodeAt(i - 1) + str.charCodeAt(temp.length + i - 1);
    }
    time = performance.now() - time;

    console.log(time);
    return 0;
}
console.log("test1");

console.log("brute:");

strA.brute("tom1.txt", "êíÿçü Àíäðåé");
strA.brute("tom12.txt", "êíÿçü Àíäðåé");
strA.brute("tom123.txt", "êíÿçü Àíäðåé");
strA.brute("tom1234.txt", "êíÿçü Àíäðåé");

console.log("hash:");

strA.hash("tom1.txt", "êíÿçü Àíäðåé");
strA.hash("tom12.txt", "êíÿçü Àíäðåé");
strA.hash("tom123.txt", "êíÿçü Àíäðåé");
strA.hash("tom1234.txt", "êíÿçü Àíäðåé");

console.log("test2");

console.log("brute:");

strA.brute("tom1234.txt", "Àíäðåé");
strA.brute("tom1234.txt", "êíÿçü Àíäðåé");
strA.brute("tom1234.txt", "êíÿçü Àíäðåé Áîëêîíñêèé");
strA.brute("tom1234.txt", "ôîðòèôèêàöèÿ êîòîðûõ ïðîèçâîäèëàñü");
strA.brute("tom1234.txt", " êîòîðûõ ïðîèçâîäèëîñü");

console.log("hash:");

strA.hash("tom1234.txt", "Àíäðåé");
strA.hash("tom1234.txt", "êíÿçü Àíäðåé");
strA.hash("tom1234.txt", "êíÿçü Àíäðåé Áîëêîíñêèé");
strA.hash("tom1234.txt", "ôîðòèôèêàöèÿ êîòîðûõ ïðîèçâîäèëàñü");
strA.hash("tom1234.txt", " êîòîðûõ ïðîèçâîäèëîñü");

console.log("test3");

console.log("brute:");

strA.brute("strA.txt", tempA);
strA.brute("strA.txt", tempB);

console.log("hash:");

strA.hash("strA.txt", tempA);
strA.hash("strA.txt", tempB);


