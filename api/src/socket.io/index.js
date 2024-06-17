// var {Server} = require("socket.io")
// var io = new Server()


module.exports = (io) => { 
  io.on("connection",(socket) => {

    require("./handlers/message")(socket,io)
    
  })

}