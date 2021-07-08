const express = require('express');
const router = express.Router();

//CONTROLADOR REPRODUCCION
const controladorReproduccion = require('../controllers/ControladorReproduccion');

//RUTAS /reproduccion

//ENDPOINT /reproduccion METODO GET
router.get("/:id",controladorReproduccion.iniciarReproduccion);

//ENDPOINT /reproduccion METODO POST
router.post("/",controladorReproduccion.incrementarReproduccion);

module.exports = router;