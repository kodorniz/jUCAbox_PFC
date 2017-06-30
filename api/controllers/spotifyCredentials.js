var request = require('request');
var payload = 'da017c536e314c94ab23b3505ad0fc85' + ":" + '147783c734a64a61b2be68edc44a7b92';
var encodedPayload = new Buffer(payload).toString("base64");


var opts = {
    url: "https://accounts.spotify.com/api/token",
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + encodedPayload
    },
    body: "grant_type=client_credentials&scope=playlist-modify-public playlist-modify-private"
};



////////////////////////////////////////////////7

function getToken(callback) {

  request(opts, function (err, res, body) {
    if (err || res.statusCode !== 200) {
      return callback(err || {statusCode: res.statusCode});
    }
    callback(null, body);
  });
}

module.exports = {
  getToken
};
