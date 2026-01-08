const { Schema, model } = require("mongoose")

const userSchema = new Schema (
    {
        email : {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password : {
            type: String,
            rquired: true,
            select: false,
        },

        username : {
            type: String,
            unique: true,
        },

        fullName: String,

        isVerified: {
            type: Boolean,
            default: false,
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        }
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "uptaded_at",
        },
        versionKey: false,
    }
)

const UserModel = model("User", userSchema, "users")

module.exports = {
    UserModel
}