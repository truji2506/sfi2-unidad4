// clientem1/sketch.js

// Variable para nuestro socket
let socket;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0); // Fondo negro para el cliente móvil

    // Conectamos al servidor.
    // Asegúrate de que la dirección coincida con tu servidor.
    // Si lo corres localmente, esto debería funcionar.
    socket = io.connect('http://localhost:3000'); // Asumiendo que tu server corre en el puerto 3000

    // Opcional: un feedback visual en el móvil
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text('Toca la pantalla', width / 2, height / 2);
}

// Esta función se ejecuta cada vez que el usuario toca la pantalla
function touchStarted() {
    // Creamos un objeto con los datos que queremos enviar.
    // Enviamos las coordenadas normalizadas (entre 0 y 1)
    // para que no dependan del tamaño de la pantalla del móvil.
    const data = {
        x: mouseX / width,
        y: mouseY / height,
        id: socket.id // Enviamos la ID del socket para saber qué usuario fue
    };

    // Emitimos los datos al servidor con el nombre de evento 'mobileTouch'
    socket.emit('mobileTouch', data);

    // Damos un feedback visual instantáneo en la pantalla del móvil
    fill(255, 204, 0); // Un toque dorado
    ellipse(mouseX, mouseY, 50, 50);

    return false; // Prevenir comportamiento táctil por defecto del navegador
}