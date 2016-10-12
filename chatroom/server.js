var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var connectedUsersCount = 0;

io.on('connection', function(socket) {
    var announcement = 'A new user is in the room';

    connectedUsersCount++;

    socket.broadcast.emit('connectedUser', announcement);
    socket.broadcast.emit('connectedUsersCount', connectedUsersCount);

    console.log('Client connected');

    socket.on('message', function(message) {
        console.log('Received message:', message);
        socket.broadcast.emit('message', message);
    });

    socket.on('disconnect', function() {
        console.log('Got disconnected!');
        connectedUsersCount--;
    });
});

server.listen(8080);