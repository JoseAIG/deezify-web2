//FUNCION PARA DESPACHAR LA VISTA DEL DASHBOARD
const vistaDashboard = (req, res) => {
    res.sendFile('/public/views/Dashboard.html',{root: __dirname+"/.."});
}

//FUNCION PARA CERRAR SESION
const cerrarSesion = (req, res) => {

}

module.exports = {
    vistaDashboard,
    cerrarSesion
}