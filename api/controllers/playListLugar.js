'use sctric'

var PlayListLugar = require('../models/playListLugar');
var jwt = require('../services/jwt');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');

/*
var LugaresAdminSchema = Schema({
  lugarID: { type:Schema.ObjectId, ref:'Lugares'},
  playlistID: String,
  namePlaylist: String,
  userID: { type:Schema.ObjectId, ref:'User'}

});
*/


function addPlayListLugar(req,res){
  var playlistlugar = new PlayListLugar();

  var params = req.body;



  playlistlugar.lugarID = params.lugarID;
  playlistlugar.userID = params.userID;
  playlistlugar.playlistID = params.playlistID;
  playlistlugar.namePlaylist = params.namePlaylist;

  //lugar.tipoMusica = params.tipoMusica;

  PlayListLugar.find({playlistlugar:   playlistlugar.lugarID,playlistlugar: playlistlugar.playlistID},(err,playlistExist)=>{
    if(err){
        res.status(500).send({message:'Error en la petición'});
    }else{
      if(playlistExist.length==0 || !playlistExist){
        playlistlugar.save((err,playlistStored)=>{
            if(err){
              console.log(err);
              res.status(500).send({message:'Error al guardar la playlist'});
            }else{
              if(!playlistStored){
                console.log(err);
                    res.status(300).send({message:'No se ha guardado la playliist'});
              }else{
                    res.status(200).send({playlist:playlistStored});
              }
            }

        });
      }else{
        console.log(playlistExist.length);
          res.status(400).send({message:'la playlist ya existe'});
      }


    }


  });



}



function getPlaylistLugar(req,res){

  var lugarID = req.params.id;
  if(req.params.page){
  var page = req.params.page;
}else{
    var page = 1;
}


  var itemsPerPage = 10;

  PlayListLugar.find({lugarID: lugarID}).paginate(page,itemsPerPage,function(err,playlist,total){
    if(err){
        res.status(500).send({message:'Error en la petición'});
    }else{
      if(!playlist){
        res.status(404).send({message:'no existen playlists'});
      }else{
        res.status(200).send({playlist: playlist,total_items: total});
      }
    }
  })
}


function deletePlaylistLugar(req,res){
//  var friendId = req.params.id;
var params = req.body;

  var lugarID = params.lugarID;
  var playlistID = params.playlistID;

  PlayListLugar.find({lugarID: lugarID,playlistID: playlistID},(err,playlistRemove)=>{
    if(err){

        res.status(500).send({message:'Error en la petición'});
    }else{
      if(!playlistRemove){
        res.status(404).send({message:'No existe la playlist'});
      }else{

          res.status(200).send({message:'plylista eliminada'});
      }


    }


  }).remove().exec();
}





module.exports = {


  addPlayListLugar,
  getPlaylistLugar,
  deletePlaylistLugar

};
