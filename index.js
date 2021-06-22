const express = require('express');
const mongoose = require('mongoose');
const app = express();
const puerto = process.env.PORT || 5000;

const ModeloUsuario = require('./models/Usuario');

//app.use(express.static("public"));
app.use("/scripts", express.static(__dirname + '/public/scripts'));
app.use("/styles", express.static(__dirname + '/public/styles'));
app.use("/assets", express.static(__dirname + '/public/assets'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//CONECTARSE A LA BASE DE DATOS
mongoose.connect('mongodb+srv://admin:Av4lanch@deezify-cluster.voizy.mongodb.net/deezify?retryWrites=true&w=majority',{
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

//DESPACHAR LA VISTA DE INICIO (LANDING) AL ENTRAR A LA APP SIN HACER LOGIN
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/views/Inicio.html");
});

//DESPACHAR LA VISTA DE REGISTRO
app.get("/registro",(req,res)=>{
    res.sendFile(__dirname+"/public/views/Registro.html");
})

//REGISTRO DE UN USUARIO EN LA BASE DE DATOS
app.post("/registro", async (req, res)=>{
    console.log(req.body);
    const usuario = new ModeloUsuario({nombre_usuario: req.body.usuario, correo_usuario: req.body.correo, clave: req.body.clave});
    try {
        await usuario.save();
    } catch (error) {
        console.log(error);
        if(error.code==11000){
            res.send('{"resultado":"Usuario ya existente", "status":422}');
        }else{
            res.send('{"resultado":"No se pudo realizar el registro", "status":500}');
        }
    }
    res.send('{"resultado":"Registro exitoso", "status":200}');
})

//DESPACHAR LA VISTA DE LOGIN
app.get("/login",(req,res)=>{
    res.sendFile(__dirname+"/public/views/login.html");
})

//LOGIN DE UN USUARIO
app.post("/login", async(req, res)=>{
    console.log("peticion de login");
    console.log(req.body);
    //BUSCAR UN DOCUMENTO CUYOS INDICES DE USUARIO O CORREO SEAN IGUAL AL USUARIO INGRESADO CON SU RESPECTIVA CLAVE
    const cursor = await ModeloUsuario.find({ $or:[{nombre_usuario:req.body.usuario},{correo_usuario:req.body.usuario}],clave:req.body.clave});
    console.log(cursor);
    if(cursor.length){
        res.send('{"resultado":"Login exitoso", "status":200}');
    }else{
        res.send('{"resultado":"Credenciales invalidas", "status":401}');
    }
});

app.listen(puerto, ()=>{
    console.log("Servidor en puerto "+puerto);
});