const ModeloUsuario = require('../models/Usuario');

//FUNCION PARA RETORNAR LA VISTA DE LOGIN
const vistaLogin = (req, res) => {
    console.log("controlador login - vistaLogin");
    res.sendFile('/public/views/Login.html',{root: __dirname+"/.."});
}

//FUNCION ASINCRONA PARA REALIZAR EL INICIO DE SESION
const iniciarSesion = async (req, res) => {
    console.log("controlador login - iniciarSesion");
    console.log(req.body);
    //BUSCAR UN DOCUMENTO CUYOS INDICES DE USUARIO O CORREO SEAN IGUAL AL USUARIO INGRESADO CON SU RESPECTIVA CLAVE
    const cursor = await ModeloUsuario.find({ $or:[{nombre_usuario:req.body.usuario},{correo_usuario:req.body.usuario}],clave:req.body.clave});
    console.log(cursor);
    if(cursor.length){
        res.send('{"resultado":"Login exitoso", "status":200}');
    }else{
        res.send('{"resultado":"Credenciales invalidas", "status":401}');
    }
}

module.exports = {
    vistaLogin,
    iniciarSesion
}