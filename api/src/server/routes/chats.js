var route = require("express").Router()
var {sequelize,Op} = require("../../db/db")
var autenticacionToken = require("../middlewares/autenticacion")

route.get("/",autenticacionToken,async(req,res) => {
    try {
        var {id} = req.user

       var chats = await sequelize.models.mensajes.findAll({
        where: {
            [Op.or]: [
                {userId: id},
                {para: id}
            ]
        },
        attributes: ["userId","para","leido","createdAt"],
        order: [["createdAt","DESC"]]
       })


    //    limpiamos los chats
       var obj = {}
       var arrayDeChats = []

        chats.forEach(e => {
        var persona = e.userId == id? e.para : e.userId
        if(!obj[persona]){
            obj[persona] = persona

            if(e.para == id){
                e.leido? arrayDeChats.push({usuario: persona, visto: true}) : arrayDeChats.push({usuario: persona, visto: false})
            }else{
                // si no es para mi el ultimo mensaje quiere decir que fui yo quien lo mande,
                // por lo que no puede estar pendiente a leer para mi
                arrayDeChats.push({usuario: persona, visto: true})
            }
        }
       })

       var chats = []
       for(obj of arrayDeChats){
        var usuario = obj.usuario

        var nombreDelOtro = await sequelize.models.users.findOne({
            where: {
                id: usuario
            },
            attributes: ["name"]
        })

        chats.push({...obj,name: nombreDelOtro.name})
       }

//Al final mando un array: [{usario: -idDelOtroUsuario-,visto: -boolean-,name:-nombreDelOtro-}]
       res.send(chats)
    } catch (error) {
        res.send(error)
    }
})

route.get("/chat",autenticacionToken,async(req,res) => {
    try {
        var {id: userId} = req.user
        //   el usuario logueado y el chat con un usuario determinado
        var {id} = req.query

        console.log(id,userId);

        var chats = await sequelize.models.mensajes.findAll({
            where: {
                [Op.or]: [
                    {userId, para: id},
                    {userId: id, para: userId},
                ]
            },
            order: [["createdAt","ASC"]]
        })
        
        res.send(chats)
    } catch (error) {
        res.send(error.message)
    }
})

route.post("/",autenticacionToken,async(req,res) => {
    try {
        var {id: user} = req.user
        var {mensaje, mensajeA} = req.body

        await sequelize.models.mensajes.create({mensaje,para: mensajeA, userName: user})
        res.send("ok")
    } catch (error) {
        res.send(error.message)
    }
})

route.post("/visto",autenticacionToken,async(req,res) => {
    try {
        var {id: userId} = req.user
        
        var {usuarioQEnvio} = req.body
        await sequelize.models.mensajes.update({leido: true},{
            where: {
                para: userId,
                userId: usuarioQEnvio
            }
        })
        res.send("visto")
    } catch (error) {
        res.send(error.message)
    }
})


module.exports = route