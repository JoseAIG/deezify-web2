import { reproducir_cancion, reproducir_arreglo_canciones } from "./dashboard-reproduccion.js";

var boton_ver_favoritos = document.getElementById("ver-favoritos");
var contenedor_favoritos = document.getElementById("contenedor-favoritos");

const obtener_favoritos = () => {
    fetch('favoritos', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(data => {
        dibujar_favoritos(data.favoritos);
    })	    
    .catch((error) => {
        console.error('Error:', error);
    }); 
}
boton_ver_favoritos.onclick = obtener_favoritos;

function dibujar_favoritos(favoritos) {
    //LIMPIAR EL CONTENEDOR DE FAVORITOS
    contenedor_favoritos.innerHTML="";
    //RECORRER LOS FAVORITOS Y CREAR ELEMENTOS PARA MOSTRARLOS EN EL CONTENEDOR DENTRO DEL MODAL VER FAVORITOS
    if(favoritos.length){
        for(let i=0;i<favoritos.length;i++){
            let div = document.createElement("div");

            let boton_reproducir = document.createElement("button");
            boton_reproducir.innerHTML='<img src="../assets/icons/reproducir.svg" class="icono-boton">'
            div.appendChild(boton_reproducir);
            //FUNCIONALIDAD PARA REPRODUCIR UNA CANCION EN FAVORITOS
            boton_reproducir.addEventListener('click',()=>{
                reproducir_cancion(favoritos[i]);
            });

            let input = document.createElement("input")
            input.disabled=true;
            input.value=favoritos[i].nombre_cancion + " - " + favoritos[i].artista.nombre + " - " + favoritos[i].album.nombre_album;
            div.appendChild(input);

            let boton_remover = document.createElement("button");
            boton_remover.className="boton-eliminar";
            boton_remover.innerHTML='<img src="../assets/icons/remove.svg" class="icono-boton">'
            div.appendChild(boton_remover)
            
            contenedor_favoritos.appendChild(div);
    
            boton_remover.addEventListener('click',()=>{
                remover_favorito(favoritos[i]._id);
            });
        }
    }else{
        contenedor_favoritos.innerHTML="<h4>No tienes ninguna canción en favoritos. ¡Busca y añade alguna!";
    }
}

var boton_reproducir_favoritos = document.getElementById("reproducir-favoritos");
var boton_reproducir_modal_favoritos = document.getElementById("boton-reproducir-modal-favoritos");
function reproducir_favoritos(){
    fetch('favoritos', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(data => {
        reproducir_arreglo_canciones(data.favoritos);
    })	    
    .catch((error) => {
        console.error('Error:', error);
    }); 
}
boton_reproducir_favoritos.onclick = reproducir_favoritos;
boton_reproducir_modal_favoritos.onclick = reproducir_favoritos;

function remover_favorito(id_cancion) {
    fetch('favoritos', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: '{"id_cancion":"'+id_cancion+'"}'
    })
    .then(response => response.json())
    .then(data => {
        if(data.status==200){
            obtener_favoritos();
        }
    })	    
    .catch((error) => {
        console.error('Error:', error);
    }); 
}