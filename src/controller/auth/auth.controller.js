const { UserModel } = require("../../model/user/user.model")
const { StatusCodes, ReasonPhrases } = require("http-status-codes")
const { HttpException } = require("../../utils/http.exception")
const { asyncHandler } = require("../../utils/asyncHandler")
const { hash, compare, genSalt } = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../../utils/secret")

class AuthController {

    static getUser = async (req, res) => {
        const users = await UserModel.find() 
        res.status(200).json({succes: true, data: users})
    };

    static signUp = async (req, res) => {
        const { email, password, username, fullName, isVerified } = req.body
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            throw new HttpException(StatusCodes.CONFLICT, ReasonPhrases.CONFLICT, "User with this email already exists!")
        }

        const salt = await genSalt(10)
        const hashedPassword = await hash(password, salt)

        await UserModel.create({
            email,
            password: hashedPassword,
            username,
            fullName,
            isVerified
        })

        res.json({succes: true, message: "User has been created"})
    }

    static deleteUser = async (req, res) => {
        const { id } = req.params
        const existingUser = await UserModel.findById(id)
        if (!existingUser) {
            throw new HttpException(
                StatusCodes.NOT_FOUND, 
                ReasonPhrases.NOT_FOUND, 
                "User has not been found!"
            )
        }
        await UserModel.findByIdAndDelete(id)
        res.json({succes: true, message: `${id} number auth has been deleted`})
    }

    static editUser = asyncHandler(async (req, res, next) => {
        const { id } = req.params
        const { email, password, username, fullName, isVerified } = req.body
        const existingUser = await UserModel.findById(id)
        if (!existingUser) {
            throw new HttpException(
                StatusCodes.NOT_FOUND, 
                ReasonPhrases.NOT_FOUND, 
                "Auth info has not been found!"
            )
        }
        await UserModel.findByIdAndUpdate(id, {email, password, username, fullName, isVerified })
        res.json({succes: true, message: `${id} number auth has been successfully edited`})
    })

    static signIn = async (req, res, next) => {
        const { email, password } = req.body
        const existingUser = await UserModel.findOne({ email }).select("+password")
        if (!existingUser) {
            throw new HttpException(
                StatusCodes.UNAUTHORIZED, 
                ReasonPhrases.UNAUTHORIZED, 
                "Invalid email or password!"
            )
        }     
        const isPasswordValid = await compare(password, existingUser.password)
        if (!isPasswordValid) {
            throw new HttpException(  
                StatusCodes.UNAUTHORIZED,
                ReasonPhrases.UNAUTHORIZED,
                "Invalid email or password!")
        }

        const token = jwt.sign({userId: existingUser._id, role: existingUser.role}, JWT_SECRET, {
            expiresIn: "1h",
        })

        res.status(200).json({succes: true, message: "User successfully signed in", token })
    }

    static me = async (req, res, next) => {
        const userId = req.user_id
        const existingUser = await UserModel.findById(userId)
        if (!existingUser) {
            throw new HttpException(
                StatusCodes.NOT_FOUND, 
                ReasonPhrases.NOT_FOUND, 
                "User not found!"
            )
        }
        res.status(200).json({succes: true, data: existingUser})
    }
}

module.exports = {
    AuthController
}