
// install mongoose
// require the module
// create a schema ie structure of data
// create a model 
// export it 
// to use the model
// import the model and create a instance and save it
// add validations like required: true, unique: true
// add api validations
// for email u can even use (validator lib), prebuilt functions

const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");

// defining a schema of user
const userSchema = new mongoose.Schema({
"firstName":{
        type: String, 
        required: true,
        minLength: 4
    },
"lastName":{
    type: String
},
"age":{
    type: Number,
    min: 18
},
"gender":{
    type: String,
    validate(value)
    {
        if (!["female", "male", "others"].includes(value))
        {
            throw new Error("gender data is invalid");
        }
    } 
},
"emailId": {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    set: (email) => email.replace(/\s+/g, ''),
    validate(value)
    {
        if (!validator.isEmail(value))
        {
            throw new Error("email not valid!!");
        }
    }
}
,
"password": {
    type: String,
    required: true,
    validate(value)
    {
        if(!validator.isStrongPassword(value))
        {
            throw new Error("enter a strong password!");
        }
    }
},
"skills": {
    type: [String]
},
"about":{
    type: String,
    default: "this is a default about of the user"
},
"photoUrl":{
    type: "String",
    default: "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg",
    validate(value)
    {
        if (!validator.isURL(value))
        {
            throw new Error("URL not valid!!");
        }
    }
}}, {timestamps: true})

//  create a model
const User = mongoose.model('User', userSchema );
module.exports = User