const express = require('express');
const session = require('express-session')
const mongoose = require('mongoose');
const app = express();
const puerto = process.env.PORT || 5000;

const rutasRegistro = require('./routes/RutasRegistro');
const rutasLogin = require('./routes/RutasLogin');
const rutasDashboard = require('./routes/RutasDashboard');
const rutasAdmin = require('./routes/RutasAdmin');
const rutasPerfil = require('./routes/RutasPerfil');
const rutasCanciones = require('./routes/RutasCanciones');
const rutasListas = require('./routes/RutasListas');
const rutasFavoritos = require('./routes/RutasFavoritos');
const rutasSeguidos = require('./routes/RutasSeguidos');
const rutasArtistas = require('./routes/RutasArtistas');
const rutasAlbumes = require('./routes/RutasAlbumes');
const rutasReproduccion = require('./routes/RutasReproduccion');

//DIRECTORIOS Y RECURSOS ESTATICOS DE LA APP WEB 
//NOTA: NO SE USA DIRECTAMENTE "public" COMO STATIC PARA QUE NO SE ACCEDAN A LAS VISTAS HTML POR ENTRYPOINTS
app.use("/favicon.ico", express.static(__dirname + '/public/favicon.ico'));
app.use("/scripts", express.static(__dirname + '/public/scripts'));
app.use("/styles", express.static(__dirname + '/public/styles'));
app.use("/assets", express.static(__dirname + '/public/assets'));

//AJUSTES SESION
app.use(session({
    secret: 'deezify-web2',
    resave: true,
    saveUninitialized: true
}))

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//RUTAS
app.use('/registro', rutasRegistro);
app.use('/login', rutasLogin);
app.use('/dashboard', rutasDashboard);
app.use('/admin', rutasAdmin);
app.use('/perfil', rutasPerfil);
app.use('/canciones', rutasCanciones);
app.use('/listas', rutasListas);
app.use('/favoritos', rutasFavoritos);
app.use('/seguidos', rutasSeguidos);
app.use('/artistas', rutasArtistas);
app.use('/albumes', rutasAlbumes);
app.use('/reproduccion', rutasReproduccion);

//CONECTARSE A LA BASE DE DATOS
mongoose.connect('mongodb+srv://admin:Av4lanch@deezify-cluster.voizy.mongodb.net/deezify?retryWrites=true&w=majority',{
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).catch(error => console.log(error));

//DESPACHAR LA VISTA DE INICIO (LANDING) AL ENTRAR A LA APP SIN HACER LOGIN
app.get("/",(req,res)=>{
    //SI SE POSEE UNA SESION, REDIRECCIONAR AL DASHBOARD
    if(req.session.usuario){
        res.redirect("/dashboard")
    }else{
        //SI NO SE POSEE UNA SESION, DESPACHAR VISTA DE INICIO (LANDING PAGE)
        res.sendFile("./public/views/Inicio.html",{root: __dirname});
    }
});

//MENSAJE PARA RECURSOS NO ENCONTRADOS
app.use((req, res) => {
    res.status(404).sendFile("./public/views/404.html",{root: __dirname});
});

app.listen(puerto, ()=>{
    console.log("Servidor en puerto "+puerto);
});