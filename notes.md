1) Initialize project using npm init.
2) install express using npm i express.
3) package.json ( meta data abt the project , versions with ranges) and package-lock.json( to lock the exact version)
4) create model using mongoose.
5) add db level validations like minlength, maxlength, unique, and custom validate using validate (install validator)
6) create apis like sign-up ---> posting the user data after validating the user info like (check either of fname and lname i.e use helper functions) nd after encrypting the password
7) install argon library for password encryption
8) login api - validate password using argon lib, generate token using jsonwebtoken lib, hide user id and secret key in it , attach it to the cookies and send it back to the user.
9) other apis - validate the jwt token by getting the hidden info
