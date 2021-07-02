//-------------------------------------------------//
// FUNCION PARA DIBUJAR LA TABLA CON LAS CANCIONES //
//-------------------------------------------------//
function dibujar_tabla_canciones_busqueda(resultados){
    if(resultados.length){
        let table = document.createElement('table');
        let tableBody = document.createElement('tbody');
        table.appendChild(tableBody);
        //RECORRER LAS CANCIONES
        for(let i=-1; i<resultados.length; i++){
            let tr = document.createElement('tr');
            tableBody.appendChild(tr);
            if(i==-1){
                for (let j=0; j<7; j++) {
                    var td = document.createElement('td');
                    let contenido_celda = document.createElement('div');
                    if(j==0){
                        contenido_celda.innerHTML="Reproducir";
                    }
                    else if(j==1){
                        contenido_celda.innerHTML="Título";
                    }
                    else if (j==2){
                        contenido_celda.innerHTML="Artista";
                    }
                    else if(j==3){
                        contenido_celda.innerHTML="Album";
                    }
                    else if(j==4){
                        contenido_celda.innerHTML="Reproducciones";
                    }
                    else if(j==5){
                        contenido_celda.innerHTML="Agregar a lista";
                    }
                    else if(j==6){
                        contenido_celda.innerHTML="Favoritos";
                    }
                    td.appendChild(contenido_celda);
                    tr.appendChild(td);
                }
            }else{
                for (let j=0; j<7; j++) {
                    var td = document.createElement('td');
                    let contenido_celda = document.createElement('div');
                    if(j==0){
                        contenido_celda.innerHTML=`<button><img src='../assets/icons/reproducir.svg' class='icono-boton'></button>`;
                        contenido_celda.addEventListener('click',()=>{
                            reproducir_cancion(resultados[i].ruta_cancion);
                        });
                    }
                    else if(j==1){
                        contenido_celda.innerHTML=resultados[i].nombre_cancion;
                    }
                    else if (j==2){
                        contenido_celda.innerHTML=resultados[i].artista.nombre;
                    }
                    else if(j==3){
                        contenido_celda.innerHTML=resultados[i].album.nombre_album;
                    }
                    else if(j==4){
                        contenido_celda.innerHTML=resultados[i].reproducciones;
                    }
                    else if(j==5){
                        
                        //CONFIGURAR EL HTML SELECT CON LOS OPTION DE LAS LISTAS PROPIETARIAS DEL USUARIO
                        let select = document.createElement("select");
                        let option_defecto = document.createElement("option");
                        option_defecto.text="Agregar a lista";
                        select.appendChild(option_defecto);
    
                        for(let k=0;k<listas_propietarias.length;k++){
                            let option = document.createElement("option");
                            option.text = listas_propietarias[k].nombre_lista;
                            option.value = listas_propietarias[k]._id;
                            select.appendChild(option);
                        }
    
                        contenido_celda.appendChild(select);
                        //contenido_celda.innerHTML=`<select><img src='../assets/icons/lista.svg' class='icono-boton'></select>`;
                        select.addEventListener('change',()=>{
                            agregar_cancion_a_lista(select.value, resultados[i]._id);
                            option_defecto.selected=true;
                        });
                    }
                    else if(j==6){
                        contenido_celda.innerHTML=`<button><img src='../assets/icons/corazon-vacio.svg' class='icono-boton'></button>`
                        contenido_celda.addEventListener('click',()=>{
                            agregar_cancion_a_favoritos(resultados[i]._id);
                        });
                    }
                    td.appendChild(contenido_celda);
                    tr.appendChild(td);
                }
            }

        }
        contenedor_resultados.appendChild(table);

    }else{
        let h3 = document.createElement("h3");
        h3.textContent="No se encontraron coincidencias.";
        contenedor_resultados.appendChild(h3);
    }
}

//------------------------------------------------------------- //
// FUNCION PARA DIBUJAR LA TABLA CON LAS LISTAS DE REPRODUCCION //
//------------------------------------------------------------- //
function dibujar_tabla_listas_busqueda(resultados) {
    if(resultados.length){
        let table = document.createElement('table');
        table.style.width="100%";
        let tableBody = document.createElement('tbody');
        table.appendChild(tableBody);
        //RECORRER LAS LISTAS
        for(let i=-1; i<resultados.length; i++){
            let tr = document.createElement('tr');
            tableBody.appendChild(tr);
            if(i==-1){
                //EN EL INDICE -1 DIBUJAR EL ENCABEZADO DE LA TABLA
                for (let j=0; j<4; j++) {
                    var td = document.createElement('td');
                    let contenido_celda = document.createElement('div');
                    if(j==0){
                        contenido_celda.innerHTML="Reproducir";
                    }
                    else if(j==1){
                        contenido_celda.innerHTML="Nombre lista";
                    }
                    else if (j==2){
                        contenido_celda.innerHTML="Seguir";
                    }
                    else if(j==3){
                        contenido_celda.innerHTML="Visualizar";
                    }
                    td.appendChild(contenido_celda);
                    tr.appendChild(td);
                }
            }else{
                for (let j=0; j<4; j++) {
                    var td = document.createElement('td');
                    let contenido_celda = document.createElement('div');
                    if(j==0){
                        contenido_celda.innerHTML=`<button><img src='../assets/icons/reproducir.svg' class='icono-boton'></button>`;
                        contenido_celda.addEventListener('click',()=>{
                            //reproducir_cancion(resultados[i].ruta_cancion);
                        });
                    }
                    else if(j==1){
                        contenido_celda.innerHTML=resultados[i].nombre_lista;
                    }
                    else if (j==2){
                        //console.log(id_listas_propietarias, resultados[i]._id);
                        if(id_listas_propietarias.includes(resultados[i]._id)){
                            contenido_celda.innerHTML="Eres dueño de esta lista";
                        }else{
                            contenido_celda.innerHTML=`<button><img src='../assets/icons/add.svg' class='icono-boton'></button>`;
                            contenido_celda.addEventListener('click',()=>{
                                seguir_lista(resultados[i]._id);
                            })
                        }
                    }
                    else if(j==3){
                        //SI LA LISTA A IMPRIMIR SE ENCUENTRA EN LAS LISTAS PROPIETARIAS DE UN USUARIO, DARLE A ESTE LA CAPACIDAD DE EDICION EN LA BUSQUEDA
                        if(id_listas_propietarias.includes(resultados[i]._id)){
                            //INGRESAR BOTON DE EDICION QUE ACTIVA EL MODAL EDITAR LISTA
                            contenido_celda.innerHTML=`<button data-bs-toggle="modal" data-bs-target="#modal-editar-lista"><img src='../assets/icons/edit.svg' class='icono-boton'></button>`;
                            contenido_celda.onclick = () => {
                                //CUANDO SE CLICKEA, LIMPIAR EL CONTENEDOR DE LAS CANCIONES Y DIBUJAR LAS PERTENECIENTES A LA LISTA
                                contenedor_input_canciones.innerHTML="";
                                input_editar_nombre_lista.value = resultados[i].nombre_lista;
                                for(let j=0; j<resultados[i].canciones.length; j++){
                                    let div = document.createElement("div");
                                    let input = document.createElement("input");
                                    input.type="text";
                                    input.disabled=true;
                                    input.value = resultados[i].canciones[j].nombre_cancion + ", " + resultados[i].canciones[j].artista.nombre + ", " + resultados[i].canciones[j].album.nombre_album;
                                    input.setAttribute("ObjectId", resultados[i].canciones[j]._id);
                                    div.appendChild(input);
                    
                                    let boton_remover = document.createElement("button");
                                    boton_remover.className="boton-eliminar";
                                    boton_remover.innerHTML="<img src='../assets/icons/remove.svg' class='icono-boton'></img>"
                                    div.appendChild(boton_remover);
                    
                                    boton_remover.addEventListener('click',()=>{
                                        div.remove();
                                    });
                    
                                    contenedor_input_canciones.appendChild(div);
                                }
                                editar_lista(resultados[i]._id);
                                eliminar_lista(resultados[i]._id, resultados[i].propietario);
                            }
                        }else{  //PERO SI LA LISTA DE REPRODUCCION NO ES PROPIETARIA, DARLE AL USUARIO UNICAMENTE LA CAPACIDAD DE VISUALIZARLA
                            contenido_celda.innerHTML=`<button data-bs-toggle="modal" data-bs-target="#modal-visualizar-lista"><img src='../assets/icons/visualizar.svg' class='icono-boton'></button>`;
                            contenido_celda.onclick = () => {
                                contenedor_visualizar_canciones_lista.innerHTML = "";
                                nombre_visualizar_lista.innerText = resultados[i].nombre_lista;
                                boton_dejar_de_seguir_lista.style.display="none";
                                for(let j=0; j<resultados[i].canciones.length; j++){
                                    let div = document.createElement("div");

                                    let boton_reproducir = document.createElement("button");
                                    boton_reproducir.innerHTML='<img src="../assets/icons/reproducir.svg" class="icono-boton">'
                                    div.appendChild(boton_reproducir);

                                    let input = document.createElement("input");
                                    input.type="text";
                                    input.disabled=true;
                                    input.value = resultados[i].canciones[j].nombre_cancion + ", " + resultados[i].canciones[j].artista.nombre + ", " + resultados[i].canciones[j].album.nombre_album;
                                    div.appendChild(input);
                    
                                    contenedor_visualizar_canciones_lista.appendChild(div);
                                }
                            }
                        }
                        
                    }
                    td.appendChild(contenido_celda);
                    tr.appendChild(td);
                }
            }
            contenedor_resultados.appendChild(table);
        }
    }else{
        let h3 = document.createElement("h3");
        h3.textContent="No se encontraron listas de reproducción con ese nombre.";
        contenedor_resultados.appendChild(h3);
    }
}

//---------------------------------------------- //
// FUNCION PARA DIBUJAR LA TABLA CON LOS ALBUMES //
//---------------------------------------------- //
function dibujar_tabla_albumes_busqueda(resultados) {
    //SI EXISTEN RESULTADOS DIBUJAR LA TABLA DENTRO DEL CONTENEDOR DE RESULTADOS
    if(resultados.length){
        let table = document.createElement('table');
        let tableBody = document.createElement('tbody');
        table.appendChild(tableBody);
        //RECORRER LOS ALBUMES
        for(let i=-1; i<resultados.length; i++){
            let tr = document.createElement('tr');
            tr.style.height="50%";
            tableBody.appendChild(tr);
            //EN EL INDICE -1 DIBUJAR EL ENCABEZADO DE LA TABLA
            if(i==-1){
                for (let j=0; j<7; j++) {
                    var td = document.createElement('td');
                    let contenido_celda = document.createElement('div');
                    if(j==0){
                        contenido_celda.innerHTML="Reproducir";
                    }
                    else if(j==1){
                        contenido_celda.innerHTML="Álbum";
                    }
                    else if (j==2){
                        contenido_celda.innerHTML="Artista";
                    }
                    else if(j==3){
                        contenido_celda.innerHTML="Lanzamiento";
                    }
                    else if(j==4){
                        contenido_celda.innerHTML="Canciones";
                    }
                    else if(j==5){
                        contenido_celda.innerHTML="Seguir";
                    }
                    else if(j==6){
                        contenido_celda.innerHTML="Visualizar";
                    }
                    td.appendChild(contenido_celda);
                    tr.appendChild(td);
                }
            }else{
                for (let j=0; j<7; j++) {
                    var td = document.createElement('td');
                    let contenido_celda = document.createElement('div');
                    if(j==0){
                        contenido_celda.innerHTML=`<button><img src='../assets/icons/reproducir.svg' class='icono-boton'></button>`;
                        contenido_celda.addEventListener('click',()=>{
                            console.log("reproducir album");
                        });
                    }
                    else if(j==1){
                        contenido_celda.innerHTML=resultados[i].nombre_album;
                    }
                    else if (j==2){
                        contenido_celda.innerHTML=resultados[i].artista.nombre;
                    }
                    else if(j==3){
                        contenido_celda.innerHTML=resultados[i].lanzamiento;
                    }
                    else if(j==4){
                        contenido_celda.innerHTML=resultados[i].canciones.length;
                    }
                    else if(j==5){
                        contenido_celda.innerHTML=`<button><img src='../assets/icons/add.svg' class='icono-boton'></button>`
                        contenido_celda.addEventListener('click',()=>{
                            console.log("seguir album");
                        });
                    }
                    else if(j==6){
                        contenido_celda.innerHTML=`<button data-bs-toggle="modal" data-bs-target="#modal-visualizar-album"><img src='../assets/icons/visualizar.svg' class='icono-boton'></button>`
                        contenido_celda.addEventListener('click',()=>{
                            console.log("visualizar album");
                            dibujar_contenido_visualizar_album(resultados, i);
                        });
                    }
                    td.appendChild(contenido_celda);
                    tr.appendChild(td);
                }
            }
        }
        contenedor_resultados.appendChild(table);

    }else{
        let h3 = document.createElement("h3");
        h3.textContent="No se encontraron coincidencias.";
        contenedor_resultados.appendChild(h3);
    }
}

//------------------------------------------------//
// FUNCION PARA DIBUJAR LA TABLA CON LOS ARTISTAS //
//------------------------------------------------//
var contenedor_visualizar_albumes_artista = document.getElementById("contenedor-visualizar-albumes-artista");
var nombre_visualizar_artista = document.getElementById("nombre-visualizar-artista");
function dibujar_tabla_artistas_busqueda(resultados) {
    //SI EXISTEN RESULTADOS DIBUJAR LA TABLA DENTRO DEL CONTENEDOR DE RESULTADOS
    if(resultados.length){
        let table = document.createElement('table');
        let tableBody = document.createElement('tbody');
        table.appendChild(tableBody);
        //RECORRER LOS ARTISTAS
        for(let i=-1; i<resultados.length; i++){
            let tr = document.createElement('tr');
            tr.style.height="50%";
            tableBody.appendChild(tr);
            //EN EL INDICE -1 DIBUJAR EL ENCABEZADO DE LA TABLA
            if(i==-1){
                for (let j=0; j<5; j++) {
                    var td = document.createElement('td');
                    let contenido_celda = document.createElement('div');
                    if(j==0){
                        contenido_celda.innerHTML="Reproducir";
                    }
                    else if(j==1){
                        contenido_celda.innerHTML="Artista";
                    }
                    else if (j==2){
                        contenido_celda.innerHTML="Albumes";
                    }
                    else if(j==3){
                        contenido_celda.innerHTML="Seguir artista";
                    }
                    else if(j==4){
                        contenido_celda.innerHTML="Visualizar";
                    }
                    td.appendChild(contenido_celda);
                    tr.appendChild(td);
                }
            }else{
                for (let j=0; j<5; j++) {
                    var td = document.createElement('td');
                    let contenido_celda = document.createElement('div');
                    if(j==0){
                        contenido_celda.innerHTML=`<button><img src='../assets/icons/reproducir.svg' class='icono-boton'></button>`;
                        contenido_celda.addEventListener('click',()=>{
                            console.log("reproducir artista");
                        });
                    }
                    else if(j==1){
                        contenido_celda.innerHTML=resultados[i].nombre;
                    }
                    else if (j==2){
                        contenido_celda.innerHTML=resultados[i].albumes.length;
                    }
                    else if(j==3){
                        contenido_celda.innerHTML=`<button><img src='../assets/icons/add.svg' class='icono-boton'></button>`
                        contenido_celda.addEventListener('click',()=>{
                            console.log("seguir artista");
                        });
                    }
                    else if(j==4){
                        contenido_celda.innerHTML=`<button data-bs-toggle="modal" data-bs-target="#modal-visualizar-artista"><img src='../assets/icons/visualizar.svg' class='icono-boton'></button>`
                        contenido_celda.addEventListener('click',()=>{
                            console.log("visualizar artista");
                            nombre_visualizar_artista.innerHTML=resultados[i].nombre;
                            contenedor_visualizar_albumes_artista.innerHTML="";
                            for(let k=0; k<resultados[i].albumes.length; k++){
                                let div = document.createElement("div");
                                let boton_reproducir = document.createElement("button");
                                boton_reproducir.innerHTML='<img src="../assets/icons/reproducir.svg" class="icono-boton">'
                                div.appendChild(boton_reproducir);

                                let input = document.createElement("input");
                                input.type="text";
                                input.disabled=true;
                                input.value = resultados[i].albumes[k].nombre_album;
                                div.appendChild(input);

                                let boton_ver_album = document.createElement("button");
                                boton_ver_album.className="boton-gris";
                                boton_ver_album.innerHTML='<img src="../assets/icons/visualizar.svg" class="icono-boton">'
                                div.appendChild(boton_ver_album);

                                boton_ver_album.setAttribute('data-bs-toggle','modal');
                                boton_ver_album.setAttribute('data-bs-target','#modal-visualizar-album');

                                boton_ver_album.addEventListener('click',()=>{
                                    dibujar_contenido_visualizar_album(resultados[i].albumes, k, resultados[i].nombre);
                                })

                                contenedor_visualizar_albumes_artista.appendChild(div);
                            }

                        });
                    }
                    td.appendChild(contenido_celda);
                    tr.appendChild(td);
                }
            }
        }
        contenedor_resultados.appendChild(table);

    }else{
        let h3 = document.createElement("h3");
        h3.textContent="No se encontraron coincidencias.";
        contenedor_resultados.appendChild(h3);
    }
}