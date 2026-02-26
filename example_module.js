// modules protect their variables and functions from leaking.

console.log("module file is running...");

// export let fileName = "example_module.js";
const fileName = "example_module.js";

function print() {
    console.log("Hello from example module");
}

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