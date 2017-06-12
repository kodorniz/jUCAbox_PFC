'use sctrict'

var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var token;
var routes = require('./routes/routes');
var user_routes = require('./routes/user');


var app = express();


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api',routes);
app.use('/api',user_routes);


module.exports =
  app
;
