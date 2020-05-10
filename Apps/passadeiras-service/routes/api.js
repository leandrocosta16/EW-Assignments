var express = require('express');
var router = express.Router();
const axios = require('axios');

var Passadeiras = require('../controllers/passadeiras');


/* GET: lista de filmes */



router.get('/passadeiras', function(req, res) {
  //res.send ("Hello world...");
  //res.render("index");

  /*axios.get(Passadeiras.listar())
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
    })*/

    Passadeiras.listar()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
})


// router.get('/filmes/total', function(req, res) {
//     Filmes.contar()
//       //.then(dados => console.log(dados))
//       .then(dados => res.send([dados]) )
//       //.then(dados => res.jsonp("{teste:10}"))
//       .catch(erro => res.status(500).jsonp(erro))
// })

// /* GET: recupera a informação de um filme */
// router.get('/filmes/:idFilme', function(req, res) {
//   Filmes.consultar(req.params.idFilme)
//     .then(dados => res.jsonp(dados))
//     .catch(erro => res.status(500).jsonp(erro))
// })


// // POST: inserir um filme
// router.post('/filmes', function(req,res){
//   Filmes.inserir(req.body)
//     .then(dados => res.jsonp(dados))
//     .catch(erro => res.status(500).jsonp(erro))
// })

// // POST: inserir um filme
// router.delete('/filmes/:idFilme', function(req,res){
//   Filmes.apagar(req.params.idFilme)
//     .then(dados => res.jsonp(dados))
//     .catch(erro => res.status(500).jsonp(erro))
// })

module.exports = router;
