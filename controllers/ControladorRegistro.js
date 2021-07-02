const ModeloUsuario = require('../models/Usuario');

const vistaRegistro = (req, res) => {
    //SI EXISTE UNA SESION, REDIRECCIONAR AL DASHBOARD, DE NO EXISTIR, DESPACHAR VISTA DE REGISTRO
    if(req.session.usuario){
        res.redirect("/dashboard");
    }else{
        res.sendFile('/public/views/Registro.html',{root: __dirname+"/.."});
    }
}

const registrarUsuario = async (req, res) => {
    console.log(req.body);
    const usuario = new ModeloUsuario({nombre_usuario: req.body.usuario, correo_usuario: req.body.correo, clave: req.body.clave, tipo: "usuario"});
    try {
        await usuario.save();
    } catch (error) {
        console.log(error);
        if(error.code==11000){
            res.send('{"resultado":"Usuario ya existente", "status":422}');
        }else{
            res.send('{"resultado":"No se pudo realizar el registro", "status":500}');
        }
    }
    res.send('{"resultado":"Registro exitoso", "status":200}');
}

module.exports = {
    vistaRegistro,
    registrarUsuario
}