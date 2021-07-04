const express = require('express');
const router = express.Router();

//CONTROLADOR SEGUIDOS
const ControladorSeguidos = require('../controllers/ControladorSeguidos');

//RUTAS /seguidos

//ENDPOINT /seguidos METODO GET
router.get("/",ControladorSeguidos.obtenerSeguidos);

//ENDPOINT /seguidos METODO POST
router.post("/",ControladorSeguidos.seguirElemento);

//ENDPOINT /seguidos METODO DELETE
router.delete("/",ControladorSeguidos.dejarDeSeguirElemento);

module.exports = router;