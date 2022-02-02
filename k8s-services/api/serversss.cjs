'use strict';

var express = require('express');
var mariadb = require('mariadb');

const pool = mariadb.createConnection({
   host: process.env.MARIADB_SERVICE_PORT_8306_TCP_ADDR,
   database: process.env.MARIADB_DATABASE,
   user: process.env.MARIADB_USER,
   password: process.env.MYSQL_PASSWORD,
   port: process.env.MARIADB_SERVICE_SERVICE_PORT
})

var app = express();  
var server = require('http').createServer(app); 
var sock = require('socket.io')(server); 
var clickCount = 0;

app.use(express.static(__dirname)); 

app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});

sock.on('connection', function(client) { 
	console.log('client is online'); 
    client.on('clicked', function(data) {
    	  clickCount++;
        sock.emit('buttonUpdate', clickCount);
    });
    client.on('reset', function(data) {
    	  clickCount = 0;
        sock.emit('buttonUpdate', clickCount);
    });
});

server.listen(3306, function(){
  console.log('listening on localhost:3306');
}); 