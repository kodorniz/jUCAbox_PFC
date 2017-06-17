var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TokenLugaresSchema = Schema({
  lugarID: { type:Schema.ObjectId, ref:'Lugares'},
  token: String
});


module.exports = mongoose.model('TokenLugares',TokenLugaresSchema);
