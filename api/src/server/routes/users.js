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
           var {id} = req.user



            var perfil = await sequelize.models.users.findByPk(id,{
                include: [{model: sequelize.models.users, as: "sigueA", attributes: ["id","name"]}]
            })

            var seguidores = await sequelize.models.users.findAll({
                include: [{
                    model: sequelize.models.users,
                     as: "sigueA",
                    attributes: ["id","name"],
                    where: {
                        id
                    }
                    }],
               })

               perfil = {
                id: perfil.id,
                name: perfil.name,
                email: perfil.email,
                sigueA: perfil.sigueA.map(e => {
                    return ({
                        id: e.id,
                        name: e.name
                    })
                }),
                seguidoPor: seguidores.map(e => {
                    return ({
                        id: e.id,
                        name: e.name
                    })
                })
            }
    
            res.send(perfil)
    } 
     catch (error) {
        res.send(error.message)
    }
})

route.get("/:id",async(req,res) => {
    var {id} = req.params
    
    try {
        var perfil = await sequelize.models.users.findOne({
            where: {
                id
            },
            include: [{model: sequelize.models.users, as: "sigueA", attributes: ["id","name"]}]
        })
        
    
        var seguidores = await sequelize.models.users.findAll({
            include: [{
                model: sequelize.models.users,
                as: "sigueA",
                attributes: ["id","name"],
                where: {
                    id
                }
                }],
           })

        perfil = {
            id: perfil.id,
            name: perfil.name,
            email: perfil.email,
            sigueA: perfil.sigueA.map(e => {
                return ({
                    id: e.id,
                    name: e.name
                })
            }),
            seguidoPor: seguidores.map(e => {
                return ({
                    id: e.id,
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

        if(existe) throw new Error("Ya existe un usuario con ese nombre o email")
        
        var user = await sequelize.models.users.create({email,name,password})

        // Token
        var token = jwt.sign({email,name,id: user.id},TOKEN_SECRETO)

        res.send(token)
    } catch (error) {
        res.status(400).send({status: 400,message: error.message})
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

        if(!user)  throw new Error("usuario no encontrado")

        if(await bcrypt.compare(password,user.password)){
            var token = jwt.sign({email,name: user.name,id: user.id},TOKEN_SECRETO)

            res.send(token)
        }else{
            throw new Error("No coincide")
        }

    } catch (error) {
        res.status(401).send({message: error.message,status: 401})
    }
})

route.post("/follow",autenticacionToken,async(req,res) => {
    try {
        var {id,followId} = req.body

        var {id: tokenId} = req.user
        if(tokenId !== id) return res.status(401).send("No autorizado")


        var usuario = await sequelize.models.users.findByPk(id)

       await usuario.addSigueA(followId)
       res.send("SIGUIENDO")
    } catch (error) {
        res.send(error.message)
    }
})


route.delete("/unfollow",autenticacionToken,async(req,res) => {
    try {
        var {id,followId} = req.query

        var {id: tokenId} = req.user

        if(tokenId != id) return res.status(401).send("No autorizado")

        var usuario = await sequelize.models.users.findByPk(id)

       await usuario.removeSigueA(followId)
       res.send("Dejado de seguir")
    } catch (error) {
        res.send(error.message)
    }
})


module.exports = route