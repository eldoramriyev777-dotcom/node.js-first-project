const express = require("express")
const {blog_router} = require("./blog/blog.route")
const {auth_router} = require("./auth/auth.route")

const app_router = express.Router()

app_router.use("/blog", blog_router)
app_router.use("/auth", auth_router)

module.exports = { app_router }