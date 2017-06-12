'use strict'

var express = require('express');

//var spotifyToken = require('../spotify');
var spotifyCredentials = require('../controllers/spotifyCredentials');

var api = express.Router();




api.get('/getUrlSpotify',function(req,res){
  spotifyCredentials.getToken(function(err, body) {
    if (err) {
      console.log(err);
    } else {
      console.log(body);
      res.status(200).send(body);
    }
  });
  //res.status(200).send(spotifyCredentials.getToken());
});


module.exports = api;
