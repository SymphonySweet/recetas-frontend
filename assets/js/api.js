// ==========================================
// CONFIGURACIÓN
// ==========================================
const API_URL = "https://recetas-backend-rab7.onrender.com"; // URL de tu backend en Render

// ==========================================
// FUNCIÓN: Cargar recetas desde el backend
// ==========================================
async function cargarRecetas() {
    try {
        const respuesta = await fetch(`${API_URL}/recipes`); // Cambiar ruta según tu backend
        if (!respuesta.ok) throw new Error("Error al obtener recetas");
        const recetas = await respuesta.json();

        // Renderizar en la página
        mostrarRecetas(recetas);
    } catch (error) {
        console.error("Error cargando recetas:", error);
    }
}

// ==========================================
// FUNCIÓN: Mostrar recetas en la página
// ==========================================
function mostrarRecetas(recetas) {
    const contenedor = document.getElementById("lista-recetas");
    if (!contenedor) return;

    contenedor.innerHTML = ""; // Limpia contenido previo

    recetas.forEach(receta => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "col-md-4 mb-4";
        tarjeta.innerHTML = `
            <div class="card h-100">
                <img src="${receta.imagen || 'assets/img/default.jpg'}" class="card-img-top" alt="${receta.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${receta.nombre}</h5>
                    <p class="card-text">${receta.descripcion}</p>
                    <p class="fw-bold text-success">S/ ${receta.precio.toFixed(2)}</p>
                    <button class="btn btn-primary" onclick="agregarAlCarrito(${receta.id})">Agregar al carrito</button>
                </div>
            </div>
        `;
        contenedor.appendChild(tarjeta);
    });
}

// ==========================================
// FUNCIÓN: Agregar al carrito
// ==========================================
function agregarAlCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado al carrito");
    actualizarCarritoUI();
}

// ==========================================
// FUNCIÓN: Actualizar icono del carrito
// ==========================================
function actualizarCarritoUI() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    document.getElementById("contador-carrito").textContent = carrito.length;
}

// ==========================================
// FUNCIÓN: Inicializar
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    actualizarCarritoUI();
    cargarRecetas();
});
