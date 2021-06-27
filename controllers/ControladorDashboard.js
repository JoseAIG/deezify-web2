const ModeloCancion = require('../models/Cancion');
const ObjectId = require('mongoose').Types.ObjectId; 

//FUNCION PARA DESPACHAR LA VISTA DEL DASHBOARD
const vistaDashboard = (req, res) => {
    console.log(req.session)
    //DESPACHAR LA VISTA RESPECTIVA SEGUN EL TIPO DE USUARIO
    if(req.session.tipo=="administrador"){
        res.sendFile('/public/views/Dashboard-Admin.html',{root: __dirname+"/.."});
    }
    else if(req.session.tipo=="usuario"){
        res.sendFile('/public/views/Dashboard-Usuario.html',{root: __dirname+"/.."});
    }else{
        res.redirect("/");
    }
}

//FUNCION PARA CERRAR SESION
const cerrarSesion = (req, res) => {
    req.session.destroy();
    res.send('{"resultado":"Sesion finalizada", "status":200}');
}

//FUNCION PARA REALIZAR BUSQUEDAS POR PARTE DE UN USUARIO
const realizarBusqueda = async (req, res) => {
    //console.log(req.body);
    //res.send('{"resultado":"operacion en proceso", "status":200}');
    try {
        let consulta;   //VARIABLE "consulta" QUE DEPENDIENDO DE LA PETICION DEL CLIENTE VARIARA
        //SI LA BUSQUEDA NO ES UNA LISTA DETERMINAR ARMAR LA CONSULTA EN FUNCION SI LA BUSQUEDA ES DE CANCIONES, ARTISTAS O ALBUMES
        if(req.body.select_busqueda!="listas"){
            if(req.body.select_busqueda=="canciones"){
                consulta = {nombre_cancion: req.body.palabra_clave}
            }
            else if(req.body.select_busqueda=="artistas"){
                consulta = {artista: req.body.palabra_clave}
            }
            else if(req.body.select_busqueda=="albumes"){
                consulta = {album: req.body.palabra_clave}
            }
            const documentos_busquedas = await ModeloCancion.find(consulta);
            console.log(documentos_busquedas);
            res.send(`{"status":200, "resultado_busqueda":${JSON.stringify(documentos_busquedas)}}`);
        }else{
            //PROGRAMAR EN CASO DE QUE UN USUARIO BUSQUE LISTAS
        }
    } catch (error) {
        console.log(error);
        res.send('{"resultado":"No se pudo realizar la busqueda", "status":200}');
    }
}

module.exports = {
    vistaDashboard,
    cerrarSesion,
    realizarBusqueda
}