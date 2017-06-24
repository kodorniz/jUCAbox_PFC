'use strict'

var express = require('express');

//var spotifyToken = require('../spotify');
var LugarFavController = require('../controllers/lugaresFav');

var api = express.Router();
var md_auth = require('../middleware/authenticate');
var multipart = require('connect-multiparty');
var resolve = __dirname

var md_upload = multipart({ uploadDir: resolve + '/../uploads/lugar' });

api.post('/addLugarFav',md_auth.ensureAuth,LugarFavController.addLugarFav);
api.get('/getLugaresFav/:id',md_auth.ensureAuth,LugarFavController.getLugaresFav);
api.get('/getLugaresFavP/:id',md_auth.ensureAuth,LugarFavController.getLugaresFavP);
api.get('/isLugaresFav/:id/:lugarID',md_auth.ensureAuth,LugarFavController.isLugaresFav);
api.delete('/deleteLugarFav',LugarFavController.deleteLugarFav);
api.delete('/deleteLugarFavAll',LugarFavController.deleteLugarFavAll);
//deleteLugarFavAll
/*api.post('/register',UserController.saveUser);
api.put('/update-user/:id',md_auth.ensureAuth,UserController.updateUser);

api.get('get-image-user/:imageFile',[md_auth.ensureAuth,md_upload],UserController.getImageFile);
api.post('/get-users/:page?',UserController.getUsers);
api.delete('/delete-user/:id',UserController.deleteUser);*/
module.exports = api;





//token valido
//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OTQxNzVmNDNiMWMzZjExZDQxZjZjNTUiLCJpYXQiOjE0OTc0NjIyNjAsImV4cCI6MTUwMDA1NDI2MH0.OT2K1iAIaP7Q2bS5iaCAPfcbYm4XyPNzAnMZRNs2RPk
