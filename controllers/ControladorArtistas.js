const ModeloArtista = require('../models/Artista');
const ObjectId = require('mongoose').Types.ObjectId; 

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

module.exports = {
    obtenerArtistas,
    crearArtista
}