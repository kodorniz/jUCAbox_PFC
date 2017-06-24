'use sctric'

var PlayListLugarSV = require('../models/playListLugarSV');
var jwt = require('../services/jwt');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');

/*
var LugaresAdminSchema = Schema({
  lugarID: { type:Schema.ObjectId, ref:'Lugares'},
  userID: { type:Schema.ObjectId, ref:'User'},
  cancion: Schema.Types.Mixed,
  FechaEnvio:Date,
  Estado: String

});
*/


function addplayListLugarSV(req,res){
  var playListLugarSV = new PlayListLugarSV();

  var params = req.body;



  playListLugarSV.lugarID = params.lugarID;
  playListLugarSV.userID = params.userID;
  playListLugarSV.cancion = params.cancion;
  playListLugarSV.FechaEnvio = new Date();
  playListLugarSV.Estado = params.Estado;
  playListLugarSV.cancionID = params.cancion.id;
  //lugar.tipoMusica = params.tipoMusica;


      playListLugarSV.save((err,playlistLugarSVStored)=>{
            if(err){
              console.log(err);
              res.status(500).send({message:'Error al enviar cancion a playlist'});
            }else{
              if(!playlistLugarSVStored){
                    res.status(300).send({message:'No se enviado la cancion a la playlist'});
              }else{

                    res.status(200).send({playlist:playlistLugarSVStored});
              }
            }

        });





}



function getPlaylistLugarSV(req,res){

var idLugar = mongoose.Types.ObjectId(req.params.id);
var orden = req.params.orden;
var col = req.params.col;
orden = Number(orden);
var agg =
    [

        { $match:{
          lugarID: idLugar
        }
      },

      { $group:
            { _id: '$cancionID',
            maxDate: { $max: '$FechaEnvio'},
            cancion: {$first: '$cancion'} ,
            lugar :{$first: '$lugarID'},
            total_products: { $sum: 1 }
          }

    },
    { $sort: {[col]: orden}}


  ]



  PlayListLugarSV.aggregate(agg,(err,playlist)=>{
    if(err){
      res.status(500).send({message:'Error en la petición'});
    }else{
      if(!playlist){
        res.status(404).send({message:'no existe la playlist'});
      }else{
        res.status(200).send({playlist});
      }

    }


  });
  /*PlayListLugarSV.find({lugarID: lugarID},(err,playlist)=>{
    if(err){
      res.status(500).send({message:'Error en la petición'});
    }else{
      if(!playlist){
        res.status(404).send({message:'no existe la playlist'});
      }else{
        res.status(200).send({playlist});
      }

    }


  });*/
}



function deletePlaylistLugarSV(req,res){
//  var friendId = req.params.id;
var params = req.body;

  var lugarID = req.params.id;

  var cancionID = params.cancionID;
  console.log({lugarID: lugarID,cancionID: cancionID});
  PlayListLugarSV.find({lugarID: lugarID,cancionID: cancionID},(err,plRemove)=>{
    if(err){

        res.status(500).send({message:'Error en la petición'});
    }else{
      if(!plRemove){
        res.status(404).send({message:'No existe la cancion'});
      }else{
        res.status(200).send({cancionRemove: plRemove});
      }
    }
  }).remove().exec();

}


module.exports = {


  addplayListLugarSV,
  getPlaylistLugarSV,
  deletePlaylistLugarSV

};
