const ModeloCancion = require('../models/Cancion');
const ObjectId = require('mongoose').Types.ObjectId; 

//GET /canciones
//FUNCION PARA OBTENER CANCIONES
const obtenerCanciones = async (req, res) => {
    console.log("obtener canciones");
    //SI EL QUE REALIZA LA PETICION ES UN ADMINISTRADOR Y NO ES POR MEDIO DE LA URL, OBTENER LAS CANCIONES QUE LE PERTENECEN PARA MOSTRAR SU INFORMACION EN LA VISTA DE ADMIN
    if((req.session.tipo=="administrador") && (req.headers['content-type']=='application/json')){
        try {
            const documentos_canciones_admin = await ModeloCancion.find({"propietario": ObjectId(req.session.objectid)});
            //console.log(documentos_canciones_admin);
            res.send('{"status":200, "canciones":'+JSON.stringify(documentos_canciones_admin)+'}');
        } catch (error) {
            res.send('{"resultado":"No se pudieron obtener las canciones del admin", "status":500}');
        }
    }else{
        res.redirect("/dashboard");
    }
}

//POST /canciones
//FUNCION PARA CARGAR UNA NUEVA CANCION A LA APLICACION (SOLO ADMINISTRADORES)
const cargarCancion = async (req, res) => {
    console.log("cargar cancion");
    console.log(req.body);
    try {
        //GENERAR UN DOCUMENTO CON EL SCHEMA DE CANCIONES Y GUARDARLO EN LA BASE DE DATOS
        const nueva_cancion = new ModeloCancion({nombre_cancion: req.body.titulo, artista: req.body.artista, album: req.body.album, propietario: ObjectId(req.session.objectid), reproducciones: 0, ruta_cancion: " "});
        await nueva_cancion.save();
        res.send('{"resultado":"Cancion guardada exitosamente", "status":200}');
    } catch (error) {
        console.log(error);
        res.send('{"resultado":"No se pudo guardar la cancion", "status":500}');
    }
}

//PUT /canciones
//FUNCION PARA EDITAR UNA CANCION EXISTENTE (SOLO ADMINISTRADORES)
const editarCancion = async (req, res) => {
    console.log("modificar cancion");
    try {
        documento_cancion = await ModeloCancion.findOne({_id: ObjectId(req.body.id_cancion)})
        documento_cancion.nombre_cancion = req.body.titulo;
        documento_cancion.artista = req.body.artista;
        documento_cancion.album = req.body.album;
        documento_cancion.save();
        res.send('{"resultado":"Cancion editada exitosamente", "status":200}');
    } catch (error) {
        console.log(error);
        res.send('{"resultado":"No se pudo editar la cancion", "status":500}');
    }
}

//DELETE /canciones
//FUNCION PARA ELIMINAR UNA CANCION DE LA BASE DE DATOS (SOLO ADMINISTRADORES)
const eliminarCancion = async (req, res) => {
    console.log("eliminar cancion");
    try {
        documento_cancion = await ModeloCancion.findOne({_id: ObjectId(req.body.id_cancion)})
        documento_cancion.remove();
        res.send('{"resultado":"Cancion eliminada exitosamente", "status":200}');
    } catch (error) {
        res.send('{"resultado":"No se pudo eliminar la cancion", "status":500}');
    }
}

module.exports = {
    obtenerCanciones,
    cargarCancion,
    editarCancion,
    eliminarCancion
}