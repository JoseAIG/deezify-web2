//FUNCION PARA DESPACHAR LA VISTA DEL DASHBOARD
const vistaDashboard = (req, res) => {
    console.log(req.session)
    if(req.session.usuario){
        res.sendFile('/public/views/Dashboard.html',{root: __dirname+"/.."});
    }else{
        res.redirect("/");
    }
}

//FUNCION PARA CERRAR SESION
const cerrarSesion = (req, res) => {
    req.session.destroy();
    res.send('{"resultado":"Sesion finalizada", "status":200}');
}

module.exports = {
    vistaDashboard,
    cerrarSesion
}