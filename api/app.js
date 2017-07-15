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
var lugares_fav_routes = require('./routes/lugaresFav');
var lugares_mensajes_routes = require('./routes/lugaresMensajes');
var lugares_admin_routes = require('./routes/lugaresAdmin');
var playlistLugar_routes = require('./routes/playListLugar');
var playlistLugarSV_routes = require('./routes/playListLugarSV');
var playlistLugarSV_routesTOP = require('./routes/playListLugarSVTOP');
var userClick_routes = require('./routes/userClick');



var app = express();




app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api',routes);
app.use('/api',userClick_routes);
app.use('/api',user_routes);
app.use('/api',lugar_routes);
app.use('/api',friend_routes);
app.use('/api',artista_fav_routes);
app.use('/api',log_routes);
app.use('/api',lugares_fav_routes);
app.use('/api',lugares_mensajes_routes);
app.use('/api',lugares_admin_routes);
app.use('/api',playlistLugar_routes);
app.use('/api',playlistLugarSV_routes);
app.use('/api',playlistLugarSV_routesTOP);

module.exports =
  app
;
