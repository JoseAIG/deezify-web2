//------------------------------------------------------------ //
// ARCHIVO PARA EL DIBUJADO DE LAS TABLAS EN LA VISTA DE ADMIN //
//------------------------------------------------------------ //

//IMPORTS
import { dibujar_contenido_editar_cancion } from './contenido-modals.js';
import { editar_cancion, eliminar_cancion } from '../dashboard-admin.js';

var contenedor_artistas = document.getElementById("contenedor-artistas");
function dibujar_tabla_artistas_admin(artistas) {
    console.log("dibujar lista artistas admin", artistas);
    //TITULO ARTISTAS
    let h3 = document.createElement("h3");
    h3.innerText="Tus artistas";
    contenedor_artistas.appendChild(h3);
    //TABLA
    let table = document.createElement('table');
    let tableBody = document.createElement('tbody');
    table.appendChild(tableBody);
    //RECORRER LOS ARTISTAS
    for(let i=-1; i<artistas.length; i++){
        let tr = document.createElement('tr');
        tableBody.appendChild(tr);
        //EN EL INDICE -1 DIBUJAR EL ENCABEZADO DE LA TABLA
        if(i==-1){
            for(let j=0; j<2; j++){
                var td = document.createElement('td');
                let contenido_celda = document.createElement('div');
                if(j==0){
                    contenido_celda.innerHTML="Nombre Artista";
                }
                else if (j==1){
                    contenido_celda.innerHTML="Editar Artista";
                }
                td.appendChild(contenido_celda);
                tr.appendChild(td);
            }
        }else{
            for (let j=0; j<2; j++) {
                var td = document.createElement('td');
                let contenido_celda = document.createElement('div');
                if(j==0){
                    contenido_celda.innerHTML=`<h4>${artistas[i].nombre}</h4>`;
                }
                else if (j==1){
                    contenido_celda.innerHTML="<button class='boton-gris'><img src='../assets/icons/edit.svg' class='icono-boton'></button>";
                }
                td.appendChild(contenido_celda);
                tr.appendChild(td);
            }
        }
    }
    contenedor_artistas.appendChild(table);
}

//DIBUJAR LISTA DE ALBUMES QUE EL ADMIN HA INGRESADO
var contenedor_albumes = document.getElementById("contenedor-albumes");
function dibujar_tabla_albumes_admin(albumes){
    console.log("dibujar tabla albumes admin", albumes);

    let h3 = document.createElement("h3");
    h3.innerText="Tus albumes";
    contenedor_albumes.appendChild(h3);

    let table = document.createElement('table');
    let tableBody = document.createElement('tbody');
    table.appendChild(tableBody);
    //RECORRER LAS CANCIONES
    for(let i=0; i<albumes.length; i++){
        let tr = document.createElement('tr');
        tableBody.appendChild(tr);
        for (let j=0; j<5; j++) {
            var td = document.createElement('td');
            let contenido_celda = document.createElement('div');
            if(j==0){
                contenido_celda.innerHTML=`<h4>${albumes[i].nombre_album}</h4>`;
            }
            else if(j==1){
                contenido_celda.innerHTML=albumes[i].artista.nombre;
            }
            else if(j==2){
                contenido_celda.innerHTML=albumes[i].lanzamiento;
            }
            else if(j==3){
                contenido_celda.innerHTML=albumes[i].canciones.length;
            }
            else if(j==4){
                contenido_celda.innerHTML="<button class='boton-gris'><img src='../assets/icons/visualizar.svg' class='icono-boton'></button>";
            }
            td.appendChild(contenido_celda);
            tr.appendChild(td);
        }
    }
    contenedor_albumes.appendChild(table);
}

//DIBUJAR LISTA DE CANCIONES QUE EL ADMIN HA INGRESADO
var contenedor_canciones = document.getElementById("contenedor-canciones");
function dibujar_tabla_canciones_admin(canciones){
    if(canciones.length){
        //TITULO INFORMACION CANCIONES
        let h3 = document.createElement("h3");
        h3.innerText="Informacion de tus canciones";
        contenedor_canciones.appendChild(h3);
        //TABLA
        let table = document.createElement('table');
        let tableBody = document.createElement('tbody');
        table.appendChild(tableBody);
        //RECORRER LAS CANCIONES
        for(let i=-1; i<canciones.length; i++){
            if(i==-1){
                let tr = document.createElement('tr');
                tableBody.appendChild(tr);
                for (let j=0; j<5; j++) {
                    var td = document.createElement('td');
                    let contenido_celda = document.createElement('div');
                    if(j==0){
                        contenido_celda.innerHTML="Título Canción";
                    }
                    else if (j==1){
                        contenido_celda.innerHTML="Artista";
                    }
                    else if(j==2){
                        contenido_celda.innerHTML="Álbum";
                    }
                    else if(j==3){
                        contenido_celda.innerHTML="Rep.";
                    }
                    else if(j==4){
                        contenido_celda.innerHTML="Editar";
                    }
                    td.appendChild(contenido_celda);
                    tr.appendChild(td);
                }
            }else{
                let tr = document.createElement('tr');
                tableBody.appendChild(tr);
                for (let j=0; j<5; j++) {
                    var td = document.createElement('td');
                    let contenido_celda = document.createElement('div');
                    if(j==0){
                        contenido_celda.innerHTML=canciones[i].nombre_cancion;
                    }
                    else if (j==1){
                        contenido_celda.innerHTML=canciones[i].artista.nombre;
                    }
                    else if(j==2){
                        contenido_celda.innerHTML=canciones[i].album.nombre_album;
                    }
                    else if(j==3){
                        contenido_celda.innerHTML=canciones[i].reproducciones;
                    }
                    else if(j==4){
                        contenido_celda.innerHTML=`<button class='boton-gris' data-bs-toggle='modal' data-bs-target='#modal-editar-cancion'><img src='../assets/icons/edit.svg' class='icono-boton'></button>`;
                        contenido_celda.addEventListener('click',()=>{
                            //DIBUJAR EL CONTENIDO DEL MODAL EDITAR CANCION
                            dibujar_contenido_editar_cancion(canciones, i, canciones[i].artista._id, canciones[i].album._id);
                            //AGREGARLE LA FUNCION DE EDITAR CANCION Y ELIMINAR CANCION (FUNCIONES CREADAS PARA PODER PASAR EL ID DE LA CANCION)
                            editar_cancion(canciones[i]._id);
                            eliminar_cancion(canciones[i]._id);
                        });
                    }
                    td.appendChild(contenido_celda);
                    tr.appendChild(td);
                }
            }
        }
        contenedor_canciones.appendChild(table);
    }else{
        let h3 = document.createElement("h3");
        h3.innerText="Aun no tienes canciones, ¡Sube alguna!";
        contenedor_canciones.appendChild(h3);
    }
}

//EXPORTAR FUNCIONES
export {
    dibujar_tabla_artistas_admin,
    dibujar_tabla_albumes_admin,
    dibujar_tabla_canciones_admin
}