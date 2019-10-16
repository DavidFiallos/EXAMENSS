var express = require('express');
var router = express.Router();
var fileModel = require('../filemodel');

var conCollection = fileModel.getImagenes();

/*router.get('/', function (req, res) {
  res.json({
    "entity": "imagenes",
    "version": "0.0.1"
  });
}); */

router.get('/all', function(req, res){
    conCollection = fileModel.getImagenes();
    res.json(conCollection);
  }); // get /all


  

module.exports = router;