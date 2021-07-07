//IMPORTS
import { reproducir_cancion, reproducir_arreglo_canciones } from "../dashboard-reproduccion.js";
import { seguir_album, agregar_cancion_a_favoritos } from "../dashboard-busquedas.js";

//---------------------------------------------------------- //
// CONFIGURACION DE LOS ELEMENTOS PARA VISUALIZAR LAS LISTAS //
//---------------------------------------------------------- //
//DIBUJADO DEL CONTENIDO PARA LA VISUALIZACION DE LA PERSPECTIVA DE UNA LISTA DE REPRODUCCION
//CUANDO UNA LISTA ES PROPIETARIA
var input_editar_nombre_lista = document.getElementById("input-editar-nombre-lista");
var contenedor_input_canciones = document.getElementById("contenedor-input-canciones");
function dibujar_contenido_lista_propietaria(listas, indice){
    contenedor_input_canciones.innerHTML="";
    input_editar_nombre_lista.value = listas[indice].nombre_lista;
    //obtener_canciones_lista(listas[i]._id);
    for(let i=0; i<listas[indice].canciones.length; i++){
        //CONTENEDOR DE LAS CANCIONES
        let div = document.createElement("div");
        //BOTON PARA REPRODUCIR LA CANCION
        let boton_reproducir = document.createElement("button");
        boton_reproducir.innerHTML='<img src="../assets/icons/reproducir.svg" class="icono-boton">'
        div.appendChild(boton_reproducir);
        boton_reproducir.addEventListener('click',(e)=>{
            e.preventDefault();
            reproducir_cancion(listas[indice].canciones[i]);
        });
        //INPUT PARA EL NOMBRE DE LA CANCION
        let input = document.createElement("input");
        input.type="text";
        input.disabled=true;
        input.value = listas[indice].canciones[i].nombre_cancion + ", " + listas[indice].canciones[i].artista.nombre + ", " + listas[indice].canciones[i].album.nombre_album;
        input.setAttribute("ObjectId", listas[indice].canciones[i]._id);
        input.className="input-canciones-lista";
        div.appendChild(input);
        //BOTON REMOVER CANCION DE LA LISTA
        let boton_remover = document.createElement("button");
        boton_remover.className="boton-eliminar";
        boton_remover.innerHTML="<img src='../assets/icons/remove.svg' class='icono-boton'></img>"
        div.appendChild(boton_remover);
        //EVENTO PARA REMOVER LA CANCION DE LA LISTA
        boton_remover.addEventListener('click',()=>{
            div.remove();
        });

        contenedor_input_canciones.appendChild(div);
    }
}

//CUANDO UNA LISTA ES NO ES PROPIETARIA (AJENA AL USUARIO)
var nombre_visualizar_lista = document.getElementById("nombre-visualizar-lista");
var contenedor_visualizar_canciones_lista = document.getElementById("contenedor-visualizar-canciones-lista");
var boton_dejar_de_seguir_lista = document.getElementById("boton-dejar-de-seguir-lista");
function dibujar_contenido_lista_ajena(listas, indice, seguido){
    contenedor_visualizar_canciones_lista.innerHTML = "";
    nombre_visualizar_lista.innerText = listas[indice].nombre_lista;
    boton_dejar_de_seguir_lista.style.display="block";
    for(let i=0; i<listas[indice].canciones.length; i++){
        //CONTENEDOR DE LA CANCION
        let div = document.createElement("div");
        //BOTON PARA REPRODUCIR LA CANCION
        let boton_reproducir = document.createElement("button");
        boton_reproducir.innerHTML='<img src="../assets/icons/reproducir.svg" class="icono-boton">'
        div.appendChild(boton_reproducir);
        boton_reproducir.addEventListener('click',(e)=>{
            e.preventDefault();
            reproducir_cancion(listas[indice].canciones[i]);
        });
        //INPUT QUE CONTIENE LOS DATOS DE LA CANCION
        let input = document.createElement("input");
        input.type="text";
        input.disabled=true;
        input.value = listas[indice].canciones[i].nombre_cancion + " - " + listas[indice].canciones[i].artista.nombre + " - " + listas[indice].canciones[i].album.nombre_album;
        input.className="input-canciones-lista";
        div.appendChild(input);
        //MOSTRAR UNICAMENTE EL BOTON DE UNFOLLOW UNICAMENTE CUANDO LA LISTA ESTA SIENDO SEGUIDA
        if(seguido){
            boton_dejar_de_seguir_lista.style.display="block";
        }else{
            boton_dejar_de_seguir_lista.style.display="none";
        }

        contenedor_visualizar_canciones_lista.appendChild(div);
    }
}

//------------------------------------------------------------ //
// CONFIGURACION DE LOS ELEMENTOS PARA VISUALIZAR LOS ARTISTAS //
//------------------------------------------------------------ //
//DIBUJADO DEL CONTENIDO PARA LA  VISUALIZACION DE LA PERSPECTIVA DE UN ARTISTA
var nombre_visualizar_artista = document.getElementById("nombre-visualizar-artista");
var contenedor_visualizar_albumes_artista = document.getElementById("contenedor-visualizar-albumes-artista");
var boton_dejar_de_seguir_artista = document.getElementById("boton-dejar-de-seguir-artista");
function dibujar_contenido_visualizar_artista(artistas, indice, edicion) {
    console.log("funcion visualizar contenido modal artista");
    nombre_visualizar_artista.innerHTML = artistas[indice].nombre;
    contenedor_visualizar_albumes_artista.innerHTML="";
    for(let i=0; i<artistas[indice].albumes.length; i++){
        //CREAR EL CONTENEDOR DEL ALBUM
        let div = document.createElement("div");
        //BOTON REPRODUCIR ALBUM EN LA PERSPECTIVA DE UN ARTISTA
        let boton_reproducir = document.createElement("button");
        boton_reproducir.innerHTML='<img src="../assets/icons/reproducir.svg" class="icono-boton">'
        div.appendChild(boton_reproducir);
        boton_reproducir.addEventListener('click',(e)=>{
            e.preventDefault();
            reproducir_arreglo_canciones(artistas[indice].albumes[i].canciones);
        });
        //INPUT NOMBRE ALBUM
        let input = document.createElement("input");
        input.type="text";
        input.disabled=true;
        input.value = artistas[indice].albumes[i].nombre_album;
        div.appendChild(input);
        //BOTON SEGUIR ALBUM
        let boton_seguir_album = document.createElement("button");
        boton_seguir_album.innerHTML='<img src="../assets/icons/add.svg" class="icono-boton">'
        div.appendChild(boton_seguir_album);
        boton_seguir_album.addEventListener('click',()=>{
            seguir_album(artistas[indice].albumes[i]._id);
        })

        //BOTON VISUALIZAR ALBUM
        let boton_ver_album = document.createElement("button");
        boton_ver_album.className="boton-gris";
        boton_ver_album.innerHTML='<img src="../assets/icons/visualizar.svg" class="icono-boton">'
        div.appendChild(boton_ver_album);
        //EVENTO BOTON VISUALIZAR ALBUM
        boton_ver_album.setAttribute('data-bs-toggle','modal');
        boton_ver_album.setAttribute('data-bs-target','#modal-visualizar-album');
        boton_ver_album.addEventListener('click',()=>{
            dibujar_contenido_visualizar_album(artistas[indice].albumes, i, artistas[indice].nombre);
        })

        if(edicion){
            boton_dejar_de_seguir_artista.style.display="block";
        }else{
            boton_dejar_de_seguir_artista.style.display="none";
        }

        contenedor_visualizar_albumes_artista.appendChild(div);
    }
}

//----------------------------------------------------------- //
// CONFIGURACION DE LOS ELEMENTOS PARA VISUALIZAR LOS ALBUMES //
//----------------------------------------------------------- //
//DIBUJADO DEL CONTENIDO PARA LA VISUALIZACION DE LA PERSPECTIVA DE UN ALBUM
var nombre_visualizar_album = document.getElementById("nombre-visualizar-album");
var nombre_artista_visualizar_album = document.getElementById("nombre-artista-visualizar-album");
var lanzamiento_visualizar_album = document.getElementById("lanzamiento-visualizar-album");
var contenedor_visualizar_canciones_album = document.getElementById("contenedor-visualizar-canciones-album");
var boton_dejar_de_seguir_album = document.getElementById("boton-dejar-de-seguir-album");
function dibujar_contenido_visualizar_album(contenido, indice, config){
    console.log("funcion dibujar contenido albumes", contenido, indice, config);
    nombre_visualizar_album.innerHTML=contenido[indice].nombre_album;
    //SI EL PARAMETRO CONFIG ES BRINDADO Y ES DISTINTO DE TRUE, QUIERE DECIR QUE ES EL NOMBRE DEL ARTISTA LO QUE SE ESTA ENVIANDO POR PARAMETROS
    if(config && config!==true){
        nombre_artista_visualizar_album.innerHTML=config;
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
        boton_reproducir.addEventListener('click',(e)=>{
            e.preventDefault();
            reproducir_cancion(contenido[indice].canciones[i]);
        });

        let input = document.createElement("input");
        input.type="text";
        input.disabled=true;
        input.value = contenido[indice].canciones[i].nombre_cancion;
        div.appendChild(input);

        let agregar_a_favoritos = document.createElement("button");
        agregar_a_favoritos.innerHTML='<img src="../assets/icons/corazon-vacio.svg" class="icono-boton">'
        div.appendChild(agregar_a_favoritos);
        agregar_a_favoritos.addEventListener('click',()=>{
            agregar_cancion_a_favoritos(contenido[indice].canciones[i]._id);
        })

        contenedor_visualizar_canciones_album.appendChild(div);
    }

    //SI CONFIG ES TRUE, SIGNIFICA QUE SE ESTA VIENDO EL ALBUM DESDE LA PERSPECTIVA DE UN SEGUIDOR Y POR ENDE SE LE BRINDA LA VISIBILIDAD DEL BOTON DEJAR DE SEGUIR
    if(config===true){
        boton_dejar_de_seguir_album.style.display="block";
    }else{
        boton_dejar_de_seguir_album.style.display="none";
    }

}

//EXPORT DE FUNCIONES PARA MODALS EN TABLAS BUSQUEDAS
export {
    dibujar_contenido_lista_propietaria,
    dibujar_contenido_lista_ajena,
    dibujar_contenido_visualizar_artista,
    dibujar_contenido_visualizar_album,
}