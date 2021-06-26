//AL CARGAR LA PAGINA SOLICITAR LAS CANCIONES DEL ADMINISTRADOR PARA DIBUJARLAS EN UNA TABLA
window.onload = () => {
    console.log("obtener las cacniones pertenecientes al admin");
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
}

//var contenedor_section_administrador = document.getElementById("contenedor-section-administrador");
function dibujar_lista_canciones_admin(arreglo_canciones){

    //ELEMENTOS DEL MODAL EDITAR CANCION
    var input_editar_titulo = document.getElementById("input-editar-titulo");
    var input_editar_artista = document.getElementById("input-editar-artista");
    var input_editar_album = document.getElementById("input-editar-album");

    var contenedor_tabla_estadisticas = document.getElementById("contenedor-tabla-estadisticas");

    if(arreglo_canciones.length){
        let h3 = document.createElement("h3");
        h3.innerText="Informacion de tus canciones";
        contenedor_tabla_estadisticas.appendChild(h3);

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
                    contenido_celda.innerHTML=arreglo_canciones[i].artista;
                }
                else if(j==2){
                    contenido_celda.innerHTML=arreglo_canciones[i].album;
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
        contenedor_tabla_estadisticas.appendChild(table);

    }else{
        let h3 = document.createElement("h3");
        h3.innerText="Aun no tienes canciones, ¡Sube alguna!";
        contenedor_tabla_estadisticas.appendChild(h3);
    }

}

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