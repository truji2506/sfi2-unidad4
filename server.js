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

    // Mensajes de prueba/chat
    socket.on('message', (message) => {
        console.log(`Mensaje recibido => ${message}`);
        socket.broadcast.emit('message', message);
    });

    // 👇 NUEVO: escuchar eventos de touch desde móviles
    socket.on('touchData', (data) => {
        console.log(`Touch recibido de ${socket.id}:`, data);
        io.emit('touchData', { id: socket.id, ...data }); 
        // reenvía a TODOS los clientes, incluyendo la pantalla principal
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