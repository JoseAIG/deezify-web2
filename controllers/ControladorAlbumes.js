const ModeloAlbum = require('../models/Album');
const ModeloArtista = require('../models/Artista');
const ObjectId = require('mongoose').Types.ObjectId; 

//GET /albumes
//FUNCION PARA DEVOLVER LOS ALBUMES
const obtenerAlbumes = async (req, res) => {
    try {
        if(req.headers['content-type']=='application/json'){
            const documentos_albumes = await ModeloAlbum.find({propietario:req.session.objectid}).populate('artista');
            res.send('{"albumes":'+JSON.stringify(documentos_albumes)+',"status":200}');
        }
    } catch (error) {
        res.send('{"resultado":"No se pudieron obtener los albumes","status":500}');

    }
}

//POST /albumes
//FUNCION PARA CREAR ALBUMES
const crearAlbum = async (req, res) => {
    try {
        console.log(req.body)
        const documento_album = new ModeloAlbum({nombre_album:req.body.album, artista:req.body.artista, lanzamiento:req.body.fecha, propietario:req.session.objectid});
        await documento_album.save();
        await ModeloArtista.updateOne({_id:ObjectId(req.body.artista)},{$push:{albumes:documento_album._id}});
        res.send('{"resultado":"Album creado exitosamente","status":200}');
    } catch (error) {
        console.log(error);
        res.send('{"resultado":"No se pudo crear el album","status":500}');
    }
}

module.exports = {
    obtenerAlbumes,
    crearAlbum
}