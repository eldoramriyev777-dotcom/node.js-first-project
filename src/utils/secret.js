const { config } = require('dotenv'); 

config()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
const NODE_ENV = process.env.NODE_ENV
const JWT_SECRET = process.env.JWT_SECRET
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_S3_BUCKET_FOLDER = process.env.AWS_S3_BUCKET_FOLDER
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
const AWS_REGION = process.env.AWS_REGION
const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME   

module.exports = {
    PORT,
    NODE_ENV,
    MONGO_URI,
    JWT_SECRET,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_S3_BUCKET_FOLDER,
    AWS_REGION,
    AWS_S3_BUCKET_NAME
};