var express = require('express');
var app = express();
var sql = require('mssql');

var people = require('./routes/people');
var addresses = require('./routes/addresses');

app.use('/people', people);
app.use('/people/:id/addresses', addresses);

app.get('/', function(req, res) {
  res.send("Hello World!");
});

app.listen(8080, function() {
  console.log("Server started on port 8080");
});