'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
  userID: String,
  firstname: String,
  lastname: String,
  email: String,
  avatarUrl: String,
  creationDate: Date,
  preferredLang: String,
  clientID: String,
  GlobalClientID: String,
  ciudad: String,
  provincia: String,
  pais: String,
  nickName: String,
  online: String
});

module.exports = mongoose.model('User',UserSchema);
