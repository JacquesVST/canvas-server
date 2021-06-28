const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: 'https://jacquesvst.github.io',
        transports: ['websocket', 'polling'],
        methods: ["GET", "POST"],
        credentials: true
      },
      allowEIO3: true
});
const port = 3000;

app.use(express.static(__dirname + '/public'));

function onConnection(socket){
  console.log('New connection: ' + socket.id);
  socket.on('drawing', (data) => {
      socket.broadcast.emit('drawing', data);
    });
}

io.on('connection', onConnection);

http.listen(port, () => console.log('Running...'));