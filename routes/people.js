var express = require('express');
var router = express.Router();
var sql = require('mssql');
var connectionString = "mssql://sa:sa@svr-dev01/sanp";

router.get('/', function(req, res) {
  // https://www.npmjs.com/package/mssql
  sql.connect(connectionString).then(function() {
    new sql.Request().query("select top 10 * from person").then(function(data) {
      res.send(data);
    }).catch(function(err) {
      console.log(err);
    });
  });
});

router.get('/:id', function(req, res) {
  // http://csdoc.org/
  sql.connect(connectionString).then(function() {
    var request = new sql.Request();
    request.input('id', sql.Int, req.params.id);
    request.query('select * from person where personno = @id').then(function(data) {
        res.send(data);
      }).catch(function(err) {
        console.log(err);
      });
  });
});

module.exports = router;