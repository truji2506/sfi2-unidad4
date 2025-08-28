let socket;
let estado = 0;
let parametros = {};

function setup() {
  createCanvas(400, 200);
  background(220);

  // conectar al servidor
  socket = io();

  textAlign(CENTER, CENTER);
  textSize(18);
}

function draw() {
  background(220);

  // Mostrar el estado actual
  text("Estado actual: " + estado, width / 2, 50);
  text("Presiona teclas 1,2,3... para cambiar estado", width / 2, 100);

  // Mostrar parámetros
  text("Parámetros: " + JSON.stringify(parametros), width / 2, 150);
}

function keyPressed() {
  // Cambiar de estado según la tecla
  if (key === '1') cambiarEstado(1);
  if (key === '2') cambiarEstado(2);
  if (key === '3') cambiarEstado(3);
}

function cambiarEstado(nuevoEstado) {
  estado = nuevoEstado;

  // Simular parámetros dependiendo del estado
  if (estado === 1) {
    parametros = { velocidad: random(1, 5), color: [255, 0, 0] };
  } else if (estado === 2) {
    parametros = { velocidad: random(5, 10), color: [0, 0, 255] };
  } else if (estado === 3) {
    parametros = { velocidad: random(10, 20), color: [0, 255, 0], tam: random(50,150) };
  }

  // Enviar al servidor para que lo reciba la app de visuales
  socket.emit("cambiarEstado", { estado, parametros });
}