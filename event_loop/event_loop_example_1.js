import fs from 'fs';

console.log('Start');
const a = 100;

setImmediate(() => console.log('Immediate 1'));

fs.readFile('../file.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    } else {
        console.log('File read complete');
        console.log(data);
    }
});

setTimeout(() => console.log('Timeout 1'), 0);

function printA(){
    console.log('Value of a: ' + a);
}

printA();
console.log('End');

/**
 * in the above code, let's see the order of execution according to event loop:
 * all the synchronous code will be executed first.
 * as we know there are 4 phases in event loop: timers, poll, check and close (let's ignore process.nextTick and promise microtask queue for now).
 * all the asynchronous functions will be executed by background threads in libuv(we will dicuss about the background threads leter).
 * while executing the asynchronous functions and prepare callbacks, event loop will check if the main thread (call stack) is empty or not.
 * if the main thread is empty, event loop start from timer phase and place callbacks one by one to the main thread. before placing each callback, event loop will check if the main thread is empty or not. if it is not empty, it will wait until the main thread is empty and then place the callback to the main thread.
 * after make the timer queue empty, event loop will move to the poll phase and follow the same process.
 * after that event loop will move the check and close phase and follow the same process.
 * 
 * in this code's case, readFile() will complete after event loop move to the check phase. so the order of execution will be:
 * 1. Start
 * 2. Value of a: 100
 * 3. End
 * 4. Timeout 1
 * 5. Immediate 1
 * 6. File read complete
 * 7. data from file
 * 
 */