var form_busqueda = document.getElementById("form-busqueda");
var boton_buscar = document.getElementById("boton-buscar");
var contenedor_resultados = document.getElementById("contenedor-resultados");

const realizar_busqueda = (e) => {
    e.preventDefault();
    let datos_form_buscar = new FormData(form_busqueda);
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

function dibujar_resultados(datos){
    elementos = datos.elementos;
    resultados = datos.resultado_busqueda;

    //LIMPIAR EL CONTENEDOR DE LOS RESULTADOS
    contenedor_resultados.innerHTML="";
    if(elementos=="canciones"){
        //SI EXISTEN RESULTADOS DIBUJAR LA TABLA DENTRO DEL CONTENEDOR DE RESULTADOS
        if(resultados.length){
            let table = document.createElement('table');
            table.style.width="100%";
            let tableBody = document.createElement('tbody');
            table.appendChild(tableBody);
            //RECORRER LAS CANCIONES
            for(let i=0; i<resultados.length; i++){
                let tr = document.createElement('tr');
                tableBody.appendChild(tr);
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
            contenedor_resultados.appendChild(table);

        }else{
            //console.log("Decir que no hay nada")
            let h3 = document.createElement("h3");
            h3.textContent="No se encontraron coincidencias.";
            contenedor_resultados.appendChild(h3);
        }

    }else{  //SI LOS ELEMENTOS SON LISTAS
        if(resultados.length){
            let table = document.createElement('table');
            table.style.width="100%";
            let tableBody = document.createElement('tbody');
            table.appendChild(tableBody);
            //RECORRER LAS LISTAS
            for(let i=0; i<resultados.length; i++){
                let tr = document.createElement('tr');
                tableBody.appendChild(tr);
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
                        console.log(id_listas_propietarias, resultados[i]._id);
                        if(id_listas_propietarias.includes(resultados[i]._id)){
                            contenido_celda.innerHTML="Eres dueño de esta lista";
                        }else{
                            contenido_celda.innerHTML=`<button><img src='../assets/icons/add.svg' class='icono-boton'> Seguir lista</button>`;
                            contenido_celda.addEventListener('click',()=>{
                                seguir_lista(resultados[i]._id);
                            })
                        }
                    }
                    else if(j==3){
                        //SI LA LISTA A IMPRIMIR SE ENCUENTRA EN LAS LISTAS PROPIETARIAS DE UN USUARIO, DARLE A ESTE LA CAPACIDAD DE EDICION EN LA BUSQUEDA
                        if(id_listas_propietarias.includes(resultados[i]._id)){
                            //INGRESAR BOTON DE EDICION QUE ACTIVA EL MODAL EDITAR LISTA
                            contenido_celda.innerHTML=`<button data-bs-toggle="modal" data-bs-target="#modal-editar-lista"><img src='../assets/icons/edit.svg' class='icono-boton'> Editar lista</button>`;
                            contenido_celda.onclick = () => {
                                //CUANDO SE CLICKEA, LIMPIAR EL CONTENEDOR DE LAS CANCIONES Y DIBUJAR LAS PERTENECIENTES A LA LISTA
                                contenedor_input_canciones.innerHTML="";
                                input_editar_nombre_lista.value = resultados[i].nombre_lista;
                                for(let j=0; j<resultados[i].canciones.length; j++){
                                    let div = document.createElement("div");
                                    let input = document.createElement("input");
                                    input.type="text";
                                    input.disabled=true;
                                    input.value = resultados[i].canciones[j].nombre_cancion + ", " + resultados[i].canciones[j].artista + ", " + resultados[i].canciones[j].album;
                                    input.setAttribute("ObjectId", resultados[i].canciones[j]._id);
                                    input.className="input-canciones-lista";
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
                            contenido_celda.innerHTML=`<button data-bs-toggle="modal" data-bs-target="#modal-visualizar-lista"><img src='../assets/icons/visualizar.svg' class='icono-boton'> Visualizar lista</button>`;
                            contenido_celda.onclick = () => {
                                contenedor_visualizar_canciones.innerHTML = "";
                                nombre_visualizar_lista.innerText = resultados[i].nombre_lista;
                                for(let j=0; j<resultados[i].canciones.length; j++){
                                    let div = document.createElement("div");
                                    let input = document.createElement("input");
                                    input.type="text";
                                    input.disabled=true;
                                    input.value = resultados[i].canciones[j].nombre_cancion + ", " + resultados[i].canciones[j].artista + ", " + resultados[i].canciones[j].album;
                                    input.className="input-canciones-lista";
                                    div.appendChild(input);
                    
                                    contenedor_visualizar_canciones.appendChild(div);
                                }
                            }
                        }
                        
                    }
                    td.appendChild(contenido_celda);
                    tr.appendChild(td);
                }
                contenedor_resultados.appendChild(table);
            }
        }else{
            let h3 = document.createElement("h3");
            h3.textContent="No se encontraron listas de reproducción con ese nombre.";
            contenedor_resultados.appendChild(h3);
        }
    }
}

function reproducir_cancion(ruta_cancion){
    console.log("reproducir cancion en esta ruta", ruta_cancion);
}

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

function seguir_lista(id_lista) {
    fetch('seguidos', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: '{"id_lista":"'+id_lista+'"}'
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

//ESTABLECIMIENTO DE LAS LISTAS QUE SON PERTENECIENTES AL USUARIO, PARA MOSTRAR LOS OPTIONS EN EL SELECT AGREGAR CANCION A LISTA
//TAMBIEN PERMITE ESTABLECER SI UNA LISTA ES PROPIA DEL USUARIO CUANDO SE REALIZA UNA BUSQUEDA POR LISTAS
listas_propietarias = [];
id_listas_propietarias = [];
function establecer_listas_del_usuario(datos){
    for(let i=0; i<datos.listas.length;i++){
        if(datos.listas[i].propietario == datos.id_usuario){
            listas_propietarias.push(datos.listas[i]);
            id_listas_propietarias.push(datos.listas[i]._id);
        }
    }
    //console.log("Las listas propietarias son: " + listas_propietarias);
}