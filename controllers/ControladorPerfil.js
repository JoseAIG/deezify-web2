const ModeloUsuario = require('../models/Usuario');
const ModeloAdministrador = require('../models/Administrador');

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
        console.log("ControladorPerfil - actualizar datos perfil")
        console.log(req.body)
        //COMPROBAR SI EL USUARIO LOGUEADO ES UN ADMINISTRADOR O NO
        if(req.session.tipo=="administrador"){
            //OBTENER LOS DATOS DEL ADMINISTRADOR
            const documento_administrador = await ModeloAdministrador.findOne({nombre_administrador:req.session.usuario, correo_administrador:req.session.correo});
            console.log(documento_administrador);
            //GUARDAR LOS NUEVOS DATOS DEL ADMINISTRADOR
            documento_administrador.nombre_administrador = req.body.nombre;
            documento_administrador.correo_administrador = req.body.correo;
            //SI EL PARAMETRO DE LA CLAVE NO ESTA VACIO, ACTUALIZARLA
            if(req.body.clave!=""){
                documento_administrador.clave = req.body.clave;
            }
            await documento_administrador.save();
            //COLOCAR LOS NUEVOS ATRIBUTOS DE LA SESION
            req.session.usuario = req.body.nombre;
            req.session.correo = req.body.correo;
            res.send('{"resultado":"Datos actualizados exitosamente", "status":200}');
        }else{
            //SI NO ES UN ADMINISTRADOR, OBTENER EL DOCUMENTO DEL USUARIO
            const documento_usuario = await ModeloUsuario.findOne({nombre_usuario:req.session.usuario, correo_usuario:req.session.correo});
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
        }
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
        console.log("ControladorPerfil - eliminar perfil")
        //OBTENER EL TIPO DE CUENTA DEL USUARIO
        if(req.session.tipo == "administrador"){
            const documento_administrador = await ModeloAdministrador.findOne({nombre_administrador:req.session.usuario, correo_administrador:req.session.correo});
            console.log(documento_administrador);
            documento_administrador.remove();
            req.session.destroy();
            res.send('{"resultado":"Perfil eliminado exitosamente", "status":200}');
        }else{
            //OBTENER EL DOCUMENTO DEL USUARIO
            const documento_usuario = await ModeloUsuario.findOne({nombre_usuario:req.session.usuario, correo_usuario:req.session.correo});
            console.log(documento_usuario);
            documento_usuario.remove();
            req.session.destroy();
            res.send('{"resultado":"Perfil eliminado exitosamente", "status":200}');  
        } 
    } catch (error) {
        res.send('{"resultado":"No se pudo eliminar el usuario", "status":500}');   
    }
}

module.exports = {
    obtenerDatosPerfil,
    actualizarDatosPerfil,
    eliminarPerfil
}