const errorMiddleware = (err, req, res, next) => {
    res.status(err.status || 500).json({
        success: "false", 
        message: err.message || "Internal Server Error",
        statusMessage: err.statusMessage || "Internal Server Error"
    })
};

module.exports = {
    errorMiddleware
}