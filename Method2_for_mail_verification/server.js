var express = require('express');
var bodyparser = require('body-parser');

var kickbox = require('kickbox').client('test_YOUR_API_KEY').kickbox();

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyparser());
app.set('view engine','hbs');
app.use(express.static(__dirname + '/views'));

app.get('/',(req,res) => {
    res.render('mail.hbs');
});

app.post('/confirmMail',(req,res) => {
    var data = req.body;

    kickbox.verify(data.email, function (err, response) {
        if (err) {
            console.log(err);
            res.render('wrongMail.hbs');
        } else if(response.body.result === 'undeliverable') {
            res.render('wrongMail.hbs');
        } else {
            console.log(`Sent mail is: ${data.email}`);
            console.log('Response is: ',response);
            res.render('welcome.hbs',{email: data.email});
        }
      });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});