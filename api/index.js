require("pg")
var {sequelize} = require("./src/db/db")
var server = require("./src/server/server")
const fs = require("fs");


server.listen(3001,async() => {
    await sequelize.sync({alter: true})
    console.log("Listening on port 3001");

    // Crear un archivo para indicar que el servidor está listo
  fs.writeFileSync("server-ready", "OK");
})