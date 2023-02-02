var express = require("express")
var server = express()
var cors = require("cors")

var router = require("./routes/router")

server.use(express.json())
server.use(cors({
    origin: "https://instajram.vercel.app",
    credentials: true
}))
  

server.use("/",router)


module.exports = server