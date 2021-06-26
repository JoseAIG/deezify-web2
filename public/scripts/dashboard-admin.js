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
                    contenido_celda.innerHTML="<button class='boton-gris'><img src='../assets/icons/edit.svg' class='icono-boton'></button>";
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
var boton_subir_cancion = document.getElementById("boton-subir-cancion");
const abrir_modal_subir_cancion = ()=> {
    console.log("abrir modal subir cancion");
}
boton_subir_cancion.onclick=abrir_modal_subir_cancion;