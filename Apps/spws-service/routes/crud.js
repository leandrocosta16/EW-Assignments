var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('crud', { title: 'VUE' });
});

module.exports = router;
