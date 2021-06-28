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

//OBTENER LAS LISTAS DE UN USUARIO AL CARGAR LA PAGINA
window.onload = () => {
    fetch('listas', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(data => {
        //DIBUJAR LOS RESULTADOS DE LA PETICION
        console.log(data);
        dibujar_listas_aside(data.listas);
    })	    
    .catch((error) => {
        console.error('Error:', error);
    });
}

//FUNCION PARA DIBUJAR LISTAS EN ASIDE
var contenedor_listas = document.getElementById("contenedor-listas");
function dibujar_listas_aside(listas){

    //ELEMENTOS DEL MODAL EDITAR LISTAS
    var input_editar_nombre_lista = document.getElementById("input-editar-nombre-lista");
    var contenedor_input_canciones = document.getElementById("contenedor-input-canciones");

    console.log("dibujar listas funcion", listas, contenedor_listas);
    for(let i=0; i<listas.length; i++){
        let div = document.createElement("div");
        div.style.display="flex";
        div.style.marginBottom="1em";
        let reproducir = document.createElement("button");
        reproducir.style.height="2.2em";
        reproducir.innerHTML="<img src='../assets/icons/reproducir.svg' class='icono-boton'></img>"
        div.appendChild(reproducir);
        let p = document.createElement("p");
        p.style.verticalAlign="middle";
        p.innerText = listas[i].nombre_lista;
        p.style.margin="0.5em";
        div.appendChild(p);
        let editar = document.createElement("button");
        //data-bs-toggle='modal' data-bs-target='#modal-editar-cancion'
        editar.setAttribute('data-bs-toggle','modal');
        editar.setAttribute('data-bs-target','#modal-editar-lista');
        editar.className="boton-gris";
        editar.innerHTML="<img src='../assets/icons/edit.svg' class='icono-boton'></img>"
        editar.style.marginLeft="auto";
        editar.style.height="2.2em";
        div.appendChild(editar);
        contenedor_listas.appendChild(div);

        reproducir.addEventListener('click',()=>{
            console.log("reproducir lista " + listas[i].nombre_lista);
        })

        editar.addEventListener('click', ()=>{
            contenedor_input_canciones.innerHTML="";
            input_editar_nombre_lista.value = listas[i].nombre_lista;
            //obtener_canciones_lista(listas[i]._id);
            for(let j=0; j<listas[i].canciones.length; j++){
                let div = document.createElement("div");
                let input = document.createElement("input");
                input.type="text";
                //input.name="input_cancion_"+i;
                input.disabled=true;
                input.value = listas[i].canciones[j].nombre_cancion + ", " + listas[i].canciones[j].artista + ", " + listas[i].canciones[j].album;
                input.setAttribute("ObjectId", listas[i].canciones[j]._id);
                input.className="input-canciones-lista";
                div.appendChild(input);

                let boton_remover = document.createElement("button");
                boton_remover.className="boton-eliminar";
                boton_remover.innerHTML="<img src='../assets/icons/remove.svg' class='icono-boton'></img>"
                div.appendChild(boton_remover);

                boton_remover.addEventListener('click',()=>{
                    div.remove();
                });
                // let input_id = document.createElement("input");
                // input_id.type="hidden";
                // input_id.name="input_cancion_"+j;
                // input_id.value = listas[i].canciones[j]._id;
                // div.appendChild(input_id);

                contenedor_input_canciones.appendChild(div);
            }
            //LLAMAR A LAS FUNCIONES PARA BRINDAR LA FUNCIONALIDAD DE EDITAR LISTA Y ELIMINAR LISTA
            editar_lista(listas[i]._id);
            eliminar_lista(listas[i]._id);
        })
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
            window.open('/dashboard','_self')
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
        //console.log("guardar lista, " + id_lista);
        let datos_form_editar_lista = new FormData(form_editar_lista);
        datos_form_editar_lista.append("id_lista",id_lista);
        datos_form_editar_lista.append("canciones",JSON.stringify(canciones));
        console.log(Object.fromEntries(datos_form_editar_lista.entries()));
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
                window.open('/dashboard','_self')
            }
        })	    
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

//FUNCIONALIDAD PARA ELIMINAR UNA LISTA DE REPRODUCCION
var boton_eliminar_lista = document.getElementById("boton-eliminar-lista");
function eliminar_lista(id_lista){
    boton_eliminar_lista.onclick = () => {
        fetch('listas', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: '{"id_lista":"'+id_lista+'"}'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert(data.resultado);
            if(data.status==200){
                window.open('/dashboard','_self')
            }
        })	    
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

// function obtener_canciones_lista(id_lista){
//     fetch('canciones', {
//         method: 'GET',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify('{"id_lista":'+id_lista+'}')
//     })
//     .then(response => response.json())
//     .then(data => {
//         //DIBUJAR LOS RESULTADOS DE LA PETICION
//         console.log(data);
//     })	    
//     .catch((error) => {
//         console.error('Error:', error);
//     });
// }