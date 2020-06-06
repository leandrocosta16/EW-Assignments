var express = require('express');
var router = express.Router();
const axios = require('axios');
const lhostSPWS = require('../config/env').passadeiras

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
    .catch(erro => console.log(erro))
    //res.status(500).jsonp(erro)
})

//POST
router.post('/cars', function(req, res) {
    var passadeira = req.body.passadeira_id;
    Cars.insert(req.body.latitude,req.body.longitude, req.body.matricula, req.body.passadeira_id)
    .then(dados => {
        axios.put(lhostSPWS+'/api/plusCar', {passadeira_id: passadeira})
        .then(dados => res.sendStatus(200))
        .catch(erro => console.log(error))
    })
    .catch(erro => console.log(error))
})

//UPDATE
router.put('/cars/:idCar', function(req, res) {
    let id = req.params.idCar;
    Cars.update(id, req.body.latitude, req.body.longitude)
      .then(dados => res.sendStatus(200))
      .catch(erro => console.log(error))
})

//DELETE
router.delete('/cars/:idCar/:idPassadeira', function(req,res){

//var passadeira = req.body.passadeira_id;
var passadeira = req.params.idPassadeira;

Cars.delete(req.params.idCar)
  .then(dados => {
    axios.put(lhostSPWS+'/api/minusCar', {passadeira_id: passadeira})
    .then(dados => res.sendStatus(200))
    .catch(erro => console.log(erro))
  })
  .catch(erro => console.log(error))

})



module.exports = router;
