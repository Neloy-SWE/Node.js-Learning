import express, { response } from 'express';

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

// get operation
// app.get("/use{r}s", (request, response)=> { // here r is optional
// app.get(["/users", "/u", "/ok"], (request, response)=> { // multiple paths for the same route
app.get("/users/:userId/:password", (request, response)=> { // with parameters
// app.get("/users", (request, response)=> {
    // to read query parameters
    // console.log(request.body);
    console.log(request.params);
    // console.log(request);
response.send({firstName: "Neloy", level: "Boss"});
});

// post operation
app.post("/users", (request, response) => {
    response.send("User created successfully!");
});

// delete operation
app.delete("/users", (request, response) => {
    response.send("User deleted successfully!");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});