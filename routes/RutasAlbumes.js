const express = require('express');
const router = express.Router();

//CONTROLADOR ALBUMES
const controladorAlbumes = require('../controllers/ControladorAlbumes');

//RUTAS /albumes

//ENDPOINT /albumes METODO GET
router.get("/",controladorAlbumes.obtenerAlbumes);

//ENDPOINT /albumes METODO POST
router.post("/",controladorAlbumes.crearAlbum);

//ENDPOINT /albumes METODO PUT
router.put("/",controladorAlbumes.editarAlbum);

//ENDPOINT /albumes METODO DELETE
router.delete("/",controladorAlbumes.eliminarAlbum);

module.exports = router;