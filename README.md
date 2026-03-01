# Node.js-Learning

My personal Node.js learning repository - covering fundamentals to advanced concepts.

## Global object:
- For node, global object is known as "global", just like window in browser.
- logging "this" in node will be empty object.
- based on the community's decision there is one more property called "globalThis" is also the global object, which exist in every js engine.

## Module:
- whenever we create a separate module and import it using require() function, that module run (add console.log() statement to check), but its variables and functions are private to other modules. we cannot access it normally. we need to export properties to use those in other modules.
- we can import properties using object or destructuring. for destructuring, we must maintain the properties same name.
- we can use 2 kind of modules:
    - **CommonJS module (CJS)**: it was the original system for Node.js. for import/export we use require() function and module.exports. it is synchronous(blocking). requires bundling or transpiling (transpiling is the process of converting source code from one version of JavaScript (e.g., modern ES6+) into another version (e.g., older ES5) that can run in environments with limited or outdated support for the newer features). not natively supported. works in non-strict mode
    - **ES module (ESM, MJS)**: it is the modern, standardized system for both browsers and Node.js. we can use import and export keyword. asynchronous (non-blocking). native support in all modern browsers.<br>To use ES module we need to add extension in package.json. works in strict mode.
- When we use require(), Node.js internally wraps the entire module's code in a function before executing it. This wrapper function is essentially an IIFE (Immediately Invoked Function Expression) and provides several key benefits: 
    - Scope Isolation: Variables, functions, and objects declared within a module are scoped locally to that module, preventing them from polluting the global namespace.
    - Parameter Injection: The wrapper function is invoked with specific "global-like" variables as arguments, including exports, require, module, __filename, and __dirname. This is how these variables are made available within your module file.
    - IIFE syntax:
        ```
        (function () {
            console.log("This is an anonymous function");
        })();
        ```
    - The structure of the wrapper is similar to this:
        ```
        (function(exports, require, module, __filename, __dirname) {
            // Your module code goes here
            const myVar = "some value";
            module.exports = myVar;
        })(module.exports, require, module, __filename, __dirname);

        ```
- ESM use the import, export statements which are modern, standardized approach to modularity in JavaScript.
    - No IIFE Wrapper: ESM does not use an IIFE wrapper function for scope isolation. Instead, the module system is a built-in feature of the JavaScript language and runtime environments (browsers and Node.js).
    - Static Analysis: import statements are static, meaning they are processed at compile time, which enables tools to perform optimizations like "tree-shaking" (removing unused code).
    - Strict Mode by Default: ESM modules run in strict mode automatically.
- require() function perform:
    - resolve the module (check the file type)
    - load the file content
    - compile the code
    - wrap inside the IIFE
    - evaluation (execute the code and return the module.exports)
    - cache the module for reuse in other modules

## Synchronous & Asynchronous
- Synchronous programming executes the tasks in a predetermined order, where each operation waits for the previous one to complete before proceeding.
    - known as bloking or sequential programming.
- Asynchronous programming allows tasks to execute independently of one another, enabling concurrent execution and improved performance.
    - known as non-blocking programming.

## V8
V8 is Google’s open source high-performance JavaScript and WebAssembly engine, written in C++. It is used in Chrome and in Node.js, among others. It implements ECMAScript and WebAssembly, and runs on Windows, macOS, and Linux systems that use x64, IA-32, or ARM processors. V8 can be embedded into any C++ application.

## libuv
Libuv is a high-performance, open-source C library primarily designed for asynchronous, non-blocking I/O operations. Originally developed for Node.js, it acts as the backbone of its event-driven architecture, enabling efficient handling of network sockets, file systems, DNS resolution, and child processes across different platforms.

## Thread
A thread is the smallest unit of execution within a process in an operating system. It represents a single sequence of instructions that can be managed independently by a scheduler. Multiple threads can exist within a single process, sharing the same memory space but executing independently. This allows for parallel execution of tasks within a program, improving efficiency and responsiveness.<br>Threads can be either:
- signle-threaded
- multi-threaded

js is single-threaded. but with the power of node.js it can handle asynchronous operations, allowing js to perform multiple tasks concurrently.

## Call Stack
The call stack is a fundamental mechanism used by the JavaScript engine (V8) to keep track of the functions being executed in a program. It operates on a Last-In, First-Out (LIFO) principle.
- The JavaScript engine operates with a single call stack, and all the code you write is executed within this call stack. The engine runs on a single thread, meaning it can only perform one operation at a time.
- In addition to the call stack, the JavaScript engine also includes a memory heap. This memory heap stores all the variables, numbers, and functions that your code uses.