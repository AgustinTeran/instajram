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

var {Server} = require("socket.io")
var io = new Server(httpServer,{
    cors: "*"
})

// io.use((socket, next) => {
//     const user = socket.handshake.auth.id;
//     if (!user) {
//       return next(new Error("invalid username"));
//     }
//     socket.user = user;
//     next();
//   });

var manejadorDeSockets = require("../socket.io")
manejadorDeSockets(io)


module.exports = httpServer