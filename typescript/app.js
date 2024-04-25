var num1Element = document.getElementById('num1');
var num2Element = document.getElementById('num2');
var buttonElement = document.querySelector('button'); // If there is no matching element, and querySelector('button') returns null, 
var numResults = []; //means the type is an array full of numbers
var textResults = [];
function add(num1, num2) {
    // return num1 + num2; - this line won'r run without cheking types
    if (typeof num1 === 'number' && typeof num2 === 'number') {
        return num1 + num2;
    }
    else if (typeof num1 === 'string' && typeof num2 === 'string') {
        return num1 + ' ' + num2;
    }
    //typeguarding: Running different code base on the different data type
}
//functions
function printResult(resultObj) {
    console.log(resultObj.val);
}
if (buttonElement) {
    buttonElement.addEventListener('click', function () {
        var num1 = num1Element.value;
        var num2 = num2Element.value;
        var result = add(+num1, +num2); // + added to convert the numbers to int
        console.log(result);
        // console.log(add(true, false));
        numResults.push(result);
        var stringResult = add(num1, num2);
        textResults.push(stringResult);
        printResult({ val: result, timestamp: new Date() });
    });
}
var myPromise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('It worked');
    }, 1000);
});
myPromise.then(function (result) {
    console.log(result.split('w'));
});
