const express = require("express");
const app = express();
const {userAuth} = require("./middlewares/auth.js");

// match the get api
// handling routes using query params

app.use("/user", userAuth)

app.get("/user", (req,res)=>{
    console.log(req.query);
    res.send({"Name": "Jaggu", "age": 22});
})

// handling routes using req params 
app.get("/user/:id/:password", (req,res,next)=>{
    console.log(req.params);
    // res.send({"Name": "devs", "age": 22}); this gives error (req cannot send)
    next();
}, (req, res)=>{ 
    res.send({"response": 2});
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