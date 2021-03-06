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
        //OBTENER EL FLUJO DE LA PISTA DE AUDIO CON EL FRAGMENTO DEFINIDO (INICIO Y FIN DE BYTES)
        let audioStream = fs.createReadStream(ruta_pista, { start, end });
        //GENERAR EL STREAM CON EL FLUJO DE ENTRADA (READ) AL HACER LA CONEXION A UN FLUJO DE ESCRITURA (RESPUESTA)
        audioStream.pipe(res);   
    } catch (error) {
        console.log(error);
    }
}

//POST /reproduccion
//FUNCION PARA INCREMENTAR EL CONTEO DE UNA REPRODUCCION DE UNA CANCION
//NOTA: EL CONTEO NO ES LLEVADO A CABO EN EL MISMO METODO GET DADO QUE POR STREAM DE CANCION, SE REALIZAN DISTINTAS LLAMADAS Y EL CONTADOR SERIA INCONGRUENTE
//DE IGUAL FORMA, ES NECESARIO QUE LA CANCION SEA ESCUCHADA AL MENOS 30 SEGUNDOS PARA QUE AUMENTE EL CONTADOR (INDIFERENTEMENTE SI SE ADELANTA O NO)
const incrementarReproduccion = async (req, res) => {
    try {
        //ACTUALIZAR EL DOCUMENTO DE LA CANCION, INCREMENTANDO EN UNA UNIDAD LA CANTIDAD DE REPRODUCCIONES DE LA CANCION
        await ModeloCancion.updateOne({_id:req.body.id}, {$inc:{reproducciones:1}});
        res.status(200).json({resultado:"Incrementada las reproducciones.", status:200});
    } catch (error) {
        console.log(error);
        res.status(500).json({resultado:"No se pudo tomar en cuenta la reproduccion.", status:500});
    }
}

module.exports = {
    iniciarReproduccion,
    incrementarReproduccion
}