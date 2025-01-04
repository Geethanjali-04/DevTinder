const express = require('express');
const requestsRouter = express.Router();
const {userAuth} = require("../middlewares/auth.js");
const User = require('../models/user.js');
const ConnectionRequest = require('../models/connectionRequest.js');
const { connection } = require('mongoose');

// what happens when the sender is interested or ignore the profile
requestsRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res)=> {
    try{
        const status = req.params.status;
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const isStatusValid = ['interested', 'ignored'].includes(status);
        if (!isStatusValid)
        {
            return res.status(400).json({'message':'Invalid Status'});
        }
        const toUser = await User.findById(toUserId);
        if (!toUser)
        {
            return res.status(404).json({'message':"User not found!"});
        }
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [{fromUserId: fromUserId, toUserId: toUserId},{fromUserId: toUserId, toUserId: fromUserId}]
        })
        if (existingConnectionRequest)
        {
            return res.status(400).json({'message': "This connection request already exist"});
        }

        const connectionRequest = new ConnectionRequest({fromUserId: fromUserId, toUserId: toUserId, status: status});
        await connectionRequest.save();
        return res.status(200).json({'message': req.user.firstName + " is " + status + " in " + toUser.firstName});
        
    }catch(err){
        res.status(400).send("error:" + err.message);
    }
})

// what happens when the receiver accepted or rejected the api
requestsRouter.post('/request/review/:status/:requestId', userAuth, async (req, res) => {
    try{
    const {status, requestId} = req.params;
    const loggedInUserId =  req.user._id;
    // params status should only be accepted or rejected
    const allowedStatus = ['accepted', 'rejected'];
    console.log(requestId);
    if (!allowedStatus.includes(status))
    {
        return res.status(404).json({ message: "Status not allowed"});
    }
    // requestIds status should only be interested , we can accept or reject only if requestId is interested in loggedIn user
    const connectionRequest = await ConnectionRequest.findOne({status: "interested", fromUserId: requestId, toUserId: loggedInUserId});
    if(!connectionRequest)
    {
        return res.status(404).json({message: "Connection Request Not Found!!"});
    }
    connectionRequest.status = status;
    await connectionRequest.save();
    res.status(200).json({message: "connection request is "+ status, data: connectionRequest});
}
catch(err)
{
  return res.status(400).json({message: err.message});
}
})

module.exports = requestsRouter;