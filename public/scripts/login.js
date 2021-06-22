var form_login = document.getElementById("form-login");
var boton_login = document.getElementById("boton-login");

function iniciar_sesion () {
    console.log("iniciar sesion");
    var datos_form = new FormData(form_login);
    if(datos_form.get("usuario")=="" || datos_form.get("clave")==""){
        alert("Llene todos los campos");
    }else{
        fetch('login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(datos_form.entries()))
        })
        //RESPUESTA CRUDA DEL SERVER
        .then(response => response.json())
        //RESPUESTA CON LOS RESULTADOS DEL SERVIDOR
        .then(data => {
            console.log(data);
            alert(data.resultado);
            // if(data.status==200){
            //     window.open("/","_self");
            // }
        })	    
        //CATCH PARA OBTENER DETALLE POR SI ORURRE UN ERROR
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

boton_login.onclick=iniciar_sesion;