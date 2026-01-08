class HttpException extends Error{
    constructor(status, statusMessage, message) {
        super(message)
        this.statusMessage = statusMessage
        this.status = status
    }
}

module.exports = {
    HttpException
}