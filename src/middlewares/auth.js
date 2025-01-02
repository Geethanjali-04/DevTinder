const User = require("../models/user.js");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
    try{
        const { token } = req.cookies;
        if (!token)
        {
            throw new Error("Token invalid!");
        }
        const _id = await jwt.verify(token, "Dev@Tinder@123");
        const user = await User.findById(_id);
        if (!user)
        {
            throw new Error("User not found!");
        }
        req.user = user;
        next();
    }
    catch(err)
    {
        res.status(404).send("Error" + err);
    }
}

module.exports = {userAuth};