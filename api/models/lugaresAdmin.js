var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LugaresAdminSchema = Schema({
  lugarID: { type:Schema.ObjectId, ref:'Lugares'},
  userID: String
});


module.exports = mongoose.model('LugaresAdmin',LugaresAdminSchema);
