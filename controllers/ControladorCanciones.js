const ModeloUsuario = require('../models/Usuario');
const ModeloListas = require('../models/Lista');
const ModeloCancion = require('../models/Cancion');
const ModeloAlbum = require('../models/Album');
const ObjectId = require('mongoose').Types.ObjectId; 

//GET /canciones
//FUNCION PARA OBTENER CANCIONES
const obtenerCanciones = async (req, res) => {
    //SI EL QUE REALIZA LA PETICION ES UN ADMINISTRADOR Y NO ES POR MEDIO DE LA URL, OBTENER LAS CANCIONES QUE LE PERTENECEN PARA MOSTRAR SU INFORMACION EN LA VISTA DE ADMIN
    if(req.headers['content-type']=='application/json'){
        if((req.session.tipo=="administrador")){
            try {
                //OBTENER LOS DOCUMENTOS DE LAS CANCIONES QUE SON PROPIETARIAS DEL ADMINISTRADOR
                const documentos_canciones_admin = await ModeloCancion.find({"propietario": req.session.objectid})
                .populate({
                    path: "album artista",
                    populate:{
                        path: "albumes"
                    }
                });
                res.status(200).json({status:200, canciones:documentos_canciones_admin});
            } catch (error) {
                res.status(500).json({resultado:"No se pudieron obtener las canciones del admin", status:500});
            }
        }
    }else{
        res.redirect("/dashboard");
    }
}

//POST /canciones
//FUNCION PARA CARGAR UNA NUEVA CANCION A LA APLICACION (SOLO ADMINISTRADORES)
const cargarCancion = async (req, res) => {
    try {
        //CREAR UN NUEVO DOCUMENTO DE LA CANCION Y GUARDARLO EN LA COLECCION DE LA DB, ACTUALIZANDO DESPUES EL ALBUM AL QUE PERTENECE LA CANCION AGREGANDOLA A LA LISTA DE CANCIONES
        const documento_cancion =  new ModeloCancion({nombre_cancion: req.body.titulo, genero: req.body.genero, artista: req.body.artista, album: req.body.album, propietario: req.session.objectid, reproducciones: 0, ruta_cancion: req.file.path});
        await documento_cancion.save();
        await ModeloAlbum.updateOne({_id:req.body.album},{$push:{canciones:documento_cancion._id}});
        res.status(200).json({resultado:"Cancion cargada exitosamente",status:200});
    } catch (error) {
        console.log(error);
        res.status(500).json({resultado:"No se pudo cargar la cancion",status:500});
    }
}

//PUT /canciones
//FUNCION PARA EDITAR UNA CANCION EXISTENTE (SOLO ADMINISTRADORES)
const editarCancion = async (req, res) => {
    try {
        //OBTENER EL DOCUMENTO DE LA CANCION
        let documento_cancion = await ModeloCancion.findOne({_id: ObjectId(req.body.id_cancion)});
        //COMPROBAR SI SE HA CAMBIADO EL TITULO (NOMBRE) DE LA CANCION
        if(documento_cancion.nombre_cancion!=req.body.titulo){
            console.log("cambiar nombre de la cancion");
            //ASIGNAR AL DOCUMENTO DE LA CANCION SU NUEVO NOMBRE
            documento_cancion.nombre_cancion = req.body.titulo;
        }
        //COMPROBAR SI SE HA CAMBIADO EL GENERO DE LA CANCION
        if(documento_cancion.genero!=req.body.genero){
            console.log("cambiar el genero de la cancion");
            //ASIGNAR AL DOCUMENTO DE LA CANCION SU NUEVO GENERO
            documento_cancion.genero = req.body.genero;
        }
        //COMPROBAR SI SE HA CAMBIADO EL ARTISTA DE LA CANCION
        if(documento_cancion.artista._id!=req.body.artista){
            console.log("actualizar artista de la cancion");
            //await ModeloCancion.updateOne({_id:documento_cancion._id},{artista:req.body.artista});
            //ASIGNAR AL DOCUMENTO DE LA CANCION EL ID DEL NUEVO ARTISTA
            documento_cancion.artista = req.body.artista;
        }
        //COMPROBAR SI SE HA CAMBIADO EL ALBUM DE LA CANCION
        if(documento_cancion.album._id!=req.body.album){
            console.log("actualizar album de la cancion");
            //REMOVER LA CANCION DEL ARREGLO DE CANCIONES DEL ALBUM DONDE SE ENCONTRABA
            await ModeloAlbum.findByIdAndUpdate(documento_cancion.album._id,{$pull:{canciones:documento_cancion._id}});
            //AGREGAR LA CANCION AL ARREGLO DE CANCIONES DEL NUEVO ALBUM AL QUE SE HA CAMBIADO LA ROLA
            await ModeloAlbum.findByIdAndUpdate(req.body.album,{$push:{canciones:documento_cancion._id}});
            //ASIGNAR AL DOCUMENTO DE LA CANCION EL ID DEL NUEVO ALBUM
            documento_cancion.album = req.body.album;
        }
        //COMPROBAR SI SE ENVIO UNA CANCION
        if(req.file){
            documento_cancion.ruta_cancion = req.file.path;
        }
        //GUARDAR LOS CAMBIOS EN EL DOCUMENTO DE LA CANCION
        await documento_cancion.save();
        
        res.status(200).json({resultado:"Cancion editada exitosamente",status:200});
    } catch (error) {
        console.log(error);
        res.status(500).json({resultado:"No se pudo editar la cancion",status:500});
    }
}

//DELETE /canciones
//FUNCION PARA ELIMINAR UNA CANCION DE LA BASE DE DATOS (SOLO ADMINISTRADORES)
const eliminarCancion = async (req, res) => {
    try {
        //OBTENER EL DOCUMENTO DE LA CANCION
        let documento_cancion = await ModeloCancion.findOne({_id: ObjectId(req.body.id_cancion)})
        //REMOVER LA CANCION DEL ALBUM
        await ModeloAlbum.findByIdAndUpdate(documento_cancion.album._id, {$pull:{canciones:req.body.id_cancion}})
        //REMOVER DOCUMENTO DE LA CANCION
        documento_cancion.remove();
        //REMOVER LA CANCION ELIMINADA DE LOS FAVORITOS DE LOS USUARIOS
        await ModeloUsuario.updateMany({favoritos:req.body.id_cancion},{$pull:{favoritos:req.body.id_cancion}})
        //REMOVER LA CANCION ELIMINADA DE LAS LISTAS DE LOS USUARIOS
        await ModeloListas.updateMany({canciones:req.body.id_cancion},{$pull:{canciones:req.body.id_cancion}})

        res.status(200).json({resultado:"Cancion eliminada exitosamente",status:200});
    } catch (error) {
        res.status(500).json({resultado:"No se pudo eliminar la cancion",status:500});
    }
}

module.exports = {
    obtenerCanciones,
    cargarCancion,
    editarCancion,
    eliminarCancion
}