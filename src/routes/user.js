const express = require('express');
const userRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');
const SAFE_USER_DATA = 'firstName lastName skills about photoUrl age gender';
// get user's requests
//user/requests/received
userRouter.get('/user/requests/received', userAuth, async (req, res) => {
    try{
        const loggedInUserId = req.user._id;
        const connectionRequests = await ConnectionRequest.find({toUserId: loggedInUserId, status: 'interested'}).populate('fromUserId',SAFE_USER_DATA);
        console.log(connectionRequests);
        if(!connectionRequests || connectionRequests.length === 0)
        {
            return res.status(404).json({message: "No Connection Requests Found"});
        }
        return res.status(200).json({message: "Connection Requests Found", data: connectionRequests});
    }catch(err)
    {
       return res.status(400).json({"message": err.message});
    }

})

// user's get connections api
userRouter.get('/user/connections', userAuth, async (req, res)=>{
    try{
        const loggedInUserId = req.user._id;
        const connectionsAccepted = await ConnectionRequest.find({
            $or: [{toUserId: loggedInUserId, status: 'accepted'},
                {fromUserId: loggedInUserId, status: 'accepted'}
            ]})
            .populate('fromUserId', SAFE_USER_DATA)
            .populate('toUserId', SAFE_USER_DATA);
        const connections = connectionsAccepted.map((row)=> { 
                if(row.fromUserId._id.toString() === loggedInUserId.toString())
                {
                    return row.toUserId;
                }
                return row.fromUserId;         
            })
        if (!connectionsAccepted )
        {
            return res.status(404).json({message: "There are no connections yet"});
        }
        return res.status(200).json({ message: 'connections found!', data: connections })
    }catch(err)
    {
        res.status(200).json({message: err.message});
    }
})

// feed
userRouter.get('/user/feed', userAuth, async (req, res)=>{
    try{
        const page = req.query.page || 1;
        let limit = req.query.limit || 10;
        limit = limit > 50 ? 50: limit;
        const skip = (page-1) * limit;
        const loggedInUserId = req.user._id;
        const connectionRequests = await ConnectionRequest.find({ $or:[{fromUserId:loggedInUserId}, {toUserId: loggedInUserId}]}).select("fromUserId toUserId");
        //67795356620e06e41d087288
        console.log(connectionRequests);
        const uniqueHideUserIds = new Set();
        connectionRequests.forEach((req)=>{
            uniqueHideUserIds.add(req.fromUserId.toString());
            uniqueHideUserIds.add(req.toUserId.toString());
        })
        
        const feedUsers = await User.find( {$and: [
            { _id: { $nin: Array.from(uniqueHideUserIds) }},
            { _id: { $ne: loggedInUserId }}
        ]}).select(SAFE_USER_DATA).skip(skip).limit(limit);
        return res.status(200).json({message: "feed fetched successfully", data: feedUsers });
    }
    catch(err)
    {
        return res.status(400).json({ message: err.message});
    }
})


module.exports = userRouter;