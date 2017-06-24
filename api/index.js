'user strict'

var mongoose = require('mongoose');
var app = require('./app');
//var SpotifyWebApi = require('spotify-web-api-node');


var port = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost:27017/jucabox',(err,res)=>{

  if(err){
    throw err;
  }else{
    console.log("la base de datos está corriendo...");
    
    app.listen(port,function(){
      console.log("Servidor del api rest de musica escuchando en el http://localhost:" + port);
    });

  }

});
