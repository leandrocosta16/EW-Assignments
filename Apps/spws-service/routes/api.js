var express = require('express');
var router = express.Router();
const axios = require('axios');
const geolib = require('geolib');

var Passadeiras = require('../controllers/passadeiras');

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
    latitude = req.query.latitude;
    longitude = req.query.longitude;
    raio = req.query.raio;

    var foundPassadeira = false;
    var passadeiraId = null;

    //Passadeiras.isInRaio(raio, latitude, longitude)
    //.then(dados => res.jsonp(dados))
    //.catch(erro => res.status(500).jsonp(erro))
    Passadeiras.list()
     .then(dados => {
      let passadeiras = dados
        for (p of passadeiras) {
          console.log(p.latitude)
          let r = radius(latitude,longitude, p.latitude, p.longitude, raio)
          console.log(r)
          if ( r == true ) {
              foundPassadeira = true;
              passadeiraId = p.id
              res.jsonp({found: foundPassadeira, passadeira_id: passadeiraId})
              break;
          }
        }
        //res.jsonp({found: foundPassadeira, passadeira_id: passadeiraId})
     })
     .catch(erro => {
      console.log(erro)
      res.status(500).jsonp(erro)
    })
})

function radius(lat1, long1, lat2, long2, radius) {
/*getDistance(
        { latitude: 51.5103, longitude: 7.49347 },
        { latitude: "51° 31' N", longitude: "7° 28' E" }
    );*/

//returns false or true. radius = meters. checks if lat1 long1 are in a radius of x meters from lat2 long2
return geolib.isPointWithinRadius(
    { latitude: lat1, longitude: long1 },
    { latitude: lat2, longitude: long2 },
    20
);
}

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

module.exports = router;
