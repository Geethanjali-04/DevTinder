const express = require("express");
const app = express();

app.use("/test",(req,res)=>{
   console.log("server listening");
   res.send("test server listening");
})

app.use("/", (req,res)=>{
    res.send("home page");
})

app.use("/dev", (req,res)=>{
    res.send("dev server listening");
})
app.listen(3000, ()=>{
    console.log("SERVER RUNNING !!!");
})