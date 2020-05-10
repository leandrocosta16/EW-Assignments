var express = require('express');
var router = express.Router();
const lhost = require('../config/env').gateway
const hostpassadeiras = require('../config/env').passadeiras

/* GET passaderias */
router.get('/', function(req, res) {
  axios.get(lhost + '/api/passadeiras')
    .then(dados => {
      res.render('index', {lista: dados.data});
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })
})

module.exports = router;