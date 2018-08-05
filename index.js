// step 1: create express app
const express = require('express');
const app = express();

app.use(express.static('./frontend'))

// step 2: create plain HTTP server
const http = require('http');
const server = http.createServer(app);
// step 3: connect websocket server to http
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });

// Listen for new connections
wss.on('connection', (socket) => {
  console.log('somebody connected');
  // When they connect, say "hello"
  socket.send('Hey, you are totally connected!');
  // Listen for messages on that socket
  socket.on('message', (msg) => {
    // msg = JSON.parse(msg);
    console.log(msg);
    wss.clients.forEach((client) => {
      client.send(msg);
    });
  });
})

server.listen(5000, () => {
  console.log(`Aw snap, now you're running.`)
});