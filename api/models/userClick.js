var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserClickSchema = Schema({
  userID: { type:Schema.ObjectId, ref:'User'},
  userIDto: { type:Schema.ObjectId, ref:'User'},
  fechaClick: Date,
  type: String
});


module.exports = mongoose.model('UserClick',UserClickSchema);
