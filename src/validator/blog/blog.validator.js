const { body } = require("express-validator")

class BlogValidator {
    static create = () => [
    body("title", "Title is required").notEmpty(),
    body("title", "Title must be a string!").isString(),
    body("content", "Content must be a string").optional().isString(),
    body("author", "Author must be a string").isString()
    ]
    static delete = () => [

    ]
}   

module.exports = {
    BlogValidator
}