const ModeloCancion = require('../models/Cancion');
const ObjectId = require('mongoose').Types.ObjectId; 

const obtenerCanciones = async (req, res) => {
    console.log("obtener canciones");
}

module.exports = {
    obtenerCanciones
}