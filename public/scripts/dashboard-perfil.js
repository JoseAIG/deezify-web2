//FUNCIONALIDAD BOTON CERRAR SESION
var boton_cerrar_sesion = document.getElementById("boton-cerrar-sesion");
const cerrar_sesion = () => {
    fetch('dashboard', {
        method: 'DELETE',
    })
    //RESPUESTA CRUDA DEL SERVER
    .then(response => response.json())
    //RESPUESTA CON LOS RESULTADOS DEL SERVIDOR
    .then(data => {
        console.log(data);
        alert(data.resultado);
        if(data.status==200){
            window.open("/","_self");
        }
    })	    
    //CATCH PARA OBTENER DETALLE POR SI ORURRE UN ERROR
    .catch((error) => {
        console.error('Error:', error);
    });
}
boton_cerrar_sesion.onclick=cerrar_sesion;

//FUNCIONALIDAD BOTON EDITAR PERFIL (MOSTRAR DATOS DEL USUARIO)
var input_editar_nombre = document.getElementById("input-editar-nombre");
var input_editar_correo = document.getElementById("input-editar-correo");
var boton_editar_perfil = document.getElementById("boton-editar-perfil");
const editar_perfil = () => {
    fetch('perfil', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data.status==200){
            input_editar_nombre.value=data.usuario;
            input_editar_correo.value=data.correo;
        }
        if(data.correo=="undefined"){
            window.open("/","_self");
        }
    })	    
    .catch((error) => {
        console.error('Error:', error);
    });
}
boton_editar_perfil.onclick=editar_perfil;

//FUNCIONALIDAD BOTON GUARDAR CAMBIOS
var form_editar_perfil = document.getElementById("form-editar-perfil");
var boton_guardar_edicion_perfil = document.getElementById("boton-guardar-edicion-perfil");
const guardar_edicion_perfil = () => {
    let datos_form_editar_perfil = new FormData(form_editar_perfil);
	if(!validarCorreo(datos_form_editar_perfil.get("correo"))){
		alert("Ingrese un correo valido");
	}
    else if(datos_form_editar_perfil.get("clave").length<6 && datos_form_editar_perfil.get("clave")!=""){
		alert("Ingrese una clave con 6 o mas caracteres");
	}
    else if(datos_form_editar_perfil.get("clave")!=datos_form_editar_perfil.get("confirmar-clave")){
		alert("Confirme correctamente su clave");
	}else{
        fetch('perfil', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(Object.fromEntries(datos_form_editar_perfil.entries()))
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert(data.resultado);
            if(data.status==200){
                window.open("/dashboard","_self");
            }
        })	    
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}
boton_guardar_edicion_perfil.onclick=guardar_edicion_perfil;

//FUNCIONALIDAD BOTON ELIMINAR PERFIL
var boton_eliminar_perfil = document.getElementById("boton-eliminar-perfil");
const eliminar_perfil = () => {
    console.log("eliminar perfil aqui");
    fetch('perfil', {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        alert(data.resultado);
        if(data.status==200){
            window.open("/dashboard","_self");
        }
    })	    
    .catch((error) => {
        console.error('Error:', error);
    });
}
boton_eliminar_perfil.onclick=eliminar_perfil;

//FUNCION PARA VALIDAR UN CORREO ELECTRONICO (PARA VALIDAR AL MOMENTO DE EDITAR EL CORREO DE UN PERFIL)
function validarCorreo(correo) {    
	//OBTENER LOS INDICES DEL ARROBA Y DEL ULTIMO PUNTO
    let posicionArroba = correo.indexOf("@");
    let posicionUltimoArroba = correo.lastIndexOf("@");
    let posicionUltimoPunto = correo.lastIndexOf(".");
    
    //SI LOS VALORES SON EXISTENTES PROCEDER
    if(posicionArroba && posicionUltimoPunto){
    	//SI EL PRIMER ARROBA NO POSEE EL INDICE DEL ULTIMO ARROBA (MAS DE UN ARROBA) INVALIDAR
    	if(posicionArroba!=posicionUltimoArroba){
    		return false;
    	}
    	//COMPROBAR POSICIONES ERRONEAS DE ARROBA Y PUNTOS PARA INVALIDAR, DE NO CUMPLIRSE NINGUNA CONDICION, MARCAR COMO VALIDO.
		if(posicionArroba<1 || posicionUltimoPunto<1 || posicionUltimoPunto==posicionArroba+1 || posicionUltimoPunto<posicionArroba || (correo.length-1) == posicionUltimoPunto || (correo.length-1) == posicionUltimoArroba){
			return false;
		}else{
			return true;
		}   
    }
}