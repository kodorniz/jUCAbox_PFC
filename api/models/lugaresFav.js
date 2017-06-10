var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LugaresFavSchema = Schema({
  lugarID: { type:Schema.ObjectId, ref:'Lugares'},
  userID: String
});


module.exports = mongoose.model('LugaresFav',LugaresFavSchema);
