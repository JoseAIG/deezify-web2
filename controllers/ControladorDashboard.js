const ModeloArtista = require('../models/Artista');
const ModeloAlbum = require('../models/Album');
const ModeloCancion = require('../models/Cancion');
const ModeloLista = require('../models/Lista');

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
    res.status(200).json({resultado:"Sesion finalizada", status:200});
}

//FUNCION PARA REALIZAR BUSQUEDAS POR PARTE DE UN USUARIO CON EXPRESIONES REGULARES (REGEX) EN EL CAMPO PALABRA CLAVE PARA OBTENER MAYORES COINCIDENCIAS
const realizarBusqueda = async (req, res) => {
    try {
        //SI LA BUSQUEDA ES POR ARTISTAS
        if(req.body.select_busqueda=="artistas"){
            //BUSCAR LOS DOCUMENTOS DEL ARTISTA QUE COINCIDAN Y POPULARLOS
            const documentos_busqueda = await ModeloArtista.find({nombre:{'$regex':req.body.palabra_clave, '$options':'i'}})
            .populate({
                path: 'albumes',
                populate: {
                    path: 'canciones',
                    populate:{
                        path: 'artista album'
                    }
                }
            });
            res.status(200).json({status:200, elementos:"artistas", resultado_busqueda:documentos_busqueda});
        }
        //SI LA BUSQUEDA ES POR ALBUMES
        else if(req.body.select_busqueda=="albumes"){
            //BUSCAR LOS DOCUMENTOS DE LOS ALBUMES QUE COINCIDAN Y POPULARLOS
            const documentos_busqueda = await ModeloAlbum.find({nombre_album:{'$regex':req.body.palabra_clave, '$options':'i'}})
            .populate({
                path: "artista canciones",
                populate: {
                    path: "artista album"
                }
            });
            res.status(200).json({status:200, elementos:"albumes", resultado_busqueda:documentos_busqueda});
        }
        //SI LA BUSQUEDA ES POR CANCIONES
        else if(req.body.select_busqueda == "canciones"){
            //BUSCAR LOS DOCUMENTOS DE LAS CANCIONES QUE COINCIDAN Y POPULARLOS
            const documentos_busqueda = await ModeloCancion.find({nombre_cancion:{'$regex':req.body.palabra_clave, '$options':'i'}}).populate('artista album');
            res.status(200).json({status:200, elementos:"canciones", resultado_busqueda:documentos_busqueda});
        }
        //SI LA BUSQUEDA ES POR GENEROS
        else if(req.body.select_busqueda == "genero"){
            //SI SE REALIZA UNA BUSQUEDA POR GENERO SIN NOMBRE DE NINGUNA CANCION BUSCAR TODAS LAS CANCIONES DE ESE GENERO
            if(req.body.palabra_clave == ""){
                const documentos_busqueda = await ModeloCancion.find({genero: req.body.select_genero}).populate('artista album');
                res.status(200).json({status:200, elementos:"canciones", resultado_busqueda:documentos_busqueda});
            }else{
                const documentos_busqueda = await ModeloCancion.find({nombre_cancion:{'$regex':req.body.palabra_clave, '$options':'i'}, genero: req.body.select_genero}).populate('artista album');
                res.status(200).json({status:200, elementos:"canciones", resultado_busqueda:documentos_busqueda});
            }
        }
        //SI LA BUSQUEDA ES POR LISTAS
        else if(req.body.select_busqueda == "listas"){
            //OBTENER LOS DOCUMENTOS DE LAS LISTAS QUE COINCIDEN Y POPULARLOS
            const documentos_busqueda = await  ModeloLista.find({nombre_lista:{'$regex':req.body.palabra_clave, '$options':'i'}})
            .populate({
                path: 'canciones',
                populate: {path: 'artista album'}
            });
            res.status(200).json({status:200, elementos:"listas", resultado_busqueda:documentos_busqueda});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({resultado:"No se pudo realizar la busqueda", status:500});
    }
}

module.exports = {
    vistaDashboard,
    cerrarSesion,
    realizarBusqueda
}