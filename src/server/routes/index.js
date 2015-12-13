var express = require('express');
var router = express.Router();
var nio = require('niojs');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
