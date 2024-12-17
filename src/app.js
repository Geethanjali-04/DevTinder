const express = require("express");
const app = express();
const {userAuth} = require("./middlewares/auth.js");
const connectDb = require("./config/database.js");


// connecting mongoDb
connectDb().
then(()=> {
    console.log("DB connected successfully!!");
    app.listen(3000, () => {
    console.log("SERVER RUNNING !!!");
})})
.catch((err)=> console.log("error connecting to db"));

// require user model
const User = require("./models/user.js");

// middleware to accept json object in js object in req.body
app.use(express.json());

// sigup api
app.post("/sign-up", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send("user saved successfully");
    }
    catch(err) {
        res.send("user not saved successfully "+ err);
    }
})
