'use strict'

var express = require('express');

//var spotifyToken = require('../spotify');
var LugarController = require('../controllers/lugares');

var api = express.Router();
var md_auth = require('../middleware/authenticate');
var multipart = require('connect-multiparty');
var resolve = __dirname

var md_upload = multipart({ uploadDir: resolve + '/../uploads/lugar' });

api.post('/addlugar',md_auth.ensureAuth,LugarController.saveLugar);
api.put('/updatelugar/:id',md_auth.ensureAuth,LugarController.updateLugar);
api.put('/updatelugarTM/:id',md_auth.ensureAuth,LugarController.updateTipoMusica);
api.get('/getlugar/:id',md_auth.ensureAuth,LugarController.getLugar);
api.get('/getlugar',md_auth.ensureAuth,LugarController.getLugares);
api.post('/upload-image-lugar/:id',[md_auth.ensureAuth,md_upload],LugarController.uploadImage);
api.post('/delete-image-lugar/:id',[md_auth.ensureAuth,md_upload],LugarController.deleteImageFile);
api.get('/get-image-lugar/:imageFile',LugarController.getImageFile);
api.delete('/delete-lugar/:id',md_auth.ensureAuth,LugarController.deleteLugar);
/*api.post('/register',UserController.saveUser);
api.put('/update-user/:id',md_auth.ensureAuth,UserController.updateUser);

api.get('get-image-user/:imageFile',[md_auth.ensureAuth,md_upload],UserController.getImageFile);
api.post('/get-users/:page?',UserController.getUsers);
api.delete('/delete-user/:id',UserController.deleteUser);*/
module.exports = api;





//token valido
//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OTQxNzVmNDNiMWMzZjExZDQxZjZjNTUiLCJpYXQiOjE0OTc0NjIyNjAsImV4cCI6MTUwMDA1NDI2MH0.OT2K1iAIaP7Q2bS5iaCAPfcbYm4XyPNzAnMZRNs2RPk
