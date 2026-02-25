// to run a js file in node js, use the command: node fileName.js

/**
 *  to import a module in node js, we use the require function. it is a built-in function in node js. it takes the path of the module as an argument and returns the exports of the module.
 */
// require("./example_module");

// import properties from the module:
// const exampleModuleObject = require("./example_module");

const { fileName, calculateSum } = require("./example_module"); // destructuring assignment

let myName = "Neloy";
console.log(myName);

// global object:
// console.log(global); // same as window in browser. but window is not available in node js. global is the global object in node js.
// console.log(this); // empty object
// console.log(window); //ReferenceError: window is not defined
// console.log(globalThis); // globalThis is the standard way to access the global object in any environment.

// console.log(globalThis === global); // true.

// using module properties via object:
// exampleModuleObject.calculateSum(10, 20);
// console.log(exampleModuleObject.fileName);

// using destructured properties:
calculateSum(30, 40);
console.log(fileName);