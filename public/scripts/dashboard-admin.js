function obtener_canciones_administrador(){
    console.log("obtener las cacniones pertenecientes al admin");
    fetch('admin', {
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

var contenedor_section_administrador = document.getElementById("contenedor-section-administrador");
function dibujar_lista_canciones_admin(arreglo_canciones){
    for(let i=0; i<arreglo_canciones.length; i++){
        contenedor_section_administrador.innerHTML+=`<br> <div>${arreglo_canciones[i].nombre_cancion} - ${arreglo_canciones[i].artista} - ${arreglo_canciones[i].album}</div>`;
    }
}