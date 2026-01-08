const { DeleteObjectCommand, HeadObjectCommand, S3Client } = require("@aws-sdk/client-s3")
const { Upload } = require("@aws-sdk/lib-storage")

const {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_S3_BUCKET_FOLDER,
    AWS_REGION,
    AWS_S3_BUCKET_NAME,
    NODE_ENV,
    } = require("./secret")

const s3Client = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    }
})

const bucket_folder = NODE_ENV === "production" ? AWS_S3_BUCKET_FOLDER : `dev-${AWS_S3_BUCKET_FOLDER}`

const uploadFile = async (buffer, key) => {
   try { 
    const upload = new Upload({
        client: s3Client,
        params: {
            Bucket: AWS_S3_BUCKET_NAME,
            Key: `${bucket_folder}/${key}`,
            Body: buffer,
        }
    })

    const data =  await upload.done()
    if (data.$metadata.httpStatusCode === 200) {
        return data.Location
    }

    } catch (error) {   
        console.error("Error uploading file to S3:", error)
        throw error
    }
}

const deleteFile = async (key) => {
    try {
        const command = new DeleteObjectCommand({
            Bucket: AWS_S3_BUCKET_NAME,
            Key: `${bucket_folder}/${key}`,
        });

        const data = await s3Client.send(command);

        // $metadata.httpStatusCode = 204 bo'lsa muvaffaqiyatli o'chirilgan
        if (data.$metadata.httpStatusCode === 204) {
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error deleting file from S3:", error);
        throw error;
    }
};

const checkFileExists = async (key) => {
    try {
        const command = new HeadObjectCommand({
            Bucket: AWS_S3_BUCKET_NAME,
            Key: `${bucket_folder}/${key}`,
        });

        await s3Client.send(command);
        return true; // Fayl topildi
    } catch (error) {
        if (error.name === "NotFound") {
            return false; // Fayl topilmadi
        }
        console.error("Error checking file in S3:", error);
        throw error;
    }
};

module.exports = {
    uploadFile,
    deleteFile,
    checkFileExists,
};
