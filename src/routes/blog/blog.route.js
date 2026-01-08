const express = require("express")
const blog_router = express.Router()
const fs = require("fs")
const { BlogController } = require("../../controller/blog/blog.controller")
const { BlogValidator } = require("../../validator/blog/blog.validator")
const { validate } = require("../../validator/index")
const { AuthMiddleware } = require("../../utils/auth.middleware")
const { RoleMiddleware } = require("../../utils/role.middleware")
const { RoleConstants } = require("../../utils/constants")
const { multerMiddleware } = require("../../utils/multer.js")

// Router ga JSON parser qo‘shish
blog_router.use(express.json())

// JSON faylni o‘qish funksiyasi
function readData() {
    const data = fs.readFileSync("./data.json", "utf-8")
    return JSON.parse(data)
}

// JSON faylga yozish funksiyasi
function writeData(data) {
    fs.writeFileSync("./data.json", JSON.stringify(data, null, 2))
}

// GET: Oddiy kutib olish
blog_router.get("/get", BlogController.getBlogs)

// POST: Blog post qabul qilish
blog_router.post(
    "/post", 
    // BlogValidator.create(), 
    // validate, 
    AuthMiddleware.verifyToken, 
    RoleMiddleware([RoleConstants.ADMIN]), 
    multerMiddleware.single("image"),
    BlogController.postBlogs
)

// DELETE: Blogni o'chirish
blog_router.delete("/delete/:id", BlogController.deleteBlog)

// PUT: Blogni tahrirlash
blog_router.put("/put/:id", BlogController.updateBlog)

module.exports = { blog_router }
