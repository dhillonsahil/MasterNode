const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET;

function createTokenForUser(user){
    const payLoad = {
        _id:user._id,
        email:user.email,
        profileImage:user.profileImageURL,
        role:user.role,
        fullName:user.fullName
    };

    const token=jwt.sign(payLoad,secret);
    return token;
}


function validateToken(token){
    const payload = jwt.verify(token,secret);
    return payload;
}


module.exports={
    validateToken,createTokenForUser
}