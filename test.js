import { readFile } from 'fs';

console.log('1. Script start');

// Timers
setTimeout(() => {
  console.log('2. setTimeout 1');

  process.nextTick(() => {
    console.log('3. nextTick inside setTimeout');
  });
  console.log('setTimeout 1 continued');
  Promise.resolve().then(() => {
    console.log('4. Promise inside setTimeout');
  });

}, 0);


setImmediate(() => {
  console.log('15. setImmediate 2');
});

setTimeout(() => {
  console.log('5. setTimeout 2');
  setImmediate(() => {
    console.log('16. setImmediate inside setTimeout 2');
  });
}, 0);

// Immediate
setImmediate(() => {
  console.log('6. setImmediate');

  setImmediate(() => {
    console.log('17. setImmediate inside setImmediate');
    process.nextTick(() => {
      console.log('19. nextTick inside setImmediate inside setImmediate');
    });
  });

  setImmediate(() => {
    console.log('18. another setImmediate inside setImmediate');
  });

  process.nextTick(() => {
    console.log('7. nextTick inside setImmediate');
  });

  Promise.resolve().then(() => {
    console.log('8. Promise inside setImmediate');
  });

});



// I/O (Poll phase)
readFile('./file.txt', 'utf8', (err, data) => {
  console.log('9. fs.readFile callback (Poll phase)', data);

  process.nextTick(() => {
    console.log('10. nextTick inside fs.readFile');
  });

  Promise.resolve().then(() => {
    console.log('11. Promise inside fs.readFile');
  });

});

// Top-level microtasks
process.nextTick(() => {
  console.log('12. top-level nextTick');
});

Promise.resolve().then(() => {
  console.log('13. top-level Promise');
});

console.log('14. Script end');