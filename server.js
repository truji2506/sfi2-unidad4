// server.js

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = 3000;

// Carpeta pública
app.use(express.static('public'));

// Socket.IO
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado:', socket.id);

    // --- INPUT desde móviles (m1, m2, etc.)
    socket.on('mobileTouch', (data) => {
        console.log(`INPUT (Móvil): ${socket.id} tocó en`, data);

        // Orden para los visuales: crear nueva partícula/efecto
        io.emit('newVisualParticle', { id: socket.id, ...data });
    });

    // --- INPUT desde control remoto/director (d1)
    socket.on('directorCommand', (command) => {
        console.log(`INPUT (Director): Comando '${command.action}' recibido.`);

        // Orden global para visuales
        if (command.action === 'resetVisuals') {
            io.emit('systemReset');
        }
        // Podrías agregar más comandos aquí
        if (command.action === 'changeScene') {
            io.emit('sceneChange', { scene: command.scene });
        }
    });

    // --- INPUT genérico (chat/mensajes)
    socket.on('message', (message) => {
        console.log(`Mensaje recibido => ${message}`);
        socket.broadcast.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

// Rutas específicas
app.get('/visuales', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'visuales.html'));
});

app.get('/controlRemoto', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'controlRemoto.html'));
});

// Iniciar server
server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
