const express = require("express")
const {blog_router} = require("./blog/blog.route")

const app_router = express.Router()

app_router.use("/blog", blog_router)

module.exports = { app_router }