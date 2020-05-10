var express = require('express');
var router = express.Router();
const axios = require('axios');



/* GET home page. */
router.get('/', function(req, res, next) {
    //req.originalUrl porque quero que passe a query page se existir
    var page = 1;
    if(!isNaN(req.query.page)){
        page = req.query.page
    }
    axios.get('http://localhost:8080/api' + req.originalUrl)
        .then(dados => {
            res.render('filmes', { list: dados.data, page: page });
        })
        .catch(erro => {
            res.render('error', {error: erro})
        })
})


router.get('/inserir', function(req,res){
    res.render('form')
})

router.get('/:idFilme', function(req,res){
    var id = req.params.idFilme;
    axios.get('http://localhost:8080/api/filmes/' + id)
        .then(dados => {
            res.render('filme', { list: dados.data });
        })
        .catch(erro => {
            res.render('error', {error: erro})
        })
})

router.post('/', function(req,res){
    axios.post('http://localhost:8080/api/filmes', req.body)
        .then(dados => {
            res.redirect('/filmes')
        })
        .catch(erro => {
            res.render('error', {error: erro})
        })
})

router.delete('/:idFilme', function(req,res){
    var id = req.params.idFilme;
    axios.delete('http://localhost:8080/api/filmes/' + id)
        .then(dados => {
            res.redirect(303, '/filmes')
        })
        .catch(erro => {
            res.render('error', {error: erro})
        })
})

module.exports = router;
