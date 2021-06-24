const express = require('express');
const router = express.Router();

//CONTROLADOR CANCIONES
const controladorAdmin = require('../controllers/ControladorAdmin');

//RUTAS /admin

//ENDPOINT /admin METODO GET
router.get("/",controladorAdmin.obtenerCancionesAdmin);

module.exports = router;