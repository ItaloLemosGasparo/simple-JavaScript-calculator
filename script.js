var number;
var tempNumber = [], tempNumberAux = 0, qtdnum = 0;
var lastCharacter;

function insert(num) {
    if (num == "+" || num == "-" || num == "*" || num == "/" || num == "%" || num == "=") {
        if (num == "%") {
            document.getElementById('result').innerHTML = number.substring(0, number.length - qtdnum);

        } else {
            insert1();
        }
        qtdnum = 0;
        tempNumberAux++;
    }
    else if (num > -1 && num < 10) {
        qtdnum++;

        insert1();
    }

    function insert1() {
        number = document.getElementById('result').innerHTML;
        if (number == '0' || number == 'undefined')
            document.getElementById('result').innerHTML = num;
        else {
            if ((lastCharacter == "+" || lastCharacter == "-" || lastCharacter == "*" || lastCharacter == "/"
                || lastCharacter == "%" || lastCharacter == "=") && !(num > -1 && num < 10)) {
                back();
                lastCharacter = "";
                insert1();
            } else {
                document.getElementById('result').innerHTML = number + num;
                lastCharacter = num;
            }
        }
    }
    // /* getting what already is on the "input" */
    // number = document.getElementById('result').innerHTML;
    // /* Cheking what already is in the "input" */
    // if (number == '0' || number == 'undefined')
    //     document.getElementById('result').innerHTML = num;
    // else
    //     document.getElementById('result').innerHTML = number + num;
}

function clean() {
    qtdnum = 0;
    tempNumberAux = 0;
    document.getElementById('result').innerHTML = "";
}

function back() {
    qtdnum--;
    number = document.getElementById('result').innerHTML;
    document.getElementById('result').innerHTML = number.substring(0, number.length - 1);
}

function calculate() {
    number = document.getElementById('result').innerHTML;
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