const express = require('express');
const router = express.Router();

//CONTROLADOR CANCIONES
const controladorCanciones = require('../controllers/ControladorCanciones');

//RUTAS /canciones

//ENDPOINT /canciones METODO GET
router.get("/",controladorCanciones.obtenerCanciones);

module.exports = router;