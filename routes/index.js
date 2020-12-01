var express = require('express');
var router = express.Router();
const axios = require('axios')
const dotenv = require('dotenv');
dotenv.config();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST send email */
router.post('/sendEmail', async function(req, res, next) {
  console.log(req.body[0].email);
  
  // using Twilio SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  /*
  javascript
  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: 'marion.toutant@gmail.com', // Change to your recipient
    from: 'contact@tout-en-m.net', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
      
    })
    .catch((error) => {
      console.log(error)
      
    })
    */

    const response = await axios.post('https://api.sendgrid.com/v3/mail/send', {
        "personalizations": [
          {
            "to": [
              {
                "email": "marion.toutant@gmail.com"
              }
            ],
            "subject": "Hello, World! 2"
          }
        ],
        "from": {
          "email": "contact@tout-en-m.net"
        },
        "content": [
          {
            "type": "text/plain",
            "value": "Hello, World!"
          }
        ]
      }, {
        headers: {
          'Authorization': process.env.SENDGRID_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    )
    .then(function (response) {
      console.log(response.data);
      console.log(response.status);
    })

    /*
    var response = request('POST', 'https://api.sendgrid.com/v3/mail/send', {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${process.env.SENDGRID_API_KEY}`
      },
      json: {
        "personalizations": [
          {
            "to": [
              {
                "email": "marion.toutant@gmail.com"
              }
            ],
            "subject": "Hello, World! 2"
          }
        ],
        "from": {
          "email": "contact@tout-en-m.net"
        },
        "content": [
          {
            "type": "text/plain",
            "value": "Hello, World!"
          }
        ]
      }
    })

    console.log(response.getBody())
    */


    res.json({ message: 'OK' });

});

module.exports = router;
