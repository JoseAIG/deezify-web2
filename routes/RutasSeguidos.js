const express = require('express');
const router = express.Router();

//CONTROLADOR SEGUIDOS
const ControladorSeguidos = require('../controllers/ControladorSeguidos');

//RUTAS /seguidos

//ENDPOINT /seguidos METODO GET
//router.get("/",ControladorSeguidos.);

//ENDPOINT /seguidos METODO POST
router.post("/",ControladorSeguidos.seguirlista);

//ENDPOINT /seguidos METODO DELETE
router.delete("/",ControladorSeguidos.dejarDeSeguirLista);

module.exports = router;