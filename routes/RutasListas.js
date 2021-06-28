const express = require('express');
const router = express.Router();

//CONTROLADOR LISTAS
const controladorListas = require('../controllers/ControladorListas');

//RUTAS /listas

//ENDPOINT /listas METODO GET
router.get("/",controladorListas.obtenerListas);

//ENDPOINT /listas METODO POST
router.post("/",controladorListas.crearLista);

//ENDPOINT /listas METODO PUT
router.put("/",controladorListas.editarLista);

//ENDPOINT /listas METODO DELETE
router.delete("/",controladorListas.eliminarLista);

module.exports = router;