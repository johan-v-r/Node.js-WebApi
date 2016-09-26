var express = require('express');
var app = express();
var sql = require('mssql');

app.get('/', function(req, res) {
  res.send("Hello World!");
});

app.get('/people', function(req, res) {
  // https://www.npmjs.com/package/mssql
  sql.connect("mssql://sa:sa@svr-dev01/sanp").then(function() {
    new sql.Request().query("select top 10 * from person").then(function(data) {
      res.send(data);
    }).catch(function(err) {
      console.log(err);
    });
  });
});

app.listen(8080, function() {
  console.log("Server started on port 8080");
});