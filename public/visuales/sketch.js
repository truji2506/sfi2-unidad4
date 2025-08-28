const socket = io();
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Ajustar canvas al tamaño de la ventana
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Dibujar un toque en pantalla
function drawTouch(x, y) {
  ctx.fillStyle = 'rgba(0,200,255,0.5)';
  ctx.beginPath();
  ctx.arc(x, y, 30, 0, Math.PI * 2);
  ctx.fill();
}

// Escuchar datos enviados desde el control remoto
socket.on('touchData', (data) => {
  if (data.state === 'start' || data.state === 'move') {
    drawTouch(data.x, data.y);
  }
});
