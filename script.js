var str;
var numbers = [], numbersAux = 0, qtdnum = 0;
// Keeps the last character like "1" ou "."
var lastCharacter = 0;
// Flag to check if we need to add ou replace numbers in tempNumber
var replace = 0;

function insert(num) {
    // Check if num is a number or a simbol
    if (num == "+" || num == "-" || num == "*" || num == "/" || num == "%" || num == "=") {
        // check if its about %
        if (num == "%") {
            // Cheking if its possible to calc the %
            if (numbersAux > 0 && qtdnum > 0) {
                // like the function back but with "qtdnum times backspace"
                str = document.getElementById('result').innerHTML;
                document.getElementById('result').innerHTML = str.substring(0, str.length - qtdnum);

                str = document.getElementById('result').innerHTML;
                // \/ calculing the % and keeping it on res
                var res = eval(numbers[numbersAux - 1] + "/100*" + numbers[numbersAux]).toFixed(2);
                document.getElementById('result').innerHTML = str + res;
                // replacing the % number like 50 + 50%(<- this one) for the res(25 in this case)
                numbers[numbersAux] = res;
            }
            //break the insert to avoid problens after calc or not the %
            return;
        }
        // checking if the last character is or not a number
        // if its a number just insert the simbol
        else if (lastCharacter > -1 || lastCharacter < 10) {
            insertSimblo();
        }
        //if its not a number do a "backspace" and replace the simbol
        else {
            // tag 1 means its to replace a simbol
            back(1);
            insertSimblo();
        }
        // Number
    } else if (num > -1 && num < 10) {
        // add or repalce number in tempNumber[x]
        if (numbers[numbersAux] === undefined || replace == 1) {
            numbers[numbersAux] = num;
            // \/ to stop replacing
            replace = 0;
        }
        else
            numbers[numbersAux] += num;
        // insert the number
        insertNumber();
        // "." or ","
    } else if (num == "." || num == ",") {
        // cheking if lastCharacter is a number
        if (lastCharacter > -1 && lastCharacter < 10) {
            str = document.getElementById('result').innerHTML;
            document.getElementById('result').innerHTML = str + ".";
            qtdnum++;
        }
    }

    function insertNumber() {
        str = document.getElementById('result').innerHTML;
        if (str == '0' || str == 'undefined')
            document.getElementById('result').innerHTML = num;
        else {
            document.getElementById('result').innerHTML = str + num;
        }
        lastCharacter = num;
        qtdnum++;
    }

    function insertSimblo() {
        str = document.getElementById('result').innerHTML;
        document.getElementById('result').innerHTML = str + num;

        lastCharacter = num;
        numbersAux++;
        qtdnum = 0;
    }
}

function clean() {
    replace = 1;
    qtdnum = 0;
    numbersAux = 0;
    document.getElementById('result').innerHTML = "0";
}

function back(flag = 0) {
    str = document.getElementById('result').innerHTML;
    // cheking the last char on the String(result) 
    // if its a number or a ".". Or the flag of Replacing simbol is 1
    if ((str.substr(-1) > -1 || str.substr(-1) < 10 || str.substr(-1) == ".") || flag == 1) {
        document.getElementById('result').innerHTML = str.substring(0, str.length - 1);
        if (flag != 1) {
            if (numbers[numbersAux] !== undefined) {
                numbers[numbersAux] = numbers[numbersAux].substring(0, numbers[numbersAux].length - 1);
                qtdnum--;
            }
        }
    }
    str = document.getElementById('result').innerHTML;
    if (str == "") {
        document.getElementById('result').innerHTML = "0";
    }
}

function calculate() {
    str = document.getElementById('result').innerHTML;
    numbers[0] = eval(str);
    if (str) {
        document.getElementById('result').innerHTML = eval(str);
    }
    qtdnum = document.getElementById('result').innerHTML.length;

    replace = 1;
    qtdnum = 0;
    numbersAux = 0;
}

// not 100% sure about the code below

/* converts pressed key to String */
function keyPressed(evt) {
    evt = evt || window.event;
    var key = evt.keyCode || evt.which;
    return String.fromCharCode(key);
}

/* check if any keys are pressed while this page is focused */
document.onkeypress = function (evt) {
    number = document.getElementById('result').innerHTML;
    var key = keyPressed(evt);

    // If = is pressed 
    if (key == '=')
        calculate();
    // if its the "Enter" key calls Calculate
    if (evt.which == 13)
        calculate();

    // send to Insert the key what was pressed
    insert(key);
}