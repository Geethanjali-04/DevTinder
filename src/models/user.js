
// install mongoose
// require the module
// create a schema ie structure of data
// create a model 
// export it 
// to use the model
// import the model and create a instance and save it
// add validations like required: true, unique: true

const mongoose = require("mongoose");

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
    set: (email) => email.replace(/\s+/g, '')
}
,
"password": {
    type: String,
    required: true
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
    default: "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
}})

//  create a model
const User = mongoose.model('User', userSchema );
module.exports = User