const express = require('express');
const router = express.Router();

//CONTROLADOR PERFIL
const controladorPerfil = require('../controllers/ControladorPerfil.js');

//RUTAS /perfil

//ENDPOINT /perfil METODO GET
router.get("/",controladorPerfil.obtenerDatosPerfil);

//ENDPOINT /perfil METODO PUT
router.put("/",controladorPerfil.actualizarDatosPerfil);

//ENDPOINT /perfil METODO DELETE
router.delete("/",controladorPerfil.eliminarPerfil);

module.exports = router;