var express = require('express');
var router = express.Router();
const axios = require('axios');
const localhost = require('../config/env').gateway
const lhostSPWS = require('../config/env').passadeiras
const lhostCars = require('../config/env').cars
const lhostPedestres = require('../config/env').pedestres

//CAR
router.post('/carMove', function(req, res) {
            console.log(new Date())
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var matricula = req.body.matricula;
    var radius = 10;
    axios.get(lhostSPWS+'/api/isInRaio?latitude=' + latitude + '&longitude=' + longitude + '&radius=' + radius)
            .then(dados => {
                //Se passadeira próxima
                if(dados.data.found == true) {//if(dados.data.radius == true) {
                    var passadeiraId = dados.data.passadeira_id;

                    if(dados.data.safe == true) {
                        var notification = 'CARE: Crosswalk close, but safe no pedestrians'
                    }
                    else {
                        var notification = 'STOP: crosswalk with pedestrians'
                    }

                    //Check if it exists already and if yes get car id by matricula
                    axios.get(lhostCars+'/api/cars/matricula/'+matricula)
                        .then(dados => {
                            //se carro já inserido na db update dos dados
                            if(dados.data) {
                                axios.put(lhostCars+'/api/cars/'+dados.data.id, {latitude: latitude, longitude: longitude})
                                //.then(dados => res.sendStatus(200))
                                .then(dados => {
                                    console.log(notification)
                                    return res.jsonp({note: notification})
                                })
                                .catch(erro => console.log(erro))
                            }
                            //se ainda não existir inserir
                            else {
                                axios.post(lhostCars+'/api/cars', {latitude:latitude, longitude: longitude, matricula: matricula, passadeira_id: passadeiraId})
                                //.then(dados => res.sendStatus(200))
                                .then(dados => {
                                    console.log(notification)
                                    return res.jsonp({note: notification})
                                })
                                .catch(erro => console.log(erro))
                            }
                        })
                        .catch(erro => {
                          console.log(erro)
                        })
                }

                //Se passadeira não próxima, confirmar se antes o carro na db estava e apagar se sim
                else {
                    var notification = 'SAFE: no crosswalk nearby'
                    axios.get(lhostCars+'/api/cars/matricula/'+matricula)
                    .then(dados => {
                        if(dados.data) {
                            var passadeira = dados.data.passadeira_id;
                            axios.delete(lhostCars+'/api/cars/'+dados.data.id+'/'+passadeira)
                            //.then(dados => res.sendStatus(200))
                            .then(dados => {
                                console.log(notification)
                                return res.jsonp({note: notification})
                            })
                            .catch(erro => console.log(erro))
                        }
                        else{
                            console.log(notification)
                            res.sendStatus(200);
                        }
                    })
                    .catch(erro => {
                      console.log(erro)
                    })
                }
              
            })
            .catch(erro => {
              console.log(erro)
            })
})


module.exports = router;
