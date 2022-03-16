var number;
var tempNumber = [], tempNumberAux = 0, qtdnum = 0;
var lastCharacter;
/* flag clean all */
var flagclean = 0;

function insert(num) {
    // Verifies if num is a number or a simbol
    if (num == "+" || num == "-" || num == "*" || num == "/" || num == "%" || num == "=") {
        if (num == "%") {
            number = document.getElementById('result').innerHTML;
            document.getElementById('result').innerHTML = number.substring(0, number.length - qtdnum);

            number = document.getElementById('result').innerHTML;
            var x = eval(tempNumber[tempNumberAux - 1] + "/ 100.0 *" + tempNumber[tempNumberAux]).toFixed(2);
            document.getElementById('result').innerHTML = number + x;

            tempNumber[tempNumberAux] = x;
            return
        } else {
            insert1();
        }
        qtdnum = 0;
        tempNumberAux++;
        flagclean = 1;
    }

    else if ((num > -1 && num < 10) || num == ".") {
        qtdnum++;
        if (tempNumber[tempNumberAux] === undefined || flagclean == 1) {
            tempNumber[tempNumberAux] = num;
            flagclean = 0;
        }
        else
            tempNumber[tempNumberAux] += num;
        insert1();
    }

    function insert1() {
        number = document.getElementById('result').innerHTML;
        if (number == '0' || number == 'undefined')
            document.getElementById('result').innerHTML = num;
        else {
            if ((lastCharacter == "+" || lastCharacter == "-" || lastCharacter == "*" || lastCharacter == "/"
                || lastCharacter == "%" || lastCharacter == "=") && !(num > -1 && num < 10)) {
                back(1);
                lastCharacter = "";
                insert1();
            } else {
                document.getElementById('result').innerHTML = number + num;
                lastCharacter = num;
            }
        }
    }
}

function clean() {
    flagclean = 1;
    qtdnum = 0;
    tempNumberAux = 0;
    document.getElementById('result').innerHTML = "";
}

function back(flag = 0) {
    number = document.getElementById('result').innerHTML;
    if ((number.substr(-1) > -1 || number.substr(-1) < 10 || number.substr(-1) == ".") || flag == 1) {
        qtdnum--;
        document.getElementById('result').innerHTML = number.substring(0, number.length - 1);
        if (flag != 1)
            tempNumber[tempNumberAux] = tempNumber[tempNumberAux].substring(0, tempNumber[tempNumberAux].length - 1);
    }
}

function calculate() {
    flagclean = 1;
    qtdnum = 0;
    tempNumberAux = 0;
    number = document.getElementById('result').innerHTML;
    tempNumber[0] = eval(number);
    if (number) {
        document.getElementById('result').innerHTML = eval(number);
    }
    qtdnum = document.getElementById('result').innerHTML.length;
}

/* converts pressed key to String */
function keyPressed(evt) {
    evt = evt || window.event;
    var key = evt.keyCode || evt.which;
    return String.fromCharCode(key);
}

/* check if any keys are pressed while this page is focused */
document.onkeypress = function (evt) {
    number = document.getElementById('result').innerHTML;
    var str = keyPressed(evt);

    /* Checks if the pressed key is between 0 and 9 or is +, -, *, / */
    if ((str > -1 && str < 10) || str == '+' || str == '-' || str == '*' || str == '/' || str == '%')
        insert(str);

    /* If = is pressed */
    if (str == '=')
        calculate();

    /* If Enter is pressed. str is making the pressed key a string, 
        but Enter isin't a sting like a, A, 0, 10. So we have to check the key code what is in evt */
    if (evt.which == 13)
        calculate();
}