const ModeloListas = require('../models/Lista');
const ModeloCancion = require('../models/Cancion');
const ModeloUsuario = require('../models/Usuario');
const ObjectId = require('mongoose').Types.ObjectId; 

//GET /listas
//FUNCIONALIDAD PARA OBTENER LAS LISTAS DE REPRODUCCION DE UN USUARIO
const obtenerListas = async (req, res) => {
    try {
        //OBTENER EL MODELO DEL USUARIO PARA OBTENER LAS LISTAS DEL MISMO
        const documento_usuario = await ModeloUsuario.findOne({_id:req.session.objectid});
        //BUSCAR LAS LISTAS DEL USUARIO
        const documentos_listas = await ModeloListas.find({_id:{$in:documento_usuario.listas}});
        //RECORRER LAS LISTAS DEL USUARIO AGREGANDO EL ARREGLO DE LAS CANCIONES
        for(let i=0; i<documentos_listas.length; i++){
            const canciones_lista = await ModeloCancion.find({_id:{$in:documentos_listas[i].canciones}});
            documentos_listas[i].canciones = canciones_lista;
        }

        res.send('{"listas":'+JSON.stringify(documentos_listas)+', "id-usuario":"'+req.session.objectid+'", "status":200}');
    } catch (error) {
        res.send('{"resultado":"No se pudo obtener las listas", "status":500}');
    }
}

//POST /listas
//FUNCIONALIDAD PARA CREAR LISTAS DE REPRODUCCION
const crearLista = async (req, res) => {
    try {
        console.log(req.body);
        const nueva_lista = new ModeloListas({nombre_lista: req.body.nombre, propietario: ObjectId(req.session.objectid)});
        await nueva_lista.save();
        console.log(nueva_lista);
        //const documento_usuario = await ModeloUsuario.findOne({_id:ObjectId(req.session.objectid)})
        //console.log(documento_usuario);
        //await ModeloUsuario.updateOne({_id:ObjectId(req.session.objectid)},{$push:{listas:nueva_lista}});
        await ModeloUsuario.updateOne({_id:ObjectId(req.session.objectid)},{$push:{listas:ObjectId(nueva_lista._id)}});
        res.send('{"resultado":"Lista de reproduccion creada.", "status":200}');
    } catch (error) {
        console.log(error)
        res.send('{"resultado":"No se pudo crear la lista", "status":500}');
    }
}

//PUT /listas
//FUNCIONALIDAD PARA EDITAR LISTAS DE REPRODUCCION
const editarLista = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.body.canciones);
        //OBTENER CANCIONES DE LA LISTA
        canciones = JSON.parse(req.body.canciones);
        //GENERAR UN ARREGLO CON LOS OBJECTID DE LAS CANCIONES DE LA LISTA RECORRIENDO CADA UNA
        id_canciones = []
        for(let i=0; i<canciones.length; i++){
            console.log(canciones[i]);
            id_canciones.push(ObjectId(canciones[i]));
        }
        console.log(canciones);
        //ACTUALIZAR LOS DATOS DE LA LISTA DE REPRODUCCION
        await ModeloListas.updateOne({_id:ObjectId(req.body.id_lista)},{$set: {nombre_lista: req.body.nombre_editar_lista, canciones:id_canciones}});
        res.send('{"resultado":"Edicion exitosa", "status":200}');
    } catch (error) {
        console.log(error);
        res.send('{"resultado":"No se pudo editar la lista", "status":500}');
    }
}

//DELETE /listas
//FUNCIONALIDAD PARA ELIMINAR LAS LISTAS DE REPRODUCCION
const eliminarLista = async (req, res) => {
    try {
        console.log(req.body);
        //ELIMINAR LA LISTA DE REPRODUCCION EN LA COLECCION DE LISTAS
        await ModeloListas.deleteOne({_id:ObjectId(req.body.id_lista)});
        //ELIMINAR EL ID DE LA LISTA EN EL ARREGLO DE LOS USUARIOS
        await ModeloUsuario.updateMany({},{$pull:{listas:ObjectId(req.body.id_lista)}});
        res.send('{"resultado":"Lista eliminada exitosamente", "status":200}');
    } catch (error) {
        res.send('{"resultado":"No se pudo eliminar la lista", "status":500}');
    }
}

module.exports = {
    obtenerListas,
    crearLista,
    editarLista,
    eliminarLista
}