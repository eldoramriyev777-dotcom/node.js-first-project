const express = require("express")
const blog_router = express.Router()

blog_router.get("/get", (req, res) => {
    res.send("Welcome to the Blog!")
})

module.exports = { blog_router }