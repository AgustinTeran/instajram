var express = require("express")
var server = express()
var cors = require("cors")

var router = require("./routes/router")

server.use(express.json())
server.use(cors({
    origin: "*",
    credentials: true
}))
  

server.use("/",router)


var httpServer = require("http").createServer(server)

// var {Server} = require("socket.io")
// var io = new Server(httpServer,{
//     cors: "*"
// })
// var manejadorDeSockets = require("../socket.io")
// manejadorDeSockets(io)


module.exports = httpServer