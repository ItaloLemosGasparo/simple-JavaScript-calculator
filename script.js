var str;
var numbers = [], numbersAux = 0, qtdnum = 0;
// Keeps track of the last character entered (e.g., "1" or ".")
var lastCharacter = 0;
// Flag to check if we need to add or replace numbers in tempNumber
var replace = 0;

function insert(num) {
    // Check if the input is an operator or an equal sign
    if (num === "+" || num === "-" || num === "*" || num === "/" || num === "%" || num === "=") {
        // Handle the percentage operation
        if (num === "%") {
            // Check if it's possible to calculate the percentage
            if (numbersAux > 0 && qtdnum > 0) {
                // Remove the last input based on the number of digits entered
                str = document.getElementById('result').innerHTML;
                document.getElementById('result').innerHTML = str.substring(0, str.length - qtdnum);

                str = document.getElementById('result').innerHTML;
                // Calculate the percentage and keep it on res
                var res = eval(numbers[numbersAux - 1] + "/100*" + numbers[numbersAux]).toFixed(2);
                document.getElementById('result').innerHTML = str + res;
                // Replace the percentage input with the result
                numbers[numbersAux] = res;
                qtdnum = numbers[numbersAux].length;
            }
            // Exit the insert function to avoid issues after calculating the percentage
            return;
        }
        
        // Check if the last character is a number
        if (lastCharacter >= 0 && lastCharacter <= 9) {
            insertSymbol(); // Insert the operator if the last character was a number
        } else {
            // Replace the operator if the last character was not a number
            back(1);
            insertSymbol(1);
        }
    } else if (num >= 0 && num <= 9) { // Handle numbers
        // Add or replace the number in the temporary array
        if (numbers[numbersAux] === undefined || replace === 1) {
            numbers[numbersAux] = num.toString();
            replace = 0; // Stop replacing
        } else {
            numbers[numbersAux] += num;
        }
        insertNumber(); // Insert the number into the display
    } else if (num === "." || num === ",") { // Handle decimal points
        str = document.getElementById('result').innerHTML;
        // Check if the last character is a number and if the last input is not already a decimal point
        if ((lastCharacter >= 0 && lastCharacter <= 9) && str.substr(-1) !== ".") {
            str += ".";
            document.getElementById('result').innerHTML = str;
            qtdnum++;
            numbers[numbersAux] += ".";
        }
    }

    // Function to insert the number into the display
    function insertNumber() {
        str = document.getElementById('result').innerHTML;
        if (str === '0' || str === 'undefined') {
            document.getElementById('result').innerHTML = num;
        } else {
            document.getElementById('result').innerHTML = str + num;
        }
        lastCharacter = num; // Update last character
        qtdnum++; // Increment quantity of numbers
    }

    // Function to insert operators
    function insertSymbol(rep = 0) {
        str = document.getElementById('result').innerHTML;
        document.getElementById('result').innerHTML = str + num;

        // Increment numbersAux only if it's not a replacement
        if (rep === 0) numbersAux++;
        lastCharacter = num; // Update last character
        qtdnum = 0; // Reset quantity of numbers
    }
}

// Function to clear the calculator
function clean() {
    replace = 1;
    qtdnum = 0;
    numbersAux = 0;
    numbers = [];
    document.getElementById('result').innerHTML = "0"; // Reset display
}

// Function to handle backspace functionality
function back(flag = 0) {
    str = document.getElementById('result').innerHTML;
    // Check if the last character is a number or a "." or if it's a replacement flag
    if ((str.substr(-1) >= '0' && str.substr(-1) <= '9') || str.substr(-1) === "." || flag === 1) {
        document.getElementById('result').innerHTML = str.substring(0, str.length - 1);
        if (flag !== 1 && numbers[numbersAux] !== undefined) {
            // Remove the last character from the number being entered
            numbers[numbersAux] = numbers[numbersAux].substring(0, numbers[numbersAux].length - 1);
            qtdnum--; // Decrement the quantity of numbers
        }
    }
    // If the display is empty, reset to 0
    if (document.getElementById('result').innerHTML === "") {
        document.getElementById('result').innerHTML = "0";
    }
}

// Function to calculate the result
function calculate() {
    str = document.getElementById('result').innerHTML;
    if (str) {
        // Evaluate the expression and display the result
        numbers[0] = eval(str).toFixed(3); // Save result to numbers array
        document.getElementById('result').innerHTML = numbers[0];
    }
    qtdnum = document.getElementById('result').innerHTML.length;
    replace = 1; // Set flag to replace next input
    numbersAux = 0; // Reset auxiliary counter
}

// Function to convert pressed key to String
function keyPressed(evt) {
    evt = evt || window.event;
    var key = evt.keyCode || evt.which;
    return String.fromCharCode(key);
}

// Check if any keys are pressed while the page is focused
document.onkeypress = function (evt) {
    var key = keyPressed(evt);
    // If '=' or 'Enter' key is pressed, calculate the result
    if (key === '=' || evt.which === 13) {
        calculate();
    }
    // Send the pressed key to the insert function
    insert(key);
}
