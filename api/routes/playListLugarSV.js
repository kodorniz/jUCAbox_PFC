'use strict'

var express = require('express');

//var spotifyToken = require('../spotify');
var PlayListLugarSVController = require('../controllers/playListLugarSV');
/*
addplayListLugarSV,
getPlaylistLugarSV,
deleteCancion,
addCancion
*/
var api = express.Router();
var md_auth = require('../middleware/authenticate');
var multipart = require('connect-multiparty');
var resolve = __dirname

var md_upload = multipart({ uploadDir: resolve + '/../uploads/lugar' });

api.post('/addplayListLugarSV',PlayListLugarSVController.addplayListLugarSV);
api.get('/getPlaylistLugarSV/:id/:orden/:col',PlayListLugarSVController.getPlaylistLugarSV);
api.delete('/deletePlaylistLugarSV/:id',md_auth.ensureAuth,PlayListLugarSVController.deletePlaylistLugarSV);


/*api.post('/register',UserController.saveUser);
api.put('/update-user/:id',md_auth.ensureAuth,UserController.updateUser);

api.get('get-image-user/:imageFile',[md_auth.ensureAuth,md_upload],UserController.getImageFile);
api.post('/get-users/:page?',UserController.getUsers);
api.delete('/delete-user/:id',UserController.deleteUser);*/
module.exports = api;





//token valido
//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OTQxNzVmNDNiMWMzZjExZDQxZjZjNTUiLCJpYXQiOjE0OTc0NjIyNjAsImV4cCI6MTUwMDA1NDI2MH0.OT2K1iAIaP7Q2bS5iaCAPfcbYm4XyPNzAnMZRNs2RPk
