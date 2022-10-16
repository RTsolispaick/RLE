const readline = require('readline-sync');
const fs = require('fs');

let power = 1;
let code = fs.readFileSync(process.argv[2], "utf-8");
code = code.replace(/\n/g, " ");
let memory = new Array();
let ep = 0;

memory = code.split(" ");

while (power) {
    switch (memory[ep]) {
        case "set":
            memory[1 * memory[ep + 1]] = 1 * memory[ep + 2];
            ep += 3;
            break;
        case "jsin":
            let word = readline.question();
            memory[1 * memory[ep + 1]] = word;
            ep += 2;
            break;
        case "jsout":
            console.log(memory[1 * memory[ep + 1]]);
            ep += 2;
            break;
        case "add":
            memory[1 * memory[ep + 3]] = 1 * memory[1 * memory[ep + 1]] + 1 * memory[1 * memory[ep + 2]];
            ep += 4;
            break;
        case "mul":
            memory[1 * memory[ep + 3]] = (1 * memory[1 * memory[ep + 1]]) * (1 * memory[1 * memory[ep + 2]]);
            ep += 4;
            break;
        case "jmp":
            ep = 1 * memory[ep + 1];
            break;
        case "jscmp":
            if (1 * memory[1 * memory[ep + 1]] < 1 * memory[1 * memory[ep + 2]]) {
                ep += 4;
                break;
            }
            ep = 1 * memory[ep + 3];
            break;
        default:
            console.log("Finish");
            power = 0;
            break;
    }
}
