const axios = require("axios")

const getBlogs = async () => {
    try {
        const response  = await axios.get("http://localhost:3000/blog/get")
        console.log("Blog data fetched successfully!");
        console.log(response.data)
    } catch (error) {
        console.error(
            "Error Fetching blogs: ",
            error.response ? error.response.data : error.message
        );    
    }
}

getBlogs()