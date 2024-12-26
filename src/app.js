const express = require("express");
const app = express();
const {userAuth} = require("./middlewares/auth.js");
const connectDb = require("./config/database.js");
const {validateSignUpData} = require("./utils/validateSignUpData.js");
const argon2 = require("argon2");


// connecting mongoDb
connectDb().
then(()=> {
    console.log("DB connected successfully!!");
    app.listen(3000, () => {
    console.log("SERVER RUNNING !!!");
})})
.catch((err)=> console.log("error connecting to db"));

// require user model
const User = require("./models/user.js");

// middleware to accept json object from js object in req.body
app.use(express.json());

// sigup api
app.post("/sign-up", async (req, res) => {
    try {
    // validate the data
    validateSignUpData(req);
    // encrypt the password
    const { firstName, lastName, password, emailId } = req.body;
    const passwordHash = await argon2.hash(password);
    console.log(passwordHash);
    // create the instance
        const user = new User({ firstName: firstName,lastName: lastName, emailId: emailId, password: passwordHash });
        await user.save();
        res.send("user saved successfully");
    }
    catch(err) {
        res.send("user not saved successfully "+ err);
    }
})

// login api
app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({emailId: emailId});
        console.log(user);
        if (!user)
        {
            throw new Error("Invalid credentials!!");
        }
        const hashPassword = user.password;
        // verify password
        if (await argon2.verify(hashPassword, password)) {
            res.status(200).send("successfully logged in");
          } else {
            throw new Error("Invalid credentials!!");
          }
    }
    catch(err) {
        res.status(500).send("error"+ err);
    }
})

// get user by user email
app.get("/user", async (req, res)=>{
 try {
  const user = await User.find({emailId: req.body.emailId});
  if (user.length === 0){
    res.send("user not found");
  }
  else{
    res.send(user);
  }
}
 catch {
   res.status(400).send("something went wrong");
 }
})

//feed api - get all users
app.get("/feed", async (req,res)=>{
    try {
        const users = await User.find({});
        users.length === 0 ? res.send("users not found"): res.send(users);
    }
    catch {
        res.status(400).send("users not found");
    }
})

// update user
app.patch("/user/:userId",async (req,res)=>{
    const userId = req.params?.userId
    try {
        console.log("body"+ req.body);
        // data sanitization make user emailId and unnecessary fields gets added
        const ALLOWED_FIELDS = ["age", "skills", "about", "firstName", "lastName", "photoUrl", "password", "gender"];
        const isUpdateAllowed = Object.keys(req.body).every((key)=> ALLOWED_FIELDS.includes(key));
        if (!isUpdateAllowed)
        {
            throw new Error("this data contains inconsistent fields");
        }
        if(req.body?.skills?.length > 15)
        {
            throw new Error("Skills should be less than 15");
        }
        const user = await User.findOneAndUpdate({_id: userId}, req.body, {runValidators: true});
        if (!user){
            res.status(404).send("user not found");
        }
        else {
        res.send("user updated successfully");
        }
    }
    catch(err) {
        res.status(500).send("Error: "+ err.message);
    }
})

// delete user
app.delete("/user",async (req,res)=>{
    console.log(req.body.userId)
    if (!req.body.userId)
    {
        res.send("userid not present");
    }
    try {
        const user = await User.findByIdAndDelete(req.body.userId);
        if (!user){
            res.send("user not found");
        }
        else {
        res.send("user deleted successfully");
        }
    }
    catch {
        res.status(400).send("something went wrong");
    }
})