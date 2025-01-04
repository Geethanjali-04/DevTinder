# authRouteHandler
post /signUp
post /login
post /logout

# profileRouteHandler
patch /profile/edit
get /profile/view
patch /profile/password

# connectionRequestRouteHandler
post request/send/:status/:userId  
post request/review/:status/:requestId

# userRouteHandler
get user/connections
get user/feed 
get user/requests
