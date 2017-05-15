'use strict'

var express = require('express');

var spotifyToken = require('../spotify');

var api = express.Router();



//api.get('/spotifyToken',spotifyToken.getToken);
api.get('/prueba',spotifyToken.getToken);
//api.post('/prueba2',spotifyToken.getToken);

module.exports = api;
