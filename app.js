// to run a js file in node js, use the command: node fileName.js

let myName = "Neloy";
console.log(myName);

// global object:
console.log(global); // same as window in browser. but window is not available in node js. global is the global object in node js.
// console.log(this); // empty object
// console.log(window); //ReferenceError: window is not defined
console.log(globalThis); // globalThis is the standard way to access the global object in any environment.

console.log(globalThis === global); // true.