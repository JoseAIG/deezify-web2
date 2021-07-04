const ModeloUsuario = require('../models/Usuario');

//FUNCION PARA DESPACHAR LA VISTA DEL AMINISTRADOR
const vistaAdmin = (req, res) => {
    console.log(req.session)
    //DESPACHAR LA VISTA DE ADMINISTRADOR SIEMPRE Y CUANDO EL USUARIO POSEA LOS PRIVILEGIOS, SI NO LOS POSEE, REDIRECCIONAR A INICIO
    if(req.session.tipo=="administrador"){
        res.sendFile('/public/views/Dashboard-Admin.html',{root: __dirname+"/.."});
    }else{
        res.redirect("/");
    }
}

//FUNCION PARA CAMBIAR EL TIPO DE USUARIO A ADMINISTRADOR
const nuevoAdmin = async (req, res) => {
    try {
        console.log(req.body);
        let documento_usuario = await ModeloUsuario.findOne({$or:[{nombre_usuario:req.body.usuario},{correo_usuario:req.body.usuario}]});
        if(documento_usuario){
            documento_usuario.tipo="administrador";
            documento_usuario.save();
            res.status(200).json({resultado:"Operacion exitosa", status:200});
        }else{
            res.status(404).json({resultado:"No se ha encontrado el usuario que ha ingresado", status:404});
        }
    } catch (error) {
        res.status(500).json({resultado:"No se pudo procesar su solicitud", status:500});
    }
}

module.exports = {
    vistaAdmin,
    nuevoAdmin
}