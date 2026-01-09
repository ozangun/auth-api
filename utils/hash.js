const bcrypt = require('bcrypt');
const saltRounds = 12;
async function hash(password) {
   return await bcrypt.hash(password,saltRounds);
}

async function compare(password,hashedPassword) {
  return await bcrypt.compare(password,hashedPassword);
}

module.exports = {hash,compare};