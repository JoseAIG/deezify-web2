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
    // favoritos: {
    //     type: Array
    // },
    favoritos: [{type: mongoose.Schema.Types.ObjectId, ref:'Cancion'}],
    // listas: {
    //     type: Array,
    // }
    listas: [{type: mongoose.Schema.Types.ObjectId, ref:'Lista'}]
});

const Usuario = mongoose.model("Usuario", SchemaUsuario, "usuarios");
module.exports = Usuario;