//DIBUJADO DEL CONTENIDO PARA LA VISUALIZACION DE LA PERSPECTIVA DE UN ALBUM
var nombre_visualizar_album = document.getElementById("nombre-visualizar-album");
var nombre_artista_visualizar_album = document.getElementById("nombre-artista-visualizar-album");
var lanzamiento_visualizar_album = document.getElementById("lanzamiento-visualizar-album");
var contenedor_visualizar_canciones_album = document.getElementById("contenedor-visualizar-canciones-album");
function dibujar_contenido_visualizar_album(contenido, indice, artista){
    console.log("funcion dibujar contenido albumes", contenido, indice, artista);
    nombre_visualizar_album.innerHTML=contenido[indice].nombre_album;
    if(artista){
        nombre_artista_visualizar_album.innerHTML=artista;
    }else{
        nombre_artista_visualizar_album.innerHTML=contenido[indice].artista.nombre;
    }
    lanzamiento_visualizar_album.innerHTML=contenido[indice].lanzamiento;
    contenedor_visualizar_canciones_album.innerHTML="";
    for(let i=0; i<contenido[indice].canciones.length; i++){
        let div = document.createElement("div");
        let boton_reproducir = document.createElement("button");
        boton_reproducir.innerHTML='<img src="../assets/icons/reproducir.svg" class="icono-boton">'
        div.appendChild(boton_reproducir);

        let input = document.createElement("input");
        input.type="text";
        input.disabled=true;
        input.value = contenido[indice].canciones[i].nombre_cancion;
        div.appendChild(input);

        let boton_ver_album = document.createElement("button");
        boton_ver_album.innerHTML='<img src="../assets/icons/corazon-vacio.svg" class="icono-boton">'
        div.appendChild(boton_ver_album);

        contenedor_visualizar_canciones_album.appendChild(div);
    }
}