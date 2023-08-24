module.exports = (socket) => {
  socket.on("message",(message,destinatario) => {
    console.log("Llego un mensaje",message);
  })
}