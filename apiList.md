# authRouteHandler
post /signUp
post /login
post /logout

# profileRouteHandler
patch /profile/edit
get /profile/view
patch /profile/password

# connectionRequestRouteHandler
post request/send/interested/userId
post request/send/ignored/userId
post request/review/accepted/requestId
post request/review/rejected/requestId

# userRouteHandler
get user/connections
get user/feed 
get user/requests
