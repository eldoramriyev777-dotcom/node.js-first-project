const { Blog } = require("../../model/blog/blog.model")
const {HttpException} = require("../../utils/http.exception")
const { StatusCodes, ReasonPhrases } = require("http-status-codes")
const path = require("path")
const { uploadFile } = require("../../utils/s3")

class BlogController {

    static getBlogs = async (req, res) => {
        const blogs = await Blog.find() 
        res.status(StatusCodes.OK).json({succes: true, data: blogs})
    };

    static postBlogs = async (req, res) => {
        const { title, content, author } = req.body
        console.log(req.file); // Uploaded file information
 
        const file = req.file
        if (!file) {
            throw new HttpException(
                StatusCodes.BAD_REQUEST, 
                ReasonPhrases.BAD_REQUEST, 
                "Image file is required!"
            );
        }

        const imgUrl = await uploadFile(
            file.buffer, 
            Date.now() + "-" + Math.round(Math.random() * 1E9) + "-" + path.extname(file.originalname)
        )

        await Blog.create({title, content, author, image: imgUrl});
        console.log("New post created!")
        
        res.json({
            message: "Blog has been posted!",
            succes: true,
            data: { title, content, author, image: imgUrl }
        })
    };

    static deleteBlog = async (req, res) => {
        const { id } = req.params
        const existingBlog = await Blog.findById(id)
        if(!existingBlog) {
          throw new HttpException(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, "Blog has not been found!")
        }
        await Blog.findByIdAndDelete(id)

        res.json({succes: true, message: `Blog number ${id} has been deleted`})
    };

    static updateBlog = async (req, res) => {
        const { id } =req.params
        const { title, content, author } = req.body
        const existingBlog = await Blog.findById(id)
        if(!existingBlog) {
            return res.status(StatusCodes.NOT_FOUND).json({statusMessage: ReasonPhrases.NOT_FOUND, message: "There is no blog with current id", succes: false})
        }
        await Blog.findByIdAndUpdate(id, {title, content, author})
        res.json({succes: true, message: `${id} number blog has been edited`})
    };

}

module.exports= {
    BlogController
}