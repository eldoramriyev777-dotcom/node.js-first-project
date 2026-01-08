const multer = require("multer")
const path = require("path")
const  {HttpException} = require("./http.exception")
const { StatusCodes, ReasonPhrases } = require("http-status-codes")

const multerMiddleware = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024}, // 5 MB limit
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx/
        const extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        )
        const mimetype = filetypes.test(file.mimetype)
        if (mimetype && extname) {
            return cb(null, true)
        } else { 
            cb(new HttpException(
                StatusCodes.UNSUPPORTED_MEDIA_TYPE, 
                ReasonPhrases.UNSUPPORTED_MEDIA_TYPE,
                'Error: File upload only supports the following filetypes - ' + filetypes,
            ))
        }
    }
})

module.exports = {
    multerMiddleware
}