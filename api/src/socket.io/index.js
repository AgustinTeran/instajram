// var {Server} = require("socket.io")
// var io = new Server()
var arrayDeUsuariosOnLine = []


module.exports = (io) => { 
  io.on("connection",(socket) => {
    // Cuando se conecte un usuario

    var index = arrayDeUsuariosOnLine.findIndex(e => e.id === socket.handshake.query.id)
    if(index !== -1){
      socket.to(arrayDeUsuariosOnLine[index].socketId).emit("duplicado","Ya existe un ventana abierta")
      arrayDeUsuariosOnLine[index] = {id: socket.handshake.query.id, socketId: socket.id}
    }else{
      arrayDeUsuariosOnLine.push({id: socket.handshake.query.id,socketId: socket.id})
    }

    // Cuando se desconecte un usuario
    socket.on("disconnect",(algo) => {
      arrayDeUsuariosOnLine = arrayDeUsuariosOnLine.filter(e => e.socketId !== socket.id)
      console.log("se desc",JSON.stringify(arrayDeUsuariosOnLine));
    })

    console.log("cantidad de usuarios online: ",arrayDeUsuariosOnLine.length,JSON.stringify(arrayDeUsuariosOnLine));

    
    require("./handlers/message")(socket)
    
  })

}