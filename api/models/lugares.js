var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LugaresSchema = Schema({
  nombre: String,
  descripcion: String,
  img: [String],
  provincia: String,
  ciudad: String,
  direccion: String,
  userID: { type:Schema.ObjectId, ref:'User'},
  tipoMusica: [Schema.Types.Mixed]
});


module.exports = mongoose.model('Lugar',LugaresSchema);
