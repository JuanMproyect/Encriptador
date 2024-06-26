function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

const botonEncriptar = document.getElementById('boton-encriptar');
const botonDesencriptar = document.getElementById('boton-desencriptar');
const contenedorOutput = document.getElementById('contenedor-output');
const inputUsuario = document.getElementById('input-usuario');
const iniciales = document.querySelector('.iniciales');

const botonCopiar = document.createElement('button');
botonCopiar.textContent = 'Copiar';
botonCopiar.classList.add('boton-copiar');
botonCopiar.style.display = 'none'; // Lo ocultamos inicialmente

const parrafoResultado = document.createElement('p');
parrafoResultado.classList.add('resultado');
contenedorOutput.appendChild(parrafoResultado); // Agregamos el párrafo al contenedor

const mensajeError = document.createElement('p');
mensajeError.classList.add('error');
mensajeError.style.color = 'red';
inputUsuario.insertAdjacentElement('afterend', mensajeError); // Insertamos el mensaje de error después del input

// Función para mostrar el mensaje de error
const mostrarMensajeError = (mensaje) => {
    mensajeError.textContent = mensaje;
};

// Función para ocultar el mensaje de error
const ocultarMensajeError = () => {
    mensajeError.textContent = '';
};

// Función para mostrar u ocultar elementos iniciales
const mostrarElementosIniciales = (mostrar) => {
    const displayValue = mostrar ? 'block' : 'none';
    if (iniciales) {
        iniciales.style.display = displayValue;
    }
    contenedorOutput.style.justifyContent = mostrar ? 'center' : 'space-between';
};

// Función para encriptar texto
const encriptarTexto = (texto) => {
    const encriptaciones = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };
    return texto.split('').map(letra => encriptaciones[letra] || letra).join('');
};

// Función para desencriptar texto
const desencriptarTexto = (textoEncriptado) => {
    const desencriptaciones = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };
    return textoEncriptado.replace(/enter|imes|ai|ober|ufat/g, match => desencriptaciones[match]);
};

// Función para manejar la entrada del usuario
const manejarInputUsuario = (texto, tipo) => {
    const mensaje = texto.toLowerCase().trim();

    // Limpiar el resultado anterior y ocultar el botón de copiar
    parrafoResultado.textContent = '';
    botonCopiar.style.display = 'none';

    if (mensaje === '') {
        mostrarMensajeError('El campo de texto está vacío.');
        mostrarElementosIniciales(true);
        return;
    }

    const hasSpecialCharacters = /[^a-z\s]/i.test(mensaje);
    if (hasSpecialCharacters) {
        mostrarMensajeError('No se permiten caracteres especiales o acentos.');
        mostrarElementosIniciales(true);
        return;
    }

    ocultarMensajeError();
    const textoTransformado = tipo === 'encriptar' ? encriptarTexto(mensaje) : desencriptarTexto(mensaje);

    parrafoResultado.textContent = textoTransformado;
    botonCopiar.style.display = 'block';
    mostrarElementosIniciales(false);
};

// Eventos de clic para encriptar y desencriptar
botonEncriptar.addEventListener('click', () => manejarInputUsuario(inputUsuario.value, 'encriptar'));
botonDesencriptar.addEventListener('click', () => manejarInputUsuario(inputUsuario.value, 'desencriptar'));

// Agregar botón de copiar al contenedor de salida
contenedorOutput.appendChild(botonCopiar);

// Evento de clic para copiar al portapapeles
botonCopiar.addEventListener('click', async () => {
    const textoCopiar = parrafoResultado.textContent;
    try {
        await navigator.clipboard.writeText(textoCopiar);
        alert('Texto copiado al portapapeles');
    } catch (err) {
        console.error('Error al copiar el texto:', err);
    }
});

// Inicializar el auto-resize del textarea
autoResize(inputUsuario);
inputUsuario.addEventListener('input', () => autoResize(inputUsuario));