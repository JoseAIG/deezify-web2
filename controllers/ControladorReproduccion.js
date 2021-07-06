const fs = require('fs');
const ModeloCancion = require('../models/Cancion');

//GET /reproduccion
//FUNCION PARA INICIALIZAR LA REPRODUCCION DE UNA CANCION, RECIBE POR PARAMETROS EL ID DE LA CANCION A REPRODUCIR
const iniciarReproduccion = async (req, res) => {
    try {
        //OBTENER EL DOCUMENTO DE LA CANCION QUE SE SOLICITA POR PARAMETROS
        const documento_cancion = await ModeloCancion.findById(req.params.id);

        //OBTENER EL RANGO DE LOS HEADERS DE LA PETICION Y COMPROBAR DE QUE EXISTAN
        const rango = req.headers.range;
        //DE NO EXISTIR EL RANGO EN LOS HEADERS, RETORNAR BAD REQUEST
        if(!rango){
            res.status(400).json({resultado:"La cabecera de rango es requerida", status:400});
        }
        //OBTENER LA RUTA DE LA PISTA DE AUDIO CON EL DOCUMENTO DE LA CANCION
        const ruta_pista = documento_cancion.ruta_cancion;
        //OBTENER EL TAMANO DE LA PISTA DE AUDIO
        const tamano_pista = fs.statSync(ruta_pista).size;

        //ESTABLECER EL TAMANO DEL FRAGMENTO DE LA PISTA A STREMEAR (1MB)
        const fragmento = Math.pow(10,6);
        //OBTENER LOS BYTES DE INICIO SEGUN EL RANGO DE LA CABECERA
        const start = Number(rango.replace(/\D/g, ""));
        //ESTABLECER EL TOPE DE LOS BYTES
        const end = Math.min(start + fragmento, tamano_pista - 1);
        //CREAR LA NUEVA CABECERA
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${tamano_pista}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "audio/mp3",
        };
        //PRIMERAMENTE ENVIAR LA CABECERA ESTABLECIENDO EL CONTENIDO PARCIAL
        res.writeHead(206, headers);

        if(start>end){

        }
        //OBTENER EL FLUJO DE LA PISTA DE AUDIO CON EL FRAGMENTO DEFINIDO (INICIO Y FIN DE BYTES)
        let audioStream = fs.createReadStream(ruta_pista, { start, end });
        //GENERAR EL STREAM CON EL FLUJO DE ENTRADA (READ) AL HACER LA CONEXION A UN FLUJO DE ESCRITURA (RESPUESTA)
        audioStream.pipe(res);   
    } catch (error) {
        console.log(error);
    }
}

//POST /reproduccion
//FUNCION PARA INICIALIZAR UNA NUEVA REPRODUCCION
// const nuevaReproduccion = async (req, res) => {
//     //LIMPIAR ARREGLO DE ELEMENTOS A REPRODUCIR
//     elementos_reproducir = []
//     //ESTABLECER EL ELEMENTO QUE SE VA A REPRODUCIR
//     let elemento = req.body.elemento;
//     if(elemento=="cancion"){
//         const documento_cancion = await ModeloCancion.findById(req.body._id).populate("artista album");
//         console.log(documento_cancion);
//         elementos_reproducir.push({
//             titulo: documento_cancion.nombre_cancion,
//             artista: documento_cancion.artista.nombre,
//             album: documento_cancion.album.nombre_album,
//             ruta: documento_cancion.ruta_cancion
//         })
//     }
//     else if(elemento=="lista"){
//         const documento_lista = await ModeloLista.findById(req.body._id)
//         .populate({
//             path:"canciones",
//             populate:{
//                 path:"artista album"
//             }
//         });
//         console.log(documento_lista);
//         for(let i=0; i<documento_lista.canciones.length; i++){
//             elementos_reproducir.push({
//                 titulo: documento_lista.canciones[i].nombre_cancion,
//                 artista: documento_lista.canciones[i].artista.nombre,
//                 album: documento_lista.canciones[i].album.nombre_album,
//                 ruta: documento_lista.canciones[i].ruta_cancion
//             });
//         }
//     }
//     //console.log(elementos_reproducir);
//     indice_cancion_reproducir = 0;
//     res.status(200).json({resultado:"Operacion en proceso", status:200});
// }

// //PUT /reproduccion
// //FUNCION PARA CAMBIAR LA PISTA DE AUDIO DEL STREAM QUE SE ENCUENTRA ACTIVO (PREVIA O SIGUIENTE)
// var elementos_reproducir;
// var indice_cancion_reproducir = 0;
// const cambiarPista = (req, res) => {
//     //OBTENER LA ACCION DEL CLIENTE
//     let accion = req.body.accion;
//     //SI LA ACCION ES REPRODUCIR LA SIGUIENTE CANCION
//     if(accion=="siguiente"){
//         //SIEMPRE Y CUANDO HAYAN MAS CANCIONES EN LA LISTA, REPRODUCIR
//         if(indice_cancion_reproducir+1<elementos_reproducir.length){
//             indice_cancion_reproducir++;
//             res.status(200).json({resultado:"Reproducir siguiente cancion", status:200});
//         }else{
//             res.status(400).json({resultado:"No hay mas canciones en la lista", status:400});
//         }
//     }
//     //SI LA ACCION ES REPRODUCIR LA ANTERIOR CANCION
//     else if(accion=="anterior"){
//         //SIEMPRE Y CUANDO EL INDICE A REPRODUCIR NO SEA MENOR A CERO, REPRODUCIR
//         if(indice_cancion_reproducir-1>=0){
//             indice_cancion_reproducir--;
//             res.status(200).json({resultado:"Reproducir anterior cancion", status:200});
//         }else{
//             res.status(400).json({resultado:"Ha llegado a la primera cancion de la lista", status:400});
//         }
//     }

//     console.log("indice cancion a reproducir", indice_cancion_reproducir);
// }

module.exports = {
    iniciarReproduccion,
    // nuevaReproduccion,
    // cambiarPista
}