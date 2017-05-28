'use strict'

var express = require('express');

var spotifyToken = require('../spotify');

var api = express.Router();




api.get('/getUrlSpotify',function(req,res){

  res.status(200).send({url: spotifyToken.getUrl()});
});


module.exports = api;
