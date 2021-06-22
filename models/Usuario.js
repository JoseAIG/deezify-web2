const mongoose = require('mongoose')

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
    }
});

const Usuario = mongoose.model("Usuario", SchemaUsuario, "usuarios");
module.exports = Usuario;