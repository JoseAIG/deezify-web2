const express = require('express');
const router = express.Router();
//const ModeloUsuario = require('../models/Usuario');

//CONTROLADOR REGISTRO
const controladorRegistro = require('../controllers/ControladorRegistro');

//RUTAS
//ENDPOINT /registro METODO GET
// router.get("/",(req,res)=>{
//     console.log("routes - registro");
//     res.sendFile('/public/views/Registro.html',{root: __dirname+"/.."});
// });

router.get("/",controladorRegistro.vistaRegistro);

//ENDPOINT /registro METODO POST
// router.post("/",async(req, res)=>{
//     console.log("post");
//     console.log(req.body);
//     const usuario = new ModeloUsuario({nombre_usuario: req.body.usuario, correo_usuario: req.body.correo, clave: req.body.clave});
//     try {
//         await usuario.save();
//     } catch (error) {
//         console.log(error);
//         if(error.code==11000){
//             res.send('{"resultado":"Usuario ya existente", "status":422}');
//         }else{
//             res.send('{"resultado":"No se pudo realizar el registro", "status":500}');
//         }
//     }
//     res.send('{"resultado":"Registro exitoso", "status":200}');
// });

router.post("/",controladorRegistro.registrarUsuario);

module.exports = router;