const validator = require("validator");
const validateSignUpData = (req)=> {
    const {emailId, password, firstName, lastName, skills} = req.body;
    console.log("skills:"+ skills);
    if(!firstName && !lastName)
    {
        throw new Error("Name is not valid!");
    }
    else if (!validator.isEmail(email))
    {
        throw new Error("Email is not valid!");
    }
    else if(!validator.isStrongPassword(password))
    {
        throw new Error("password is not strong");
    }
    else if (skills && skills !== undefined) {
        console.log("inside skills");
        if (!Array.isArray(skills)) {
            throw new Error("Skills should be an array!");
        }
        else if(skills.length > 10)
        {
            throw new Error("skills should be less than 10");
        }
    }
}

module.exports = {validateSignUpData};