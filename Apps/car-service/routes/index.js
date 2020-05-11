var express = require('express');
var router = express.Router();
const axios = require('axios');
const localhost = require('../config/env').cars


// ==CRUD==

//GET ALL OR BY ID
router.get('/', function(req, res) {
    if(req.query.id) {
        id = req.query.id;
        axios.get(localhost+'/api/cars/' + id)
            .then(dados => {
              res.render('index', {ficha: dados.data});
            })
            .catch(erro => {
              res.render('error', {error: erro})
            })
    }
    else {
        axios.get(localhost+'/api/cars')
            .then(dados => {
              res.render('index', {lista: dados.data});
            })
            .catch(erro => {
              res.render('error', {error: erro})
            })
    }
})

//FORM FOR UPDATE
router.get('/form/:idCars', function(req, res) {
    var id = req.params.idCars;
    axios.get(localhost+'/api/cars/' + id)
            .then(dados => {
              res.render('form', {ficha: dados.data});
            })
            .catch(erro => {
              res.render('error', {error: erro})
            })
})

//UPDATE
router.post('/form/:idCars', function(req, res) {
    var id = req.params.idCars;
    axios.put(localhost+'/api/cars/' + id, req.body)
            .then(dados => {
              res.redirect('/');
            })
            .catch(erro => {
              res.render('error', {error: erro})
            })
})


//FORM FOR POST
router.get('/form', function(req, res) {
    res.render('form');
})

//POST INSERT
router.post('/form', function(req, res) {
        axios.post(localhost+'/api/cars', req.body)
            .then(dados => {
              res.redirect(303, '/')
            })
            .catch(erro => {
              res.render('error', {error: erro})
            })
})


//DELETE
router.delete('/:idCars', function(req,res){
    var id = req.params.idCars;
    axios.delete(localhost+'/api/cars/' + id)
        .then(dados => {
            res.redirect(303, '/');
        })
        .catch(erro => {
            res.render('error', {error: erro});
        })
})


module.exports = router;
