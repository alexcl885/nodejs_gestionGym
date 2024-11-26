window.document.addEventListener("change", (ev) =>{
    let seleccion = document.getElementById("entrenador");
    let idEntrenador = seleccion.options[seleccion.selectedIndex].value;
    document.getElementById(
        "sesionForm").setAttribute(
            "action","/entrenadores/" +"entrenadores_sesiones/" +
            idEntrenador 
            );
    document.getElementById("sesionForm").submit();
});
