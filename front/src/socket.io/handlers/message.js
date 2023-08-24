export default function messageHandler(socket){
  socket.on("message",(message) => {
    alert("Llego un mensaje",message)
  })
}