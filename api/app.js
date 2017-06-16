'use sctrict'

var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var token;
var routes = require('./routes/routes');
var user_routes = require('./routes/user');
var lugar_routes = require('./routes/lugares');
var friend_routes = require('./routes/friends');
var artista_fav_routes = require('./routes/artistaFav');
var log_routes = require('./routes/log');

var app = express();


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api',routes);
app.use('/api',user_routes);
app.use('/api',lugar_routes);
app.use('/api',friend_routes);
app.use('/api',artista_fav_routes);
app.use('/api',log_routes);

module.exports =
  app
;
