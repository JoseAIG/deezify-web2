const express = require('express');
const session = require('express-session')
const mongoose = require('mongoose');
const app = express();
const puerto = process.env.PORT || 5000;

const rutasRegistro = require('./routes/RutasRegistro');
const rutasLogin = require('./routes/RutasLogin');
const rutasDashboard = require('./routes/RutasDashboard');
const rutasPerfil = require('./routes/RutasPerfil');
const rutasCanciones = require('./routes/RutasCanciones');
const rutasListas = require('./routes/RutasListas');

//app.use(express.static("public"));
app.use("/scripts", express.static(__dirname + '/public/scripts'));
app.use("/styles", express.static(__dirname + '/public/styles'));
app.use("/assets", express.static(__dirname + '/public/assets'));

app.use(session({
    secret: 'deezify-web2',
    resave: true,
    saveUninitialized: true
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//RUTAS
app.use('/registro', rutasRegistro);
app.use('/login', rutasLogin);
app.use('/dashboard', rutasDashboard);
app.use('/perfil', rutasPerfil);
app.use('/canciones', rutasCanciones);
app.use('/listas', rutasListas);

//CONECTARSE A LA BASE DE DATOS
mongoose.connect('mongodb+srv://admin:Av4lanch@deezify-cluster.voizy.mongodb.net/deezify?retryWrites=true&w=majority',{
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).catch(error => console.log(error));

//DESPACHAR LA VISTA DE INICIO (LANDING) AL ENTRAR A LA APP SIN HACER LOGIN
app.get("/",(req,res)=>{
    //SI SE POSEE UNA SESION, REDIRECCIONAR AL DASHBOARD
    //console.log(req.session)
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