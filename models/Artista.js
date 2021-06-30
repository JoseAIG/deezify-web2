const mongoose = require('mongoose')

const SchemaArtista = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    propietario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    albumes: [{type: mongoose.Schema.Types.ObjectId, ref:"Album"}]
});

const Artista = mongoose.model("Artista", SchemaArtista, "artistas");
module.exports = Artista;