var express = require('express');
var router = express.Router();

//Rutas de Cada Entidad
var condominiosApiRoutes = require('./imagenes/index');


//localhost:3000/api/con/
router.use('/con', imagenesApiRoutes);


module.exports = router;