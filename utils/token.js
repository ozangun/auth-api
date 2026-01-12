const crypto = require('crypto');
function createToken() {
   const token = crypto.randomBytes(32).toString('hex');
   return token;
}

module.exports = createToken;
