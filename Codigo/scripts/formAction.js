const NACIONALIDADES_ACEPTADAS = [
    { key: 'AU', name: "Australia" },
    { key: 'BR', name: "Brasil" },
    { key: 'CA', name: "Canadá" },
    { key: 'CH', name: "Suiza" },
    { key: 'DE', name: "Alemania" },
    { key: 'DK', name: "Dinamarca" },
    { key: 'ES', name: "España" },
    { key: 'FI', name: "Finlandia" },
    { key: 'FR', name: "Francia" },
    { key: 'GB', name: "Reino Unido" },
    { key: 'IE', name: "Irlanda" },
    { key: 'IN', name: "India" },
    { key: 'IR', name: "Irán" },
    { key: 'MX', name: "México" },
    { key: 'NL', name: "Países Bajos" },
    { key: 'NO', name: "Noruega" },
    { key: 'NZ', name: "Nueva Zelanda" },
    { key: 'RS', name: "Serbia" },
    { key: 'TR', name: "Turquía" },
    { key: 'UA', name: "Ucrania" },
    { key: 'US', name: "Brasil" },
];

window.onload = function () {
    const form = document.getElementsByTagName("form");
    const inputs = form[0].getElementsByTagName("input");
    const selects = form[0].getElementsByTagName("select");
    
    llenarNacionalidad();

    for (let input of inputs) {
        input.onfocus = resaltarDesresaltar;
        input.addEventListener('blur', resaltarDesresaltar);
        input.addEventListener("input", validar);
    }

    for (let select of selects) {
        select.onfocus = resaltar;
        select.addEventListener('blur', noResaltar);
    }
    
    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Detiene el envío REAL del formulario
        validar();
    });
}

function llenarNacionalidad() {
    const nacionalidad = document.getElementById("nationality");

    for (let {key, name} of NACIONALIDADES_ACEPTADAS) {
        const option = document.createElement("option");
        option.value = key;
        option.innerHTML = name;
        nacionalidad.appendChild(option);
    }
}

function resaltar(evento) {
    const label = document.querySelector(`label[for="${evento.target.id}"]`);
    if (label) {
        label.classList.toggle("label-selected");
    }
    evento.target.classList.add("selected");
}

function noResaltar(evento) {
    const clase = evento.target.classList.contains("selected");
    if (clase) {
        evento.target.classList.remove("selected");
    }
}

function resaltarDesresaltar(evento) {
    const label = document.querySelector(`label[for="${evento.target.id}"]`);
    if (label) {
        label.classList.toggle("label-selected");
    }
    evento.target.classList.toggle("selected");
}

function validar(evento) {
    const nombre = document.getElementById("first-name");
    const apellido = document.getElementById("last-name");
    const email = document.getElementById("email");
    const interes = document.querySelectorAll('input[name="interest"]');
    const nacionalidad = document.getElementById("nationality");

    const soloLetras = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/;

    // Validar nombre
    if (nombre.value.trim() === "") {
        nombre.setCustomValidity("Este campo no puede estar vacío");
    } else if (!soloLetras.test(nombre.value.trim()))  {
        nombre.setCustomValidity("Solo se aceptan letras");
    } else {
        nombre.setCustomValidity("");
    }

    // Validar apellido
    if (apellido.value.trim() === "") {
        apellido.setCustomValidity("Este campo no puede estar vacío");
    } else if (!soloLetras.test(apellido.value.trim()))  {
        apellido.setCustomValidity("Solo se aceptan letras");
    } else {
        apellido.setCustomValidity("");
    }

    // Validar correo vacio
    if (email.value.trim() === "") {
        email.setCustomValidity("Este campo no puede estar vacío");
    } else {
        email.setCustomValidity("");
    }

    // Al menos un interes seleccionado
    let marcado = false;
    interes.forEach(chk => {
        if (chk.checked) marcado = true;
    });

    if (!marcado) {
        // Esto evita que el form envíe si está vacío
        interes[0].setCustomValidity("Selecciona al menos una opción");
    } else {
        interes.forEach(chk => chk.setCustomValidity(""));
    }
}
