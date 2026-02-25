# Node.js-Learning

My personal Node.js learning repository - covering fundamentals to advanced concepts.

## Global object:
- For node, global object is known as "global", just like window in browser.
- logging "this" in node will be empty object.
- based on the community's decision there is one more property called "globalThis" is also the global object, which exist in every js engine.

## Module:
- whenever we create a separate module and import it using require() function, that module run (add console.log() statement to check), but its variables and functions are private to other modules. we cannot access it normally. we need to export properties to use those in other modules.
- we can import properties using object or desdestructuring. for destructuring, we must maintain the properties same name.