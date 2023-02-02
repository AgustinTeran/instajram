const { DataTypes } = require("sequelize");

module.exports = (s) => {
    s.define("users",{
        name: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        }
    },{timestamps: false})
}