const express = require('express');
const router = express.Router();

//CONTROLADOR LOGIN
const controladorLogin = require('../controllers/ControladorLogin');

//RUTAS /login

//ENDPOINT /login METODO GET
router.get("/",controladorLogin.vistaLogin);

//ENDPOINT /login METODO POST
router.post("/",controladorLogin.iniciarSesion);

module.exports = router;