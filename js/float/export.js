module.exports.createIEEE754 = function (input) {
    let znak;
    let poriadok;

    // Проверка на не число и определение бита знака, если число
    if (isNaN(Number(input))) {
        return "011111111" + 'x'.repeat(23);
    }
    else {
        if (input[0] == '-')
            znak = '1';
        else
            znak = '0';
    }

    // Проверка на ноль
    if (Number(input) === 0) {
        return znak + '0'.repeat(31);
    }

    // Двоичная запись числа без знака
    let numBinary = Math.abs(Number(input)).toString(2);

    // Вспомогательный массив temp для опередления порядка числа
    let temp = new Array();

    // В первом элементе массива лежит целая часть числа и во втором дробная
    temp = numBinary.split('.');

    // Определение порядка
    if (temp[0] == '0') {
        poriadok = -(temp[1].indexOf('1') + 1);
    }
    else {
        poriadok = temp[0].length - 1;
    }
    // Проверка на бесконеность
    if (poriadok > 127 || (poriadok == 127 && Number(temp[0].slice(24)) != 0 && temp[0].slice(1, 24) == "1".repeat(23))) {
        return znak + '1'.repeat(8) + '0'.repeat(23);
    }
    // Проверка на нормальное число
    else if (poriadok > -127) {
        let binaryPor = '0'.repeat((8 - (poriadok + 127).toString(2).length)) + (poriadok + 127).toString(2);
        if (temp[0] == '0') {
            return znak + binaryPor + (temp[1] + '0'.repeat(23)).substr(-poriadok, 23);
        }
        else if (temp.length == 1) {
            return znak + binaryPor + (temp[0] + '0'.repeat(23)).slice(1, 24);
        }
        else {
            return znak + binaryPor + (temp[0] + temp[1] + '0'.repeat(23)).slice(1, 24);
        }
    }
    // Проверка на денормализованное число
    else if (poriadok > -150) {
        return znak + '0'.repeat(8) + temp[1].substr(126, 23);
    }
    // Если число слишком маленькое, то оно приравнивается к нулю
    else {
        return znak + '0'.repeat(31);
    }
}

module.exports.add = function (input) {
    // Результат суммы
    let result = new Array(3);

    // Разделяем выражение на слагаемые
    let slag = new Array();
    slag = input.split('+');

    // Проверка на количество слагаемых
    if (slag.length != 2) {
        throw new Error("Something is wrong with the number of terms");
    }

    // Проверка на знаки
    if (slag[0][0] == '-' && slag[1][0] == '-') {
        result[0] = '1';
        slag[0] = slag[0].slice(1);
        slag[1] = slag[1].slice(1);
    }
    else if (slag[0][0] != '-' && slag[1][0] == '-') {
        return this.sub(slag[0] + slag[1]);
    }
    else if (slag[0][0] == '-' && slag[1][0] != '-') {
        return this.sub(slag[1] + slag[0]);
    }
    else {
        result[0] = '0';
    }

    // Переводим числа в формат IEEE754
    slag[0] = this.createIEEE754(slag[0]);
    slag[1] = this.createIEEE754(slag[1]);

    // Раскладываем числа на "части"
    let slagOne = new Array(3);
    slagOne[0] = slag[0][0]; slagOne[1] = slag[0].slice(1, 9); slagOne[2] = slag[0].slice(9);
    let slagTwo = new Array(3);
    slagTwo[0] = slag[1][0]; slagTwo[1] = slag[1].slice(1, 9); slagTwo[2] = slag[1].slice(9);

    // Проверяем результат на не число и бесконечность
    if (slagOne[1] == "11111111" && slagTwo[1] == "11111111") {
        if (Number(slagOne[2]) != 0 || Number(slagTwo[2]) != 0)
            return '0' + '1'.repeat(8) + 'x'.repeat(23);
        else if (slagOne[0] == '1' && slagTwo[0] == '1')
            return '1' + '1'.repeat(8) + '0'.repeat(23);
        else if (slagOne[0] == '0' && slagTwo[0] == '0')
            return '0' + '1'.repeat(8) + '0'.repeat(23);
        else
            return "Error";
    }
    else if (slagOne[1] == "11111111") {
        if (Number(slagOne[2]) != 0)
            return '0' + '1'.repeat(8) + 'x'.repeat(23);
        else if (slagOne[0] == "1")
            return '1' + '1'.repeat(8) + '0'.repeat(23);
        else
            return '0' + '1'.repeat(8) + '0'.repeat(23);
    }
    else if (slagTwo[1] == "11111111") {
        if (Number(slagTwo[2]) != 0)
            return '0' + '1'.repeat(8) + 'x'.repeat(23);
        else if (slagTwo[0] == "1")
            return '1' + '1'.repeat(8) + '0'.repeat(23);
        else
            return '0' + '1'.repeat(8) + '0'.repeat(23);
    }
    else {
        // Выравнивание порядков и мантисы
        if (slagOne[1] != slagTwo[1]) {
            let poraydokRaz;
            if (Number(slagOne[1]) > Number(slagTwo[1])) {
                poraydokRaz = parseInt(slagOne[1], 2) - parseInt(slagTwo[1], 2);
                slagTwo[1] = slagOne[1];
                if (slagTwo[1] == "00000000") {
                    slagTwo[2] = ('0'.repeat(poraydokRaz) + slagTwo[2]).slice(0, 23);
                }
                else {
                    slagTwo[2] = ('0'.repeat(poraydokRaz - 1) + '1' + slagTwo[2]).slice(0, 23);
                }
                // Получение порядка и мантисы результата в случае неравынх порядков
                if (binaryAdd('1' + slagOne[2], '0' + slagTwo[2]).length == slagOne[2].length + 2) {
                    result[1] = binaryAdd(slagTwo[1], "00000001");
                }
                else {
                    result[1] = slagOne[1];
                }
                result[2] = binaryAdd('1' + slagOne[2], '0' + slagTwo[2]).slice(1, 24);
            }
            else {
                poraydokRaz = parseInt(slagTwo[1], 2) - parseInt(slagOne[1], 2);
                slagOne[1] = slagTwo[1];
                if (slagOne[1] == "00000000") {
                    slagOne[2] = ('0'.repeat(poraydokRaz) + slagOne[2]).slice(0, 23);
                }
                else {
                    slagOne[2] = ('0'.repeat(poraydokRaz - 1) + '1' + slagOne[2]).slice(0, 23);
                }

                // Получение порядка и мантисы результата в случае равных порядков
                if (binaryAdd('0' + slagOne[2], '1' + slagTwo[2]).length == slagOne[2].length + 2) {
                    result[1] = binaryAdd(slagTwo[1], "00000001");
                }
                else {
                    result[1] = slagOne[1];
                }
                result[2] = binaryAdd('0' + slagOne[2], '1' + slagTwo[2]).slice(1, 24);
            }
        }
        else {
            if (slagOne[1] != "00000000") {
                result[1] = binaryAdd(slagOne[1], "00000001");
                result[2] = binaryAdd('1' + slagOne[2], '1' + slagTwo[2]).slice(1, 24);
            }
            else {
                if (slagOne[2][0] == '1' && slagTwo[2][0] == '1') {
                    result[1] = binaryAdd(slagOne[1], "00000001");
                }
                else {
                    result[1] = slagOne[1];
                }
                result[2] = binaryAdd('0' + slagOne[2], '0' + slagTwo[2]).slice(1, 24);
            }
        }
    }
    return result[0] + result[1] + result[2];
}

module.exports.sub = function (input) {
    //Результат вычетания
    let result = new Array(3);

    //Разделяем выражение на части по '-'
    let hasti = new Array();
    if (input[0] == '-') {
        input = input.slice(1);
        if (input.indexOf("--") != -1) {
            hasti = input.split("--");
            let temp = hasti[0];
            hasti[0] = hasti[1];
            hasti[1] = temp;
        }
        else {
            hasti = input.split('-');
            let number = this.add(hasti[0] + '+' + hasti[1]);
            return '1' + number.slice(1);
        }
    }
    else {
        if (input.indexOf("--") != -1) {
            hasti = input.split("--");
            return this.add(hasti[0] + '+' + hasti[1]);
        }
        else {
            hasti = input.split('-');
        }
    }
    // Проверка на корректный ввод
    if (hasti.length != 2) {
        throw new Error("Something is wrong with the number of terms");
    }

    // Переводим уменьшаемое и вычитаемое в IEEE754
    hasti[0] = this.createIEEE754(hasti[0]);
    hasti[1] = this.createIEEE754(hasti[1]);

    // Раскладываем числа на "части"
    let umen = new Array(3);
    umen[0] = hasti[0][0]; umen[1] = hasti[0].slice(1, 9); umen[2] = hasti[0].slice(9);
    let vihit = new Array(3);
    vihit[0] = hasti[1][0]; vihit[1] = hasti[1].slice(1, 9); vihit[2] = hasti[1].slice(9);

    // Проверяем, что уменьшаемое больше вычитаемого, если это не так, то обозначаем что сумма будет отрицательная и меняем вычитаемое и уменьшаемое местами
    if (Number(umen[1]) < Number(vihit[1])) {
        result[0] = '1';
        let temp = umen;
        umen = vihit;
        vihit = temp;
    }
    else if (Number(umen[1]) == Number(vihit[1])) {
        if (Number(umen[2]) < Number(vihit[2])) {
            result[0] = '1';
            let temp = umen;
            umen = vihit;
            vihit = temp;
        }
        else {
            result[0] = '0';
        }
    }
    else {
        result[0] = '0';
    }
    // Проверка на бесконесть и не число
    if (umen[1] == "11111111" && vihit[1] == "11111111") {
        if (Number(umen[2]) != 0 || Number(vihit[2]) != 0)
            return "011111111" + 'x'.repeat(23);
        else if (umen[0] == '1' && vihit[0] == '0')
            return '1' + '1'.repeat(8) + '0'.repeat(23);
        else if (slagOne[0] == '0' && slagTwo[0] == '1')
            return '0' + '1'.repeat(8) + '0'.repeat(23);
        else
            return "Error";
    }
    else if (umen[1] == "11111111") {
        if (Number(umen[2]) != 0)
            return "011111111" + 'x'.repeat(23);
        else if (umen[0] == "1")
            return '1' + '1'.repeat(8) + '0'.repeat(23);
        else
            return '0' + '1'.repeat(8) + '0'.repeat(23);
    }
    else if (vihit[1] == "11111111") {
        if (Number(vihit[2]) != 0)
            return '0' + '1'.repeat(8) + 'x'.repeat(23);
        else if (vihit[0] == '1')
            return '0' + '1'.repeat(8) + '0'.repeat(23);
        else
            return '1' + '1'.repeat(8) + '0'.repeat(23);
    }
    else {
        //Вырваниваем порядки и мантисы
        if (umen[1] != vihit[1]) {
            let poraydokRaz;
            poraydokRaz = parseInt(umen[1], 2) - parseInt(vihit[1], 2);
            vihit[1] = umen[1];
            if (vihit[1] == "00000000") {
                vihit[2] = ('0'.repeat(poraydokRaz) + vihit[2]).slice(0, 23);
            }
            else {
                vihit[2] = ('0'.repeat(poraydokRaz - 1) + '1' + vihit[2]).slice(0, 23);
            }

            // Получаем значение порядка и мантисы разности
            if (binarySud('1' + umen[2], '0' + vihit[2])[0] == '0') {
                let razM = binarySud('1' + umen[2], '0' + vihit[2]);
                let razPor = razM.indexOf('1');
                result[1] = binarySud(umen[1], '0'.repeat(8 - razPor.toString(2).length) + razPor.toString(2));
                result[2] = (razM + '0'.repeat(23)).substr(razPor + 1, 23);
            } else {
                result[1] = umen[1];
                result[2] = binarySud('1' + umen[2], '0' + vihit[2]).slice(1, 24);
            }
        }
        else {
            if (umen[1] == "00000000") {
                result[1] = umen[1];
                result[2] = binarySud('0' + umen[2], '0' + vihit[2]).slice(1, 24);
            }
            else {
                let razM = binarySud('1' + umen[2], '1' + vihit[2]);
                let razPor = razM.indexOf('1');
                result[1] = binarySud(umen[1], '0'.repeat(8 - razPor.toString(2).length) + razPor.toString(2));
                result[2] = (razM + '0'.repeat(23)).substr(razPor + 1, 23);
            }
        }
    }
    return result[0] + result[1] + result[2];
}

// Перевод числа из формата IEEE754 в десятичный вид
module.exports.norm = function (input) {
    //Число в десятичном виде
    let result = "";

    // Проверка на не число и бесконечность
    if (isNaN(input)) {
        return "NaN";
    }
    else if (input.slice(1, 9) == "11111111") {
        if (input[0] == '0') {
            return "+Infinity";
        } else {
            return "-Infinity";
        }
    }

    // Перервод числа
    let poryadok = BinToDec(input.slice(1, 9)) - 127;
    if (poryadok == -127) {
        result = result + '0.' + '0'.repeat(-poryadok - 2) + '0' + input.slice(9);
    }
    else if (poryadok < 0) {
        result = result + '0.' + '0'.repeat(-poryadok - 1) + '1' + input.slice(9);
    }
    else if (poryadok <= 23) {
        result = result + '1' + input.slice(9, 9 + poryadok) + '.' + input.slice(9 + poryadok); 
    }
    else {
        result = result + '1' + input.slice(9) + '0'.repeat(poryadok - 23);
    }

    result = BinToDec(result);

    if (input[0] == '1')
        result = '-' + result;
    return result;
}

//Сложение бинарных чисел равынх размеров 
function binaryAdd(firstSlag, secondSlag) {
    let res = "";
    let flag = false;
    for (let i = firstSlag.length - 1; -1 <= i; i--) {
        if (i == -1) {
            if (flag) {
                res = "1" + res;
            }
        }
        else if ((firstSlag[i] == "1" && secondSlag[i] == "0") || (firstSlag[i] == "0" && secondSlag[i] == "1")) {
            if (flag) {
                res = "0" + res;
            }
            else {
                res = "1" + res;
            }
        }
        else if (firstSlag[i] == "0" && secondSlag[i] == "0") {
            if (flag) {
                res = "1" + res;
            }
            else {
                res = "0" + res;
            }
            flag = false;
        }
        else if (firstSlag[i] == "1" && secondSlag[i] == "1") {
            if (flag) {
                res = "1" + res;
            }
            else {
                res = "0" + res;
                flag = true;
            }
        }
    }
    return res;
}

//Модуль разность бинарных чисел
function binarySud(first, second) {
    if (Number(first) < Number(second)) {
        let temp = first;
        first = second;
        second = temp;
    }
    let res = "";
    let flag = false;
    for (let i = first.length - 1; -1 < i; i--) {
        if (first[i] == '1' && second[i] == '0') {
            if (flag) {
                res = '0' + res;
                flag = false;
            }
            else {
                res = '1' + res;
            }
        }
        else if (first[i] == '0' && second[i] == '1') {
            if (flag) {
                res = '0' + res;
            }
            else {
                res = '1' + res;
                flag = true;
            }
        }
        else {
            if (flag) {
                res = "1" + res;
            }
            else {
                res = '0' + res;
            }
        }
    }
    return res;
}

// Перевод числа из двоичной в десятичную систему счисления
function BinToDec(num) {
    let part = new Array();
    part = num.split('.');
    let sum = 0, i = part[0].length;
    for (; i > 0; i--) {
        sum += Number(part[0][part[0].length - i]) * Math.pow(2, i - 1);
    }
    if (part.length == 2) {
        for (; i > -part[1].length; i--) {
            sum += Number(part[1][-i]) * Math.pow(2, i - 1);
        }
    }
    return sum;
}
