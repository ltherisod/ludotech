const express = require("express")
const cors = require("cors")

const passport = require("passport")
const fileupload = require("express-fileupload")
require("dotenv").config()
require("./config/passport")
require("./config/database")

const path = require("path")

const app = express()
const router = require("./routes/index")

app.use(cors())
app.use(express.json())
app.use(fileupload())
app.use(express.static("assets"))

app.use("/api", router)

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html")) // Probablemente tengamos que cambiar esto (?)
  })
}

app.listen(process.env.PORT, process.env.HOST || "0.0.0.0", () =>
  console.log(`Server listening on port ${process.env.PORT}`)
)
