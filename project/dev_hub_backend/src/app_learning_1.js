import express from 'express';
import { userAuthMiddleware } from './middleware/auth.js';

const app = express();
/**
 * if we add "/" as path at the beginning and if we have other routes like "/test" then it will match the "/" route first and will execute the callback function for "/" route and will not execute the callback function for "/test" route.
 * 
 * like this if we have "/test" and if we add anything after "/test" like "/test/abc" then it will match the "/test" even if there are no routes defined for "/test/abc" and will execute the callback function for "/test" route.
 * 
 * so we should always add the specific routes first and then the general routes like "/" at the end to avoid this issue.
 * 
 * order of the route matter a lot
 * 
 */
// app.use("/",(req, res)=> {
// // we can call this callback is a Route handler function
//     res.send("Hello form the server!");
// });

// app.use("/test", (req, res) => {
//     res.send("This is a test route!");
// });

// app.use("/",(req, res)=> {
//     res.send("Hello form the server!");
// });

// app.use("/users", (req, res) => {
//     res.send("Hello form the user route!");
// });

// curd: (32:52)
// // get operation
// // app.get("/use{r}s", (request, response)=> { // here r is optional
// // app.get(["/users", "/u", "/ok"], (request, response)=> { // multiple paths for the same route
// app.get("/users/:userId/:password", (request, response)=> { // with parameters
// // app.get("/users", (request, response)=> {
//     // to read query parameters
//     // console.log(request.body);
//     console.log(request.params);
//     // console.log(request);
// response.send({firstName: "Neloy", level: "Boss"});
// });

// // post operation
// app.post("/users", (request, response) => {
//     response.send("User created successfully!");
// });

// // delete operation
// app.delete("/users", (request, response) => {
//     response.send("User deleted successfully!");
// });

/**
 * use() function is used to define a route handler for all the HTTP functions (GET, POST, PUT, DELETE, etc.). but get(), post(), put(), delete() functions are used to define a route handler for specific HTTP functions.
 */

app.use("/infinity", (req, res) => { }); // not returning any response will cause the request to hang and will not send any response to the client and will keep the connection open until it times out.

// multiple route handler
// we can also add all route handlers in an array like this: app.use("/multipleRouteHandler", [routeHandler1, routeHandler2, routeHandler3] or [routeHandler1, routeHandler2], routeHandler3 or routeHandler1, [routeHandler2], routeHandler3);
app.use("/multipleRouteHandlerExample-1", (req, res, next) => {
    console.log("LOG:: Route handler 1");
    // res.send("Route handler 1");
    /**
     * if we open the previous line then, then the first route handler will send a response to the client. 
     * 
     * as we know that js execute the code line by line, so after sending the response to the client, it will execute the next() function which will move to the next route handler and will execute the second route handler.
     * 
     * as we know that when client request something to the server, a socket connection is established between the client and the server and once the server sends a response to the client, the connection is closed. but here, next() function try to execute the second route handler and the second handler try to send a response and because the connection is already closed, it will throw an error: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client.
     * 
     * so we will not write code like this.
     */
    next();
    // console.log("LOG:: Route handler 1");
    // res.send("Route handler 1");
    /**
     * previous line also will be responsible for same error. but because it is after the next() function, second route handler will be executed, close the connection and then the first route handler will try to send a response and will throw the same error.
     */
}, (req, res, next) => {
    console.log("LOG:: Route handler 2");
    // res.send("Route handler 2");
    next();
    /**
     * now if we again use next(), then it will move to the next route handler and will execute the third route handler.
     * 
     * if there are no more route handlers then it will throw an error: Cannot GET /multipleRouteHandler. because there is no route handler to handle the request
     * 
     * if there are more route handlers but no response is sent, then it will keep the connection open until it times out.
     */
},
    (req, res, next) => {
        console.log("LOG:: Route handler 3");
        // res.send("Route handler 3");
        // next();
        res.send("Route handler 3");
        // if response is sent and no more route handler is there with sending response then it will not throw any error even if we call next(). but good to avoid it (logical).
    }
);
/**
 * though there are 2 route handlers but only the first one will be executed and the second one will not be executed because the first one is sending a response to the client and once a response is sent to the client then the connection is closed and no further route handlers will be executed.
 * 
 * also if we do not return anything from 1st route handler then the api call will run inifity until it times out.
 * 
 * there are one more parameter called "next" which is a function that we can call to move to the next route handler while not sending any response from the current route handler.
 */

// separating the route handlers brings no difference, but maintain the code order.
app.use("/multipleRouteHandlerExample-2", (req, res, next) => {
    console.log("LOG:: Route handler 1");
    next();
});

app.use("/multipleRouteHandlerExample-2", (req, res, next) => {
    console.log("LOG:: Route handler 2");
    res.send("Route handler 2");
    // next();
});

/**
 * when client request to a express server, server will check all the router one by one and try to find the matching route and execute. server execute the first matching route and if inside the route handler, next() function is called then it will move to the next matching route and execute that route handler.
 */
// app.use("/", (req, res, next)=> {
//     console.log("LOG:: Route handler for /");
//     res.send("Hello from the server!");
//     next();
// });

app.use("/multipleRouteHandlerExample-3", (req, res, next) => {
    console.log("LOG:: Route handler for /multipleRouteHandlerExample-3");
    // res.send("route handler for /multipleRouteHandlerExample-3");
    // next();
});

/**
 * middleware: it is a function that has access to the request and response objects and can modify them or perform some operations before sending the response to the client. it can also call the next() function to move to the next middleware or route handler.
 * 
 * here, all the callbacks of use or other request handler functions are middleware because they have access to the request and response objects and can modify them or perform some operations before sending the response to the client and callbacks that actually send a response to the client are called route handlers.
 * 
 * we can also call route handler as request handler.
 * 
 * there are one more function called app.all(). this function will execute for all the HTTP functions when the route is exactly matched like if we set app.all("/test", callback) then it will not execute for "/test/abc" but will execute for "/test" only. but if we want to talk about app.use() function then it will execute for all the HTTP functions when the route is matched like if we set app.use("/test", callback) then it will execute for both "/test" and "/test/abc".
 * 
 * app.all() function is used to define a route handler and app.use() function is used to define a middleware.
 */

// middleware example
app.use("/admin", (req, res, next) => {
    console.log("token checking...");
    const token = "exampleToken";
    // const token = "exampleToke"; // to check the unauthorized case
    if (token === "exampleToken") {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
});

app.get("/admin/dashboard", (req, res) => {
    res.send("Welcome to the admin dashboard!");
});

app.post("/admin/create-user", (req, res) => {
    res.send("User created successfully!");
});

app.delete("/admin/delete-user", (req, res) => {
    res.send("User deleted successfully!");
});

// let's create middleware in separate file and import it here
// app.use("/user", userAuthMiddleware);

// we can also avoid app.use and directly add the middleware to the route handler.
// app.get("/user/profile", (req, res) => {
app.get("/user/profile", userAuthMiddleware, (req, res) => {
    res.send("Welcome to the user profile!");
});

// if we do not define app.use(), then we can put middleware wherever we want.
app.get("/user/login", (req, res) => {
    // no need to add middleware, login api should be open.
    res.send("Welcome to the user login!");
});

/**
 * error handle: there are one more parameter in route handler callback at 1st position (if we put 2 parameters, it wiil be request and response, if 3, it will be request, response, next, if 4, it will be error, request, response, next).
 * 
 * before we use app.use() at beginning to use middleware. but to handle error, we need to use app.use() at the end. so that it will catch all the errors thrown from the route handlers and middlewares.
 * 
 */

app.get("/errorExample-1", (req, res) => {
    throw new Error("This is an example error!");
});

app.get("/errorExample-2", (req, res) => {
    throw new Error("This is another example error!");
});

app.use("/", (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.message);
    /**
     * this is not the good way to hanlde error. but because there are option like this. so we can see the uses.
     * 
     * the best way to hanlde error is to use try-catch.
     */
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});