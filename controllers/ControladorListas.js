const ModeloListas = require('../models/Lista');
const ModeloUsuario = require('../models/Usuario');
const ObjectId = require('mongoose').Types.ObjectId; 

//POST /listas
//FUNCIONALIDAD PARA CREAR LISTAS DE REPRODUCCION
const crearLista = async (req, res) => {
    try {
        //CREAR UN DOCUMENTO DE LISTA DE REPRODUCCION CON EL ESQUEMA DE LISTAS
        const nueva_lista = new ModeloListas({nombre_lista: req.body.nombre, propietario: ObjectId(req.session.objectid)});
        await nueva_lista.save();
        //INSERTAR EL ID DE LA LISTA DE REPRODUCCION EN EL USUARIO PROPIETARIO
        await ModeloUsuario.updateOne({_id:ObjectId(req.session.objectid)},{$push:{listas:ObjectId(nueva_lista._id)}});
        res.status(200).json({resultado:"Lista de reproduccion creada.", status:200});
    } catch (error) {
        console.log(error)
        res.status(500).json({resultado:"No se pudo crear la lista", status:500});
    }
}

//PUT /listas
//FUNCIONALIDAD PARA EDITAR LISTAS DE REPRODUCCION
const editarLista = async (req, res) => {
    try {
        //SI LA OPERACION ES AGREGAR CANCION, COMPROBAR QUE LA MISMA NO SE ENCUENTRE EN LA LISTA PARA AGREGARLA
        if(req.body.operacion=="agregar cancion"){
            const documento_lista = await ModeloListas.findOne({_id:ObjectId(req.body.id_lista), canciones:ObjectId(req.body.id_cancion)});
            if(documento_lista){
                res.status(400).json({resultado:"La cancion ya esta en la lista", status:400});
            }else{
                //SI LA CANCION NO SE ENCUENTRA EN LA LISTA, ACTUALIZAR LA LISTA AGREGANDOLE EL ID DE LA CANCION
                await ModeloListas.updateOne({_id:ObjectId(req.body.id_lista)},{$push:{canciones:ObjectId(req.body.id_cancion)}})
                res.status(200).json({resultado:"Cancion agregada a la lista", status:200});
            }
        }else{
            //SI LA OPERACION NO ES AGREGAR CANCION, ES DECIR, EDITAR LOS DATOS DE LA LISTA DE REPRODUCCION, OBTENER LAS CANCIONES QUE SE ENCUENTRAN EN ESTA DESPUES DE LA EDICION Y ACTUALIZAR LOS DATOS.
            //OBTENER CANCIONES DE LA LISTA
            canciones = JSON.parse(req.body.canciones);
            //GENERAR UN ARREGLO CON LOS OBJECTID DE LAS CANCIONES DE LA LISTA RECORRIENDO CADA UNA
            id_canciones = []
            for(let i=0; i<canciones.length; i++){
                console.log(canciones[i]);
                id_canciones.push(ObjectId(canciones[i]));
            }
            //ACTUALIZAR LOS DATOS DE LA LISTA DE REPRODUCCION
            await ModeloListas.updateOne({_id:ObjectId(req.body.id_lista)},{$set: {nombre_lista: req.body.nombre_editar_lista, canciones:id_canciones}});
            res.status(200).json({resultado:"Edicion exitosa",status:200});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({resultado:"No se pudo editar la lista", status:500});
    }
}

//DELETE /listas
//FUNCIONALIDAD PARA ELIMINAR LAS LISTAS DE REPRODUCCION
const eliminarLista = async (req, res) => {
    try {
        //SI EL QUE REALIZA LA ELIMINACION ES EL PROPIETARIO, ELIMINAR COMPLETAMENTE LA LISTA
        //PERO SI NO ES EL PROPIETARIO, SOLO REMOVER LA LISTA DE REPRODUCCION DEL ARREGLO DE LISTAS DEL USUARIO
        if(req.body.propietario == req.session.objectid){
            //ELIMINAR LA LISTA DE REPRODUCCION EN LA COLECCION DE LISTAS
            await ModeloListas.deleteOne({_id:ObjectId(req.body.id_lista)});
            //ELIMINAR EL ID DE LA LISTA EN EL ARREGLO DE LOS USUARIOS
            await ModeloUsuario.updateMany({},{$pull:{listas:ObjectId(req.body.id_lista)}});
            res.status(200).json({resultado:"Lista eliminada exitosamente", status:200});
        }else{
            //REMOVER LA LISTA DE REPRODUCCION DEL ARREGLO DE LISTAS
            await ModeloUsuario.updateOne({_id:req.session.objectid},{$pull:{listas:ObjectId(req.body.id_lista)}});
            res.status(200).json({resultado:"Lista eliminada exitosamente", status:200});
        }
    } catch (error) {
        res.status(500).json({resultado:"No se pudo eliminar la lista", status:500});
    }
}

module.exports = {
    crearLista,
    editarLista,
    eliminarLista
}