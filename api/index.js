var {sequelize} = require("./db/db")
var server = require("./server/server")
require("dotenv").config()

server.listen(3001,async() => {
    await sequelize.sync({alter:true})
    console.log("Listening on port 3001");
})