var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogSchema = Schema({
  userID: String,
  tipoMensaje: String,
  objetoMensaje: String,
  verboMensaje: String,
  mensaje: String,
  FechaLog: Date,
  url: String,
  cancion: Schema.Types.Mixed
});



module.exports = mongoose.model('Log',LogSchema);
