const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
dotenv.config()

const port = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.wrzra5v.mongodb.net/InventoryManagement?retryWrites=true&w=majority`,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("connect to database.")
)
const userRoutes = require("./routes/userRoutes")

app.use("/user", userRoutes)
app.use("/upload", express.static("upload"))

const categoriesRoutes = require("./routes/categoriesRoutes")

app.use("/categories", categoriesRoutes)

const productRoutes = require("./routes/productRoutes")

app.use("/product", productRoutes)

const jwtRoutes = require("./routes/jwtRoutes")

app.use("/verifyuser", jwtRoutes)

app.listen(port, () => {
  console.log("Server PORT: ", port)
})
