const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth.js");
const {validatePassword} =  require("../utils/validateSignUpData.js");
const User = require('../models/user.js');
const argon2 = require('argon2');
// get profile by user id from cookies
profileRouter.get("/profile/view", userAuth, async (req,res)=>{
    try{
        const user = req.user;
        res.send(user);
    }catch(err)
    {
        res.status(400).send("error "+ err);
    }
})

// profile edit - autheticate, sanitize the data nd update the loggedInUser
profileRouter.patch("/profile/edit", userAuth, async (req,res)=>{
    try{
       const validEditFields = ["firstName", "lastName", "age", "gender", "about", "photoUrl", "skills", "emailId"];
       const isEditValid = Object.keys(req.body).every((field) => validEditFields.includes(field));
       if(!isEditValid)
       {
        throw new Error("Invalid Edit Request");
       }
       const loggedInUser = req.user;
       console.log(req.body);
       //console.log(loggedInUser);
       Object.keys(req.body).forEach((field) => loggedInUser[field] = req.body[field] );
       await loggedInUser.save();
       res.status(200).json({"message": "Profile Updated Successfully!!", "data": {loggedInUser} });

    }
    catch(err)
    {
        res.status(400).send("Error" + err.message);
    }
})

//profile edit password 
profileRouter.patch('/profile/password', async (req,res) => {
    try{
   const validEditFields = ["emailId", "password"];
   const isValidEditFields = Object.keys(req.body).every((field) => validEditFields.includes(field));
   if(!isValidEditFields)
   {
    throw new Error("Invalid Request!");
   }
   const user = await User.findOne({emailId: req.body.emailId });
   if (!user)
   {
    throw new Error("Invalid User!");
   }
   validatePassword(req);
   console.log("old pass"+ user.password);
   const passwordHash = await argon2.hash(req.body.password);
   console.log("new pass:" + passwordHash);
   user.password = passwordHash;
   await user.save();
   res.status(200).send("Password Updated Successfully!!");
} catch(err)
{
   res.status(400).send("error "+ err.message );
}
})


module.exports = profileRouter;