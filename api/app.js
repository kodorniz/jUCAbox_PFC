'use sctrict'

var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var token;
var routes = require('./routes/routes');
var user_routes = require('./routes/user');
var lugar_routes = require('./routes/lugares');

var app = express();


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api',routes);
app.use('/api',user_routes);
app.use('/api',lugar_routes);

module.exports =
  app
;
