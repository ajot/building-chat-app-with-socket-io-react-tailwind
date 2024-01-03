const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST"]
  }
});

app.get('/', (req, res) => {
  res.send('Socket.IO server is running');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    console.log('Message received: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});