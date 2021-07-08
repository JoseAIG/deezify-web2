const ModeloUsuario = require('../models/Usuario');
const ObjectId = require('mongoose').Types.ObjectId;

//GET /favoritos
//FUNCIONALIDAD PARA OBTENER LAS CANCIONES FAVORITAS DE UN USUARIO
const obtenerFavoritos = async (req, res) => {
    try {
        //OBTENER EL DOCUMENTO DEL USUARIO Y POPULARLO CON LAS CANCIONES EN FAVORITOS Y ESTAS CANCIONES CON SU ARTISTA Y ALBUM
        const documento_usuario = await ModeloUsuario.findOne({_id:ObjectId(req.session.objectid)})
        .populate({
            path: 'favoritos',
            populate: {path: 'artista album'}
        });
        res.status(200).json({favoritos:documento_usuario.favoritos, status:200});
    } catch (error) {
        res.status(500).json({resultado:"No se pudo obtener los favoritos", status:500});
    }
}

//POST /favoritos
//FUNCIONALIDAD PARA INCLUIR CANCIONES A LA LISTA DE FAVORITOS DE UN USUARIO
const agregarFavorito = async (req, res) => {
    try {
        //COMPROBAR SI LA CANCION SE ENCUENTRA YA EN LA LISTA DE FAVORITOS
        const documento_usuario = await ModeloUsuario.findOne({_id:ObjectId(req.session.objectid), favoritos:ObjectId(req.body.id_cancion)});
        if(documento_usuario){
            //DE EXISTIR LA CANCION EN FAVORITOS, NOTIFICARLE AL USUARIO
            res.status(400).json({resultado:"La cancion ya se encuentra en favoritos", status:400});
        }else{
            //DE NO EXISTIR LA CANCION EN FAVORITOS, AGREGAR SU ID AL ARREGLO DE FAVORITOS DEL USUARIO
            await ModeloUsuario.updateOne({_id:ObjectId(req.session.objectid)},{$push:{favoritos:ObjectId(req.body.id_cancion)}});
            res.status(200).json({resultado:"Cancion agregada a favoritos", status:200});
        }
    } catch (error) {
        res.status(500).json({resultado:"No se pudo agregar la cancion a favoritos", status:500});
    }
}

//DELETE /favoritos
//FUNCIONALIDAD PARA REMOVER CANCIONES DE LA LISTA DE FAVORITOS DE UN USUARIO
const removerFavorito = async (req, res) => {
    try {
        //ACTUALIZAR EL DOCUMENTO DEL USUARIO REMOVIENDO DE LA LISTA DE FAVORITOS LA CANCION CON EL ID DE LA PETICION
        await ModeloUsuario.updateOne({_id:ObjectId(req.session.objectid)},{$pull:{favoritos:ObjectId(req.body.id_cancion)}});
        res.status(200).json({resultado:"Cancion removida de favoritos", status:200});
    } catch (error) {
        res.status(500).json({resultado:"No se pudo remover la cancion de favoritos", status:500});
    }
}

module.exports = {
    obtenerFavoritos,
    agregarFavorito,
    removerFavorito
}