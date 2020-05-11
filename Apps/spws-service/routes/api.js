var express = require('express');
var router = express.Router();

var Passadeiras = require('../controllers/passadeiras');

//GET ALL
router.get('/passadeiras', function(req, res) {
    Passadeiras.list()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
})

//GET ONE BY ID
router.get('/passadeiras/:idPassadeira', function(req, res) {
    var id = req.params.idPassadeira;
    Passadeiras.one(id)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
})

//POST
router.post('/passadeiras', function(req, res) {
    Passadeiras.insert(req.body.latitude,req.body.longitude)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
})

//UPDATE
router.put('/passadeiras/:idPassadeira', function(req, res) {
    var id = req.params.idPassadeira;
    Passadeiras.update(id, req.body.latitude, req.body.longitude)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
})

//DELETE
router.delete('/passadeiras/:idPassadeira', function(req,res){
  Passadeiras.delete(req.params.idPassadeira)
  .then(dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
})



module.exports = router;
