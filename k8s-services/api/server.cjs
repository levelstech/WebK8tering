'use strict';

var express = require('express');
var mariadb = require('mariadb');    
var cors = require('cors');        

const pool = mariadb.createPool({
   host: process.env.MARIADB_SERVICE_PORT_8306_TCP_ADDR,
   database: process.env.MARIADB_DATABASE,
   user: process.env.MARIADB_USER,
   password: process.env.MYSQL_PASSWORD,
   port: process.env.MARIADB_SERVICE_SERVICE_PORT
})

async function initDB() {
   let conn;
   try {
      conn = await pool.getConnection();
      await conn.query("DROP TABLE IF EXISTS Counts;");
      await conn.query("CREATE TABLE IF NOT EXISTS Counts (id bigint primary key AUTO_INCREMENT, counter int DEFAULT 0);");
      await conn.query("INSERT INTO Counts VALUES (NULL, 0);");
   } catch (err) {
      throw err;
   } finally {
      if (conn) return conn.end();
   }
}

async function fetchCounts() {
   let counts = -1
   let conn;
   try {
      conn = await pool.getConnection();
      let result = await conn.query("SELECT id as id, counter as counter FROM Counts;");
    
      counts = result[0]["counter"]
   } catch (err) {
      throw err;
   } finally {
      if (conn) conn.end();

      return Promise.resolve(counts);      
   }
}

async function incrementCounts() {
   let conn;
   try {
      conn = await pool.getConnection();
      await conn.query("UPDATE Counts SET counter = counter+1 WHERE id > 0;");
   } catch (err) {
      throw err;
   } finally {
      if (conn) return conn.end();
   }
}
async function clearCounts() {
   let conn;
   try {
      conn = await pool.getConnection();
      await conn.query("UPDATE Counts SET counter = 0 WHERE id > 0;");
   } catch (err) {
      throw err;
   } finally {
      if (conn) return conn.end();
   }
}

var app = express();

app.set("port", process.env.PORT || 5000);
app.use(cors({
   origin: '*'
}));

app.get('/', async (req, res) => {
   res.writeHead(200, {'Content-Type': 'application/json'});
   let count = await fetchCounts();
   res.end(JSON.stringify({ "counts" : count }));
})

app.post('/', async (req, res) => {
   res.writeHead(200, {'Content-Type': 'application/json'});
   await incrementCounts();
   let count = await fetchCounts();
   res.end(JSON.stringify({ "counts" : count }));
})

app.delete('/', async (req, res) => {
   res.writeHead(200, {'Content-Type': 'application/json'});
   await clearCounts();
   let count = await fetchCounts();
   res.end(JSON.stringify({ "counts" : count }));
})

var server = app.listen(app.get("port"), function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Node.js API app listening at http://%s:%s", host, port)

  initDB();
})
