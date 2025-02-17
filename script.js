// script.js

const platos = [
    { nombre: "Lomo Saltado", precio: 25.00 },
    { nombre: "Arroz con Pollo", precio: 20.00 },
    { nombre: "Ceviche", precio: 28.00 },
    { nombre: "Aji de Gallina", precio: 22.00 },
    { nombre: "Seco de Res", precio: 24.00 },
    { nombre: "Chaufa", precio: 18.00 },
    { nombre: "Anticuchos", precio: 30.00 },
    { nombre: "Tallarines Verdes", precio: 20.00 },
    { nombre: "Pollo a la Brasa", precio: 35.00 },
    { nombre: "Chicharrón", precio: 28.00 },
    { nombre: "Papa a la Huancaína", precio: 15.00 },
    { nombre: "Parrilla Mixta", precio: 50.00 }
  ];
  
  function generarListaPlatos() {
    const listaPlatos = document.getElementById("lista-platos");
    let fila;
  
    platos.forEach((plato, index) => {
      if (index % 3 === 0) {
        fila = document.createElement("div");
        fila.classList.add("row", "g-3");
        listaPlatos.appendChild(fila);
      }
  
      const contenedorPlato = document.createElement("div");
      contenedorPlato.classList.add("col-md-4", "plato");
  
      const label = document.createElement("label");
      label.classList.add("list-group-item");
  
      label.innerHTML = `
        <h5>${plato.nombre}</h5>
        <p>Precio: S/. ${plato.precio.toFixed(2)}</p>
        <div class="cantidad-control">
          <button class="btn-restar" onclick="restarCantidad(this)">-</button>
          <input type="number" min="0" value="0" data-precio="${plato.precio}" onchange="actualizarColorSeleccionado(this)">
          <button class="btn-agregar" onclick="agregarCantidad(this)">+</button>
        </div>
      `;
  
      contenedorPlato.appendChild(label);
      fila.appendChild(contenedorPlato);
    });
  }
  
  function agregarCantidad(boton) {
    const input = boton.previousElementSibling;
    input.value = parseInt(input.value) + 1;
    actualizarColorSeleccionado(input);
  }
  
  function restarCantidad(boton) {
    const input = boton.nextElementSibling;
    if (input.value > 0) {
      input.value = parseInt(input.value) - 1;
      actualizarColorSeleccionado(input);
    }
  }
  
  function actualizarColorSeleccionado(input) {
    const label = input.parentElement.parentElement;
    label.style.backgroundColor = input.value > 0 ? "#add8e6" : "#ffebcd";
  }
  
  function calcularTotal() {
    const inputs = document.querySelectorAll("#lista-platos input[type='number']");
    let total = 0;
    let detalles = "";
  
    inputs.forEach((input) => {
      const cantidad = parseInt(input.value);
      const precio = parseFloat(input.getAttribute("data-precio"));
      if (cantidad > 0) {
        total += cantidad * precio;
        detalles += `<div class="receipt-item">
          <span>${cantidad}x ${input.parentElement.parentElement.querySelector("h5").innerText}</span>
          <span>S/. ${(cantidad * precio).toFixed(2)}</span>
        </div>`;
      }
    });
  
    document.getElementById("recibo-detalles").innerHTML = detalles;
    document.getElementById("total").innerText = total.toFixed(2);
  }
  
  window.onload = generarListaPlatos;
  