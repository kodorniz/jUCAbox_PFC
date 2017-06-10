'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArtistaSchema = Schema({
  artistaID: String,
  userID: String
});



module.exports = mongoose.model('Artista',ArtistaSchema);
