import {dibujar_tabla_artistas_admin, dibujar_tabla_albumes_admin, dibujar_tabla_canciones_admin} from './helpers/tablas-admin.js';

//AL CARGAR LA PAGINA SOLICITAR LAS CANCIONES DEL ADMINISTRADOR PARA DIBUJARLAS EN UNA TABLA
window.onload = () => {
    //SOLICITUS DE CANCIONES DEL ADMINISTRADOR
    fetch('canciones', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data.status==200){
            dibujar_tabla_canciones_admin(data.canciones);
        }
    })	    
    .catch((error) => {
        console.error('Error:', error);
    });

    //SOLICITUS DE ARTISTAS DEL ADMINISTRADOR
    fetch('artistas', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data.status==200){
            establecer_artistas_propietario(data.artistas);
            //LLAMAR A LA FUNCION PARA DIBUJAR LA TABLA DE ARTISTAS EN "./helpers/tablas-admin.js"
            dibujar_tabla_artistas_admin(data.artistas);
        }
    })	    
    .catch((error) => {
        console.error('Error:', error);
    });

    //SOLICITUS DE ALBUMES DEL ADMINISTRADOR
    fetch('albumes', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data.status==200){
            //LLAMAR A LA FUNCION PARA DIBUJAR LA TABLA DE ALBUMES EN "./helpers/tablas-admin.js"
            dibujar_tabla_albumes_admin(data.albumes);
        }
    })	    
    .catch((error) => {
        console.error('Error:', error);
    });

}

//FUNCION PARA ESTABLECER LOS ARTISTAS QUE HA CREADO EL ADMINISTRADOR, CON ESTA FUNCION SE AGREGAN LOS ARTISTAS Y SUS ALBUMES A LOS OPTION DE LOS SELECT PARA CREAR CANCIONES Y ALBUMES
var select_artista_crear_album = document.getElementById("select-artista-crear-album");
var select_artista_crear_cancion = document.getElementById("select-artista-crear-cancion");
var select_album_crear_cancion = document.getElementById("select-album-crear-cancion");

var select_artista_editar_cancion = document.getElementById("select-artista-editar-cancion");
var select_album_editar_cancion = document.getElementById("select-album-editar-cancion");

function establecer_artistas_propietario(artistas){
    console.log(artistas);
    //RECORRER LOS ARTISTAS, GENERAR LOS OPTION CON LOS DATOS DE ESTOS Y AGREGARLOS A LOS SELECT
    for(let i=0; i<artistas.length; i++){
        let option = document.createElement("option");
        option.text = artistas[i].nombre;
        option.value = artistas[i]._id;
        select_artista_crear_album.appendChild(option);
        select_artista_crear_cancion.appendChild(option.cloneNode(true))

        select_artista_editar_cancion.appendChild(option.cloneNode(true))
    }

    //CUANDO SE CAMBIE LA SELECCION DEL ARTISTA CUANDO SE CREA UNA CANCION, MOSTRAR EN EL SELECT DE ALBUM UNICAMENTE LOS ALBUMES PERTENECIENTES A ESE ARTISTA SELECCIONADO
    select_artista_crear_cancion.addEventListener('change',()=>{
        let indice_artista = artistas.findIndex(i => i._id == select_artista_crear_cancion.value);
        select_album_crear_cancion.innerHTML='<option value="">Seleccione un álbum</option>';
        for(let i=0; i<artistas[indice_artista].albumes.length; i++){
            let option = document.createElement("option");
            option.text = artistas[indice_artista].albumes[i].nombre_album;
            option.value = artistas[indice_artista].albumes[i]._id;
            select_album_crear_cancion.appendChild(option);
        }
    })

    select_artista_editar_cancion.addEventListener('change',()=>{
        let indice_artista = artistas.findIndex(i => i._id == select_artista_editar_cancion.value);
        select_album_editar_cancion.innerHTML='<option value="">Seleccione un álbum</option>';
        for(let i=0; i<artistas[indice_artista].albumes.length; i++){
            let option = document.createElement("option");
            option.text = artistas[indice_artista].albumes[i].nombre_album;
            option.value = artistas[indice_artista].albumes[i]._id;
            select_album_editar_cancion.appendChild(option);
        }
    })
}

//FUNCIONALIDAD PARA CREAR UN NUEVO ARTISTA
var form_nuevo_artista = document.getElementById("form-nuevo-artista");
var boton_guardar_nuevo_artista = document.getElementById("boton-guardar-nuevo-artista");
const guardar_nuevo_artista = () => {
    let datos_form_nuevo_artista = new FormData(form_nuevo_artista);
    fetch('artistas', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(Object.fromEntries(datos_form_nuevo_artista.entries()))
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert(data.resultado);
        if(data.status==200){
            window.open("/admin","_self");
        }
    })	    
    .catch((error) => {
        console.error('Error:', error);
    });
}
boton_guardar_nuevo_artista.onclick = guardar_nuevo_artista;

//FUNCIONALIDAD PARA CREAR UN NUEVO ALBUM
var form_nuevo_album = document.getElementById("form-nuevo-album");
var boton_guardar_nuevo_album = document.getElementById("boton-guardar-nuevo-album");
const guardar_nuevo_album = () => {
    let datos_form_nuevo_album = new FormData(form_nuevo_album);
    console.log("crear nuevo album",JSON.stringify(Object.fromEntries(datos_form_nuevo_album.entries())));
    fetch('albumes', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(Object.fromEntries(datos_form_nuevo_album.entries()))
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert(data.resultado);
        if(data.status==200){
            window.open("/admin","_self");
        }
    })	    
    .catch((error) => {
        console.error('Error:', error);
    });
}
boton_guardar_nuevo_album.onclick = guardar_nuevo_album;

//FUNCION PARA SUBIR UNA CANCION
var form_nueva_cancion = document.getElementById("form-nueva-cancion");
var boton_guardar_nueva_cancion = document.getElementById("boton-guardar-nueva-cancion");
const guardar_nueva_cancion = () => {
    let datos_form_nueva_cancion = new FormData(form_nueva_cancion);
    //COMPROBAR QUE LOS CAMPOS CONTIENEN INFORMACION
    if(datos_form_nueva_cancion.get("titulo")=="" || datos_form_nueva_cancion.get("genero")=="" || datos_form_nueva_cancion.get("artista")=="" || datos_form_nueva_cancion.get("album")==""){
        alert("Complete todos los campos de la cancion.");
    }else{
        fetch('canciones', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(Object.fromEntries(datos_form_nueva_cancion.entries()))
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert(data.resultado);
            if(data.status==200){
                window.open("/admin","_self");
            }
        })	    
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}
boton_guardar_nueva_cancion.onclick=guardar_nueva_cancion;

//FUNCIONALIDAD PARA ACTUALIZAR LOS DATOS DE UNA CANCION (SE DEFINE UNA FUNCION QUE CONTIENE OTRA PARA PODER OBTENER EL ID DE LA CANCION)
var form_editar_cancion = document.getElementById("form-editar-cancion");
var boton_guardar_editar_cancion = document.getElementById("boton-guardar-editar-cancion");
function editar_cancion(id_cancion){
    boton_guardar_editar_cancion.onclick = () => {
        let datos_form_editar_cancion = new FormData(form_editar_cancion);
        datos_form_editar_cancion.append("id_cancion", id_cancion);
        fetch('canciones', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(Object.fromEntries(datos_form_editar_cancion.entries()))
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert(data.resultado);
            if(data.status==200){
                window.open("/admin","_self");
            }
        })	    
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

//FUNCIONALIDAD PARA ELIMINAR UNA CANCION (SE DEFINE UNA FUNCION QUE CONTIENE OTRA PARA PODER OBTENER EL ID DE LA CANCION)
var boton_eliminar_cancion = document.getElementById("boton-eliminar-cancion");
function eliminar_cancion(id_cancion){
    boton_eliminar_cancion.onclick = () => {
        fetch('canciones', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: `{"id_cancion": "${id_cancion}"}`
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert(data.resultado);
            if(data.status==200){
                window.open("/admin","_self");
            }
        })	    
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

export{
    editar_cancion,
    eliminar_cancion
}