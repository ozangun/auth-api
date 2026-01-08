const bcrypt = require('bcrypt');
const saltRounds = 12;
async function hash(password) {
   return await bcrypt.hash(password,saltRounds);
}

module.exports = hash;