var express = require('express');
var router = express.Router();

var Pedestres = require('../controllers/pedestres');

//GET ALL
router.get('/pedestres', function(req, res) {
    Pedestres.list()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
})

//GET ONE BY ID
router.get('/pedestres/:idPedestre', function(req, res) {
    var id = req.params.idPedestre;
    Pedestres.one(id)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
})

//POST
router.post('/pedestres', function(req, res) {
    Pedestres.insert(req.body.latitude,req.body.longitude, req.body.email, req.body.passadeira_id)
      .then(dados => res.jsonp(dados))
      //FAZER PEDIDO AO SPWS PARA INCREMENTAR NPEDESTRES
      .catch(erro => res.status(500).jsonp(erro))
})

//UPDATE
router.put('/pedestres/:idPedestre', function(req, res) {
    var id = req.params.idPedestre;
    Pedestres.update(id, req.body.latitude, req.body.longitude)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
})

//DELETE
router.delete('/pedestres/:idPedestre', function(req,res){
  Pedestres.delete(req.params.idPedestre)
  .then(dados => res.jsonp(dados))
  //FAZER PEDIDO AO SPWS PARA DECREMENTAR NPEDESTRES
  .catch(erro => res.status(500).jsonp(erro))
})



module.exports = router;
