var {sequelize} = require("../../db/db")

module.exports = (socket,io) => {
  socket.on("message",async(message,destinatario,emisor,emisorName) => {

    try {
     var chat = await sequelize.models.mensajes.create({mensaje: message,para: destinatario, userId: emisor})
    } catch (error) {
      console.log("Hubo un error",error);
    }

    socket.emit("messageSent",chat)

    var usuariosConectados = Array.from(io.sockets.sockets).map(e => ({id: e[1].id,userId: e[1].userId}));
    var destinatarioOnline = usuariosConectados.find(e => e.userId === destinatario)

    if(destinatarioOnline){
      socket.to(destinatarioOnline.id).emit("message",chat,emisor,emisorName)
    }
  })
}