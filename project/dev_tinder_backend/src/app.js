import express from 'express';

const app = express();

app.use("/test", (req, res) => {
    res.send("Hello from the server of Neloy!");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});