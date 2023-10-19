import io from "socket.io-client"
import messageHandler from "./handlers/message"





export function onConect(id){
  const socket = io("https://instajram-l8bb.vercel.app",{
    query: {
      id
    },
    withCredentials: true
  })

  socket.connect()

  
  socket.on("duplicado",(message) => {
    alert(message)
    // confirm("Ya esta abierto en otra pestaña")
  })
  
  messageHandler(socket)

  return socket
}