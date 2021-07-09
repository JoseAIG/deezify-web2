const express = require('express');
const router = express.Router();
const fs = require("fs");
const multer = require("multer");

var ruta_caratulas = 'caratulas';

//FUNCION MIDDLEWARE PARA COMPROBAR LA RUTA PARA LA CARGA DE LAS CARATULAS DE LOS ALBUMES
function comprobar_ruta_caratulas(req, res, next) {
    //COMPROBAR SI EXISTE LA RUTA
    if(fs.existsSync(ruta_caratulas)){
        //SEGUIR SI LA RUTA EXISTE
        console.log("existe, seguir");
        next(); 
    }else{
        //SI NO EXISTE LA RUTA, CREARLA Y SEGUIR
        fs.mkdir(ruta_caratulas, function(err) {
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
        cb(null,ruta_caratulas)
    },
    filename: function (req, file, cb){
        //ESTABLECER EL NOMBRE UNICO DEL ARCHIVO A ALMACENAR
        let nombre_archivo = new Date().getTime() + file.originalname
        cb(null,nombre_archivo)
    }
})
const upload = multer({storage:almacenamiento});

//CONTROLADOR ALBUMES
const controladorAlbumes = require('../controllers/ControladorAlbumes');

//RUTAS /albumes

//ENDPOINT /albumes METODO GET
router.get("/",controladorAlbumes.obtenerAlbumes);

//ENDPOINT /albumes METODO POST
router.post("/", comprobar_ruta_caratulas, upload.single('caratula'), controladorAlbumes.crearAlbum);

//ENDPOINT /albumes METODO PUT
router.put("/", comprobar_ruta_caratulas, upload.single('caratula'), controladorAlbumes.editarAlbum);

//ENDPOINT /albumes METODO DELETE
router.delete("/",controladorAlbumes.eliminarAlbum);

module.exports = router;