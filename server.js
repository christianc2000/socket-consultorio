const express = require("express")
const app = express();
const server = require("http").createServer(app);

const io = require('socket.io')(server, {
    cors: { origin: "*" }
});

// Middleware para parsear JSON
app.use(express.json());

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('pago-realizado', (mensaje) => {
        console.log('Mensaje recibido desde Laravel:', mensaje);
        io.emit('pago-realizado', mensaje);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

// Ruta para manejar solicitudes HTTP POST desde Laravel
app.post('/enviar-mensaje', (req, res) => {
    const mensaje = req.body;
    console.log('Mensaje recibido desde Laravel:', mensaje);
    io.emit('pago-realizado', mensaje);
    res.status(200).send('Mensaje recibido y emitido');
});