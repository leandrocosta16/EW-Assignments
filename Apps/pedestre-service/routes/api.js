var express = require('express');
var router = express.Router();
const axios = require('axios');
const lhostSPWS = require('../config/env').passadeiras

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

//GET ONE BY EMAIL
router.get('/pedestres/email/:emailPedestre', function(req, res) {
  var email = req.params.emailPedestre;
  Pedestres.oneEmail(email)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})

//POST
router.post('/pedestres', function(req, res) {
  var passadeira_id = req.body.passadeira_id;
  Pedestres.insert(req.body.latitude,req.body.longitude, req.body.email, req.body.passadeira_id)
  .then(dados => {
      axios.put(lhostSPWS+'/api/plusPedestre', {passadeira_id: passadeira_id})
      .then(dados => res.sendStatus(200))
      .catch(erro => console.log(error))
  })
  .catch(erro => console.log(error))
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
  var passadeira_id = req.body.passadeira_id;
  Pedestres.delete(req.params.idPedestre)
  .then(dados => {
    axios.put(lhostSPWS+'/api/minusPedestre', {passadeira_id: passadeira_id})
    .then(dados => res.sendStatus(200))
    .catch(erro => console.log(erro))
  })  
  .catch(erro => res.status(500).jsonp(erro))
})



module.exports = router;
