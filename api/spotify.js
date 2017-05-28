var mensaje;
var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional

var scopes = ['user-read-private', 'user-read-email','playlist-modify-public','playlist-modify-private'];
var state = 'some-state-of-my-choice';


var spotifyApi = new SpotifyWebApi({
  clientId : 'da017c536e314c94ab23b3505ad0fc85',
  clientSecret : '147783c734a64a61b2be68edc44a7b92',
  redirectUri : 'http://localhost:4200/home'
});

var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

// https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
console.log(authorizeURL);
function getUrl(){
  return authorizeURL;
  //return authorizeURL;
};
/*

// Retrieve an access token
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err.message);
  });



function getToken(req,res){
  spotifyApi.createPlaylist('thelinmichael', 'My Cool Playlist', { 'public' : false })
    .then(function(data) {
      console.log('Created playlist!');
    }, function(err) {
      console.log('Something went wrong!', err);
    });
  res.status(200).send({message: mensaje});
}*/


module.exports = {
  getUrl
};
