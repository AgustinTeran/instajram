var express = require("express")
var server = express()
var cors = require("cors")

var router = require("./routes/router")

server.use(express.json())
server.use(cors())
  

server.use("/",router)


module.exports = server