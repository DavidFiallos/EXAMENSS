var fs = require('fs');

var exportObject = {};
//var filePath = "data.json";
var filePath = "imagenes.json";

var data = {
  imagenes:[]
};

exportObject.getData = function(){
  return data;
}

exportObject.setData = function (newData, handler) {
  saveToFile(newData, function(err, success){
    if(err){
      handler(err, false );
    }else{
      data = Object.assign({}, newData);
      handler(null, true);
    }
  });
}

exportObject.getImagenes = function(){
  return data.imagenes;
}

exportObject.setImagenes = function (newImagenes, handler) {
  var newData = Object.assign({},data, {imagenes: newImagenes});
  exportObject.setData(newData, function(err, sucess){
    if(err){
      handler(err, false);
    }else{
      handler(null, true);
    }
  });
}




//exportObject.saveToFile = function( collToSave, handler){
var saveToFile = function (collToSave, handler) {
  fs.writeFile(
    filePath,
    JSON.stringify(collToSave),
    function(err){
      if(err){
        console.log(err);
        handler(err, null);
      } else {
        handler(null, true);
      }
    }
  );
}

//exportObject.loadFromFile = function( handler ){
var loadFromFile = function (handler) {
  fs.readFile(
    filePath,
    'utf8',
    function(err, data){
      if(err){
        console.log(err);
       handler(err, null);
      } else {
        handler(null, JSON.parse(data));
      }
    }
  );
}

loadFromFile(
  function (err, savedCollection) {
    if (err) {
      return;
    }
    data = savedCollection;
    return;
  }
);


module.exports = exportObject;