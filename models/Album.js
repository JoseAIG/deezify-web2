const mongoose = require('mongoose')

const SchemaAlbum = new mongoose.Schema({
    nombre_album: {
        type: String,
        required: true
    },
    artista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artista",
        required: true
    },
    lanzamiento:{
        type: String
    },
    canciones:[{type: mongoose.Schema.Types.ObjectId, ref:"Cancion"}],
    propietario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
});

const Album = mongoose.model("Album", SchemaAlbum, "albumes");
module.exports = Album;