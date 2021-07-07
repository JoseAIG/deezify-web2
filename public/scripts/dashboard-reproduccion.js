//FUNCIONALIDAD REPRODUCIR CANCION
var contenedor_reproductor = document.getElementById("contenedor-reproductor");
var audio;
function reproducir_cancion(cancion) {
    console.log(cancion);
    //LIMPIAR EL CONTENEDOR
    contenedor_reproductor.innerHTML="";
    //COLOCAR LA INFORMACION DE LA CANCION EN EL REPRODUCTOR INFERIOR
    establecer_info_cancion(cancion);
    //CREAR UN NUEVO REPRODUCTOR
    audio = document.createElement("audio");
    //PONER COMO SOURCE EL ENDPOINT /reproduccion Y EL ID DE LA CANCION A REPRODUCIR COMO PARAMETRO DE URL
    audio.src="/reproduccion/"+cancion._id;
    //ESTABLECERLE UN IDENTIFICATIVO AL AUDIO TAG
    audio.id = cancion._id;
    audio.controls=true;
    //PONER INVISIBLE EL AUDIO TAG DADO QUE SE POSEE UN REPRODUCTOR PROPIO
    audio.style.display="none";
    contenedor_reproductor.appendChild(audio);
    audio.play();
    // .then(function() {
    //     // Automatic playback started!
    // }).catch(function(error) {
    //     console.log(error);
    // });
    //CUANDO LA CANCION VAYA RODANDO, ACTUALIZAR EL INPUT TYPE RANGE DEL REPRODUCTOR 
    audio.addEventListener('timeupdate',()=>{
        actualizar_rango_cancion(audio.duration, audio.currentTime);
    })
    //HABILITAR EL EVENTO PARA CAMBIAR DE MINUTO:SEGUNDO DE LA CANCION CUANDO EL USUARIO MUEVE O CAMBIA EL INPUT TYPE RANGE DEL REPRODUCTOR
    evento_mover_rango(audio);
    //FUNCIONALIDAD PARA REPRODUCIR / PAUSAR LA CANCION
    reproducir_pausar(audio);
    //CAMBIAR EL ICONO DEL BOTON REPRODUCIR / PAUSAR
    boton_reproducir_pausar.innerHTML='<img src="../assets/icons/pause.svg" class="icono-reproductor">';
}

//FUNCIONALIDAD PARA REPRODUCIR UN ARREGLO DE CANCIONES (FAVORITOS, LISTA DE REPRODUCCION O ALBUM)
var boton_anterior_cancion = document.getElementById("boton-anterior-cancion");
var boton_siguiente_cancion = document.getElementById("boton-siguiente-cancion");
function reproducir_arreglo_canciones(canciones){
    console.log("reproducir arreglo de canciones", canciones);
    let i=0;
    reproducir_cancion(canciones[i]);
    audio.addEventListener('ended', function () {
        i = ++i < canciones.length ? i : 0;
        console.log(i)
        reproducir_cancion(canciones[i]);
    }, true);

    //FUNCIONALIDAD PARA REGRESAR LA CANCION AL PRINCIPIO
    boton_anterior_cancion.onclick = () => {
        reproducir_cancion(canciones[i]);
    }

    //FUNCIONALIDAD PARA REPRODUCIR LA CANCION ANTERIOR AL DARLE DOBLE CLICK AL BOTON DEVOLVER
    boton_anterior_cancion.ondblclick = () => {
        if(i-1>=0){
            --i;
            reproducir_cancion(canciones[i]);
        }else{
            console.log("Se está reproduciendo la primera cancion");
        }
    }

    //FUNCIONALIDAD PARA REPRODUCIR LA CANCION SIGUIENTE
    boton_siguiente_cancion.onclick = () => {
        if(i+1<canciones.length){
            ++i;
            reproducir_cancion(canciones[i]);
        }else{
            console.log("Se está reproduciendo la ultima cancion");
        }
    }
}

//FUNCIONALIDAD PARA REPRODUCIR UN ARTISTA
function reproducir_artista(artista){
    //CREAR UN ARREGLO QUE CONTENDRA TODAS LAS CANCIONES DE UN ARTISTA
    let canciones_artista = []
    //RECORRER LOS ALBUMES DEL ARTISTA
    for(let i=0;i<artista.albumes.length;i++){
        //RECORRER LAS CANCIONES DE ESE ALBUM
        for(let j=0; j<artista.albumes[i].canciones.length; j++){
            //AGREGAR CANCION AL ARREGLO DE CANCIONES
            canciones_artista.push(artista.albumes[i].canciones[j]);
        }
    }
    //REPRODUCIR ARREGLO CON TODAS LAS CANCIONES DEL ARTISTA
    reproducir_arreglo_canciones(canciones_artista);
}

//FUNCIONALIDAD REANUDAR / PAUSAR UNA CANCION
var boton_reproducir_pausar = document.getElementById("boton-reproducir-pausar");
function reproducir_pausar(audio){
    boton_reproducir_pausar.onclick = () => {
        if(audio.paused){
            audio.play();
            boton_reproducir_pausar.innerHTML='<img src="../assets/icons/pause.svg" class="icono-reproductor">';
        }else{
            audio.pause()
            boton_reproducir_pausar.innerHTML='<img src="../assets/icons/reproducir.svg" class="icono-reproductor">';
        }
    }
}

//FUNCION PARA ACTUALIZAR EL INPUT TYPE RANGE A MEDIDA QUE AVANZA LA CANCION
var rango_cancion = document.getElementById("rango-cancion");
function actualizar_rango_cancion(tiempo_final, tiempo){
    //console.log(tiempo_final, tiempo);
    //SI LA CANCION NO POSEE PISTA DE AUDIO DISPONIBLE DESHABILITAR EL RANGO DEL REPRODUCTOR
    if(Number.isNaN(tiempo_final)){
        rango_cancion.disabled = true;
    }else{
        rango_cancion.disabled = false;
    }
    rango_cancion.max = tiempo_final;
    rango_cancion.value = tiempo;
}
//FUNCION PARA ESTABLECER EL MINUTO:SEGUNDO DE LA CANCION AL MOVER EL INPUT TYPE RANGE
function evento_mover_rango(audio) {
    rango_cancion.addEventListener('change',()=>{
        audio.currentTime = rango_cancion.value;
    })
}

//FUNCION PARA ESTABLECER LA INFORMACION DE LA CANCION
var contenedor_info_cancion = document.getElementById("contenedor-info-cancion");
function establecer_info_cancion(cancion){
    contenedor_info_cancion.innerHTML=`<p>${cancion.nombre_cancion} - ${cancion.artista.nombre} - ${cancion.album.nombre_album}</p>`;
}

export{
    reproducir_cancion,
    reproducir_arreglo_canciones,
    reproducir_artista
}