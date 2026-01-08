const { body } = require("express-validator")

class AuthValidator {
    static create = () => [
    body("email", "Email is required").notEmpty(),
    body("password", "Password must be a string!").isString(),
    body("username", "Username must be a string").optional().isString(),
    body("fullName", "Full name must be a string").optional().isString()
]
}   

module.exports = {
    AuthValidator
}