const ModeloUsuario = require('../models/Usuario');

const obtenerDatosPerfil = (req, res) => {
    console.log("ControladorPerfil - obtener datos perfil")
    //SI LA PETICION TIENE CONTENT-TYPE APPLICATION/JSON QUIERE DECIR QUE NO ES ACCEDIDO POR URL Y SE ENVIA LA DATA DEL USUARIO
    if(req.headers['content-type']=='application/json'){
        res.send('{"status":200, "usuario":"'+ req.session.usuario +'", "correo":"'+req.session.correo+'", "tipo":"'+req.session.tipo+'"}')
    }else{
        res.redirect("/");
    }
}

const actualizarDatosPerfil = async (req, res) => {
    try {
        //OBTENER EL DOCUMENTO DEL USUARIO
        const documento_usuario = await ModeloUsuario.findOne({_id:req.session.objectid});
        console.log(documento_usuario);
        //GUARDAR LOS NUEVOS DATOS DEL USUARIO
        documento_usuario.nombre_usuario = req.body.nombre;
        documento_usuario.correo_usuario = req.body.correo;
        //SI EL PARAMETRO DE LA CLAVE NO ESTA VACIO, ACTUALIZARLA
        if(req.body.clave!=""){
            documento_usuario.clave = req.body.clave;
        }
        await documento_usuario.save();
        //COLOCAR LOS NUEVOS ATRIBUTOS DE LA SESION
        req.session.usuario = req.body.nombre;
        req.session.correo = req.body.correo;
        res.send('{"resultado":"Datos actualizados exitosamente", "status":200}');
        
    } catch (error) {
        console.log(error);
        if(error.code==11000){
            res.send('{"resultado":"Error: Usuario ya existente", "status":422}');
        }else{
            res.send('{"resultado":"No se pudo modificar los datos", "status":500}');   
        }
    }
}

const eliminarPerfil = async (req, res) => {
    try {
        await ModeloUsuario.findOne({_id:req.session.objectid}).remove();
        req.session.destroy();
        res.send('{"resultado":"Perfil eliminado exitosamente", "status":200}');  
    } catch (error) {
        res.send('{"resultado":"No se pudo eliminar el usuario", "status":500}');   
    }
}

module.exports = {
    obtenerDatosPerfil,
    actualizarDatosPerfil,
    eliminarPerfil
}