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
    cors: "*",
    
})

io.use((socket,next) => {
    var id = socket.handshake.query.id

    
    var socketsConectados = io.sockets.sockets;
    var usuariosConectados = Array.from(socketsConectados).map(e => ({id: e[0],userId: e[1].userId}))
    
    var usuariosDuplicados = usuariosConectados.filter(e => e.userId === id)
    if(usuariosDuplicados.length){

        usuariosDuplicados.forEach(e => {
            const targetSocket = io.sockets.sockets.get(e.id);
            socket.to(e.id).emit("duplicado")
            // primero le aviso que se abrio en otra ventana y despues de 2 segundos lo 
            // desconecto del servidor
            setTimeout(() => {targetSocket.disconnect()},2000)
        })
    }


    socket.userId = id

    next()
})
var manejadorDeSockets = require("../socket.io")
manejadorDeSockets(io)


server.get("/onlineUsers",(req,res) => {
    const socketsConectados = io.sockets.sockets;

  
  // Convierte la colección de sockets a un array de IDs
  const usuariosConectados = Array.from(socketsConectados).map(e => e[1].userId)

    res.send(usuariosConectados)
})


module.exports = httpServer