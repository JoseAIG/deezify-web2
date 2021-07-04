const ModeloUsuario = require('../models/Usuario');
const ModeloListas = require('../models/Lista');
const ModeloArtista = require('../models/Artista');
const ModeloAlbum = require('../models/Album');
const ModeloCancion = require('../models/Cancion');

//GET /artistas
//DEVOLVER LOS ARTISTAS QUE EL ADMINISTRADOR HA INGRESADO
const obtenerArtistas = async (req, res) => {
    try {
        const documentos_artistas = await ModeloArtista.find({propietario:req.session.objectid}).populate('albumes');
        res.send('{"artistas":'+JSON.stringify(documentos_artistas)+',"status":200}');
    } catch (error) {
        res.send('{"resultado":"No se pudieron obtener los artistas","status":500}');
    }
}

//POST /artistas
//CREAR UN NUEVO ARTISTA, ALMACENANDOLO EN LA BASE DE DATOS
const crearArtista = async (req, res) => {
    try {
        await new ModeloArtista({nombre:req.body.artista, propietario:req.session.objectid}).save();
        res.send('{"resultado":"Artista creado exitosamente","status":200}');
    } catch (error) {
        res.send('{"resultado":"No se pudo crear el artista","status":500}');
    }
}

//PUT /artistas
//EDITAR UN ARTISTA EXISTENTE
const editarArtista = async (req, res) => {
    try {
        await ModeloArtista.findByIdAndUpdate(req.body.id_artista,{nombre:req.body.artista});
        res.status(200).json({resultado:"Edicion de artista exitosa.", "status":200});
    } catch (error) {
        res.status(500).json({resultado:"No se puedo editar el artista.", status:500});
    }
}

//DELETE /artistas
//ELIMINAR UN ARTISTA EXISTENTE
const eliminarArtista = async (req, res) => {
    try {
        //BUSCAR Y RECORRER LOS ALBUMES QUE PERTENECEN AL ARTISTA
        const documentos_albumes = await ModeloAlbum.find({artista:req.body.id_artista})
        for(let i=0; i<documentos_albumes.length; i++){
            //OBTENER LAS CANCIONES DEL ALBUM DEL ARTISTA, RECORRERLAS Y REMOVERLAS
            let documentos_canciones_album = await ModeloCancion.find({album:documentos_albumes[i]._id});
            for(let j=0; j<documentos_canciones_album.length; j++){
                //REMOVER LAS CANCIONES QUE ESTABAN EN EL ALBUM DE LOS FAVORITOS DE LOS USUARIOS 
                await ModeloUsuario.updateMany({favoritos:documentos_canciones_album[j]._id},{$pull:{favoritos:documentos_canciones_album[j]._id}});
                //REMOVER LAS CANCIONES QUE ESTABAN EN EL ALBUM DE LAS LISTAS DE REPRODUCCION
                await ModeloListas.updateMany({canciones:documentos_canciones_album[j]._id},{$pull:{canciones:documentos_canciones_album[j]._id}});
                //REMOVER EL DOCUMENTO DE LA CANCION
                documentos_canciones_album[j].remove();
            }
            //REMOVER EL REGISTRO DE ALBUM SEGUIDO EN LOS DOCUMENTOS DE LOS USUARIOS
            await ModeloUsuario.updateMany({albumes_seguidos:documentos_albumes[i]._id},{$pull:{albumes_seguidos:documentos_albumes[i]._id}});
            //REMOVER EL ALBUM
            documentos_albumes[i].remove();
        }
        //REMOVER EL REGISTRO DE ARTISTA SEGUIDO EN LOS DOCUMENTOS DE LOS USUARIOS
        await ModeloUsuario.updateMany({artistas_seguidos:req.body.id_artista},{$pull:{artistas_seguidos:req.body.id_artista}});
        //REMOVER EL ARTISTA
        await ModeloArtista.findByIdAndDelete(req.body.id_artista);
        res.status(200).json({resultado:"Se ha eliminado el artista y todos sus albumes con canciones.", "status":200});
    } catch (error) {
        console.log(error)
        res.status(500).json({resultado:"No se puedo eliminar el artista.", status:500});
    }
}

module.exports = {
    obtenerArtistas,
    crearArtista,
    editarArtista,
    eliminarArtista
}