require("pg")
var {sequelize} = require("./src/db/db")
var server = require("./src/server/server")


server.listen(3001,async() => {
    await sequelize.sync({alter: true})
    console.log("Listening on port 3001");
})