export const userAuthMiddleware = (req, res, next) => {
    console.log("User authentication middleware");
    // const token = "exampleUserToken";
    const token = "exampleUserToke"; // to check the unauthorized case
    if (token === "exampleUserToken") {
        next();
    } else {
        res.status(401).send("Unauthorized user!");
    }
};