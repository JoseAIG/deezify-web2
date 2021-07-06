const express = require('express');
const router = express.Router();
const multer = require("multer");

let almacenamiento = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,'canciones/')
    },
    filename: function (req, file, cb){
        cb(null,file.originalname)
    }
})
const upload = multer({storage:almacenamiento});

//CONTROLADOR CANCIONES
const controladorCanciones = require('../controllers/ControladorCanciones');

//RUTAS /canciones

//ENDPOINT /canciones METODO GET
router.get("/",controladorCanciones.obtenerCanciones);

//ENDPOINT /canciones METODO POST
router.post("/", upload.single("pista"), controladorCanciones.cargarCancion);

//ENDPOINT /canciones METODO PUT
router.put("/",controladorCanciones.editarCancion);

//ENDPOINT /canciones METODO DELETE
router.delete("/",controladorCanciones.eliminarCancion);

module.exports = router;