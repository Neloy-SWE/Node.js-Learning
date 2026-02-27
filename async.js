import fs from 'fs';
import https from 'https';

console.log("Hello JS");

let a = 10;
let b = 20;

https.get("https://jsonplaceholder.typicode.com/todos/1", (res) => {
    let data = "";

    res.on("data", (chunk) => {
        data += chunk;
    });
    res.on("end", () => {
        console.log("Data received from API: ", data);
    });
});

setTimeout(() => {
    console.log("This is a message from setTimeout function");
}, 3000);

fs.readFile("./file.txt", "utf-8", (err, data) => {
    if (err) {
        console.log("Error reading file: ", err);
    } else {
        console.log("Data read from file: ", data);
    }
    // console.log("file read done");
});

// fs.readFileSync("./file.txt", "utf-8");
/**
 * this is a synchronous function.
 * but V8 engine will pass it to libuv library to execute it and still it will block the main thread until it gets the result. so it is not recommended to use if there are no requirement like load the file frist and then do other operations.
 */
// console.log("After calling readFileSync function");

function sum(a, b) {
    return a + b;
}

let result = sum(a, b);
console.log("The sum of a and b is: " + result);

/**
 * here https.get, setTimeout and fs.readFile are asynchronous functions, are executed by libuv library.
 * rest of the code executed by V8 engine.
 */