const ModeloUsuario = require('../models/Usuario');
const ModeloListas = require('../models/Lista');
const ModeloArtista = require('../models/Artista');
const ModeloAlbum = require('../models/Album');
const ModeloCancion = require('../models/Cancion');
const ObjectId = require('mongoose').Types.ObjectId; 

//GET /albumes
//FUNCION PARA DEVOLVER LOS ALBUMES
const obtenerAlbumes = async (req, res) => {
    try {
        if(req.headers['content-type']=='application/json'){
            //BUSCAR LOS DOCUMENTOS DE LOS ALBUMES PERTENECIENTES AL PROPIETARIO Y POPULARLO CON LOS ARTISTAS
            const documentos_albumes = await ModeloAlbum.find({propietario:req.session.objectid}).populate('artista');
            res.status(200).json({albumes:documentos_albumes, status:200});
        }
    } catch (error) {
        res.status(500).json({resultado:"No se pudieron obtener los albumes.", status:500});

    }
}

//POST /albumes
//FUNCION PARA CREAR ALBUMES COMO ADMIN
const crearAlbum = async (req, res) => {
    try {
        console.log(req.body)
        const documento_album = new ModeloAlbum({nombre_album:req.body.album, artista:req.body.artista, lanzamiento:req.body.fecha, propietario:req.session.objectid});
        await documento_album.save();
        await ModeloArtista.updateOne({_id:ObjectId(req.body.artista)},{$push:{albumes:documento_album._id}});
        res.status(200).json({resultado:"Album creado exitosamente.", status:200});
    } catch (error) {
        console.log(error);
        res.status(500).json({resultado:"No se puedo crear el album.", status:500});
    }
}

//PUT /albumes
//FUNCION PARA EDITAR ALBUMES EXISTENTES DEL USUARIO ADMIN
const editarAlbum = async (req, res) => {
    try {
        console.log(req.body);
        //OBTENER EL DOCUMENTO DEL ALBUM
        let documento_album = await ModeloAlbum.findOne({_id:req.body.id_album});
        //COMPROBAR SI SE HA CAMBIADO EL NOMBRE DEL ALBUM
        if(documento_album.nombre_album!=req.body.album){
            console.log("actualizar el nombre del album");
            documento_album.nombre_album = req.body.album;
        }
        //COMPROBAR SI SE HA CAMBIADO LA FECHA DE LANZAMIENTO DEL ALBUM
        if(documento_album.lanzamiento!=req.body.fecha){
            console.log("actualizar la fecha del album");
            documento_album.lanzamiento = req.body.fecha;
        }
        //COMPROBAR SI SE HA CAMBIADO EL ARTISTA DEL ALBUM
        if(documento_album.artista!=req.body.artista){
            console.log("actualizar el artista del album");
            //REMOVER EL ALBUM DEL ARTISTA DONDE SE ENCONTRABA
            await ModeloArtista.updateOne({_id:documento_album.artista},{$pull:{albumes:documento_album._id}});
            //AGREGAR EL ALBUM DEL ARTISTA NUEVO
            await ModeloArtista.updateOne({_id:req.body.artista},{$push:{albumes:documento_album._id}});
            //CAMBIAR EL ARTISTA DE LAS CANCIONES
            await ModeloCancion.updateMany({album:documento_album._id},{artista:req.body.artista});
            //ESTABLECER EL ID DEL NUEVO ARTISTA EN EL CAMPO ARTISTA DEL ALBUM
            documento_album.artista = req.body.artista;
        }
        await documento_album.save();

        res.status(200).json({resultado:"Album editado exitosamente.", status:200});
    } catch (error) {
        res.status(500).json({resultado:"No se puedo editar el album.", status:500});
    }
}

//DELETE /albumes
//FUNCION PARA ELIMINAR ALBUMES EXISTENTES DEL USUARIO ADMIN
const eliminarAlbum = async (req, res) => {
    try {
        //OBTENER LAS CANCIONES DEL ALBUM, RECORRERLAS Y ELIMINARLAS
        const documentos_canciones_album = await ModeloCancion.find({album:req.body.id_album})
        for(let i=0; i<documentos_canciones_album.length; i++){
            //REMOVER LAS CANCIONES QUE ESTABAN EN EL ALBUM DE LOS FAVORITOS DE LOS USUARIOS 
            await ModeloUsuario.updateMany({favoritos:documentos_canciones_album[i]._id},{$pull:{favoritos:documentos_canciones_album[i]._id}});
            //REMOVER LAS CANCIONES QUE ESTABAN EN EL ALBUM DE LAS LISTAS DE REPRODUCCION
            await ModeloListas.updateMany({canciones:documentos_canciones_album[i]._id},{$pull:{canciones:documentos_canciones_album[i]._id}});
            //REMOVER EL DOCUMENTO DE LA CANCION
            documentos_canciones_album[i].remove();
        }
        //OBTENER EL DOCUMENTO DEL ALBUM
        const documento_album = await ModeloAlbum.findOne({_id:req.body.id_album});
        //REMOVER EL ALBUM DEL ARREGLO DE ALBUMES DEL ARTISTA
        await ModeloArtista.findOneAndUpdate({_id:documento_album.artista._id},{$pull:{albumes:req.body.id_album}})
        //REMOVER LOS REGISTROS DE ALBUMES SEGUIDOS EN LOS DOCUMENTOS DE LOS USUARIOS
        await ModeloUsuario.updateMany({albumes_seguidos:req.body.id_album},{$pull:{albumes_seguidos:req.body.id_album}});
        //REMOVER EL DOCUMENTO DEL ALBUM
        documento_album.remove();

        res.status(200).json({resultado:"Album eliminado exitosamente.", status:200});
    } catch (error) {
        console.log(error);
        res.status(500).json({resultado:"No se puedo eliminar el album.", status:500});
    }
}

module.exports = {
    obtenerAlbumes,
    crearAlbum,
    editarAlbum,
    eliminarAlbum
}