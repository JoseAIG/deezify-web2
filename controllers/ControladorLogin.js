const ModeloUsuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

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
    try {
        //OBTENER EL DOCUMENTO DEL USUARIO CUYO USUARIO O CORREO ELECTRONICO COINCIDA CON EL INGRESADO POR EL USUARIO
        const documento_usuario = await ModeloUsuario.findOne({ $or:[{nombre_usuario:req.body.usuario},{correo_usuario:req.body.usuario}]});
        //SI AL COMPARAR LA CLAVE EN TEXTO PLANO CON LA CLAVE HASHEADA EN LA BASE DE DATOS ES EXITOSO, PROCEDER CON EL LOGIN
        if(await bcrypt.compare(req.body.clave, documento_usuario.clave)){
            req.session.usuario = documento_usuario.nombre_usuario;
            req.session.correo = documento_usuario.correo_usuario;
            req.session.tipo = documento_usuario.tipo;
            req.session.objectid = documento_usuario._id;
            res.status(200).json({resultado:"Login exitoso", status:200});
        }else{
            res.status(401).json({resultado:"Credenciales invalidas", status:401});
        } 

    } catch (error) {
        console.log(error)
        res.send('{"resultado":"No se pudo iniciar sesion", "status":500}')
    }
}

module.exports = {
    vistaLogin,
    iniciarSesion
}