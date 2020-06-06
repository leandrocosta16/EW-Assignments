var express = require('express');
var router = express.Router();
const axios = require('axios');
const localhost = require('../config/env').website
const lhostGateway = require('../config/env').gateway

router.get('/', function(req, res) {
    res.render('index', {lhostGateway:lhostGateway});
})

module.exports = router;
