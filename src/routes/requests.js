const express = require('express');
const requestsRouter = express.Router();
const {userAuth} = require("../middlewares/auth.js");

// get connectionRequests
requestsRouter.get("/connectionRequests", userAuth, async (req,res)=> {
    try{
        const user = req.user;
        res.send(user.firstName + " send the connection request");
    }catch(err){
        res.status(400).send("error:" + err.message);
    }
})

module.exports = requestsRouter;