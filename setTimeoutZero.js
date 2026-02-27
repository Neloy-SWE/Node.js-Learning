console.log("Hello JS");

let a = 10;
let b = 20;

setTimeout(() => {
    console.log("This is a message from setTimeout function");
}, 0);
/**
 * here, setTimeout is an asynchronous function. so it will be executed by libuv and the callback from setTimeout will only be pushed to callstack in V8 once the call stack is empty. that's why though we have set the timeout to 0, we will see the execution of setTimeout callback after rest of the code is executed.
 * 
 * its not like, when we run the program and time starts to count miliseconds. it will start counting only after the current call stack is empty. so if we have some code which is taking more time to execute, then the callback from setTimeout will be executed only after that code is executed and call stack is empty.
 */

function sum(a, b) {
    return a + b;
}

let result = sum(a, b);
console.log("The sum of a and b is: " + result);