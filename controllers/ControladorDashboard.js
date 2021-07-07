const ModeloArtista = require('../models/Artista');
const ModeloAlbum = require('../models/Album');
const ModeloCancion = require('../models/Cancion');
const ModeloLista = require('../models/Lista');
const ObjectId = require('mongoose').Types.ObjectId; 

//FUNCION PARA DESPACHAR LA VISTA DEL DASHBOARD
const vistaDashboard = (req, res) => {
    //SI EXISTE UNA SESION ACTIVA, DESPACHAR LA VISTA DE DASHBOARD
    if(req.session.tipo){
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

    try {
        if(req.body.select_busqueda=="artistas"){
            const documentos_busqueda = await ModeloArtista.find({nombre: req.body.palabra_clave})
            .populate({
                path: 'albumes',
                populate: {
                    path: 'canciones',
                    populate:{
                        path: 'artista album'
                    }
                }
            });
            res.send('{"status":200, "elementos":"artistas", "resultado_busqueda":'+JSON.stringify(documentos_busqueda)+'}');
        }
        else if(req.body.select_busqueda=="albumes"){
            const documentos_busqueda = await ModeloAlbum.find({nombre_album: req.body.palabra_clave})
            .populate({
                path: "artista canciones",
                populate: {
                    path: "artista album"
                }
            });
            res.send('{"status":200, "elementos":"albumes", "resultado_busqueda":'+JSON.stringify(documentos_busqueda)+'}');
        }
        else if(req.body.select_busqueda == "canciones"){
            const documentos_busqueda = await ModeloCancion.find({nombre_cancion: req.body.palabra_clave}).populate('artista album');
            res.send('{"status":200, "elementos":"canciones", "resultado_busqueda":'+JSON.stringify(documentos_busqueda)+'}');
        }
        else if(req.body.select_busqueda == "genero"){
            //SI SE REALIZA UNA BUSQUEDA POR GENERO SIN NOMBRE DE NINGUNA CANCION BUSCAR TODAS LAS CANCIONES DE ESE GENERO
            if(req.body.palabra_clave == ""){
                const documentos_busqueda = await ModeloCancion.find({genero: req.body.select_genero}).populate('artista album');
                res.status(200).json({status:200, elementos:"canciones", resultado_busqueda:documentos_busqueda});
            }else{
                const documentos_busqueda = await ModeloCancion.find({nombre_cancion: req.body.palabra_clave, genero: req.body.select_genero}).populate('artista album');
                res.status(200).json({status:200, elementos:"canciones", resultado_busqueda:documentos_busqueda});
            }
        }
        else if(req.body.select_busqueda == "listas"){
            const documentos_busqueda = await  ModeloLista.find({nombre_lista: req.body.palabra_clave})
            .populate({
                path: 'canciones',
                populate: {path: 'artista album'}
            });
            res.send('{"status":200, "elementos":"listas", "resultado_busqueda":'+JSON.stringify(documentos_busqueda)+'}');
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