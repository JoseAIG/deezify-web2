//--------------------------------------------------------------- //
// CONFIGURACION DE LOS ELEMENTOS PARA LAS EDICIONES POR UN ADMIN //
//--------------------------------------------------------------- //
//CONFIGURACION DEL CONTENIDO DE LOS ELEMENTOS PARA EDITAR UNA CANCION
var input_editar_titulo_cancion = document.getElementById("input-editar-titulo-cancion");
var select_genero_editar_cancion = document.getElementById("select-genero-editar-cancion");
var select_artista_editar_cancion = document.getElementById("select-artista-editar-cancion");
var select_album_editar_cancion = document.getElementById("select-album-editar-cancion");
function dibujar_contenido_editar_cancion(canciones, indice, artista, album){
    //COLOCAR EL NOMBRE DE LA CANCION EN EL INPUT PARA EDICION
    input_editar_titulo_cancion.value = canciones[indice].nombre_cancion;
    //ASIGNAR LA OPCION DEL SELECT DEL GENERO DE LA CANCION
    select_genero_editar_cancion.value = canciones[indice].genero;
    //ASIGNAR LA OPCION DEL SELECT ARTISTA
    select_artista_editar_cancion.value = artista;
    //ASIGNAR LA OPCION DEL SELECT ALBUM EN BASE AL ARTISTA Y A LA SELECCION ACTUAL
    select_album_editar_cancion.innerHTML='<option value="">Seleccione un álbum</option>';
    for(let i=0; i<canciones[indice].artista.albumes.length; i++){
        let option = document.createElement("option");
        option.text = canciones[indice].artista.albumes[i].nombre_album;
        option.value = canciones[indice].artista.albumes[i]._id;
        select_album_editar_cancion.appendChild(option);
    }
    select_album_editar_cancion.value = album;
}

//CONFIGURACION DEL CONTENIDO DE LOS ELEMENTOS PARA EDITAR UN ARTISTA
var input_editar_artista = document.getElementById("input-editar-artista");
function dibujar_contenido_editar_artista(artista) {
    input_editar_artista.value = artista;
}

//CONFIGURACION DEL CONTENIDO DE LOS ELEMENTOS PARA EDITAR UN ALBUM
var input_nombre_editar_album = document.getElementById("input-nombre-editar-album");
var input_fecha_editar_album = document.getElementById("input-fecha-editar-album");
var select_artista_editar_album = document.getElementById("select-artista-editar-album");
function dibujar_contenido_editar_album(album){
    input_nombre_editar_album.value = album.nombre_album;
    input_fecha_editar_album.value = album.lanzamiento;
    select_artista_editar_album.value = album.artista._id;
}

//EXPORT DE FUNCIONES PARA MODALS EN LA VISTA DE ADMINISTRADOR
export {
    dibujar_contenido_editar_artista,
    dibujar_contenido_editar_album,
    dibujar_contenido_editar_cancion
}