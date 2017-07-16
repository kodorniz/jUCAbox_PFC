'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArtistaSchema = Schema({
  artistaID: String,
  artistaName: String,
  generos_artista: [String],
  userID: { type:Schema.ObjectId, ref:'User'}
});



module.exports = mongoose.model('ArtistaFav',ArtistaSchema);
