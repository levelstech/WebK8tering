'use strict';

var express = require('express');
var mariadb = require('mariadb')
var server = require('http').createServer(app); 
var sock = require('socket.io')(server); 
var clickCount = 0;
 
const pool = mariadb.createPool({
   host: process.env.MARIADB_SERVICE_PORT_8306_TCP_ADDR,
   database: process.env.MARIADB_DATABASE,
   user: process.env.MARIADB_USER,
   password: process.env.MYSQL_PASSWORD,
   port: process.env.MARIADB_SERVICE_SERVICE_PORT
})

// module.exports = Object.freeze({
//    pool: pool
//  });

// async function initdb() {
//    let conn;
//    try {
//       conn = await pool.getConnection();
//       const rows = await conn.query("SELECT 1 as val");
//       console.log(rows); 
//       const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
//       console.log(res); 

//    } catch (err) {
//       throw err;
//    } finally {
//       if (conn) return conn.end();
//    }
// }

var app = express();


// app.set("port", process.env.PORT || 3306);

// app.get('/', (req, res) => {
//    res.writeHead(200, {'Content-Type': 'application/json'});
//    var response = { "response" : "This is GET method." }
//    console.log(response);
//    res.end(JSON.stringify(response));
// })

// app.get('/:id', (req, res) => {
//    res.writeHead(200, {'Content-Type': 'application/json'});
//    var response = { "response" : "This is GET method with id=" + req.params.id + "." }
//    console.log(response);
//    res.end(JSON.stringify(response));
// })

// app.post('/', (req, res) => {
//    res.writeHead(200, {'Content-Type': 'application/json'});
//    var response = { "response" : "This is POST method." }
//    console.log(response);
//    res.end(JSON.stringify(response));
// })

// app.put('/', (req, res) => {
//    res.writeHead(200, {'Content-Type': 'application/json'});
//    var response = { "response" : "This is PUT method." }
//    console.log(response);
//    res.end(JSON.stringify(response));
// })

// app.delete('/', (req, res) => {
//    res.writeHead(200, {'Content-Type': 'application/json'});
//    var response = { "response" : "This is DELETE method." }
//    console.log(response);
//    res.end(JSON.stringify(response));
// })

// var server = app.listen(3306, function () {

//   var host = server.address().address
//   var port = server.address().port

//   console.log("Node.js API app listening at http://%s:%s", host, port)

// //   initdb();
// })

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