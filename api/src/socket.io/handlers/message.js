var {sequelize} = require("../../db/db")

module.exports = (socket) => {
  socket.on("message",async(message,destinatario,emisor,emisorName) => {

    try {
     var chat = await sequelize.models.mensajes.create({mensaje: message,para: destinatario, userId: emisor})
    } catch (error) {
      console.log("Hubo un error",error);
    }

    socket.emit("messageSent",chat)
    socket.to(destinatario).emit("message",chat,emisor,emisorName)
  })
}