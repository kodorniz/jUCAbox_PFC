var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LugaresSchema = Schema({
  nombre: String,
  descripcion: String,
  img: [String],
  provincia: String,
  ciudad: String,
  direccion: String,
  tipoMusica: [Schema.Types.Mixed]
});


module.exports = mongoose.model('Lugares',LugaresSchema);
