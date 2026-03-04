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

setTimeout(() => console.log('Timeout 1'), 1000);

function printA() {
    console.log('Value of a: ' + a);
}

printA();

let i = 0;

while (i < 2000000000) {
    i++;
    if (i === 2000000000) {
        console.log('While loop complete');
    }
}
/**
 * this while loop will take some time to complete and during this time, all the callbacks will be ready in queue. as we know that event loop starts from timer phase and setTimeout is in timer phase, so after this while loop complete, we will be able to see the output of setTimeout's callback first and then setImmediate's callback.
 * 
 */

console.log('End');