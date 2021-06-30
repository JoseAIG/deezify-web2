const express = require('express');
const router = express.Router();

//CONTROLADOR LISTAS
const controladorFavoritos = require('../controllers/ControladorFavoritos');

//RUTAS /listas

//ENDPOINT /listas METODO GET
router.get("/",controladorFavoritos.obtenerFavoritos);

//ENDPOINT /listas METODO POST
router.post("/",controladorFavoritos.agregarFavorito);

//ENDPOINT /listas METODO PUT
//router.put("/",controladorFavoritos.);

//ENDPOINT /listas METODO DELETE
router.delete("/",controladorFavoritos.removerFavorito);

module.exports = router;