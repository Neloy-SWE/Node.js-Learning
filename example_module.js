// modules protect their variables and functions from leaking.

console.log("module file is running...");

// export let fileName = "example_module.js";
const fileName = "example_module.js";

function print() {
    console.log("Hello from example module");
}

/**
 * to ensure that commonJs module is operate in non-strict mode or not:
 * change type in package.json to "commonjs".
 * change all import and export from ES module to commonJS module in this file and app.js.
 * uncomment the bellow line and run.
 * 
 * though there is no var, let or const keyword, it will not throw error because it is running in non-strict mode. but if we change the type to "module" in package.json, it will throw error because ES module operates in strict mode by default.
 */
// nonStrictVariable = 10;

// export properties:
// console.log(module.exports); // empty object.
// CommonJS export:
// module.exports.fileName = fileName;
// module.exports.print = print;

// another way to export properties:
// module.exports = {
//     fileName: fileName,
//     print: print,
// };
// module.exports = { fileName, print };

// ES module export:
export { fileName, print };