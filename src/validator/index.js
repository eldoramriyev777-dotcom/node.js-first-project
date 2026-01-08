const { validationResult } = require("express-validator")

const validate = (req, res, next) => {

    const errors = validationResult(req)

    if (errors.isEmpty()) {
        return next()
    } 

    let messages = ""
    
    errors.array().map((err) => {
        messages += err.msg + " ";
    })

    res.status(400).json({success: false, message: messages.trim()})
}

module.exports = {
    validate
}