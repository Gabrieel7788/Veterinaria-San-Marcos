// 1. Arreglo de Servicios
const servicios = [
    { id: 'SV001', categoria: 'Consultas', nombre: 'Consulta general', especie: 'Perro / Gato', duracion: '30 min', precio: 15000, obs: 'Ninguna', imagen: 'img/gato.jpg' },
    { id: 'SV002', categoria: 'Consultas', nombre: 'Consulta urgencia', especie: 'Perro / Gato', duracion: '30 min', precio: 25000, obs: 'Fuera de horario +$10.000', imagen: 'img/gato.jpg' },
    { id: 'VA001', categoria: 'Vacunación', nombre: 'Vacuna antirrábica canina', especie: 'Perro', duracion: '10 min', precio: 12000, obs: 'Obligatoria por ley', imagen: 'img/vacuna.jpg' },
    { id: 'VA003', categoria: 'Vacunación', nombre: 'Vacuna bivalente felina', especie: 'Gato', duracion: '10 min', precio: 15000, obs: 'Refuerzo anual', imagen: 'img/vacuna.jpg' },
    { id: 'CI002', categoria: 'Cirugía', nombre: 'Esterilización macho canino', especie: 'Perro', duracion: '60 min', precio: 60000, obs: 'Incluye anestesia', imagen: 'img/gato.jpg' },
    { id: 'OT002', categoria: 'Otros', nombre: 'Limpieza dental', especie: 'Perro / Gato', duracion: '45 min', precio: 55000, obs: 'Requiere anestesia', imagen: 'img/gato.jpg' }
];

// 2. Renderizar el catálogo en servicios.html y destacados del index
const contenedorServicios = document.getElementById("contenedor-servicios");

if (contenedorServicios) {
    servicios.forEach(servicio => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-servicio"); // Uso de clase CSS

        tarjeta.innerHTML = `
            <img src="${servicio.imagen}" alt="${servicio.nombre}" class="tarjeta-img">
            <h3 class="tarjeta-titulo">${servicio.nombre}</h3>
            <p class="tarjeta-categoria">Categoría: ${servicio.categoria}</p>
            <p><strong>Precio: $${servicio.precio}</strong></p>
            <button onclick="verDetalle('${servicio.id}')" class="btn-detalle">Ver Detalle</button>
            <button onclick="agregarAReserva('${servicio.id}')" class="btn-agendar-cita">Agendar Cita</button>
            
            <div id="detalle-${servicio.id}" class="detalle-servicio">
                <p><strong>Especie:</strong> ${servicio.especie}</p>
                <p><strong>Duración:</strong> ${servicio.duracion}</p>
                <p><strong>Observaciones:</strong> ${servicio.obs}</p>
            </div>
        `;
        contenedorServicios.appendChild(tarjeta);
    });
}

// 3. Función para mostrar/ocultar la vista de detalle
window.verDetalle = function(id) {
    const detalleDiv = document.getElementById(`detalle-${id}`);
    if (detalleDiv.style.display === "none" || detalleDiv.style.display === "") {
        detalleDiv.style.display = "block";
    } else {
        detalleDiv.style.display = "none";
    }
}

// 4. Agregar elemento al LocalStorage
window.agregarAReserva = function(id) {
    const servicioSeleccionado = servicios.find(s => s.id === id);
    let carrito = JSON.parse(localStorage.getItem("reservasSanMarcos")) || [];
    carrito.push(servicioSeleccionado);
    localStorage.setItem("reservasSanMarcos", JSON.stringify(carrito));
    alert(`¡${servicioSeleccionado.nombre} agregado a tus reservas!`);
}

// 5. Renderizar página de Mis Reservas (reserva.html)
function renderizarReservas() {
    const contenedorReservas = document.getElementById("contenedor-reservas");
    if (!contenedorReservas) return;

    let carrito = JSON.parse(localStorage.getItem("reservasSanMarcos")) || [];
    contenedorReservas.innerHTML = "";

    if (carrito.length === 0) {
        contenedorReservas.innerHTML = "<p style='color: red;'>No tienes servicios seleccionados aún.</p>";
        return;
    }

    let total = 0;
    carrito.forEach((servicio, index) => {
        total += servicio.precio;
        const div = document.createElement("div");
        div.style.border = "1px solid #ccc";
        div.style.padding = "15px";
        div.style.marginBottom = "10px";
        div.style.borderRadius = "5px";
        div.style.display = "flex";
        div.style.justifyContent = "space-between";
        div.style.alignItems = "center";
        
        div.innerHTML = `
            <div>
                <h4 style="margin:0;">${servicio.nombre}</h4>
                <p style="margin:5px 0 0 0;">Precio: $${servicio.precio} | Especie: ${servicio.especie}</p>
            </div>
            <button onclick="eliminarDeReserva(${index})" style="background-color: #e74c3c; color: white; border: none; padding: 8px 12px; cursor: pointer; border-radius: 4px;">Quitar</button>
        `;
        contenedorReservas.appendChild(div);
    });

    const totalDiv = document.createElement("div");
    totalDiv.style.marginTop = "20px";
    totalDiv.style.textAlign = "right";
    totalDiv.innerHTML = `<h3>Total Estimado: $${total}</h3>`;
    contenedorReservas.appendChild(totalDiv);
}

window.eliminarDeReserva = function(index) {
    let carrito = JSON.parse(localStorage.getItem("reservasSanMarcos")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("reservasSanMarcos", JSON.stringify(carrito));
    renderizarReservas();
}

renderizarReservas();