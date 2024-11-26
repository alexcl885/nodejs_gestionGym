window.document.addEventListener("change", (ev) =>{
    let seleccion = document.getElementById("plan");
    let idPlan = seleccion.options[seleccion.selectedIndex].value;
    document.getElementById(
        "planForm").setAttribute(
            "action","/planes/" +"planes_clientes/" +
            idPlan 
            );
    document.getElementById("planForm").submit();
});
