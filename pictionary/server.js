var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

// include and initialize the rollbar library with your access token
var rollbar = require("rollbar");
rollbar.init("e87339129d03490dab823816f04ccdfc");

// record a generic message and send to rollbar
rollbar.reportMessage("Hello world!");

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

server.listen(8080);