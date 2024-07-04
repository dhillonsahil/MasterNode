const {getUser}= require('../service/auth')


function checkForAuthentication(req,res,next){
    const tokenCookie = req.cookies?.token;
    req.user=null;
    if(!checkForAuthentication){
        return next();
    }
    const user = getUser(tokenCookie);
    req.user=user;
    next();
}

function restrictTo(roles){
    return function(req,res,next){
        if(!req.user){
            return res.redirect("/login")
        }

        if(!roles.includes(req.user.role)) return res.end("Unautorized");
        return next();
    }
}


module.exports = {
    checkForAuthentication,restrictTo
}