const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validateSignUpData.js");
const argon2 = require("argon2");

// require user model
const User = require("../models/user.js");

// sigup api
authRouter.post("/sign-up", async (req, res) => {
    try {
    // validate the data
    validateSignUpData(req);
    // encrypt the password
    const { firstName, lastName, password, emailId } = req.body;
    const passwordHash = await argon2.hash(password);
    // create the instance
        const user = new User({ firstName: firstName,lastName: lastName, emailId: emailId, password: passwordHash });
        await user.save();
        res.send("user saved successfully");
    }
    catch(err) {
        res.status(400).send("user not saved successfully "+ err);
    }
})

// login api
authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({emailId: emailId});
        if (!user)
        {
            throw new Error("Invalid Credentials!!");
        }
        // verify password
        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){
        // generate jwt token and attach it to cookies
        const jwtToken =  user.generateToken();
        res.cookie("token", jwtToken,  {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expire in 7 days
        });
        res.status(200).send("successfully logged in");
        }
        else{
            throw new Error("Invalid Credentials");
        }
    }
    catch(err) {
        res.status(400).send("Error: "+ err.message);
    }
})

authRouter.post('/logout', (req,res) => {
    res.cookie("token", null, {expires: new Date(Date.now())});
    res.status(200).send("Logged Out Successfully !!");
})



module.exports = authRouter;