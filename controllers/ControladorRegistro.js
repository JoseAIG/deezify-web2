const ModeloUsuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

const vistaRegistro = (req, res) => {
    //SI EXISTE UNA SESION, REDIRECCIONAR AL DASHBOARD, DE NO EXISTIR, DESPACHAR VISTA DE REGISTRO
    if(req.session.usuario){
        res.redirect("/dashboard");
    }else{
        res.sendFile('/public/views/Registro.html',{root: __dirname+"/.."});
    }
}

const registrarUsuario = async (req, res) => {
    try {
        //OBTENER EL HASH DE LA CLAVE BRINDANDO LA CLAVE EN TEXTO PLANO Y 10 SALTROUNDS
        const hash_clave = await bcrypt.hash(req.body.clave, 10);
        //GENERAR EL NUEVO DOCUMENTO CON EL ESQUEMA DEL USUARIO Y GUARDARLO
        const usuario = new ModeloUsuario({nombre_usuario: req.body.usuario, correo_usuario: req.body.correo, clave: hash_clave, tipo: "usuario"});
        await usuario.save();
        res.status(200).json({resultado:"Registro exitoso", status:200});
    } catch (error) {
        console.log(error);
        if(error.code==11000){
            if(error.keyPattern.correo_usuario){
                res.status(422).json({resultado:"Correo ya registrado", status:422});
            }else{
                res.status(422).json({resultado:"Usuario ya existente", status:422});
            }
        }else{
            res.status(500).json({resultado:"No se pudo realizar el registro",status:500});
        }
    }
}

module.exports = {
    vistaRegistro,
    registrarUsuario
}