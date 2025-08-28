const socket = io();

socket.on('connect', () => {
    console.log('Mobile client connected');
    
    // Enviar un dato simple
    const data = {
        value: "test from pc"
    };
    socket.emit('message', data);
    console.log('Sent:', data);
});