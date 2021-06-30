const ModeloUsuario = require('../models/Usuario');
const ModeloCancion = require('../models/Cancion');
const ObjectId = require('mongoose').Types.ObjectId;

//GET /favoritos
//FUNCIONALIDAD PARA OBTENER LAS CANCIONES FAVORITAS DE UN USUARIO
const obtenerFavoritos = async (req, res) => {
    console.log("Obtener favoritos");
    try {
        // const documento_usuario = await ModeloUsuario.findOne({_id:ObjectId(req.session.objectid)});
        // //console.log(documento_usuario);
        // const documentos_favoritos = await ModeloCancion.find({_id:{$in:documento_usuario.favoritos}});
        // //console.log(documentos_favoritos);
        // res.send('{"favoritos":'+JSON.stringify(documentos_favoritos)+',"status":200}');
        
        const documento_usuario = await ModeloUsuario.findOne({_id:ObjectId(req.session.objectid)}).populate('favoritos');
        console.log(documento_usuario);
        res.send('{"favoritos":'+JSON.stringify(documento_usuario.favoritos)+',"status":200}');
    } catch (error) {
        res.send('{"resultado":"No se pudo obtener los favoritos", "status":500}');
    }
}

//POST /favoritos
//FUNCIONALIDAD PARA INCLUIR CANCIONES A LA LISTA DE FAVORITOS DE UN USUARIO
const agregarFavorito = async (req, res) => {
    try {
        //COMPROBAR SI LA CANCION SE ENCUENTRA YA EN LA LISTA DE FAVORITOS
        const documento_usuario = await ModeloUsuario.findOne({_id:ObjectId(req.session.objectid), favoritos:ObjectId(req.body.id_cancion)});
        if(documento_usuario){
            res.send('{"resultado":"La cancion ya se encuentra en favoritos", "status":400}');
        }else{
            await ModeloUsuario.updateOne({_id:ObjectId(req.session.objectid)},{$push:{favoritos:ObjectId(req.body.id_cancion)}});
            res.send('{"resultado":"Cancion agregada a favoritos", "status":200}');
        }
    } catch (error) {
        res.send('{"resultado":"No se pudo agregar la cancion a favoritos", "status":500}');
    }
}

//DELETE /favoritos
//FUNCIONALIDAD PARA REMOVER CANCIONES DE LA LISTA DE FAVORITOS DE UN USUARIO
const removerFavorito = async (req, res) => {
    console.log("remover fav", req.body);
    try {
        await ModeloUsuario.updateOne({_id:ObjectId(req.session.objectid)},{$pull:{favoritos:ObjectId(req.body.id_cancion)}});
        res.send('{"resultado":"Cancion removida de favoritos", "status":200}');
    } catch (error) {
        res.send('{"resultado":"No se pudo remover la cancion de favoritos", "status":500}');
    }
}

module.exports = {
    obtenerFavoritos,
    agregarFavorito,
    removerFavorito
}