var express = require('express');
var router = express.Router();
const axios = require('axios');
const geolib = require('geolib');

var Passadeiras = require('../controllers/passadeiras');

Passadeiras.creatTables();

//Reset cunters at startup
  Passadeiras.list()
   .then(dados => {
    resetCounts(dados);
})

// ==CRUDD==
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



// ==OTHER==
router.get('/isInRaio', function(req, res) {
    var latitude = req.query.latitude;
    var longitude = req.query.longitude;
    var raio = req.query.radius;

    var foundPassadeira = false;
    var passadeiraId = null;
    var safeToCross = false;

    Passadeiras.list()
     .then(dados => {
      let passadeiras = dados
        for (p of passadeiras) {
          let r = radius(latitude,longitude, p.latitude, p.longitude, raio)
          if ( r == true ) {
              foundPassadeira = true;
              passadeiraId = p.id;
              if( p.nPedestrians == 0 ) {
                safeToCross = true;
              }

              res.jsonp({found: foundPassadeira, passadeira_id: passadeiraId, safe: safeToCross})
              break;
          }
        }
     })
     .catch(erro => {
      console.log(erro)
    })
})

router.put('/minusCar', function(req,res){
  let passadeira_id = req.body.passadeira_id;
  Passadeiras.minusCar(passadeira_id)
  .then(dados => res.sendStatus(200))
  .catch(erro => console.log(erro))
})

router.put('/plusCar', function(req,res){
  Passadeiras.plusCar(req.body.passadeira_id)
  .then(dados => res.sendStatus(200))
  .catch(erro => console.log(erro))
})

router.put('/minusPedestre', function(req,res){
  let passadeira_id = req.body.passadeira_id;
  Passadeiras.minusPedestre(passadeira_id)
  .then(dados => res.sendStatus(200))
  .catch(erro => console.log(erro))
})

router.put('/plusPedestre', function(req,res){
  Passadeiras.plusPedestre(req.body.passadeira_id)
  .then(dados => res.sendStatus(200))
  .catch(erro => console.log(erro))
})


function radius(lat1, long1, lat2, long2, radius) {
//returns false or true. radius = meters. checks if lat1 long1 are in a radius of x meters from lat2 long2
return geolib.isPointWithinRadius(
    { latitude: lat1, longitude: long1 },
    { latitude: lat2, longitude: long2 },
    radius
);

/*Versão que calcula a distãncia entre duas coords. if carro < distancia = pumba
getDistance(
        { latitude: 51.5103, longitude: 7.49347 },
        { latitude: "51° 31' N", longitude: "7° 28' E" }
    );*/
}

function resetCounts(table) {
        for (p of table) {
            Passadeiras.resetCounts(p.id)
            //.then(dados => console.log('starting services'))
            //.catch(erro => console.log(erro))
        }
}

module.exports = router;
