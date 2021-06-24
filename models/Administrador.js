const mongoose = require('mongoose')

const SchemaAdministrador = new mongoose.Schema({
    nombre_administrador: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    correo_administrador: {
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

const Administrador = mongoose.model("Administrador", SchemaAdministrador, "administradores");
module.exports = Administrador;