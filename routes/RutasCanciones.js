const express = require('express');
const router = express.Router();
const fs = require("fs");
const multer = require("multer");

var ruta_pistas = 'canciones';

//FUNCION MIDDLEWARE PARA COMPROBAR LA RUTA PARA LA CARGA DE LAS PISTAS DE LAS CANCIONES
function comprobar_ruta_pistas(req, res, next) {
    //COMPROBAR SI EXISTE LA RUTA
    if(fs.existsSync(ruta_pistas)){
        //SEGUIR SI LA RUTA EXISTE
        console.log("existe, seguir");
        next(); 
    }else{
        //SI NO EXISTE LA RUTA, CREARLA Y SEGUIR
        fs.mkdir(ruta_pistas, function(err) {
            if(err) {
                console.log('Error al crear el directorio');
                next(); 
            } 
            console.log("directorio creado, seguir")
            next();
        });
    }
}

//CONFIGURACION DEL ALMACENAMIENTO DE MULTER
let almacenamiento = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,ruta_pistas)
    },
    filename: function (req, file, cb){
        //ESTABLECER EL NOMBRE UNICO DEL ARCHIVO A ALMACENAR
        let nombre_archivo = new Date().getTime() + file.originalname
        cb(null,nombre_archivo)
    }
})
const upload = multer({storage:almacenamiento});

//CONTROLADOR CANCIONES
const controladorCanciones = require('../controllers/ControladorCanciones');

//RUTAS /canciones

//ENDPOINT /canciones METODO GET
router.get("/",controladorCanciones.obtenerCanciones);

//ENDPOINT /canciones METODO POST
router.post("/", comprobar_ruta_pistas, upload.single("pista"), controladorCanciones.cargarCancion);

//ENDPOINT /canciones METODO PUT
router.put("/", comprobar_ruta_pistas, upload.single("pista"), controladorCanciones.editarCancion);

//ENDPOINT /canciones METODO DELETE
router.delete("/",controladorCanciones.eliminarCancion);

module.exports = router;