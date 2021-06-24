const mongoose = require('mongoose');

const SchemaCancion = new mongoose.Schema({
    nombre_cancion: {
        type: String,
        required: true
    },
    artista: {
        type: String,
        required: true
    },
    album:{
        type: String,
        required: true
    },
    propietario:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    reproducciones:{
        type: mongoose.Schema.Types.Number
    }
});

const Cancion = mongoose.model("Cancion", SchemaCancion, "canciones");
module.exports = Cancion;