import { readFile } from 'fs';

console.log('Start');
const a = 100;

setImmediate(() => {
    console.log('setImmediate');
});

setTimeout(() => {
    console.log('setTimeout');
}, 0);

Promise.resolve().then(() => console.log('Promise resolved'));
Promise.resolve().then(() => {
    Promise.resolve().then(() => {
        console.log('Nested Promise resolved');
    }).then(() => {
        console.log('Another nested Promise resolved');
    });
    console.log('Promise resolved 2');
})

readFile('../file.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    } else {
        console.log('File read complete');
        console.log(data);
    }
});

process.nextTick(() => {
    process.nextTick(() => {
        console.log('Nested nextTick');
    });
    console.log('process.nextTick');
});

function printA() {
    console.log('Value of a: ' + a);
}

printA();

console.log('End');

/**
 * in the above code, we can see that when there are nested microtasks or more than one microtask, event loop make empty the queue of microtask's callbacks before moving to any other phase or next callback. but when it comes to phase's callback's execution, event loop check microtask queue after each callback execution from any queue (not microtask), and if finds any callback in microtask queue, it will make empty the microtask queue frist and then continue with the next callback from any other queue or move to any other phase.
 */