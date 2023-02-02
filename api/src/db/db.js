require("dotenv").config()
const { Sequelize, Op } = require("sequelize");
var {DB_USER,DB_PASS,DB_HOST,DB_NAME,DB,HOST,USER_DB,PASSWORD} = process.env

// var sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:5432/${DB_NAME}`,{logging: false})

var sequelize = new Sequelize({
    database: `${DB}`,
    dialect: "postgres",
    host: `${HOST || "localhost"}`,
    port: "5432",
    username: `${USER_DB}`,
    password: `${PASSWORD}`,
    logging: false,
    pool: {
      max: 3
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      keepAlive: true,
    },
    ssl: true,
  })


var users = require("./models/users")

users(sequelize)

sequelize.models.users.belongsToMany(sequelize.models.users,{through: "followers",as: "sigueA"})



module.exports = {
    sequelize,
    ...sequelize.models,
    Op
}