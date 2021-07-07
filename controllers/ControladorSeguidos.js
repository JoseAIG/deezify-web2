const ModeloUsuario = require('../models/Usuario');
const ModeloListas = require('../models/Lista');
const ObjectId = require('mongoose').Types.ObjectId; 

//GET /seguidos
//OBTENER LOS ELEMENTOS QUE SIGUE UN USUARIO 
const obtenerSeguidos = async (req, res) => {
    try {
        const documento_usuario = await ModeloUsuario.findOne({_id:req.session.objectid})
        .populate({
            path: "listas",
            populate:{
                path: "canciones",
                populate: {
                    path: "artista album"
                }
            }
        })
        .populate({
            path: "artistas_seguidos",
            populate:{
                path:"albumes",
                populate:{
                    path: "canciones",
                    populate:{
                        path: "artista album"
                    }
                }
            }
        })
        .populate({
            path: "albumes_seguidos",
            populate:{
                path:"artista canciones",
                populate:{
                    path:"artista album"
                }
            }
        })

        res.status(200).json({status: 200, id_usuario:documento_usuario._id, tipo:req.session.tipo, listas:documento_usuario.listas, artistas_seguidos:documento_usuario.artistas_seguidos, albumes_seguidos:documento_usuario.albumes_seguidos});
    } catch (error) {
        res.status(500).json({resultado:"No se pudieron obtener los elementos seguidos", status:500});
    }
}

//POST /seguidos
//INCLUIR LISTAS DE REPRODUCCION AL ARREGLO DE LISTAS DE UN USUARIO CUANDO SE SELECCIONA SEGUIR
const seguirElemento = async (req, res) => {
    try {
        //OBTENER EL ELEMENTO DE LA PETICION (LISTA, ARTISTA, ALBUM)
        let elemento = req.body.elemento;
        //SI EL ELEMENTO A SEGUIR ES UNA LISTA
        if(elemento=="lista"){
            //COMPROBAR SI EL USUARIO YA SIGUE LA LISTA DE REPRODUCCION PARA NO AGREGAR NUEVAMENTE EL REGISTRO EN LA BASE DE DATOS
            const documento_usuario = await ModeloUsuario.findOne({_id:ObjectId(req.session.objectid), listas:(req.body.id_lista)});
            if(documento_usuario){
                res.status(422).json({resultado:"Ya sigues esta lista", status:422});
            }else{
                await ModeloUsuario.updateOne({_id:ObjectId(req.session.objectid)},{$push:{listas:ObjectId(req.body.id_lista)}});
                res.status(200).json({resultado:"Ahora sigues esta lista", status:200});
            }  
        }
        //SI EL ELEMENTO A SEGUIR ES UN ARTISTA
        else if(elemento=="artista"){
            //COMPROBAR SI EL USUARIO YA SIGUE AL ARTISTA PARA NO AGREGAR NUEVAMENTE EL REGISTRO EN LA BASE DE DATOS
            const documento_usuario = await ModeloUsuario.findOne({_id:ObjectId(req.session.objectid), artistas_seguidos:(req.body.id_artista)});
            if(documento_usuario){
                res.status(422).json({resultado:"Ya sigues a este artista", status:422});
            }else{
                await ModeloUsuario.updateOne({_id:ObjectId(req.session.objectid)},{$push:{artistas_seguidos:ObjectId(req.body.id_artista)}});
                res.status(200).json({resultado:"Ahora sigues este artista", status:200});
            }
        }
        //SI EL ELEMENTO A SEGUIR ES UN ALBUM
        else if(elemento=="album"){
            const documento_usuario = await ModeloUsuario.findOne({_id:ObjectId(req.session.objectid), albumes_seguidos:(req.body.id_album)});
            if(documento_usuario){
                res.status(422).json({resultado:"Ya sigues este album", status:422});
            }else{
                await ModeloUsuario.updateOne({_id:ObjectId(req.session.objectid)},{$push:{albumes_seguidos:ObjectId(req.body.id_album)}});
                res.status(200).json({resultado:"Ahora sigues este album", status:200});
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({resultado:"No se pudo seguir el elemento", status:500});
    }
}

//DELETE /seguidos
//REMOVER LISTA DE REPRODUCCION DEL ARREGLO DE LISTAS DE UN USUARIO CUANDO SE SELECCIONA DEJAR DE SEGUIR
const dejarDeSeguirElemento = async (req, res) => {
    try {
        console.log(req.body);
        let elemento = req.body.elemento;
        if(elemento=="lista"){
            await ModeloUsuario.updateOne({_id:ObjectId(req.session.objectid)},{$pull:{listas:ObjectId(req.body.id_lista)}});
            res.status(200).json({resultado:"Has dejado de seguir esta lista", status:200});
        }
        else if(elemento=="artista"){
            await ModeloUsuario.updateOne({_id:ObjectId(req.session.objectid)},{$pull:{artistas_seguidos:ObjectId(req.body.id_artista)}});
            res.status(200).json({resultado:"Has dejado de seguir este artista", status:200});
        }
        else if(elemento=="album"){
            await ModeloUsuario.updateOne({_id:ObjectId(req.session.objectid)},{$pull:{albumes_seguidos:ObjectId(req.body.id_album)}});
            res.status(200).json({resultado:"Has dejado de seguir este album", status:200});
        }
    } catch (error) {
        res.status(500).json({resultado:"No se pudo dejar de seguir el elemento", status:500});
    }
}

module.exports = {
    obtenerSeguidos,
    seguirElemento,
    dejarDeSeguirElemento
}