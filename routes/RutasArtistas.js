const express = require('express');
const router = express.Router();

//CONTROLADOR ARTISTAS
const controladorArtistas = require('../controllers/ControladorArtistas');

//RUTAS /artistas

//ENDPOINT /artistas METODO GET
router.get("/",controladorArtistas.obtenerArtistas);

//ENDPOINT /artistas METODO POST
router.post("/",controladorArtistas.crearArtista);

//ENDPOINT /artistas METODO PUT
//router.put("/",controladorArtistas.editarCancion);

//ENDPOINT /artistas METODO DELETE
//router.delete("/",controladorArtistas.eliminarCancion);

module.exports = router;