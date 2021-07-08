const ModeloUsuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

const obtenerDatosPerfil = (req, res) => {
    console.log("ControladorPerfil - obtener datos perfil")
    //SI LA PETICION TIENE CONTENT-TYPE APPLICATION/JSON QUIERE DECIR QUE NO ES ACCEDIDO POR URL Y SE ENVIA LA DATA DEL USUARIO
    if(req.headers['content-type']=='application/json'){
        res.status(200).json({usuario:req.session.usuario, correo:req.session.correo, tipo:req.session.tipo, status:200});
    }else{
        res.redirect("/");
    }
}

const actualizarDatosPerfil = async (req, res) => {
    try {
        //OBTENER EL DOCUMENTO DEL USUARIO
        const documento_usuario = await ModeloUsuario.findOne({_id:req.session.objectid});
        //GUARDAR LOS NUEVOS DATOS DEL USUARIO
        documento_usuario.nombre_usuario = req.body.nombre;
        documento_usuario.correo_usuario = req.body.correo;
        //SI EL PARAMETRO DE LA CLAVE NO ESTA VACIO, ACTUALIZARLA
        if(req.body.clave!=""){
            //OBTENER EL HASH DE LA NUEVA CLAVE BRINDANDO LA CLAVE EN TEXTO PLANO Y 10 SALTROUNDS
            const hash_clave = await bcrypt.hash(req.body.clave, 10);
            documento_usuario.clave = hash_clave;
        }
        await documento_usuario.save();
        //COLOCAR LOS NUEVOS ATRIBUTOS DE LA SESION
        req.session.usuario = req.body.nombre;
        req.session.correo = req.body.correo;
        res.status(200).json({resultado:"Datos actualizados exitosamente", status:200});
        
    } catch (error) {
        console.log(error);
        if(error.code==11000){
            if(error.keyPattern.correo_usuario){
                res.status(422).json({resultado:"Correo ya registrado", status:422});
            }else{
                res.status(422).json({resultado:"Usuario ya existente", status:422});
            }
        }else{
            res.status(500).json({resultado:"No se pudo modificar los datos", status:500});
        }
    }
}

const eliminarPerfil = async (req, res) => {
    try {
        await ModeloUsuario.findOne({_id:req.session.objectid}).remove();
        req.session.destroy();
        res.status(200).json({resultado:"Perfil eliminado exitosamente", status:200});
    } catch (error) {
        res.status(500).json({resultado:"No se pudo eliminar el usuario", status:500});
    }
}

module.exports = {
    obtenerDatosPerfil,
    actualizarDatosPerfil,
    eliminarPerfil
}