const userAuth = (req,res,next) =>{
const isUserAuth = req.headers.token ==="welcome";
if (isUserAuth)
{
 next();
}
else{
    res.status(401).send("unauthorized");
}
}

module.exports = {userAuth};