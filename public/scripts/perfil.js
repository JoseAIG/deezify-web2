//FUNCIONALIDAD BOTON CERRAR SESION
var boton_cerrar_sesion = document.getElementById("boton-cerrar-sesion");
const cerrar_sesion = () => {
    fetch('dashboard', {
        method: 'POST',
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

//FUNCIONALIDAD EDITAR PERFIL
var boton_editar_perfil = document.getElementById("boton-editar-perfil");
const editar_perfil = () => {
    console.log("editar perfil");
}
boton_editar_perfil.onclick=editar_perfil;