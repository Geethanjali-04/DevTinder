const express = require("express");
const app = express();

// match the get api
app.get("/user", (req,res)=>{
    res.send({"Name": "Jaggu", "age": 22});
})

// match the http post method
app.post("/user", (req,res)=>{
    res.send("user saved successfully");
})

// match the http put method
app.put("/user", (req,res)=>{
    res.send("Data updated successfully");
})

// match the http patch method
app.patch("/user", (req,res)=>{
    res.send("column updated successfully");
})

// match the http delete method
app.delete("/user", (req, res)=>{
    res.send("user deleted successfully");
})

// default which matches all the http methods
app.use("/user", (req, res)=>{
    res.send({"name":"geetha", age: 22});
})

app.listen(3000, ()=>{
    console.log("SERVER RUNNING !!!");
})