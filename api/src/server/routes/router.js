var express = require("express")
var router = express.Router()

var users = require("./users")
router.use("/users",users)


var chats = require("./chats")
router.use("/chats",chats)

module.exports = router