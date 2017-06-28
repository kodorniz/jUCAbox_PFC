var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LugaresMensajeSchema = Schema({
  lugarID: { type:Schema.ObjectId, ref:'Lugar'},
  mensaje: String,
  fecha: Date
});


module.exports = mongoose.model('LugaresMensaje',LugaresMensajeSchema);
