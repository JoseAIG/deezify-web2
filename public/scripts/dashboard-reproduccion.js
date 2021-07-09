//FUNCIONALIDAD REPRODUCIR CANCION
var contenedor_reproductor = document.getElementById("contenedor-reproductor");
var audio;
function reproducir_cancion(cancion) {
    //LIMPIAR EL AUDIO TAG Y CONTENEDOR
    if(audio){
        audio.remove();
    }
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
    audio.play(); //REPRODUCIR PISTA DE AUDIO QUE APUNTA AL ENDPOINT /reproduccion/:id
    //CONTROL DEL TIEMPO DE REPRODUCCION DE LA CANCION
    let segundos_escuchados = 0; //VARIABLE QUE TOMA CONTROL DE LOS SEGUNDOS ESCUCHADOS (AL LLEGAR A 30, SE INCREMENTA EN UNA UNIDAD LA REPRODUCCION DE LA CANCION)
    let timeupdates = 0; //VARIABLE PARA LLEVAR CONTROL DEL EVENTO 'timeupdate' EL CUAL ACTUALIZA CUATRO (4) VECES POR SEGUNDO, ES DECIR, 4 LLAMADAS = 1seg
    let reproduccion_contada = false; //BOOLEAN QUE REPRESENTA SI YA LA REPRODUCCION DE LA CANCION FUE CONTADA
    audio.addEventListener('timeupdate',()=>{
        //CUANDO LA CANCION VAYA RODANDO, ACTUALIZAR EL INPUT TYPE RANGE DEL REPRODUCTOR 
        actualizar_rango_cancion(audio.duration, audio.currentTime);
        //INCREMENTAR EL VALOR DE LA VARIABLE TIMEUPDATES
        timeupdates++
        //SI TIMEUPDATES ES 4, HA TRANSCURRIDO UN SEGUNDO, SE SETEA LA VARIABLE EN CERO Y SE INCREMENTA EN UNA UNIDAD LOS SEGUNDOS ESCUCHADOS
        if(timeupdates==4){
            timeupdates=0;
            segundos_escuchados++;
        }
        //SI SE HA ESCUCHADO LA CANCION 30 SEGUNDOS (INDIFERENTEMENTE SI SE HA RODADO EL SLIDER O NO) AUMENTAR EL NUMERO DE REPRODUCCIONES DE LA CANCION EN UNA UNIDAD
        if(segundos_escuchados==30 && !reproduccion_contada){
            incrementar_reproducciones(cancion._id);
            reproduccion_contada = true;
        }
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
    evento_siguiente_cancion(canciones, i);

    //FUNCIONALIDAD PARA REGRESAR LA CANCION AL PRINCIPIO
    boton_anterior_cancion.onclick = () => {
        reproducir_cancion(canciones[i]);
        evento_siguiente_cancion(canciones, i);
    }

    //FUNCIONALIDAD PARA REPRODUCIR LA CANCION ANTERIOR AL DARLE DOBLE CLICK AL BOTON DEVOLVER
    boton_anterior_cancion.ondblclick = () => {
        if(i-1>=0){
            --i;
            reproducir_cancion(canciones[i]);
            evento_siguiente_cancion(canciones, i);
        }else{
            console.log("Se está reproduciendo la primera cancion");
        }
    }

    //FUNCIONALIDAD PARA REPRODUCIR LA CANCION SIGUIENTE
    boton_siguiente_cancion.onclick = () => {
        if(i+1<canciones.length){
            ++i;
            reproducir_cancion(canciones[i]);
            evento_siguiente_cancion(canciones, i);
        }else{
            console.log("Se está reproduciendo la ultima cancion");
        }
    }
}

//FUNCION PARA ASIGNAR EL EVENTO DE FINALIZACION DE LA PISTA DE AUDIO PARA CONTINUAR LA REPRODUCCION CON LA PROXIMA CANCION
function evento_siguiente_cancion(canciones, i){
    audio.addEventListener('ended', function () {
        //ESTABLECER EL NUEVO VALOR DE i CUANDO CULMINE LA PISTA.
        i = ++i < canciones.length ? i : 0;
        reproducir_cancion(canciones[i]);
    }, true);
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
var contenedor_imagen_album_cancion = document.getElementById("contenedor-imagen-album-cancion");
var contenedor_info_cancion = document.getElementById("contenedor-info-cancion");
function establecer_info_cancion(cancion){
    if(cancion.album.ruta_caratula && cancion.album.ruta_caratula!=""){
        contenedor_imagen_album_cancion.innerHTML = `<img src="${cancion.album.ruta_caratula}" alt="caratula" class="caratula-album-cancion-reproductor">`;
    }else{
        contenedor_imagen_album_cancion.innerHTML = "";
    }
    contenedor_info_cancion.innerHTML=`<p>${cancion.nombre_cancion} - ${cancion.artista.nombre} - ${cancion.album.nombre_album}</p>`;
}

//FUNCION PARA INCREMENTAR EL CONTADOR DE REPRODUCCIONES DE LA CANCION CUANDO LA MISMA ES REPRODUCIDA
function incrementar_reproducciones(id_cancion) {
    fetch('reproduccion', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id:id_cancion})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })	    
    .catch((error) => {
        console.error('Error:', error);
    });
}

export{
    reproducir_cancion,
    reproducir_arreglo_canciones,
    reproducir_artista
}