const express = require('express');
const router = express.Router();

//CONTROLADOR REGISTRO
const controladorRegistro = require('../controllers/ControladorRegistro');

//RUTAS /registro

//ENDPOINT /registro METODO GET
router.get("/",controladorRegistro.vistaRegistro);

//ENDPOINT /registro METODO POST
router.post("/",controladorRegistro.registrarUsuario);

module.exports = router;