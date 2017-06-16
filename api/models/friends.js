var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FriendsSchema = Schema({
  friendID: { type:Schema.ObjectId, ref:'User'},
  userID: { type:Schema.ObjectId, ref:'User'}
});


module.exports = mongoose.model('Friend',FriendsSchema);
