const validator = require("validator");

const isValidEmail = (email) => {
    return validator.isEmail(email);
}

const isValidPassword = (password) => {
    return password.length >= 8;
}

module.exports = {
    isValidEmail,
    isValidPassword
}