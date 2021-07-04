//IMPORTS
import { establecer_listas_del_usuario } from './dashboard-busquedas.js';
import { dibujar_contenido_lista_propietaria, dibujar_contenido_lista_ajena, dibujar_contenido_visualizar_artista, dibujar_contenido_visualizar_album } from './helpers/contenido-modals.js';

var boton_visualizar_aside = document.getElementById("visualizar-aside");
var aside_principal = document.querySelector("#aside-principal");
var section_principal_usuario = document.querySelector("#section-principal-usuario");

// let ancho_inicial = getComputedStyle(section_principal_usuario).width;
// let margen_inicial = getComputedStyle(section_principal_usuario).marginLeft;
boton_visualizar_aside.addEventListener('click',()=>{
    //GUARDAR LOS VALORES INICIALES DEL ANCHO Y MARGEN DEL SECTION (PARA MANTENER ORDEN EN FUNCION DE LA PANTALLA DEL USUARIO)
    if(!(section_principal_usuario.style.marginLeft=="0px")){
        ancho_inicial = getComputedStyle(section_principal_usuario).width;
        margen_inicial = getComputedStyle(section_principal_usuario).marginLeft;
    
        console.log(getComputedStyle(section_principal_usuario).width);
        console.log(getComputedStyle(section_principal_usuario).marginLeft);
    }

    if(aside_principal.style.display=="none"){
        aside_principal.style.display="block";
        section_principal_usuario.style.width=ancho_inicial;
        section_principal_usuario.style.marginLeft=margen_inicial;
    }else{
        aside_principal.style.display="none";
        section_principal_usuario.style.width="100%";
        section_principal_usuario.style.marginLeft="0";
    }
});

//AL CARGAR LA VISTA REFRESCAR LAS LISTAS DE REPRODUCCION DEL USUARIO
window.onload = refrescar_listas;

function refrescar_listas(){
    fetch('seguidos', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(data => {
        //DIBUJAR LOS RESULTADOS DE LA PETICION
        dibujar_listas_aside(data);
        dibujar_artistas_seguidos_aside(data);
        dibujar_albumes_seguidos_aside(data);

        establecer_listas_del_usuario(data);
        dibujar_boton_administrador(data.tipo);
    })	    
    .catch((error) => {
        console.error('Error:', error);
    });

    //CERRAR LOS MODAL
    let botones = document.getElementsByClassName("boton-volver");
    for(let i=0; i<botones.length; i++){
        botones[i].click();
    }
}

//PONER VISIBLE EL BOTON PARA ACCEDER A LA VISTA DE ADMINISTRADOR SIEMPRE Y CUANDO ESE SEA EL TIPO DE USUARIO DE LA SESION
var boton_vista_admin = document.getElementById("boton-vista-admin");
function dibujar_boton_administrador(tipo){
    if(tipo=="administrador"){
        boton_vista_admin.style.display="inline";
    }
}

//FUNCION PARA DIBUJAR LISTAS EN ASIDE
var contenedor_listas = document.getElementById("contenedor-listas");
function dibujar_listas_aside(datos){
    //LIMPIAR EL CONTENEDOR DE LAS LISTAS
    contenedor_listas.innerHTML="";
    //ESTABLECER LAS LISTAS
    let listas = datos.listas;
    //DE EXISTIR LISTAS EN EL ARREGLO, DIBUJARLAS
    if(listas.length){
        contenedor_listas.innerHTML="<h4>Listas</h4><hr>";
        for(let i=0; i<listas.length; i++){
            //CONTENEDOR DE LA LISTA
            let div = document.createElement("div");
            //BOTON REPRODUCIR LISTA
            let reproducir = document.createElement("button");
            reproducir.innerHTML="<img src='../assets/icons/reproducir.svg' class='icono-boton'></img>"
            div.appendChild(reproducir);
            //PARRAFO NOMBRE DE LA LISTA
            let p = document.createElement("p");
            p.innerText = listas[i].nombre_lista;
            div.appendChild(p);
            //BOTON EDITAR / VISUALIZAR LISTA
            let editar = document.createElement("button");
            editar.setAttribute('data-bs-toggle','modal');
            editar.className="boton-gris";
            editar.innerHTML="<img src='../assets/icons/visualizar.svg' class='icono-boton'></img>"
            div.appendChild(editar);
    
            contenedor_listas.appendChild(div);
    
            //FUNCIONALIDAD PARA REPRODUCIR UNA LISTA
            reproducir.addEventListener('click',()=>{
                console.log("reproducir lista " + listas[i].nombre_lista);
            })
    
            //COMPROBACION SI LA LISTA ES PROPIETARIA PARA MOSTRAR LOS ELEMENTOS DEL MODAL
            if(datos.id_usuario == listas[i].propietario){
                editar.setAttribute('data-bs-target','#modal-editar-lista');
                editar.addEventListener('click', ()=>{
                    //LLAMAR A LA FUNCION PARA DIBUJAR EL CONTENIDO DEL MODAL DE UNA CUANDO EL USUARIO ES PROPIETARIO (EDITAR LISTA)
                    dibujar_contenido_lista_propietaria(listas, i);
                    //LLAMAR A LAS FUNCIONES PARA BRINDAR LA FUNCIONALIDAD DE EDITAR LISTA Y ELIMINAR LISTA
                    editar_lista(listas[i]._id);
                    eliminar_lista(listas[i]._id, listas[i].propietario);
                })
            }else{
                editar.setAttribute('data-bs-target','#modal-visualizar-lista');
                editar.addEventListener('click', ()=>{
                    //LLAMAR A LA FUNCION PARA DIBUJAR EL CONTENIDO DEL MODAL DE UNA CUANDO EL USUARIO NO ES PROPIETARIO (SIGUE LA LISTA)
                    dibujar_contenido_lista_ajena(listas, i, true);
                    //HABILITAR LA POSIBILIDAD DE PODER DEJAR DE SEGUIR LA LISTA
                    dejar_de_seguir_lista(listas[i]._id);
                })
            }
        }
    }
}

//FUNCION PARA DIBUJAR LOS ARTISTAS SEGUIDOS EN EL ASIDE
var contenedor_artistas_seguidos = document.getElementById("contenedor-artistas-seguidos");
function dibujar_artistas_seguidos_aside(datos){
    //LIMPIAR EL CONTENEDOR DE LOS ARTISTAS SEGUIDOS
    contenedor_artistas_seguidos.innerHTML="";
    //ESTABLECER LOS ARTISTAS SEGUIDOS
    let artistas_seguidos = datos.artistas_seguidos
    if(artistas_seguidos.length){
        contenedor_artistas_seguidos.innerHTML="<h4>Artistas</h4><hr>"
        for(let i=0; i<artistas_seguidos.length; i++){
            //CONTENEDOR DEL ARTISTA
            let div = document.createElement("div");
            //BOTON REPRODUCIR ARTISTA
            let reproducir = document.createElement("button");
            reproducir.innerHTML="<img src='../assets/icons/reproducir.svg' class='icono-boton'></img>"
            div.appendChild(reproducir);
            //PARRAFO NOMBRE DEL ARTISTA
            let p = document.createElement("p");
            p.innerText = artistas_seguidos[i].nombre;
            div.appendChild(p);
            //VISUALIZAR ARTISTA
            let visualizar = document.createElement("button");
            visualizar.setAttribute('data-bs-toggle','modal');
            visualizar.setAttribute('data-bs-target','#modal-visualizar-artista');
            visualizar.className="boton-gris";
            visualizar.innerHTML="<img src='../assets/icons/visualizar.svg' class='icono-boton'></img>"
            visualizar.addEventListener('click',()=>{
                //DIBUJAR EL CONTENIDO DEL MODAL VISUALIZAR ARTISTA EN EL MODULO "./helpers/contenido-modals.js"
                dibujar_contenido_visualizar_artista(artistas_seguidos, i, true);
                //FUNCIONALIDAD PARA DEJAR DE SEGUIR EL ARTISTA
                dejar_de_seguir_artista(artistas_seguidos[i]._id);
            })
            div.appendChild(visualizar);
    
            contenedor_artistas_seguidos.appendChild(div);
    
            //FUNCIONALIDAD PARA REPRODUCIR UNA ARTISTA
            reproducir.addEventListener('click',()=>{
                console.log("reproducir artista " + artistas_seguidos[i].nombre);
            })
        }
    }
}

//FUNCION PARA DIBUJAR LOS ALBUMES SEGUIDOS EN EL ASIDE
var contenedor_albumes_seguidos = document.getElementById("contenedor-albumes-seguidos");
function dibujar_albumes_seguidos_aside(datos) {
    //LIMPIAR EL CONTENEDOR DE ALBUMES SEGUIDOS
    contenedor_albumes_seguidos.innerHTML="";
    //ESTABLECER EL ARREGLO DE ALBUMES SEGUIDOS
    let albumes_seguidos = datos.albumes_seguidos
    if(albumes_seguidos.length){
        contenedor_albumes_seguidos.innerHTML="<h4>Álbumes</h4><hr>"
        for(let i=0; i<albumes_seguidos.length; i++){
            //CONTENEDOR DEL ALBUM
            let div = document.createElement("div");
            //BOTON REPRODUCIR ALBUM
            let reproducir = document.createElement("button");
            reproducir.innerHTML="<img src='../assets/icons/reproducir.svg' class='icono-boton'></img>"
            div.appendChild(reproducir);
            //PARRAFO NOMBRE DEL ALBUM
            let p = document.createElement("p");
            p.innerText = albumes_seguidos[i].nombre_album;
            div.appendChild(p);
            //VISUALIZAR ALBUM
            let visualizar = document.createElement("button");
            visualizar.setAttribute('data-bs-toggle','modal');
            visualizar.setAttribute('data-bs-target','#modal-visualizar-album');
            visualizar.className="boton-gris";
            visualizar.innerHTML="<img src='../assets/icons/visualizar.svg' class='icono-boton'></img>"
            visualizar.addEventListener('click',()=>{
                //DIBUJAR EL CONTENIDO DEL MODAL VISUALIZAR ALBUM EN EL MODULO "./helpers/contenido-modals.js"
                dibujar_contenido_visualizar_album(albumes_seguidos, i, true);
                //FUNCIONALIDAD PARA DEJAR DE SEGUIR EL ALBUM
                dejar_de_seguir_album(albumes_seguidos[i]._id);
            })
            div.appendChild(visualizar);
    
            contenedor_albumes_seguidos.appendChild(div);
    
            //FUNCIONALIDAD PARA REPRODUCIR UNA ARTISTA
            reproducir.addEventListener('click',()=>{
                console.log("reproducir album " + albumes_seguidos[i].nombre_album);
            })
        }
    }
}

//FUNCIONALIDAD PARA CREAR LISTA
var form_crear_lista = document.getElementById("form-crear-lista");
var boton_guardar_lista = document.getElementById("boton-guardar-lista");
const crear_lista = () => {
    let datos_form_crear_lista = new FormData(form_crear_lista);
    fetch('listas', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(Object.fromEntries(datos_form_crear_lista.entries()))
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert(data.resultado);
        if(data.status==200){
            //window.open('/dashboard','_self')
            refrescar_listas();
        }
    })	    
    .catch((error) => {
        console.error('Error:', error);
    });

}
boton_guardar_lista.onclick=crear_lista;

//FUNCIONALIDAD PARA EDITAR UNA LISTA
var form_editar_lista = document.getElementById("form-editar-lista");
var boton_guardar_edicion_lista = document.getElementById("boton-guardar-edicion-lista");
function editar_lista (id_lista) {
    boton_guardar_edicion_lista.onclick = () => {
        //GENERAR UN ARREGLO CON LOS ID'S DE LAS CANCIONES DE LA PLAYLIST
        let canciones = [];
        let inputs = document.getElementsByClassName("input-canciones-lista");
        for(let i=0;i<inputs.length;i++){
            canciones.push(inputs[i].getAttribute("ObjectId"));
        }
        //GENERAR LOS DATOS DEL FORMA DATA A SER ENVIADO COMO JSON
        let datos_form_editar_lista = new FormData(form_editar_lista);
        datos_form_editar_lista.append("id_lista",id_lista);
        datos_form_editar_lista.append("canciones",JSON.stringify(canciones));
        fetch('listas', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(Object.fromEntries(datos_form_editar_lista.entries()))
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert(data.resultado);
            if(data.status==200){
                refrescar_listas();
            }
        })	    
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

//FUNCIONALIDAD PARA ELIMINAR UNA LISTA DE REPRODUCCION
var boton_eliminar_lista = document.getElementById("boton-eliminar-lista");
function eliminar_lista(id_lista, propietario){
    boton_eliminar_lista.onclick = () => {
        fetch('listas', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: '{"id_lista":"'+id_lista+'","propietario":"'+propietario+'"}'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert(data.resultado);
            if(data.status==200){
                refrescar_listas();
            }
        })	    
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

//FUNCION PARA DEJAR DE SEGUIR UNA LISTA
var boton_dejar_de_seguir_lista = document.getElementById("boton-dejar-de-seguir-lista");
function dejar_de_seguir_lista (id_lista) {
    boton_dejar_de_seguir_lista.onclick = () => {
        fetch('seguidos', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: '{"elemento":"lista", "id_lista":"'+id_lista+'"}'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert(data.resultado);
            if(data.status==200){
                refrescar_listas();
            }
        })	    
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

//FUNCION PARA DEJAR DE SEGUIR UN ARTISTA
var boton_dejar_de_seguir_artista = document.getElementById("boton-dejar-de-seguir-artista");
function dejar_de_seguir_artista(id_artista) {
    boton_dejar_de_seguir_artista.onclick = () => {
        console.log("dejar de seguir el artista", id_artista);
        fetch('seguidos', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: '{"elemento":"artista", "id_artista":"'+id_artista+'"}'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert(data.resultado);
            if(data.status==200){
                refrescar_listas();
            }
        })	    
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

//FUNCION PARA DEJAR DE SEGUIR UN ALBUM
var boton_dejar_de_seguir_album = document.getElementById("boton-dejar-de-seguir-album");
function dejar_de_seguir_album(id_album) {
    boton_dejar_de_seguir_album.onclick = () => {
        console.log("dejar de seguir el album", id_album);
        fetch('seguidos', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: '{"elemento":"album", "id_album":"'+id_album+'"}'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert(data.resultado);
            if(data.status==200){
                refrescar_listas();
            }
        })	    
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

export{
    refrescar_listas,
    editar_lista,
    eliminar_lista
}