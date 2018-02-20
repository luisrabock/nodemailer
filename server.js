// server.js
var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');

    var app = express();
    app.set('view engine', 'ejs');
    app.set('views', './public')
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    var port = 3000;
    app.get('/', function (req, res) {
      res.render('index');
    });
    app.post('/send-email', function (req, res) {
      let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'seuemail',
              pass: 'suasenha'
          }
      });
      let mailOptions = {
          from: 'emaildeenvio', // email de envio
          to: req.body.to, // lista de quem vai receber
          subject: req.body.subject, // assunto do email
          text: req.body.body, // corpo do email
          html: '<b>Envio do email em NodeJs</b>' // corpo no html
      };

      console.log(mailOptions.text)

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
          });
      });
          app.listen(port, function(){
            console.log('Server is running at port: ',port);
          });