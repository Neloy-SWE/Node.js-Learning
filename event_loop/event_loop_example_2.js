import { readFile } from 'fs'; // run this code with ESM configuration
// const { readFile } = require('fs'); // run this code with commonjs configuration
console.log('Start');
const a = 100;

setImmediate(() => console.log('Immediate 1'));

Promise.resolve().then(() => console.log('Promise resolved'));

readFile('../file.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    } else {
        console.log('File read complete');
        console.log(data);
    }
});

setTimeout(() => console.log('Timeout 1'), 0);

process.nextTick(() => console.log('Next tick callback'));

function printA() {
    console.log('Value of a: ' + a);
}

printA();
console.log('End');

/**
 * in the above code, there are microtasks: promise and process.nextTick which have higher priority.
 * 
 * though event loop start checking process.nextTick queue before promise microtask queue, but in this code, promise is resolved before process.nextTick, because loading process of ESM is fundamentally asynchronous and handled internally as a promise-based operation and promise's callback in this code are added to the same microtask queue. so Node will execute the promise's callback first and then process.nextTick's callback.
 * 
 * but if we change the configuration from module to commonjs, then process.nextTick's callback will be executed before promise's callback.
 * 
 * after process of all synchronous code by call stack, when call stack is empty, event loop will check the microtask queue and push all the callbacks in microtask queue to call stack before moving to any phase. and after each callback execution from any queue (not microtask), event loop will check if the call stack is empty or not. if it is empty, it will check the microtask queue and if finds any callback, it will push all the callbacks in microtask queue to call stack before pushing any callback from any other queue to call stack or moving to any phase.
 */