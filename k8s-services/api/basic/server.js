var express = require('express');
var app = express();
var port = 8080;
var path = require('path');
var bodyParser = require("body-parser");

var tasksRoutes = require("./routes/tasksRoutes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

app.use("/api/tasks", tasksRoutes);

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.use((err, req, res, next) => {
    res.status(422).send({ error: err._message });
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
});