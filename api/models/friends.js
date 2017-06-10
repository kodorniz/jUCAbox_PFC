var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FriendsSchema = Schema({
  friendID: String,
  userID: String
});


module.exports = mongoose.model('Friends',FriendsSchema);
