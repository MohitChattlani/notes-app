var express = require('express');
var bodyparser = require('body-parser');
var nodemailer = require('nodemailer');

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyparser());
app.set('view engine','hbs');
app.use(express.static(__dirname + '/views'));

app.get('/',(req,res) => {
    res.render('mail.hbs');
});

app.post('/confirmMail',(req,res) => {
    var rec = req.body;
    // res.send(rec);
    // console.log(rec);

    var nodemailer = require('nodemailer');
    
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'proje********ail.com',
        pass: '*********'
      }
    });

    var send = `Hi ${rec.email}, \n
You have just signed up!!!!`;

    var mailOptions = {
        from: 'Welcome To Notes App',
        to: rec.email,
        subject: 'Welcome',
        text: send
    };

    transporter.sendMail(mailOptions,(err,info) => {
        if(err) {
            console.log('Error!!: ',err);
            res.render('welcome.hbs',{email: rec.email});

        } else {
            console.log(info);
            res.render('wrongMail.hbs');
        }
    })
});

app.listen(port, () => {
    console.log(`App is up on port ${port}`);
});