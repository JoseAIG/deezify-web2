//IMPORTS
import { refrescar_listas } from './dashboard-usuario.js';
import { dibujar_tabla_canciones_busqueda, dibujar_tabla_listas_busqueda, dibujar_tabla_albumes_busqueda, dibujar_tabla_artistas_busqueda } from './helpers/tablas-busquedas.js'

//MOSTRAR EL SELECT DE GÉNEROS CUANDO SE DECIDA REALIZAR UNA BUSQUEDA POR GENEROS
var select_busqueda = document.getElementById("select-busqueda");
var select_genero = document.getElementById("select-genero");
select_busqueda.addEventListener('change',()=>{
    if(select_busqueda.value=="genero"){
        select_genero.style.display="block";
    }else{
        select_genero.style.display="none"; 
    }
})

//FUNCION PARA REALIZAR UNA NUEVA BUSQUEDA
var form_busqueda = document.getElementById("form-busqueda");
var boton_buscar = document.getElementById("boton-buscar");
var contenedor_resultados = document.getElementById("contenedor-resultados");
const realizar_busqueda = (e) => {
    e.preventDefault();
    let datos_form_buscar = new FormData(form_busqueda);
    console.log(Object.fromEntries(datos_form_buscar.entries()));
    fetch('dashboard', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(Object.fromEntries(datos_form_buscar.entries()))
    })
    .then(response => response.json())
    .then(data => {
        //DIBUJAR LOS RESULTADOS DE LA PETICION
        console.log(data);
        dibujar_resultados(data);
    })	    
    .catch((error) => {
        console.error('Error:', error);
    });
}
boton_buscar.onclick=realizar_busqueda;

//FUNCION PARA DIBUJAR LOS RESULTADOS DE LA BUSQUEDA
function dibujar_resultados(datos){
    let elementos = datos.elementos;
    let resultados = datos.resultado_busqueda;
    contenedor_resultados.innerHTML="";
    //--------------------------------------------------------------------------------------------------------------//
    //DIBUJAR LAS TABLAS DE LOS ELEMENTOS REFERENTES A LA BUSQUEDA CON FUNCIONES DEFINIDAS EN "tablas-busquedas.js" //
    //--------------------------------------------------------------------------------------------------------------//
    if(elementos=="canciones"){
        //LLAMAR A LA FUNCION PARA DIBUJAR LA TABLA CON LOS RESULTADOS DE LAS CANCIONES
        dibujar_tabla_canciones_busqueda(resultados);
    }
    else if(elementos=="listas"){  //SI LOS ELEMENTOS SON LISTAS
        //LLAMAR A LA FUNCION PARA DIBUJAR LA TABLA CON LOS RESULTADOS DE LAS LISTAS
        dibujar_tabla_listas_busqueda(resultados);
    }
    else if(elementos=="albumes"){
        //LLAMAR A LA FUNCION PARA DIBUJAR LA TABLA CON LOS RESULTADOS DE LOS ALBUMES
        dibujar_tabla_albumes_busqueda(resultados);
    }
    else if(elementos=="artistas"){
        //LLAMAR A LA FUNCION PARA DIBUJAR LA TABLA CON LOS RESULTADOS DE LOS ALBUMES
        dibujar_tabla_artistas_busqueda(resultados);
    }
}

//-------------------------------------------------------- //
// FUNCIONES DE UTILIDAD LLAMADAS EN "tablas-busquedas.js" //
//-------------------------------------------------------- //

//FUNCION PARA AGREGAR UNA CANCION A UNA LISTA DE REPRODUCCION
function agregar_cancion_a_lista(id_lista,id_cancion) {
    console.log("agregar esta cancion: " + id_cancion + " a esta lista: " + id_lista);
    fetch('listas', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: '{"operacion":"agregar cancion","id_lista":"'+id_lista+'","id_cancion":"'+id_cancion+'"}'
    })
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        alert(data.resultado);
        refrescar_listas();
    })	    
    .catch((error) => {
        console.error('Error:', error);
    });
}

//FUNCION PARA AGREGAR UNA CANCION A FAVORITOS
function agregar_cancion_a_favoritos(id_cancion) {
    console.log("agregar esta cancion a favoritos", id_cancion);
    fetch('favoritos', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: '{"id_cancion":"'+id_cancion+'"}'
    })
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        alert(data.resultado);
    })	    
    .catch((error) => {
        console.error('Error:', error);
    });
}

//FUNCION PARA SEGUIR UNA LISTA DE REPRODUCCION
function seguir_lista(id_lista) {
    fetch('seguidos', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: '{"elemento":"lista", "id_lista":"'+id_lista+'"}'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.resultado);
        refrescar_listas();
    })	    
    .catch((error) => {
        console.error('Error:', error);
    });
}

//FUNCION PARA SEGUIR UN ARTISTA
function seguir_artista(id_artista){
    console.log("seguir artista", id_artista);
    fetch('seguidos', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: '{"elemento":"artista", "id_artista":"'+id_artista+'"}'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.resultado);
        refrescar_listas();
    })	    
    .catch((error) => {
        console.error('Error:', error);
    });
}

//FUNCION PARA SEGUIR UN ALBUM
function seguir_album(id_album){
    console.log("seguir album", id_album);
    fetch('seguidos', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: '{"elemento":"album", "id_album":"'+id_album+'"}'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.resultado);
        refrescar_listas();
    })	    
    .catch((error) => {
        console.error('Error:', error);
    });
}

//ESTABLECIMIENTO DE LAS LISTAS QUE SON PERTENECIENTES AL USUARIO, PARA MOSTRAR LOS OPTIONS EN EL SELECT AGREGAR CANCION A LISTA
//TAMBIEN PERMITE ESTABLECER SI UNA LISTA ES PROPIA DEL USUARIO CUANDO SE REALIZA UNA BUSQUEDA POR LISTAS
var listas_propietarias;
var id_listas_propietarias;
function establecer_listas_del_usuario(datos){
    listas_propietarias = [];
    id_listas_propietarias = [];
    for(let i=0; i<datos.listas.length;i++){
        if(datos.listas[i].propietario == datos.id_usuario){
            listas_propietarias.push(datos.listas[i]);
            id_listas_propietarias.push(datos.listas[i]._id);
        }
    }
}

export{
    //LLAMADAS EN DASHBOARD-USUARIO
    establecer_listas_del_usuario,
    //LLAMADAS EN TABLAS-BUSQUEDAS
    listas_propietarias,
    id_listas_propietarias,
    agregar_cancion_a_lista,
    agregar_cancion_a_favoritos,
    seguir_lista,
    seguir_artista,
    seguir_album
}