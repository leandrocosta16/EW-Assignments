var express = require('express');
var router = express.Router();
const axios = require('axios');
const localhost = require('../config/env').gateway
const lhostSPWS = require('../config/env').passadeiras
const lhostCars = require('../config/env').cars
const lhostPedestres = require('../config/env').pedestres

//CAR
router.post('/carMove', function(req, res) {
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var matricula = req.body.matricula;
    var radius = 10;
    var notification = '';
    var lights = undefined;
    axios.get(lhostSPWS+'/api/isInRaio?latitude=' + latitude + '&longitude=' + longitude + '&radius=' + radius + '&mode=cars')
            .then(dados => {
                //Se passadeira próxima
                if(dados.data.found == true) {//if(dados.data.radius == true) {
                    var passadeiraId = dados.data.passadeira_id;

                    //Traffic lights API
                    /*axios.get(lhostSPWS+'/api/lights/'+passadeiraId)
                        .then(dados => {
                            var light = dados.data.light;
                            return;})
                        .catch(erro => console.log(erro))*/

                    console.log('aqui:')
                    console.log(dados.data.light)
                    lights = dados.data.light;

                    //Is in Radius notification
                    if(dados.data.safe == true) {
                        notification = 'CARE: Crosswalk close, but no pedestrians';
                    }
                    else {
                        notification = 'STOP: Crosswalk with pedestrians';
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
                                    return res.jsonp({note: notification, light: lights})
                                })
                                .catch(erro => console.log(erro))
                            }
                            //se ainda não existir inserir
                            else {
                                axios.post(lhostCars+'/api/cars', {latitude:latitude, longitude: longitude, matricula: matricula, passadeira_id: passadeiraId})
                                //.then(dados => res.sendStatus(200))
                                .then(dados => {
                                    console.log(notification)
                                    return res.jsonp({note: notification, light: lights})
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
                    lights = undefined;
                    notification = 'SAFE: No crosswalks nearby'
                    axios.get(lhostCars+'/api/cars/matricula/'+matricula)
                    .then(dados => {
                        if(dados.data) {
                            var passadeira = dados.data.passadeira_id;
                            axios.delete(lhostCars+'/api/cars/'+dados.data.id+'/'+passadeira)
                            //.then(dados => res.sendStatus(200))
                            .then(dados => {
                                console.log(notification)
                                return res.jsonp({note: notification, light: lights})
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





//PEDESTRE
router.post('/pedestreMove', function(req, res) {
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var email = req.body.email;
    var radius = 10;
    axios.get(lhostSPWS+'/api/isInRaio?latitude=' + latitude + '&longitude=' + longitude + '&radius=' + radius + '&mode=pedestres')
            .then(dados => {
                //Se passadeira próxima
                if(dados.data.found == true) {//if(dados.data.radius == true) {
                    var passadeiraId = dados.data.passadeira_id;

                    if(dados.data.safe == true) {
                        var notification = 'Crosswalk close but no cars'
                    }
                    else {
                        var notification = 'Crosswalk with cars'
                    }

                    //Check if it exists already and if yes get car id by email
                    axios.get(lhostPedestres+'/api/pedestres/email/'+email)
                        .then(dados => {
                            //se carro já inserido na db update dos dados
                            if(dados.data) {
                                axios.put(lhostPedestres+'/api/pedestres/'+dados.data.id, {latitude: latitude, longitude: longitude})
                                //.then(dados => res.sendStatus(200))
                                .then(dados => {
                                    console.log(notification)
                                    return res.jsonp({note: notification})
                                })
                                .catch(erro => console.log(erro))
                            }
                            //se ainda não existir inserir
                            else {
                                axios.post(lhostPedestres+'/api/pedestres', {latitude:latitude, longitude: longitude, email: email, passadeira_id: passadeiraId})
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
                    var notification = 'No crosswalks'
                    axios.get(lhostPedestres+'/api/pedestres/email/'+email)
                    .then(dados => {
                        if(dados.data) {
                            var passadeira = dados.data.passadeira_id;
                            axios.delete(lhostPedestres+'/api/pedestres/'+dados.data.id+'/'+passadeira)
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
