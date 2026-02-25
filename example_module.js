// modules protect their variables and functions from leaking.

console.log("module file is running...");

let fileName = "example_module.js";

function calculateSum(a, b) {
    let sum = a + b;
    console.log(sum);
}

// export properties:
// module.exports.fileName = fileName;
// module.exports.calculateSum = calculateSum;

// another way to export properties:
// module.exports = {
//     fileName: fileName,
//     calculateSum: calculateSum,
// };
module.exports = { fileName, calculateSum };