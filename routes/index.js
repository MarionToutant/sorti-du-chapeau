var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST send email */
router.post('/sendEmail', function(req, res, next) {
  console.log(req.body[0]);
  res.json({ message: 'reponse en JSON' });
});

module.exports = router;
