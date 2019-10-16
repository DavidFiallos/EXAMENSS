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

router.post('/new', function(req, res){
    conCollection = fileModel.getImagenes();
    var newImagenes = Object.assign(
       {},
       req.body,
       {
           "title": req.body.id,
           "url": req.body.url,
           "thumbnailURL": req.body.cuotaMensual,
           "album": req.body.album
       }
    );
    var imagenesExists = conCollection.find(
      function(o, i){
        return o.codigo === newImagenes.codigo;
      }
    )
    if( ! imagenesExists ){
      conCollection.push(newImagenes);
      fileModel.setImagenes(
         conCollection,
         function(err, savedSuccesfully){
           if(err){
             res.status(400).json({ "error": "No se pudo ingresar objeto" });
           } else {
             res.json(newImagenes);  // req.body ===  $_POST[]
           }
         }
       );
    } else {
      res.status(400).json({"error":"No se pudo ingresar objeto"});
    }
 }); // post /new

 router.put('/update/:conCodigo',
  function(req, res){
      conCollection = fileModel.getImagenes();
      var conCodigoToModify = req.params.conCodigo;
      var amountToAdjust = parseInt(req.body.ajustar);
      var adjustType = req.body.tipo || 'SUB';
      var adjustHow = (adjustType == 'ADD' ? 1 : -1);
      var modImagenes = {};
      var newImagenesArray = conCollection.map(
        function(o,i){
          if( conCodigoToModify === o.codigo){
             o.url = adjustType;
             modImagenes = Object.assign({}, o);
          }
          return o;
        }
      ); // end map
    conCollection = newImagenesArray;
    fileModel.setImagenes(
      conCollection,
      function (err, savedSuccesfully) {
        if (err) {
          res.status(400).json({ "error": "No se pudo actualizar objeto" });
        } else {
          res.json(modImagenes);  // req.body ===  $_POST[]
        }
      }
    );
  }
);// put :prdsku

router.delete(
    '/delete/:conCodigo',
    function( req, res) {
      conCollection = fileModel.getImagenes();
      var conCodigoToDelete  = req.params.conCodigo;
      var newConCollection = conCollection.filter(
        function(o, i){
          return conCodigoToDelete !== o.codigo;
        }
      ); //filter
      conCollection = newConCollection;
      fileModel.setImagenes(
        conCollection,
        function (err, savedSuccesfully) {
          if (err) {
            res.status(400).json({ "error": "No se pudo eliminar objeto" });
          } else {
            res.json({"newProdsQty": conCollection.length});
          }
        }
      );
    }
  );// delete
  

module.exports = router;