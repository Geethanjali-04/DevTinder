const express = require('express');
const userRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');

// get user's requests
//user/requests/received
userRouter.get('/user/requests/received', userAuth, async (req, res) => {
    try{
        const loggedInUserId = req.user._id;
        const connectionRequests = await ConnectionRequest.find({toUserId: loggedInUserId, status: 'interested'}).populate('fromUserId', "firstName lastName photoUrl age gender about skills");
        if(!connectionRequests)
        {
            return res.status(404).json({message: "No Connection Requests Found"});
        }
        return res.status(200).json({message: "Connection Requests Found", data: connectionRequests});
    }catch(err)
    {
       return res.status(400).json({"message": err.message});
    }

})


module.exports = userRouter;