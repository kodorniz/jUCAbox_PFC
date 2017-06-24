var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playListLugarSVTOP = Schema({
  lugarID: { type:Schema.ObjectId, ref:'Lugares'},
  userID: { type:Schema.ObjectId, ref:'User'},
  cancion: Schema.Types.Mixed,
  FechaEnvio:Date,
  Estado: String,
  cancionID: String

});


module.exports = mongoose.model('playListLugaSVTOP',playListLugarSVTOP);