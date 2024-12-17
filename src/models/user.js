
// install mongoose
// require the module
// create a schema ie structure of data
// create a model 
// export it 
// to use the model
// import the model and create a instance and save it


const mongoose = require("mongoose");

// defining a schema of user
const userSchema = new mongoose.Schema({
"firstName":{
        type: String
    },
"lastName":{
    type: String
},
"age":{
    type: Number
},
"gender":{
    type: String
},
"emailId": {
    type: String
}
,
"password": {
    type: String
}})

//  create a model
const User = mongoose.model('User', userSchema );
module.exports = User