const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const { HttpException } = require("./http.exception");


const RoleMiddleware = (allowedRoles) => (req, res, next) => {
    if(!allowedRoles.includes(req.user_role))  {
        throw new HttpException(
            StatusCodes.FORBIDDEN,
            ReasonPhrases.FORBIDDEN,
            "You do not have permission to access this resource."
        )
    }
    next()
}

module.exports = {
    RoleMiddleware
};