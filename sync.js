console.log("Hello JS");

let a = 10;
let b = 20;

function sum (a, b){
    return a + b;
}

let result = sum(a, b);
console.log("The sum of a and b is: " + result);

// here all the code is executed by V8 engine in a single thread.