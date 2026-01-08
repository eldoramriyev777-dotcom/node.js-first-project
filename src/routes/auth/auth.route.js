const express = require("express")
const { AuthController } = require("../../controller/auth/auth.controller")
const { AuthValidator } = require("../../validator/auth/auth.validator")
const { validate } = require("../../validator/index")
const { AuthMiddleware } = require("../../utils/auth.middleware")
const { RoleMiddleware } = require("../../utils/role.middleware")

const auth_router = express.Router()

// Router ga JSON parser qo‘shish
auth_router.use(express.json())

auth_router.get("/users", AuthController.getUser)
auth_router.post("/create", AuthValidator.create(), validate, AuthController.signUp)
auth_router.delete("/delete/:id", AuthController.deleteUser)
auth_router.post("/login", AuthController.signIn)
auth_router.put("/edit/:id", AuthController.editUser)
auth_router.get("/profile", AuthMiddleware.verifyToken, AuthController.me)
// auth_router.get("/profile", AuthMiddleware, AuthController.me)

module.exports= {
    auth_router
}