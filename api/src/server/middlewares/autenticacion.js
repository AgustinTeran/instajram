var jwt = require("jsonwebtoken")
var {TOKEN_SECRETO} = process.env

module.exports = (req,res,next) => {
    var token = req.header("token")

    try {
        var verify = jwt.verify(token,TOKEN_SECRETO)
        req.user = verify
        // console.log(verify);
        next()
    } catch (error) {
        res.status(401).send("No autorizado")
    }
}