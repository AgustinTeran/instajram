require("dotenv").config()
const { Sequelize, Op } = require("sequelize");
var {DB_USER,DB_PASS,DB_HOST,DB_NAME} = process.env

var sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:5432/${DB_NAME}`,{logging: false})


var users = require("./models/users")

users(sequelize)

sequelize.models.users.belongsToMany(sequelize.models.users,{through: "followers",as: "sigueA"})



module.exports = {
    sequelize,
    ...sequelize.models,
    Op
}