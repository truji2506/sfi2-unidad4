// visuales/sketch.js

let socket;

// Podríamos tener un array para guardar las partículas/elementos que vamos creando
let particles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(10, 10, 20); // Un fondo oscuro, como el "desván" de la canción

    socket = io.connect('http://localhost:3000');

    // Escuchamos el evento que nos manda el servidor
    socket.on('newVisualElement', (data) => {
        // Cuando recibimos datos de un toque móvil, creamos una nueva partícula
        // Usamos las coordenadas normalizadas para posicionarla en nuestro lienzo
        let x = data.x * width;
        let y = data.y * height;
        // Creamos un nuevo objeto partícula y lo añadimos al array
        particles.push(new Particle(x, y));
    });
}

function draw() {
    background(10, 10, 20, 25); // El último valor es alpha para crear un efecto de estela

    // Recorremos todas las partículas para actualizarlas y dibujarlas
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].show();
        if (particles[i].isFinished()) {
            // Si la partícula ha terminado su ciclo de vida, la eliminamos
            particles.splice(i, 1);
        }
    }
}

// Una clase simple para nuestras partículas (la base de la alquimia visual)
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = random(-1, 1); // velocidad en x
        this.vy = random(-1, 1); // velocidad en y
        this.alpha = 255; // opacidad/vida
        this.color = color(255, 204, 0); // Color dorado "Midas"
    }

    isFinished() {
        return this.alpha < 0;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 5; // La partícula se desvanece lentamente
    }

    show() {
        noStroke();
        fill(red(this.color), green(this.color), blue(this.color), this.alpha);
        ellipse(this.x, this.y, 16, 16);
    }
}