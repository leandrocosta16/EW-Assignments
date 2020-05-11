var express = require('express');
var router = express.Router();

var Cars = require('../controllers/cars');

//GET ALL
router.get('/cars', function(req, res) {
    Cars.list()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
})

//GET ONE BY ID
router.get('/cars/:idCar', function(req, res) {
    var id = req.params.idCar;
    Cars.one(id)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
})

//GET ONE BY MATRICULA
router.get('/cars/matricula/:matriculaCar', function(req, res) {
  var matricula = req.params.matriculaCar;
  Cars.oneMatricula(matricula)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})

//POST
router.post('/cars', function(req, res) {
    Cars.insert(req.body.latitude,req.body.longitude, req.body.matricula, req.body.passadeira_id)
      .then(dados => res.jsonp(dados))
      //FAZER PEDIDO AO SPWS PARA INCREMENTAR NCARROS
      .catch(erro => res.status(500).jsonp(erro))
})

//UPDATE
router.put('/cars/:idCar', function(req, res) {
    var id = req.params.idCar;
    Cars.update(id, req.body.latitude, req.body.longitude)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
})

//DELETE
router.delete('/cars/:idCar', function(req,res){
  Cars.delete(req.params.idCar)
  .then(dados => res.jsonp(dados))
  //FAZER PEDIDO AO SPWS PARA DECREMENTAR NCARROS
  .catch(erro => res.status(500).jsonp(erro))
})



module.exports = router;
