// step 1: create express app
const express = require('express');
const app = express();
// step 2: create plain HTTP server
const http = require('http');
const server = http.createServer(app);
// step 3: connect websocket server to http
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });

// Listen for new connections
wss.on('connection', (socket) => {
  // Listen for messages on that socket
  socket.on('message', (msg) => {
    msg = JSON.parse(msg);
    console.log(msg);
  });
})

server.listen(5000, () => {
  console.log(`Aw snap, now you're running.`)
});