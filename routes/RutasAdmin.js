const express = require('express');
const router = express.Router();

//CONTROLADOR ADMIN
const controladorAdmin = require('../controllers/ControladorAdmin');

//RUTAS /admin

//ENDPOINT /admin METODO GET
router.get("/",controladorAdmin.vistaAdmin);

module.exports = router;