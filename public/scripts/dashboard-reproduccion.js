//FUNCIONALIDAD REPRODUCIR CANCION
var contenedor_reproductor = document.getElementById("contenedor-reproductor");
var audio;
function reproducir_cancion(id) {
    //LIMPIAR EL CONTENEDOR
    contenedor_reproductor.innerHTML="";
    //CREAR UN NUEVO REPRODUCTOR
    audio = document.createElement("audio");
    //PONER COMO SOURCE EL ENDPOINT /reproduccion Y EL ID DE LA CANCION A REPRODUCIR COMO PARAMETRO DE URL
    audio.src="/reproduccion/"+id;
    //ESTABLECERLE UN IDENTIFICATIVO AL AUDIO TAG
    audio.id = id;
    audio.controls=true;
    contenedor_reproductor.appendChild(audio);
    audio.play();
    // .then(function() {
    //     // Automatic playback started!
    // }).catch(function(error) {
    //     console.log(error);
    // });
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
    reproducir_cancion(canciones[i]._id);
    audio.addEventListener('ended', function () {
        i = ++i < canciones.length ? i : 0;
        console.log(i)
        reproducir_cancion(canciones[i]._id);
    }, true);

    //FUNCIONALIDAD PARA REGRESAR LA CANCION AL PRINCIPIO
    boton_anterior_cancion.onclick = () => {
        reproducir_cancion(canciones[i]._id);
    }

    //FUNCIONALIDAD PARA REPRODUCIR LA CANCION ANTERIOR AL DARLE DOBLE CLICK AL BOTON DEVOLVER
    boton_anterior_cancion.ondblclick = () => {
        if(i-1>=0){
            --i;
            reproducir_cancion(canciones[i]._id);
        }else{
            console.log("Se está reproduciendo la primera cancion");
        }
    }

    //FUNCIONALIDAD PARA REPRODUCIR LA CANCION SIGUIENTE
    boton_siguiente_cancion.onclick = () => {
        if(i+1<canciones.length){
            ++i;
            reproducir_cancion(canciones[i]._id);
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

export{
    reproducir_cancion,
    reproducir_arreglo_canciones,
    reproducir_artista
}