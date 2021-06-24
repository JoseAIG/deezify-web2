const ModeloCancion = require('../models/Cancion');
const ObjectId = require('mongoose').Types.ObjectId; 

const obtenerCancionesAdmin = async (req, res) => {
    console.log("obtener canciones admin");
    //COMPROBAR EL CONTENT TYPE DE LA PETICION PARA REDIRECCIONAR SI NO POSEE (ACCEDIENDO DE URL)
    if(req.headers['content-type']=='application/json'){
        try {
            const documentos_canciones_admin = await ModeloCancion.find({"propietario": ObjectId(req.session.objectid)});
            console.log(documentos_canciones_admin);
            res.send('{"status":200, "canciones":'+JSON.stringify(documentos_canciones_admin)+'}');
        } catch (error) {
            res.send('{"resultado":"No se pudieron obtener las canciones del admin", "status":500}');
        }
    }else{
       res.redirect("/dashboard");
    }
}

module.exports = {
    obtenerCancionesAdmin
}