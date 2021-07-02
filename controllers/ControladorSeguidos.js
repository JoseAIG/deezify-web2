const ModeloUsuario = require('../models/Usuario');
const ObjectId = require('mongoose').Types.ObjectId; 

//POST /seguidos
//INCLUIR LISTAS DE REPRODUCCION AL ARREGLO DE LISTAS DE UN USUARIO CUANDO SE SELECCIONA SEGUIR
const seguirlista = async (req, res) => {
    try {
        //COMPROBAR SI EL USUARIO YA SIGUE LA LISTA DE REPRODUCCION PARA NO AGREGAR NUEVAMENTE EL REGISTRO EN LA BASE DE DATOS
        const documento_usuario = await ModeloUsuario.findOne({_id:ObjectId(req.session.objectid), listas:(req.body.id_lista)});
        if(documento_usuario){
            res.send('{"resultado":"Ya sigues esta lista", "status":200}');        
        }else{
            await ModeloUsuario.updateOne({_id:ObjectId(req.session.objectid)},{$push:{listas:ObjectId(req.body.id_lista)}});
            res.send('{"resultado":"Ahora sigues esta lista", "status":200}');    
        }    
    } catch (error) {
        console.log(error);
        res.send('{"resultado":"No se pudo seguir la lista", "status":500}');
    }
}

//DELETE /seguidos
//REMOVER LISTA DE REPRODUCCION DEL ARREGLO DE LISTAS DE UN USUARIO CUANDO SE SELECCIONA DEJAR DE SEGUIR
const dejarDeSeguirLista = async (req, res) => {
    try {
        console.log(req.body);
        await ModeloUsuario.updateOne({_id:ObjectId(req.session.objectid)},{$pull:{listas:ObjectId(req.body.id_lista)}});
        res.send('{"resultado":"Has dejado de seguir esta lista", "status":200}');
    } catch (error) {
        res.send('{"resultado":"No se pudo dejar de seguir", "status":500}');
    }
}

module.exports = {
    seguirlista,
    dejarDeSeguirLista
}