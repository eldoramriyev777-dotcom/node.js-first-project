const express = require("express")
const app = express()
const { PORT, NODE_ENV } = require("./utils/secret")
const { connectDB } = require("./utils/database.config.js")
const { errorMiddleware } = require("./utils/error.middleware.js")
const swaggerUi = require("swagger-ui-express")
const adminSwaggerDocument = require("./utils/admin.swagger.json")
const userSwaggerDocument = require("./utils/user.swagger.json")

void connectDB()

const {app_router} = require("./routes/index")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/public", express.static("public"))

app.use("/", app_router)

app.use(
    "/api-docs/admin", 
    swaggerUi.serveFiles(adminSwaggerDocument), 
    swaggerUi.setup(adminSwaggerDocument),
)

app.use(
    "/api-docs/user", 
    swaggerUi.serveFiles(userSwaggerDocument), 
    swaggerUi.setup(userSwaggerDocument),
)

app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} in ${NODE_ENV} mode`);
}) 
