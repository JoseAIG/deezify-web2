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
            dibujar_lista_canciones_admin(data.canciones);
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
            dibujar_lista_artistas_admin(data.artistas);
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
            //establecer_artistas_propietario(data.artistas);
            dibujar_lista_albumes_admin(data.albumes);
        }
    })	    
    .catch((error) => {
        console.error('Error:', error);
    });

}

//FUNCION PARA MOSTRAR LA LISTA DE LOS ARTISTAS DEL ADMINISTRADOR
var contenedor_artistas = document.getElementById("contenedor-artistas");
function dibujar_lista_artistas_admin(arreglo_artistas){
    console.log("dibujar lista artistas", arreglo_artistas);

    // for(let i=0; i<arreglo_artistas.length; i++){
    //     let div = document.createElement("div");
    //     div.className="lista-artista";
    //     let h5 = document.createElement("h5");
    //     h5.innerText=arreglo_artistas[i].nombre
    //     div.appendChild(h5);
    //     let boton_editar = document.createElement("button");
    //     boton_editar.innerHTML="<img src='../assets/icons/edit.svg' class='icono-boton'>"
    //     div.appendChild(boton_editar);
    //     // div.innerHTML=`<h5>${arreglo_artistas[i].nombre}</h5>`;
    //     contenedor_artistas.appendChild(div);
    // }

    let h3 = document.createElement("h3");
    h3.innerText="Tus artistas";
    contenedor_artistas.appendChild(h3);

    let table = document.createElement('table');
    let tableBody = document.createElement('tbody');
    table.appendChild(tableBody);
    //RECORRER LAS CANCIONES
    for(let i=0; i<arreglo_artistas.length; i++){
        let tr = document.createElement('tr');
        tableBody.appendChild(tr);
        for (let j=0; j<2; j++) {
            var td = document.createElement('td');
            let contenido_celda = document.createElement('div');
            if(j==0){
                contenido_celda.innerHTML=`<h4>${arreglo_artistas[i].nombre}</h4>`;
            }
            else if (j==1){
                contenido_celda.innerHTML="<button><img src='../assets/icons/edit.svg' class='icono-boton'></button>";
            }
            td.appendChild(contenido_celda);
            tr.appendChild(td);
        }
    }
    contenedor_artistas.appendChild(table);
}

//DIBUJAR LISTA DE ALBUMES QUE EL ADMIN HA INGRESADO
var contenedor_albumes = document.getElementById("contenedor-albumes");
function dibujar_lista_albumes_admin(arreglo_albumes){
    let h3 = document.createElement("h3");
    h3.innerText="Tus albumes";
    contenedor_albumes.appendChild(h3);

    let table = document.createElement('table');
    let tableBody = document.createElement('tbody');
    table.appendChild(tableBody);
    //RECORRER LAS CANCIONES
    for(let i=0; i<arreglo_albumes.length; i++){
        let tr = document.createElement('tr');
        tableBody.appendChild(tr);
        for (let j=0; j<5; j++) {
            var td = document.createElement('td');
            let contenido_celda = document.createElement('div');
            if(j==0){
                contenido_celda.innerHTML=`<h4>${arreglo_albumes[i].nombre_album}</h4>`;
            }
            else if(j==1){
                contenido_celda.innerHTML=arreglo_albumes[i].artista.nombre;
            }
            else if(j==2){
                contenido_celda.innerHTML=arreglo_albumes[i].lanzamiento;
            }
            else if(j==3){
                contenido_celda.innerHTML=arreglo_albumes[i].canciones.length;
            }
            else if(j==4){
                contenido_celda.innerHTML="<button><img src='../assets/icons/visualizar.svg' class='icono-boton'></button>";
            }
            td.appendChild(contenido_celda);
            tr.appendChild(td);
        }
    }
    contenedor_albumes.appendChild(table);
}

//var contenedor_section_administrador = document.getElementById("contenedor-section-administrador");
function dibujar_lista_canciones_admin(arreglo_canciones){

    //ELEMENTOS DEL MODAL EDITAR CANCION
    var input_editar_titulo = document.getElementById("input-editar-titulo");
    var input_editar_artista = document.getElementById("input-editar-artista");
    var input_editar_album = document.getElementById("input-editar-album");

    var contenedor_canciones = document.getElementById("contenedor-canciones");

    if(arreglo_canciones.length){
        let h3 = document.createElement("h3");
        h3.innerText="Informacion de tus canciones";
        contenedor_canciones.appendChild(h3);

        let table = document.createElement('table');
        let tableBody = document.createElement('tbody');
        table.appendChild(tableBody);
        //RECORRER LAS CANCIONES
        for(let i=0; i<arreglo_canciones.length; i++){
            let tr = document.createElement('tr');
            tableBody.appendChild(tr);
            for (let j=0; j<5; j++) {
                var td = document.createElement('td');
                let contenido_celda = document.createElement('div');
                if(j==0){
                    contenido_celda.innerHTML=arreglo_canciones[i].nombre_cancion;
                }
                else if (j==1){
                    contenido_celda.innerHTML=arreglo_canciones[i].artista.nombre;
                }
                else if(j==2){
                    contenido_celda.innerHTML=arreglo_canciones[i].album.nombre_album;
                }
                else if(j==3){
                    contenido_celda.innerHTML=arreglo_canciones[i].reproducciones;
                }
                else if(j==4){
                    contenido_celda.innerHTML=`<button class='boton-gris' data-bs-toggle='modal' data-bs-target='#modal-editar-cancion'><img src='../assets/icons/edit.svg' class='icono-boton'></button>`;
                    contenido_celda.addEventListener('click',()=>{
                        input_editar_titulo.value = arreglo_canciones[i].nombre_cancion;
                        input_editar_artista.value = arreglo_canciones[i].artista;
                        input_editar_album.value = arreglo_canciones[i].album;
                        //AGREGARLE LA FUNCION DE EDITAR CANCION Y ELIMINAR CANCION (FUNCIONES CREADAS PARA PODER PASAR EL ID DE LA CANCION)
                        editar_cancion(arreglo_canciones[i]._id);
                        eliminar_cancion(arreglo_canciones[i]._id);
                    });
                }
                td.appendChild(contenido_celda);
                tr.appendChild(td);
            }
        }
        contenedor_canciones.appendChild(table);

    }else{
        let h3 = document.createElement("h3");
        h3.innerText="Aun no tienes canciones, ¡Sube alguna!";
        contenedor_canciones.appendChild(h3);
    }

}

//FUNCION PARA ESTABLECER LOS ARTISTAS QUE HA CREADO EL ADMINISTRADOR, CON ESTA FUNCION SE AGREGAN LOS ARTISTAS Y SUS ALBUMES A LOS OPTION DE LOS SELECT PARA CREAR CANCIONES Y ALBUMES
var select_artista_crear_album = document.getElementById("select-artista-crear-album");
var select_artista_crear_cancion = document.getElementById("select-artista-crear-cancion");
var select_album_crear_cancion = document.getElementById("select-album-crear-cancion");
function establecer_artistas_propietario(artistas){
    console.log(artistas);
    //RECORRER LOS ARTISTAS, GENERAR LOS OPTION CON LOS DATOS DE ESTOS Y AGREGARLOS A LOS SELECT
    for(let i=0; i<artistas.length; i++){
        let option = document.createElement("option");
        option.text = artistas[i].nombre;
        option.value = artistas[i]._id;
        select_artista_crear_album.appendChild(option);
        select_artista_crear_cancion.appendChild(option.cloneNode(true))
    }

    //CUANDO SE CAMBIE LA SELECCION DEL ARTISTA CUANDO SE CREA UNA CANCION, MOSTRAR EN EL SELECT DE ALBUM UNICAMENTE LOS ALBUMES PERTENECIENTES A ESE ARTISTA SELECCIONADO
    select_artista_crear_cancion.addEventListener('change',()=>{
        indice_artista = artistas.findIndex(i => i._id == select_artista_crear_cancion.value);
        select_album_crear_cancion.innerHTML='<option value="">Seleccione un álbum</option>';
        for(let i=0; i<artistas[indice_artista].albumes.length; i++){
            let option = document.createElement("option");
            option.text = artistas[indice_artista].albumes[i].nombre_album;
            option.value = artistas[indice_artista].albumes[i]._id;
            select_album_crear_cancion.appendChild(option);
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
            //window.open("/dashboard","_self");
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
            //window.open("/dashboard","_self");
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
            window.open("/dashboard","_self");
        }
    })	    
    .catch((error) => {
        console.error('Error:', error);
    });
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
                window.open("/dashboard","_self");
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
                window.open("/dashboard","_self");
            }
        })	    
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}