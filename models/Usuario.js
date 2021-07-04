const mongoose = require('mongoose')
//const ModeloLista = require('./Lista').schema

const SchemaUsuario = new mongoose.Schema({
    nombre_usuario: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    correo_usuario: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    clave:{
        type: String,
        required: true
    },
    tipo:{
        type: String,
        required: true
    },
    favoritos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Cancion'
    }],
    listas:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Lista'
    }],
    artistas_seguidos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Artista'
    }],
    albumes_seguidos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Album'
    }]
});

const Usuario = mongoose.model("Usuario", SchemaUsuario, "usuarios");
module.exports = Usuario;