const { Schema, model } = require ("mongoose")

const blogSchema = new Schema (
    {
        title: {
            type: String,
            required: true,
            enum: ["Tech", "Biologoy", "World", "Soccer", "Education"]
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            required: false,
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

const Blog = model("Blog", blogSchema, "blogs")

module.exports = {
    Blog
}