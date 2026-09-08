// 1. Arreglo de regiones y comunas
const regionesYComunas = [
    { id: 1, nombre: "Región Metropolitana", comunas: ["Santiago", "Quilicura", "Maipú", "Providencia"] },
    { id: 2, nombre: "Región de O'Higgins", comunas: ["Rancagua", "Machalí", "Rengo", "San Fernando"] },
    { id: 3, nombre: "Región de Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué"] }
];

const selectRegion = document.getElementById("region");
const selectComuna = document.getElementById("comuna");

// 2. Cargar Regiones
if (selectRegion && selectComuna) {
    regionesYComunas.forEach(region => {
        let option = document.createElement("option");
        option.value = region.id;
        option.textContent = region.nombre;
        selectRegion.appendChild(option);
    });

    selectRegion.addEventListener("change", (e) => {
        selectComuna.innerHTML = '<option value="">Seleccione una comuna</option>'; 
        const regionSeleccionada = regionesYComunas.find(r => r.id == e.target.value);
        if (regionSeleccionada) {
            regionSeleccionada.comunas.forEach(comuna => {
                let option = document.createElement("option");
                option.value = comuna;
                option.textContent = comuna;
                selectComuna.appendChild(option);
            });
        }
    });
}

// 3. Función para validar rut
function validarRUT(rut) {
    if (!/^[0-9]+[0-9kK]{1}$/.test(rut)) return false;
    let cuerpo = rut.slice(0, -1);
    let dv = rut.slice(-1).toUpperCase();
    let suma = 0;
    let multiplo = 2;
    for (let i = 1; i <= cuerpo.length; i++) {
        let index = multiplo * rut.charAt(cuerpo.length - i);
        suma = suma + index;
        if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
    }
    let dvEsperado = 11 - (suma % 11);
    dvEsperado = (dvEsperado === 11) ? "0" : (dvEsperado === 10) ? "K" : dvEsperado.toString();
    return dvEsperado === dv;
}

//- LÓGICA DE REGISTRO -
const formRegistro = document.getElementById("formRegistro");
if (formRegistro) {
    formRegistro.addEventListener("submit", function(e) {
        e.preventDefault(); 
        const rutInput = document.getElementById("rut").value;
        const nombre = document.getElementById("nombre").value.trim();
        const apellidos = document.getElementById("apellidos").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const direccion = document.getElementById("direccion").value.trim();
        const errorMsg = document.getElementById("mensaje-error");
        
        if (!validarRUT(rutInput)) {
            errorMsg.style.color = "red";
            errorMsg.textContent = "Error: El RUN no es válido o tiene formato incorrecto.";
            return;
        }
        if (nombre === "" || nombre.length > 50) {
            errorMsg.style.color = "red";
            errorMsg.textContent = "Error: El nombre es obligatorio y máximo 50 caracteres.";
            return;
        }
        if (apellidos === "" || apellidos.length > 100) {
            errorMsg.style.color = "red";
            errorMsg.textContent = "Error: Los apellidos son obligatorios y máximo 100 caracteres.";
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) || correo.length > 100) {
            errorMsg.style.color = "red";
            errorMsg.textContent = "Error: Ingrese un correo válido de máximo 100 caracteres.";
            return;
        }
        if (direccion === "" || direccion.length > 300) {
            errorMsg.style.color = "red";
            errorMsg.textContent = "Error: La dirección es obligatoria y máximo 300 caracteres.";
            return;
        }
        
        errorMsg.style.color = "green";
        errorMsg.textContent = "¡Registro validado exitosamente!";
        formRegistro.reset(); 
    });
}

//- LÓGICA DE INICIO DE SESIÓN -
const formLogin = document.getElementById("formLogin");
if (formLogin) {
    formLogin.addEventListener("submit", function(e) {
        e.preventDefault(); 
        const correo = document.getElementById("loginCorreo").value;
        const pass = document.getElementById("loginPass").value;
        const errorMsg = document.getElementById("login-error");
        
        const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
        
        if (!correoValido || correo.length > 100) {
            errorMsg.style.color = "red";
            errorMsg.textContent = "Error: Ingrese un correo válido (máx 100 caracteres).";
            return;
        }
        if (pass.length < 4 || pass.length > 10) {
            errorMsg.style.color = "red";
            errorMsg.textContent = "Error: La contraseña debe tener entre 4 y 10 caracteres.";
            return;
        }
        
        errorMsg.style.color = "green";
        errorMsg.textContent = "¡Ingreso exitoso! Redirigiendo...";
        // Simular que un cliente inició sesión al hacer login
        localStorage.setItem("sesionSanMarcos", JSON.stringify({ rol: "cliente" }));
        setTimeout(() => { window.location.href = "admin.html"; }, 1500);
    });
}

//- LÓGICA DE CONTACTO -
const formContacto = document.getElementById("formContacto");
if (formContacto) {
    formContacto.addEventListener("submit", function(e) {
        e.preventDefault(); 
        const nombre = document.getElementById("contactoNombre").value.trim();
        const correo = document.getElementById("contactoCorreo").value;
        const comentario = document.getElementById("contactoComentario").value.trim();
        const errorMsg = document.getElementById("contacto-error");
        
        if (nombre === "" || nombre.length > 100) {
            errorMsg.style.color = "red";
            errorMsg.textContent = "Error: El nombre es obligatorio (máx 100 caracteres).";
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) || correo.length > 100) {
            errorMsg.style.color = "red";
            errorMsg.textContent = "Error: Ingrese un correo válido (máx 100 caracteres).";
            return;
        }
        if (comentario === "" || comentario.length > 500) {
            errorMsg.style.color = "red";
            errorMsg.textContent = "Error: El mensaje es obligatorio (máx 500 caracteres).";
            return;
        }

        errorMsg.style.color = "green";
        errorMsg.textContent = "¡Mensaje enviado correctamente! Te contactaremos pronto.";
        formContacto.reset();
    });
}