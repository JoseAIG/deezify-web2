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
        dibujar_resultados(data.resultado_busqueda);
    })	    
    .catch((error) => {
        console.error('Error:', error);
    });
}
boton_buscar.onclick=realizar_busqueda;

function dibujar_resultados(resultados){

    //LIMPIAR EL CONTENEDOR DE LOS RESULTADOS
    contenedor_resultados.innerHTML="";

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
                    contenido_celda.innerHTML=resultados[i].artista;
                }
                else if(j==3){
                    contenido_celda.innerHTML=resultados[i].album;
                }
                else if(j==4){
                    contenido_celda.innerHTML=resultados[i].reproducciones;
                }
                else if(j==5){
                    // let button = document.createElement("button");
                    // let img = document.createElement("img");
                    // img.src="../assets/icons/lista.svg";
                    // img.style.width="25px"
                    // button.appendChild(img);

                    let select = document.createElement("select");
                    let option_defecto = document.createElement("option");
                    option_defecto.text="Agregar a lista";
                    select.appendChild(option_defecto);

                    let MyList = document.createElement("option");
                    MyList.text="MyList";
                    select.appendChild(MyList);

                    // button.appendChild(select);
                    // contenido_celda.appendChild(button);
                    contenido_celda.appendChild(select);
                    //contenido_celda.innerHTML=`<select><img src='../assets/icons/lista.svg' class='icono-boton'></select>`;
                    select.addEventListener('change',()=>{
                        agregar_cancion_a_lista(resultados[i]._id);
                    });
                }
                else if(j==6){
                    contenido_celda.innerHTML=`<button><img src='../assets/icons/corazon-vacio.svg' class='icono-boton'></button>`
                    contenido_celda.addEventListener('click',()=>{
                        agregar_cancion_a_favoritos(resultados[i]._id);
                    });
                    // contenido_celda.innerHTML=`<button class='boton-gris' data-bs-toggle='modal' data-bs-target='#modal-editar-cancion'><img src='../assets/icons/edit.svg' class='icono-boton'></button>`;
                    // contenido_celda.addEventListener('click',()=>{
                    //     input_editar_titulo.value = arreglo_canciones[i].nombre_cancion;
                    //     input_editar_artista.value = arreglo_canciones[i].artista;
                    //     input_editar_album.value = arreglo_canciones[i].album;
                    //     //AGREGARLE LA FUNCION DE EDITAR CANCION Y ELIMINAR CANCION (FUNCIONES CREADAS PARA PODER PASAR EL ID DE LA CANCION)
                    //     editar_cancion(arreglo_canciones[i]._id);
                    //     eliminar_cancion(arreglo_canciones[i]._id);
                    // });
                }
                td.appendChild(contenido_celda);
                tr.appendChild(td);
            }
        }
        contenedor_resultados.appendChild(table);

    }else{
        console.log("Decir que no hay nada")
        let h3 = document.createElement("h3");
        h3.textContent="No se encontraron coincidencias.";
        contenedor_resultados.appendChild(h3);
    }
}

function reproducir_cancion(ruta_cancion){
    console.log("reproducir cancion en esta ruta", ruta_cancion);
}

function agregar_cancion_a_lista(id_cancion) {
    console.log("agregar esta cancion a alguna lista", id_cancion);
}

function agregar_cancion_a_favoritos(id_cancion) {
    console.log("agregar esta cancion a favoritos", id_cancion);
}