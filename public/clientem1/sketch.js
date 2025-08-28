// Conexión con el servidor usando Socket.IO
const socket = io();

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200);

  // Conectar con el servidor
  socket = io();

  // Texto inicial en la pantalla
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(50);
  text("Toca la pantalla para enviar datos", width / 2, height / 2);
}

function draw() {
  // Aquí no es necesario redibujar nada continuo todavía
}

function touchStarted() {
  sendTouch(mouseX, mouseY, "start");
  return false; // evita scroll en móviles
}

function touchMoved() {
  sendTouch(mouseX, mouseY, "move");
  return false;
}

function touchEnded() {
  sendTouch(mouseX, mouseY, "end");
  return false;
}

function sendTouch(x, y, state) {
  if (socket) {
    const data = {
      x: x,
      y: y,
      state: state, // "start", "move" o "end"
      timestamp: Date.now()
    };
    socket.emit("touchData", data);
    console.log("Touch enviado:", data);
  }
}
