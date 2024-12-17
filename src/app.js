const express = require("express");
const app = express();
const {userAuth} = require("./middlewares/auth.js");
const connectDb = require("./config/database.js");

connectDb().
then(()=> {
    console.log("DB connected successfully!!");
    app.listen(3000, () => {
    console.log("SERVER RUNNING !!!");
})})
.catch((err)=> console.log("error connecting to db"));