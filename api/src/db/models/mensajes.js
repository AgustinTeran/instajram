var {DataTypes} = require("sequelize") 

module.exports = s => {
    s.define("mensajes",{
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        mensaje: {
            type: DataTypes.TEXT
        },
        leido: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        para: {
            type: DataTypes.UUID,
        }
    })
}