const jwt = require('jsonwebtoken');
function createJwt(userId) {
   return jwt.sign({userId},process.env.SECRET_KEY,{expiresIn:'1h'})
}
function verifyJwt(token) {
    return jwt.verify(token,process.env.SECRET_KEY)
}
module.exports = {verifyJwt, createJwt};