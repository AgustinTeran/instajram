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

io.use((socket,next) => {
    var id = socket.handshake.query.id

    
    const socketsConectados = io.sockets.sockets;
    const usuariosConectados = Array.from(socketsConectados.keys())
    
    if(usuariosConectados.includes(id)){
        socket.to(id).emit("duplicado")
    }


    socket.id = id

    next()
})
var manejadorDeSockets = require("../socket.io")
manejadorDeSockets(io)


server.get("/onlineUsers",(req,res) => {
    const socketsConectados = io.sockets.sockets;
  
  // Convierte la colección de sockets a un array de IDs
  const usuariosConectados = Array.from(socketsConectados.keys())

    res.send(usuariosConectados)
})


module.exports = httpServer