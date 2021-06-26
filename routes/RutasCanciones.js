const express = require('express');
const router = express.Router();

//CONTROLADOR CANCIONES
const controladorCanciones = require('../controllers/ControladorCanciones');

//RUTAS /canciones

//ENDPOINT /canciones METODO GET
router.get("/",controladorCanciones.obtenerCanciones);

//ENDPOINT /canciones METODO POST
router.post("/",controladorCanciones.cargarCancion);

//ENDPOINT /canciones METODO PUT
router.put("/",controladorCanciones.editarCancion);

//ENDPOINT /canciones METODO DELETE
router.delete("/",controladorCanciones.eliminarCancion);

module.exports = router;