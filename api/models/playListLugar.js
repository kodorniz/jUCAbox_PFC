var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playListLugar = Schema({
  lugarID: { type:Schema.ObjectId, ref:'Lugares'},
  playlistID: String,
  namePlaylist: String,
  userID: String

});


module.exports = mongoose.model('playListLugar',playListLugar);
