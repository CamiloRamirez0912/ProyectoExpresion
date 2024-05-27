const carrito = document.getElementById('carrito');
const elementOne = document.getElementById('lista-1');
const list = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners() {
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
    elementOne.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElement);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const element = e.target.parentElement.parentElement;
        readDataElement(element);
    }
}

function readDataElement(element) {
    const infoElement = {
        imagen: element.querySelector('img').src,
        titulo: element.querySelector('h3').textContent,
        precio: element.querySelector('.precio').textContent,
        id: element.querySelector('a').getAttribute('data-id')
    }
    insertCarrito(infoElement);
}

function insertCarrito(element) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src ="${element.imagen}" width = 100>
        </td>
        <td>
            ${element.titulo}
        </td>
        <td>
            ${element.precio}
        </td>
        <td>
            <a href="#" class="borrar" data-id="${element.id}">X</a>
        </td>
    `;
    list.appendChild(row);

    // Guardar en Local Storage
    guardarElementoLocalStorage(element);
}

function eliminarElement(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar')) {
        e.target.parentElement.parentElement.remove();
        const elementId = e.target.getAttribute('data-id');

        // Eliminar del Local Storage
        eliminarElementoLocalStorage(elementId);
    }
}

function vaciarCarrito() {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    // Vaciar Local Storage
    localStorage.clear();
    return false;
}

function guardarElementoLocalStorage(element) {
    let elementos = obtenerElementosLocalStorage();
    elementos.push(element);
    localStorage.setItem('elementos', JSON.stringify(elementos));
}

function obtenerElementosLocalStorage() {
    let elementos;
    if (localStorage.getItem('elementos') === null) {
        elementos = [];
    } else {
        elementos = JSON.parse(localStorage.getItem('elementos'));
    }
    return elementos;
}

function eliminarElementoLocalStorage(elementId) {
    let elementos = obtenerElementosLocalStorage();
    elementos = elementos.filter(element => element.id !== elementId);
    localStorage.setItem('elementos', JSON.stringify(elementos));
}

function leerLocalStorage() {
    let elementos = obtenerElementosLocalStorage();
    elementos.forEach(element => {
        insertCarrito(element);
    });
}