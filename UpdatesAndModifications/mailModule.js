var express = require('express');
var bodyparser = require('body-parser');
var nodemailer = require('nodemailer');

const port = process.env.PORT || 3000;

var app = express();

app.set('view engine','hbs');
app.use(express.static(__dirname + '/views'));

app.get('/',(req,res) => {
    res.render('mail.hbs');
});

app.listen(port, () => {
    console.log(`App is up on port ${port}`);
});