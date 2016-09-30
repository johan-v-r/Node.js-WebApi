var express = require('express');
var router = express.Router();
var sql = require('mssql');
var connectionString = "mssql://sa:sa@192.168.42.6/sanp";

// use this option to pass through params from the parent router
router.mergeParams = true;

router.get('/', function(req, res) {
  res.send("addresses");
});

router.get('/:addressId', function(req, res) {
  console.log(req.params);
  // http://csdoc.org/
  sql.connect(connectionString).then(function() {
    
    var request = new sql.Request();
    request.input('id', sql.Int, req.params.id);
    request.input('addressId', sql.Int, req.params.addressId);

    request.query('select * from PersonAddress where personno = @id and PersonAddressNo = @addressId').then(function(data) {
        res.send(data);
      }).catch(function(err) {
        console.log(err);
      });
  });
});

module.exports = router;