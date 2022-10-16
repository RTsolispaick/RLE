const readline = require('readline-sync');
const fs = require('fs');

let power = 1;
let code = fs.readFileSync(process.argv[2], "utf-8");
code = code.replace(/\n/g, " ");
let memory = new Array();
let ip = 0;

memory = code.split(" ");

while (power) {
    switch (memory[ip]) {
        case "set":
            memory[1 * memory[ip + 1]] = 1 * memory[ip + 2];
            ip += 3;
            break;
        case "jsin":
            let word = readline.question();
            memory[1 * memory[ip + 1]] = word;
            ip += 2;
            break;
        case "jsout":
            console.log(memory[1 * memory[ip + 1]]);
            ip += 2;
            break;
        case "add":
            memory[1 * memory[ip + 3]] = 1 * memory[1 * memory[ip + 1]] + 1 * memory[1 * memory[ip + 2]];
            ip += 4;
            break;
        case "mul":
            memory[1 * memory[ip + 3]] = (1 * memory[1 * memory[ip + 1]]) * (1 * memory[1 * memory[ip + 2]]);
            ip += 4;
            break;
        case "jmp":
            ip = 1 * memory[ip + 1];
            break;
        case "jscmp":
            if (1 * memory[1 * memory[ip + 1]] < 1 * memory[1 * memory[ip + 2]]) {
                ip += 4;
                break;
            }
            ip = 1 * memory[ip + 3];
            break;
        default:
            console.log("Finish");
            power = 0;
            break;
    }
}
