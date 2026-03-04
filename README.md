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
    - Parameter Injection: The wrapper function is invoked with specific "global-like" variables as arguments, including exports, require, module, __filename, and __dirname. This is how these variables are made available within our module file.
    - IIFE syntax:
        ```
        (function () {
            console.log("This is an anonymous function");
        })();
        ```
    - The structure of the wrapper is similar to this:
        ```
        (function(exports, require, module, __filename, __dirname) {
            // module code goes here
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

## Thread
A thread is the smallest unit of execution within a process in an operating system. It represents a single sequence of instructions that can be managed independently by a scheduler. Multiple threads can exist within a single process, sharing the same memory space but executing independently. This allows for parallel execution of tasks within a program, improving efficiency and responsiveness.<br>Threads can be either:
- signle-threaded
- multi-threaded

js is single-threaded. but with the power of node.js it can handle asynchronous operations, allowing js to perform multiple tasks concurrently.

## V8
V8 is Google’s open source high-performance JavaScript and WebAssembly engine, written in C++. It is used in Chrome and in Node.js, among others. It implements ECMAScript and WebAssembly, and runs on Windows, macOS, and Linux systems that use x64, IA-32, or ARM processors. V8 can be embedded into any C++ application.

**Call stack**: The call stack is a fundamental mechanism used by the JavaScript engine (V8) to keep track of the functions being executed in a program. It operates on a Last-In, First-Out (LIFO) principle.
- The JavaScript engine operates with a single call stack, and all the code we write is executed within this call stack. The engine runs on a single thread, meaning it can only perform one operation at a time.
- In addition to the call stack, the JavaScript engine also includes a memory heap. This memory heap stores all the variables, numbers, and functions that our code uses.
- One key feature of the JavaScript V8 engine is its garbage collector. The garbage collector automatically identifies and removes variables that are no longer in use, freeing up memory.

The V8 engine follows a series of stages to execute JavaScript code, utilizing a **Just-In-Time (JIT)** compilation approach to balance fast startup times with high performance. The primary stages are:
- **Parsing**: The V8 engine first parses the source code into a data structure it can understand.
    - **Tokenization**: The code is broken down into smaller units called tokens (e.g., keywords, operators, variable names).
    - **Abstract Syntax Tree (AST)**: The tokens are used to build an AST, a hierarchical tree-like representation of the code's structure. V8 uses a pre-parser to quickly scan code and identify function boundaries for potentially non-immediate execution, saving initial parsing time.

*before explain the next stage, We need to know that node.js is both interpreted and compiled through a process called Just-In-Time (JIT) compilation. It is not purely interpreted or traditionally compiled ahead-of-time.*

- **Interpretation**: The AST is passed to the interpreter called **Ignition**, which generates and executes bytecode. Bytecode is a compact, low-level representation of the code that is more efficient than the raw source code. During interpretation, V8 collects profiling data (type feedback) to identify "hot" functions, which are functions executed frequently.<br> **Inline Caching (IC)** starts in the Ignition interpreter. As the interpreter runs code, it uses ICs to store "feedback" (e.g., object shapes/hidden classes) about accessed properties in a memory structure. When the same function runs again, V8 skips expensive lookups, using the cached location for property access.
- **Optimization/Compilation**: When the profiler identifies hot code, the **TurboFan** optimizing compiler takes the bytecode and type feedback to generate highly optimized machine code (native code). This machine code is specific to the underlying hardware and executes much faster than the bytecode.<br> **Copy Elision** occurs in the TurboFan optimizing compiler. While translating bytecode to machine code, TurboFan analyzes the usage of temporary objects. If an object is created and then immediately copied, TurboFan "elides" (eliminates) the copy operation to save memory and CPU cycles.
- **Execution**: The machine code is then executed directly by the computer's processor.
- **Deoptimization**: The TurboFan compiler makes assumptions during optimization based on the collected type feedback. If an assumption turns out to be incorrect during execution (e.g., a function suddenly receives a different type of argument than expected), V8 discards the optimized machine code and falls back to the Ignition interpreter to resume execution with the correct type handling.

Throughout this process, simultaneously the **Orinoco garbage collector** runs in separate threads to manage memory automatically, freeing up space no longer needed by the application. Orinoco garbage collector designed to reduce main-thread pauses ("jank") by using parallel, incremental, and concurrent techniques. It divides memory into young and old generations, employing a fast "Scavenger" for new objects and a "Mark-Sweep-Compact" algorithm for the old space to reclaim memory efficiently without stopping execution.

## Synchronous code execution
- Global Execution Context Creation.
- Memory Creation. register variables and functions to the memory. undefined to variables and entire function definition to function.
- code execution. during this step, when engine finds any function, engine creates function execution context and follow same process.
- after complete function execution, call stack pop it and after executing all, call stack finally pop the global execution context.

## libuv
Libuv is a high-performance, open-source C library primarily designed for asynchronous, non-blocking I/O operations. Originally developed for Node.js, it acts as the backbone of its event-driven architecture, enabling efficient handling of network sockets, file systems, DNS resolution, and child processes across different platforms.

## Asynchronous code execution
V8 execute synchonous operations line by line. but when it finds any async task, it passes the task to the libuv. OS level operations like file read, write, input, output, DB operations, network call, socket related task, timer, libuv can perform.<br> V8 engine perform all the sync task and passes async tasks to libuv and libuv complete the tasks and wait for when the call stack become free. once V8 engine complete all the async task and clear memory via garbage collector, pop global context and the call stack become free, libuv returns all the responses to the call stack via event loop.

## Event loop
event loop is a core mechanism that allows Node.js to perform non-blocking I/O operations despite using a single JavaScript thread. It is a continuous process, managed by the underlying libuv library, that orchestrates the execution of synchronous and asynchronous code by managing various queues of callback functions.<br>One Cycle of the event loop is known as **tick**.

event loop traverses several phases in a specific order during each iteration:
- **Timers phase**: This phase processes timers that have been set using setTimeout() and setInterval().
- **Pending callbacks**: This phase executes I/O-related callbacks that were deferred from the previous loop cycle. pending callbacks handle low-level system errors.
- **Idle/Prepare**: This phase in the Node.js event loop is an internal, low-level stage used exclusively by libuv for housekeeping and optimization before entering the Poll phase. It prepares the event loop to check for new I/O events, acting as a setup phase to ensure efficient handling of network connections and file system tasks.
- **Poll**: The Poll phase executes most of the tasks like- I/O, file reading, HTTP requests and much more.
- **Check**: Executes setImmediate() callbacks immediately after the poll phase finishes.
- **Close**: Handles cleanup tasks, such as closing a socket connection.

There are 2 special microtask queues in Node.js:
- nextTick queue managed by Node for process.nextTick callback.
- microtask queue handled by V8 for Promise callback.

They are not part of the event loop phases.

## Thread pool
The thread pool in Node.js is a collection of background worker threads managed by the libuv library that handles time-consuming or blocking operations, allowing the main, single-threaded event loop to remain non-blocking. in node.js, size of the thread pool is 4 by default. thread pool performs operations like:
- File System Operations: All fs module operations, except for fs.FSWatcher.
- DNS(Domain Name System) Lookups: Specifically dns.lookup(), as opposed to dns.resolve(), which uses native async mechanisms.
- Cryptography: Operations like crypto.pbkdf2() and crypto.scrypt().
- Compression: Zlib operations.

when all threads are blocked, operations waits for thread to be free.

There are also some operations handled by:
- OS kernel: Operations like network requests (using the net or http modules).

## Execution process
- When a Node.js program starts, V8 begins executing all synchronous JavaScript code on the main thread using the call stack.
- Every synchronous statement runs immediately and blocks the thread until it finishes. Nothing else can run while the call stack is busy.
- When asynchronous APIs are called (such as setTimeout, setImmediate, fs.readFile, crypto, or network operations), they are not executed immediately.
- These async APIs are implemented in Node’s C++ core layer. That layer communicates with libuv, which is the library responsible for the event loop, timers, thread pool, and OS-level I/O handling.
- When setTimeout or setInterval is called:
    - Node core registers a timer with libuv.
    - libuv stores the timer internally.
    - The callback will run later in the Timers phase when the delay has expired.
- When fs.readFile or certain crypto operations are called:
    - Node core delegates the work to libuv.
    - libuv sends the task to its internal thread pool.
    - When the thread finishes the task, the callback becomes ready for execution in the Poll phase.
- When network operations (TCP/HTTP) are performed:
    - libuv registers them with the operating system kernel.
    - The OS notifies libuv when data is ready.
    - The callback is then queued for execution in the Poll phase.
- setImmediate is registered by Node core to run later in the Check phase of the event loop.
- Promise callbacks (.then, await) are handled entirely by V8. They are placed into the microtask queue.
- process.nextTick callbacks are stored in a special nextTick queue managed by Node. This queue has higher priority than the Promise microtask queue.
- After the entire synchronous script finishes executing and the call stack becomes empty, Node performs a microtask checkpoint:
    - First, it executes all callbacks in the process.nextTick queue.
    - Then, it executes all callbacks in the Promise microtask queue.
    - Both queues are fully drained before moving forward.
- Once synchronous code and initial microtasks are completed, the event loop begins running.
- The event loop moves through its phases in this order:
    - Timers
    - Pending Callbacks
    - Idle/Prepare (internal, not accessible from JavaScript)
    - Poll
    - Check
    - Close Callbacks
- In the Timers phase, expired setTimeout and setInterval callbacks are executed.
- In the Pending Callbacks phase, certain system-level I/O callbacks that were deferred from the previous cycle are executed.
- The Idle and Prepare phases are used internally by libuv for housekeeping and preparing for the Poll phase. JavaScript code cannot run directly in these phases.
- In the Poll phase:
    - The event loop executes I/O callbacks such as file reads and network responses.
    - If no callbacks are ready, the event loop may wait here for new I/O events.
- In the Check phase, setImmediate callbacks are executed.
- In the Close Callbacks phase, close event handlers such as socket.on('close') are executed.
- Within each phase, the event loop processes one callback at a time.
- A callback (whether timer, I/O, immediate, or close) can only execute when the call stack is empty. JavaScript execution must finish before another callback begins.
- After executing each individual callback, Node performs another microtask checkpoint:
    - It drains the entire process.nextTick queue.
    - Then it drains the entire Promise microtask queue.
    - Only after both queues are empty does the event loop continue.
- This means microtasks do not wait for a full phase to complete. They run after every single callback execution.
- The event loop continues rotating through its phases as long as there are pending timers, I/O operations, or scheduled callbacks.
- If there are no more callbacks to process and no pending async operations, the program exits.

When we write only synchronous code then Node is single threaded and for asynchronous code it is multi-threded