const express = require('express');
const router = express.Router();

//CONTROLADOR DASHBOARD
const controladorDashboard = require('../controllers/ControladorDashboard');

//RUTAS /dashboard

//ENDPOINT /dashboard METODO GET
router.get("/",controladorDashboard.vistaDashboard);

//ENDPOINT /dashboard METODO POST
router.post("/",controladorDashboard.realizarBusqueda);

//ENDPOINT /dashboard METODO DELETE
router.delete("/",controladorDashboard.cerrarSesion);

module.exports = router;