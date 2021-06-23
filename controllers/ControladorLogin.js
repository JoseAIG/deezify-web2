const ModeloUsuario = require('../models/Usuario');

//FUNCION PARA RETORNAR LA VISTA DE LOGIN
const vistaLogin = (req, res) => {
    //SI EXISTE UNA SESION, REDIRECCIONAR AL DASHBOARD, DE NO EXISTIR, DESPACHAR VISTA LOGIN
    if(req.session.usuario){
        res.redirect("/dashboard");
    }else{
        res.sendFile('/public/views/Login.html',{root: __dirname+"/.."});
    }
}

//FUNCION ASINCRONA PARA REALIZAR EL INICIO DE SESION
const iniciarSesion = async (req, res) => {
    console.log(req.body);
    try {
         //BUSCAR UN DOCUMENTO CUYOS INDICES DE USUARIO O CORREO SEAN IGUAL AL USUARIO INGRESADO CON SU RESPECTIVA CLAVE
        const cursor = await ModeloUsuario.find({ $or:[{nombre_usuario:req.body.usuario},{correo_usuario:req.body.usuario}],clave:req.body.clave});
        //console.log(cursor);
        if(cursor.length){
            // console.log(cursor[0].nombre_usuario);
            // console.log(cursor[0].correo_usuario);
            req.session.usuario = cursor[0].nombre_usuario;
            req.session.correo = cursor[0].correo_usuario
            res.send('{"resultado":"Login exitoso", "status":200}');
        }else{
            res.send('{"resultado":"Credenciales invalidas", "status":401}');
        }   
    } catch (error) {
        res.send('{"resultado":"No se pudo iniciar sesion", "status":500}')
    }
}

module.exports = {
    vistaLogin,
    iniciarSesion
}