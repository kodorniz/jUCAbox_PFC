var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LugaresAdminSchema = Schema({
  lugarID: { type:Schema.ObjectId, ref:'Lugares'},
  playlistID: String,
  namePlaylist: String,
  usuarioID: { type:Schema.ObjectId, ref:'User'}

});


module.exports = mongoose.model('LugaresAdmin',LugaresAdminSchema);
