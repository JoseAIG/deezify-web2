const mongoose = require('mongoose');
const ModeloCancion = require('./Cancion').schema;

const SchemaLista = new mongoose.Schema({
    nombre_lista: {
        type: String,
        required: true
    },
    propietario:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    canciones: {
        type: Array
    }
});

const Lista = mongoose.model("Lista", SchemaLista, "listas");
module.exports = Lista;