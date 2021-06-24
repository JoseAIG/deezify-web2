const ModeloUsuario = require('../models/Usuario');
const ModeloAdministrador = require('../models/Administrador');

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
    //console.log(req.body);
    try {
        //PRIMERAMENTE BUSCAR DOCUMENTO DE ADMINISTRADOS CUYAS CREDENCIALES COINCIDAN
        const cursor_admin = await ModeloAdministrador.findOne({$or:[{nombre_administrador:req.body.usuario},{correo_administrador:req.body.usuario}],clave:req.body.clave});
        console.log(cursor_admin);
        if(cursor_admin){
            req.session.usuario = cursor_admin.nombre_administrador;
            req.session.correo = cursor_admin.correo_administrador;
            req.session.tipo = "administrador";
            req.session.objectid = cursor_admin._id;
            res.send('{"resultado":"Login exitoso, administrador", "status":200}');
        }else{
            //SI NO HAY COINCIDENCIAS DE ADMIN, BUSCAR UN DOCUMENTO CUYOS INDICES DE USUARIO O CORREO SEAN IGUAL AL USUARIO INGRESADO CON SU RESPECTIVA CLAVE
            const cursor_usuario = await ModeloUsuario.findOne({ $or:[{nombre_usuario:req.body.usuario},{correo_usuario:req.body.usuario}],clave:req.body.clave});
            console.log(cursor_usuario);
            if(cursor_usuario){
                req.session.usuario = cursor_usuario.nombre_usuario;
                req.session.correo = cursor_usuario.correo_usuario;
                req.session.tipo = "usuario";
                req.session.objectid = cursor_usuario._id;
                res.send('{"resultado":"Login exitoso", "status":200}');
            }else{
                res.send('{"resultado":"Credenciales invalidas", "status":401}');
            }   
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