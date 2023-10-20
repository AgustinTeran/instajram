import io from "socket.io-client"
import messageHandler from "./handlers/message"





export function onConect(id,setDuplicado){
  const socket = io("https://instajram-l8bb.vercel.app",{
    query: {
      id
    },
    transports: ['websocket','polling','flashsocket'],
    withCredentials: true
  })

  socket.connect()

  socket.on("duplicado",() => {
    setDuplicado(true)
  })

  
  messageHandler(socket)

  return socket
}