import { readFile } from 'fs';

console.log('Start');
const a = 100;

setImmediate(() => {
    console.log('setImmediate');
});

setTimeout(() => {
    console.log('setTimeout');
}, 0);

readFile('../file.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    } else {
        console.log('File read complete');
        console.log(data);
    }

    setTimeout(() => {
        console.log('setTimeout inside readFile callback');
    }, 0);

    process.nextTick(() => {
        console.log('process.nextTick inside readFile callback');
    });

    setImmediate(() => {
        console.log('setImmediate inside readFile callback');
    });
});

process.nextTick(() => {
    console.log('process.nextTick');
});

function printA() {
    console.log('Value of a: ' + a);
}

printA();

console.log('End');

/**
 * when there are no callbacks in any queue, event loop waits at poll phase.
 * 
 * when we run this code, we can see that setTimeout's callback is executed before setImmediate's callback.but when fileRead's callback is executed, setImmediate's callback is executed before setTimeout's callback.
 * 
 * fileRead takes some time to complete and according to the above code, there was no callback in any queue. as we know that when there are no callbacks in any queue, event loop waits at poll phase. check phase is after poll phase. that is why setImmediate's callback is executed before setTimeout's callback when fileRead's callback is executed.
 */