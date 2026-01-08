const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { HttpException } = require("./http.exception");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./secret");

const AuthMiddleware = {
    verifyToken: (req, res, next) => {
        const token = req.headers.authorization
        if(!token) {
            throw new HttpException(
               StatusCodes.UNAUTHORIZED,
                ReasonPhrases.UNAUTHORIZED,
                "No token provided!"
            )  
        }
        // Token verification logic would go here
        const parts = token.split(" ")
        if (parts.length !== 2 || parts[0] !== "Bearer") {
            throw new HttpException(
                StatusCodes.UNAUTHORIZED,
                ReasonPhrases.UNAUTHORIZED,
                "Invalid token format!"
            )
        }

        try {
            const decoded = jwt.verify(parts[1], JWT_SECRET)
            req.user_id = decoded.userId
            req.user_role = decoded.role         
        } catch (err) {
            throw new HttpException(
                StatusCodes.UNAUTHORIZED,
                ReasonPhrases.UNAUTHORIZED,
                err.message || "Invalid or expired token!"
            )
        }

        next()
    }
};

module.exports = {
    AuthMiddleware
};