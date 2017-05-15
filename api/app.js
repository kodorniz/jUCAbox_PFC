'use sctrict'

var express = require('express');
var bodyParser = require('body-parser');
var request = require("request");
var token;
var routes = require('./routes/routes');
var options = { method: 'POST',
  url: 'https://sergioruiz.eu.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body:
   { grant_type: 'client_credentials',
     client_id: 'cpMr4q0LSEUB80vQV8RrlCIV7DFYw4jc',
     client_secret: 'i1OYE9H8rMWN58AqG-XItMu0pO0Q08rl1Unrw1xVtnNXBubE12QzTC0PuNdbOOVp',
     audience: 'https://sergioruiz.eu.auth0.com/api/v2/' },
  json: true };

var app = express();


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

function getToken(){

}

app.get('/prueba',function(req,res){
  res.status(200).send({message: 'raiz OK'});
});
app.use('/api',routes);

/*

*/



module.exports =
  app
;
