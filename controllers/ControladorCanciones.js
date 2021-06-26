const ModeloCancion = require('../models/Cancion');
const ObjectId = require('mongoose').Types.ObjectId; 

const obtenerCanciones = async (req, res) => {
    console.log("obtener canciones");
    //SI EL QUE REALIZA LA PETICION ES UN ADMINISTRADOR Y NO ES POR MEDIO DE LA URL, OBTENER LAS CANCIONES QUE LE PERTENECEN PARA MOSTRAR SU INFORMACION EN LA VISTA DE ADMIN
    if((req.session.tipo="administrador") && (req.headers['content-type']=='application/json')){
        try {
            const documentos_canciones_admin = await ModeloCancion.find({"propietario": ObjectId(req.session.objectid)});
            //console.log(documentos_canciones_admin);
            res.send('{"status":200, "canciones":'+JSON.stringify(documentos_canciones_admin)+'}');
        } catch (error) {
            res.send('{"resultado":"No se pudieron obtener las canciones del admin", "status":500}');
        }
    }else{
        res.redirect("/dashboard");
    }
}

module.exports = {
    obtenerCanciones
}