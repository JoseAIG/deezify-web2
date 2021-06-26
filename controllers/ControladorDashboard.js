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

module.exports = {
    vistaDashboard,
    cerrarSesion
}