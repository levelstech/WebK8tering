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

app.set("port", process.env.PORT || 5000);

app.get('/', (req, res) => {
   res.writeHead(200, {'Content-Type': 'application/json'});
   var response = { "response" : "This is GET method." }
   console.log(response);
   res.end(JSON.stringify(response));
})

app.get('/:id', (req, res) => {
   res.writeHead(200, {'Content-Type': 'application/json'});
   var response = { "response" : "This is GET method with id=" + req.params.id + "." }
   console.log(response);
   res.end(JSON.stringify(response));
})

app.post('/', (req, res) => {
   res.writeHead(200, {'Content-Type': 'application/json'});
   var response = { "response" : "This is POST method." }
   console.log(response);
   res.end(JSON.stringify(response));
})

app.put('/', (req, res) => {
   res.writeHead(200, {'Content-Type': 'application/json'});
   var response = { "response" : "This is PUT method." }
   console.log(response);
   res.end(JSON.stringify(response));
})

app.delete('/', (req, res) => {
   res.writeHead(200, {'Content-Type': 'application/json'});
   var response = { "response" : "This is DELETE method." }
   console.log(response);
   res.end(JSON.stringify(response));
})

var server = app.listen(app.get("port"), function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Node.js API app listening at http://%s:%s", host, port)

})
