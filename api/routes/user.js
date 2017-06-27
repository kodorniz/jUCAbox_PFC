'use strict'

var express = require('express');

//var spotifyToken = require('../spotify');
var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middleware/authenticate');
var multipart = require('connect-multiparty');
var resolve = __dirname

var md_upload = multipart({ uploadDir: resolve + '/../uploads/user' });


api.post('/addUser',UserController.saveUser);
api.put('/updateUser/:id',md_auth.ensureAuth,UserController.updateUser);
api.post('/upload-image-user/:id',[md_auth.ensureAuth,md_upload],UserController.uploadImage);
api.get('get-image-user/:imageFile',[md_auth.ensureAuth,md_upload],UserController.getImageFile);
api.get('/getUsers/:page?',UserController.getUsers);
api.get('/getUserByID/:id',UserController.getUserByID);
api.post('/getUsersByName',UserController.getUsersbyName);
api.delete('/deleteUser/:id',UserController.deleteUser);
module.exports = api;





//token valido
//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OTQxNzVmNDNiMWMzZjExZDQxZjZjNTUiLCJpYXQiOjE0OTc0NjIyNjAsImV4cCI6MTUwMDA1NDI2MH0.OT2K1iAIaP7Q2bS5iaCAPfcbYm4XyPNzAnMZRNs2RPk
