//FUNCION PARA DESPACHAR LA VISTA DEL AMINISTRADOR
const vistaAdmin = (req, res) => {
    console.log(req.session)
    //DESPACHAR LA VISTA DE ADMINISTRADOR SIEMPRE Y CUANDO EL USUARIO POSEA LOS PRIVILEGIOS, SI NO LOS POSEE, REDIRECCIONAR A INICIO
    if(req.session.tipo=="administrador"){
        res.sendFile('/public/views/Dashboard-Admin.html',{root: __dirname+"/.."});
    }else{
        res.redirect("/");
    }
}

module.exports = {
    vistaAdmin
}