var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LugaresFavSchema = Schema({
  lugarID: { type:Schema.ObjectId, ref:'Lugares'},
  userID: { type:Schema.ObjectId, ref:'User'}
});


module.exports = mongoose.model('LugaresFav',LugaresFavSchema);
