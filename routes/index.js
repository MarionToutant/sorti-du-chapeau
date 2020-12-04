var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({});
});

/* POST send email */
router.post('/sendEmail', async function(req, res, next) {
  
  // using Twilio SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs

  function shuffleArray(arr) {
    arr.sort(() => Math.random() - 0.5);
  }
  shuffleArray(req.body);
  var newArray = req.body;

  for(var i=0; i<(req.body.length-1); i++) {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: newArray[i].email,
      from: process.env.SENDGRID_SENDER_EMAIL,
      subject: 'SORTI DU CHAPEAU - Message secret',
      text: 'Voici ton ami affecté...',
      html: `Ton ami affecté est...<strong>${newArray[i+1].name}</strong> !!!`,
    }
    sgMail
      .send(msg)
      .then(() => {
        // console.log("Email sent")
        res.json("OK");
      })
      .catch((error) => {
        // console.log(error)
        res.json(error);
      })  
  }

});

module.exports = router;
