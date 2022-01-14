document.addEventListener('DOMContentLoaded', function() {
    mostrarMarcas();
    mostrarArticulos();
    mostrarMenu();
});
// ------------------------------MENU----------------------------
function mostrarMenu() {
    try {
        fetch('./menus.json').then(function(response) {
            response.json().then(function(data) {
                console.dir(data);
                const barra = data.menu;
                barra.forEach((menu) => {
                    const { seccion } = menu;

                    // crear botón
                    const nombreMenu = document.createElement('A');
                    nombreMenu.setAttribute('href', '#');
                    nombreMenu.textContent = seccion;


                    const enlace = document.createElement('LI');
                    enlace.classList.add('font-bar');
                    enlace.appendChild(nombreMenu)

                    const nombreUl = document.createElement('UL');
                    nombreUl.classList.add('nav', 'navbar-nav', 'navbar-left');
                    nombreUl.appendChild(enlace)

                    // inyectar todo en el HTML
                    document.querySelector('#enlaces').appendChild(nombreUl);
                });
            });
        });
    } catch (error) {
        console.log(error);
    }
}
//-------------------------------MARCAS---------------------------------

function mostrarMarcas() {
    try {
        fetch('./marcas.json').then(function(response) {
            response.json().then(function(data) {
                console.dir(data);
                marcas = data.marcas;
                marcas.forEach((marca) => {
                    const { src } = marca;

                    // crear imagen
                    const imagenMarca = document.createElement('IMG');
                    imagenMarca.setAttribute('src', src);
                    imagenMarca.classList.add('imagenMarca-style');

                    // Generar DIV contenedor de la imagen
                    const marcaDiv = document.createElement('DIV');
                    marcaDiv.classList.add('col-lg-1', 'col-md-1', 'col-sm-3', 'col-xs-3');
                    marcaDiv.appendChild(imagenMarca);

                    // inyectar todo en el HTML
                    document.querySelector('#marcas').appendChild(marcaDiv);
                });
            });
        });
    } catch (error) {
        console.log(error);
    }
}

//-------------------------------ARTÍCULOS-------------------------------

function mostrarArticulos() {
    try {
        fetch('./articulos.json').then(function(response) {
            response.json().then(function(data) {
                console.dir(data);
                const articulos = data.articulos;
                articulos.forEach((articulo) => {
                    const { nombre } = articulo;

                    // crear boton
                    const nombreArticuloBoton = document.createElement('BUTTON');
                    nombreArticuloBoton.setAttribute('type', 'button');
                    nombreArticuloBoton.textContent = nombre;
                    nombreArticuloBoton.classList.add('btn', 'btn-secondary', 'mt-5', 'col-md-2', 'btn-block', 'btn-wrap-text');

                    // Generar DIV contenedor del boton
                    const articuloDiv = document.createElement('DIV');
                    articuloDiv.classList.add('col-md-2');

                    articuloDiv.appendChild(nombreArticuloBoton);

                    // inyectar todo en el HTML
                    document.querySelector('#articulos').appendChild(articuloDiv);
                });
            });
        });
    } catch (error) {
        console.log(error);
    }
}
// ----------------------------VALIDAR FORMULARIO---------------------------
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input, #formulario textarea');

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros
};

const validarFormulario = (e) => {
    switch (e.target.name) {
        case 'nombre':
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case 'apellido':
            validarCampo(expresiones.apellido, e.target, 'apellido');
            break;
        case 'correo':
            validarCampo(expresiones.correo, e.target, 'correo');
            break;
        case 'telefono':
            validarCampo(expresiones.telefono, e.target, 'telefono');
            break;
    }
};

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
    }
};

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const apellido = document.querySelector('#apellido').value;
    const telefono = document.querySelector('#telefono').value;
    const correo = document.querySelector('#correo').value;
    const mensaje = document.querySelector('#mensaje').value;

    if (nombre === '' || apellido === '' || telefono === '' || correo === '' || mensaje === '') {
        mostrarMensaje('todos los campos son obligatorios', 'error');

        return;
    }
    // crear la otra alerta de enviar formulario correctamente
    mostrarMensaje('El mensaje fue enviado correctamente', 'mensajeValido');
});

function mostrarMensaje(mensaje, tipoMensaje) {
    const element = document.createElement('P');
    element.textContent = mensaje;
    element.classList.add(tipoMensaje);

    // se muestra el mensaje en el HTML
    formulario.appendChild(element);

    // desaparece el error despues de 5segundos
    setTimeout(() => {
        element.remove();
    }, 5000);
}