const express = require("express");
const app = express();
const connectDb = require("./config/database.js");
const cookieParser =  require("cookie-parser");
const authRouter = require('./routes/auth.js');
const requestsRouter = require('./routes/requests.js');
const profileRouter = require('./routes/profile.js');
const userRouter = require('./routes/user.js');

// middleware to accept json object as js object in req.body
app.use(express.json());

// middleware to get cookies from the request
app.use(cookieParser());

app.use('/', authRouter );
app.use('/', requestsRouter);
app.use('/', profileRouter);
app.use('/', userRouter);
// connecting mongoDb
connectDb().
then(()=> {
    console.log("DB connected successfully!!");
    app.listen(3000, () => {
    console.log("SERVER RUNNING !!!");
})})
.catch((err)=> console.log("error connecting to db"));