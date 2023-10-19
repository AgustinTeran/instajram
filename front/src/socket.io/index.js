import io from "socket.io-client"
import messageHandler from "./handlers/message"





export function onConect(id){
  const socket = io("http://localhost:3001",{
    query: {
      id
    }
  })

  socket.connect()

  socket.on("duplicado",() => {
    console.log("AA");
    alert("Duplicado")
  })

  
  messageHandler(socket)

  return socket
}