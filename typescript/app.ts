const num1Element = document.getElementById('num1') as HTMLInputElement;
const num2Element = document.getElementById('num2') as HTMLInputElement;
const buttonElement = document.querySelector('button')!; // If there is no matching element, and querySelector('button') returns null, 

const numResults: Array<number> = []; //means the type is an array full of numbers
const textResults: string[] = [];

// TYPE ALIAS
type NumOrString = number | string;
type Result = { val: number; timestamp: Date };

interface ResultObj { 
    val: number;
    timestamp: Date;
}

function add(num1: NumOrString, num2: NumOrString) { //union types
    // return num1 + num2; - this line won'r run without cheking types
    if(typeof num1 === 'number' && typeof num2 === 'number') { 
        return num1 + num2;
    } else if (typeof num1 === 'string' && typeof num2 === 'string') {
        return num1 + ' ' + num2;
    }
    //typeguarding: Running different code base on the different data type
}

//functions
function printResult(resultObj: { val: number; timestamp: Date }) {
    console.log(resultObj.val);
}
if (buttonElement) {
    buttonElement.addEventListener('click', () => {
        const num1 = num1Element.value;
        const num2 = num2Element.value;
        const result = add(+num1, +num2)  // + added to convert the numbers to int
        console.log(result);  
       // console.log(add(true, false));
        numResults.push(result as number);
        const stringResult = add(num1, num2);
        textResults.push(stringResult as string);
        printResult({val: result as number, timestamp: new Date()});
    });    
}

const myPromise = new Promise<string>((resolve, reject) => { //generics
    setTimeout(() => {
        resolve('It worked'); 
    }, 1000);
});

myPromise.then((result) => {
    console.log(result.split('w'));
}) 