const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema({
    "fromUserId": { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    "toUserId": {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    "status":{
        type: String,
        enum: {
            values: ["interested", "ignored", "accepted", "rejected"],
            message: `{VALUE} is an incorrect status type` // Use {VALUE} to display the invalid value
        }
    }
}, {timestamps: true});

connectionRequestSchema.pre('save', function(next)
{
   if(this.toUserId.equals(this.fromUserId) )
   {
    throw new Error("User cannot send request to himself!!");
   }
   next();
})

connectionRequestSchema.index({'firstName': 1,'lastName': 1});
const ConnectionRequest = new mongoose.model('ConnectionRequest', connectionRequestSchema);
module.exports = ConnectionRequest;