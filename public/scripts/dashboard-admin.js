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
var select_artista_editar_album = document.getElementById("select-artista-editar-album");

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
        select_artista_editar_album.appendChild(option.cloneNode(true));

        select_artista_crear_cancion.appendChild(option.cloneNode(true))
        select_artista_editar_cancion.appendChild(option.cloneNode(true))
    }

    //CUANDO SE CAMBIE LA SELECCION DEL ARTISTA CUANDO SE CREA UNA CANCION, MOSTRAR EN EL SELECT DE ALBUM UNICAMENTE LOS ALBUMES PERTENECIENTES A ESE ARTISTA SELECCIONADO
    select_artista_crear_cancion.addEventListener('change',()=>{
        let indice_artista = artistas.findIndex(i => i._id == select_artista_crear_cancion.value);
        select_album_crear_cancion.innerHTML='<option value="">Seleccione un ??lbum</option>';
        for(let i=0; i<artistas[indice_artista].albumes.length; i++){
            let option = document.createElement("option");
            option.text = artistas[indice_artista].albumes[i].nombre_album;
            option.value = artistas[indice_artista].albumes[i]._id;
            select_album_crear_cancion.appendChild(option);
        }
    })

    select_artista_editar_cancion.addEventListener('change',()=>{
        let indice_artista = artistas.findIndex(i => i._id == select_artista_editar_cancion.value);
        select_album_editar_cancion.innerHTML='<option value="">Seleccione un ??lbum</option>';
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
    if(datos_form_nuevo_artista.get("artista")==""){
        alert("Favor ingrese el nombre del artista");
    }else{
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
}
boton_guardar_nuevo_artista.onclick = guardar_nuevo_artista;

//FUNCIONALIDAD PARA EDITAR UN ARTISTA
var form_editar_artista = document.getElementById("form-editar-artista");
var boton_guardar_editar_artista = document.getElementById("boton-guardar-editar-artista");
function editar_artista(id_artista){
    boton_guardar_editar_artista.onclick = () => {
        let datos_form_editar_artista = new FormData(form_editar_artista);
        datos_form_editar_artista.append("id_artista", id_artista);
        if(datos_form_editar_artista.get("artista")==""){
            alert("Favor ingrese el nombre del artista");
        }else{
            fetch('artistas', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(Object.fromEntries(datos_form_editar_artista.entries()))
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
}

//FUNCIONALIDAD PARA ELIMINAR UN ARTISTA
var boton_eliminar_artista = document.getElementById("boton-eliminar-artista");
function eliminar_artista(id_artista){
    boton_eliminar_artista.onclick = () => {
        fetch('artistas', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: `{"id_artista": "${id_artista}"}`
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

//FUNCIONALIDAD PARA CREAR UN NUEVO ALBUM
var form_nuevo_album = document.getElementById("form-nuevo-album");
var boton_guardar_nuevo_album = document.getElementById("boton-guardar-nuevo-album");
const guardar_nuevo_album = () => {
    let datos_form_nuevo_album = new FormData(form_nuevo_album);
    if(datos_form_nuevo_album.get("album")=="" || datos_form_nuevo_album.get("fecha")=="" || datos_form_nuevo_album.get("artista")==""){
        alert("Favor llene todos los campos para crear el album");
    }else{
        fetch('albumes', {
            method: 'POST',
            body: datos_form_nuevo_album
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
boton_guardar_nuevo_album.onclick = guardar_nuevo_album;

//FUNCIONALIDAD PARA EDITAR UN ALBUM EXISTENTE
var form_editar_album = document.getElementById("form-editar-album");
var boton_guardar_editar_album = document.getElementById("boton-guardar-editar-album");
function editar_album(id_album){
    boton_guardar_editar_album.onclick = () => {
        let datos_form_editar_album = new FormData(form_editar_album);
        datos_form_editar_album.append("id_album", id_album);
        if(datos_form_editar_album.get("album")=="" || datos_form_editar_album.get("fecha")=="" || datos_form_editar_album.get("artista")==""){
            alert("Favor llene todos los campos para editar el album");
        }else{
            fetch('albumes', {
                method: 'PUT',
                body: datos_form_editar_album
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
}

//FUNCIONALIDAD PARA ELIMINAR UN ALBUM EXISTENTE DE UN USUARIO
var boton_eliminar_album = document.getElementById("boton-eliminar-album");
function eliminar_album(id_album){
    boton_eliminar_album.onclick = () => {
        fetch('albumes', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: `{"id_album": "${id_album}"}`
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
            body: datos_form_nueva_cancion
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
        if(datos_form_editar_cancion.get("titulo")=="" || datos_form_editar_cancion.get("genero")=="" || datos_form_editar_cancion.get("artista")=="" || datos_form_editar_cancion.get("album")==""){
            alert("Favor complete todos los campos para editar la cancion");
        }else{
            fetch('canciones', {
                method: 'PUT',
                body: datos_form_editar_cancion
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

//FUNCIONALIDAD PARA DELEGAR UN PERFIL REGISTRADO COMO ADMINISTRADOR
var form_nuevo_admin = document.getElementById("form-nuevo-admin");
var boton_guardar_nuevo_admin = document.getElementById("boton-guardar-nuevo-admin");
const guardar_nuevo_admin = () => {
    let datos_form_nuevo_admin = new FormData(form_nuevo_admin);
    fetch('admin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(Object.fromEntries(datos_form_nuevo_admin.entries()))
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
boton_guardar_nuevo_admin.onclick = guardar_nuevo_admin;

//EXPORT DE FUNCIONES DE UTILIDAD PARA ARTISTAS, ALBUMES Y CANCIONES, EMPLEADAS EN "tablas-admin.js"
export{
    //FUNCIONALIDADES ARTISTA
    editar_artista,
    eliminar_artista,
    //FUNCIONALIDADES ALBUM
    editar_album,
    eliminar_album,
    //FUNCIONALIDADES CANCION
    editar_cancion,
    eliminar_cancion
}