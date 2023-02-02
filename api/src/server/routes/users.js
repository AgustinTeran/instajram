var express = require("express")
var route = express.Router()
var {sequelize,users,Op} = require("../../db/db")

var jwt = require("jsonwebtoken")
var bcrypt = require("bcrypt")
var {TOKEN_SECRETO} = process.env
var autenticacionToken = require("../middlewares/autenticacion")


route.get("/",async(req,res) => {
    try{
        var {search} = req.query

        var users = await sequelize.models.users.findAll({
            where: {
                [Op.or]: [
                    {
                        name: {[Op.iLike] : `${search}%`}
                    },{
                        email: {[Op.iLike] : `${search}%`}
                    }
                ]
            }
        })
        res.send(users)
    }catch(e){
        res.send(e.message)
    }   
})

route.get("/perfil",autenticacionToken,async(req,res) => {
    try {

        var {name} = req.query

        if(name){
            var perfil = await sequelize.models.users.findOne({
                where: {
                    name
                },
                include: [{model: sequelize.models.users, as: "sigueA", attributes: ["name"]}]
            })
    
            var seguidores = await sequelize.models.users.findAll({
                include: [{
                    model: sequelize.models.users,
                    as: "sigueA",
                    attributes: ["name"],
                    where: {
                        name
                    }
                    }],
               })

        }else{
            var {name} = req.user


            var perfil = await sequelize.models.users.findByPk(name,{
                include: [{model: sequelize.models.users, as: "sigueA", attributes: ["name"]}]
            })

            var seguidores = await sequelize.models.users.findAll({
                include: [{
                    model: sequelize.models.users,
                     as: "sigueA",
                    attributes: ["email"],
                    where: {
                        name
                    }
                    }],
               })
        }

        perfil = {
            name: perfil.name,
            email: perfil.email,
            sigueA: perfil.sigueA.map(e => {
                return ({
                    name: e.name
                })
            }),
            seguidoPor: seguidores.map(e => {
                return ({
                    name: e.name
                })
            })
        }

        res.send(perfil)
    } catch (error) {
        res.send(error.message)
    }
})


route.post("/",async(req,res) => {
    try {
        var {email,name,password} = req.body

        var password = await bcrypt.hash(password,10)

        var existe = await sequelize.models.users.findOne({
            where: {
                [Op.or]: [
                {
                    name
                },{
                    email
                }
            ]
            }
        })

        if(existe) return res.send("")
        
        var user = await sequelize.models.users.create({email,name,password})

        // Token
        var token = jwt.sign({email,name},TOKEN_SECRETO)

        res.send(token)
    } catch (error) {
        res.send(error.message)
    }
})

route.post("/auth",async(req,res) => {
    try {
        var {email,password} = req.body
        var user = await sequelize.models.users.findOne({
            where: {
                email
            }
        })

        if(await bcrypt.compare(password,user.password)){
            var token = jwt.sign({email,name: user.name},TOKEN_SECRETO)

            res.send(token)
        }else{
            throw new Error("No coincide")
        }

    } catch (error) {
        res.status(401).send(error.message)
    }
})

route.post("/follow",autenticacionToken,async(req,res) => {
    try {
        var {name,followName} = req.body

        var {name: tokenName} = req.user
        if(tokenName !== name) return res.status(401).send("No autorizado")


        var usuario = await sequelize.models.users.findByPk(name)

       await usuario.addSigueA(followName)
       res.send("SIGUIENDO")
    } catch (error) {
        res.send(error.message)
    }
})


route.delete("/unfollow",autenticacionToken,async(req,res) => {
    try {
        var {name,followName} = req.query

        var {name: tokenName} = req.user

        if(tokenName != name) return res.status(401).send("No autorizado")

        var usuario = await sequelize.models.users.findByPk(name)

       await usuario.removeSigueA(followName)
       res.send("Dejado de seguir")
    } catch (error) {
        res.send(error.message)
    }
})


module.exports = route