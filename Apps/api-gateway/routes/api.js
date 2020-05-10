var express = require('express');
var router = express.Router();

var Filmes = require('../controllers/filmes');


//gere a paginação
function Pagination(req) {

Filmes.contar().then(function(value) {totalFilmes = value});
//console.log(totalFilmes);


    //se existir a query page e esta for um número - sanitation do input
    if(!isNaN(req.query.page)){
        //limita o nº pr página, para não exibir muitos e ser mais rápido
        if(parseInt(req.query.page) > 0){
            page = parseInt(req.query.page);
            pageSkip = (page * maxPerPage) - maxPerPage;
            pageLimit = maxPerPage;
        }
        //se menor que 1, zero ou negativo, mostra tudo. < 0 = show all
        else {
            //limit e skip a zero mostra tudo
            page = 0;
            pageLimit = 0;
            pageSkip = 0;
        }
    }
    //default, se sem query page: exibe as primeiras x entradas por ordem descentente
    else {
        page = 1;
        pageLimit = maxPerPage;
        pageSkip = 0;
    }
}

/* GET: lista de filmes */
router.get('/filmes', function(req, res) {
    Pagination(req);
    Filmes.listar(pageLimit, pageSkip)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
})

router.get('/filmes/total', function(req, res) {
    Filmes.contar()
      //.then(dados => console.log(dados))
      .then(dados => res.send([dados]) )
      //.then(dados => res.jsonp("{teste:10}"))
      .catch(erro => res.status(500).jsonp(erro))
})

/* GET: recupera a informação de um filme */
router.get('/filmes/:idFilme', function(req, res) {
  Filmes.consultar(req.params.idFilme)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})


// POST: inserir um filme
router.post('/filmes', function(req,res){
  Filmes.inserir(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})

// POST: inserir um filme
router.delete('/filmes/:idFilme', function(req,res){
  Filmes.apagar(req.params.idFilme)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})

module.exports = router;
