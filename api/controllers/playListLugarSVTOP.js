'use sctric'

var PlayListLugarSVTOP = require('../models/playListLugarSVTOP');
var jwt = require('../services/jwt');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var moment = require('moment');

/*
var LugaresAdminSchema = Schema({
  lugarID: { type:Schema.ObjectId, ref:'Lugares'},
  userID: { type:Schema.ObjectId, ref:'User'},
  cancion: Schema.Types.Mixed,
  FechaEnvio:Date,
  Estado: String

});
*/


function addplayListLugarSVTOP(req,res){
  var playListLugarSVTOP = new PlayListLugarSVTOP();

  var params = req.body;



  playListLugarSVTOP.lugarID = params.lugarID;
  playListLugarSVTOP.userID = params.userID;
  playListLugarSVTOP.cancion = params.cancion;
  playListLugarSVTOP.FechaEnvio = new Date();
  playListLugarSVTOP.Estado = params.Estado;
  playListLugarSVTOP.cancionID = params.cancion.id;
  //lugar.tipoMusica = params.tipoMusica;


      playListLugarSVTOP.save((err,playlistLugarSVStored)=>{
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



function getPlaylistLugarSVTOP(req,res){

var idLugar = mongoose.Types.ObjectId(req.body.lugarID);

var fini  = moment( req.body.fini,'DD/MM/YYYY');
var ffin = moment( req.body.ffin,'DD/MM/YYYY').add(1, 'days');



var agg =
    [

      { $match:{
        lugarID: idLugar,
        FechaEnvio: {$gte: new Date(fini), $lt:  new Date(ffin) }
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
    { $sort: {'total_products': -1}}


  ]


  console.log(new Date(fini));
  console.log(new Date(ffin));
  PlayListLugarSVTOP.aggregate(agg,(err,playlist)=>{
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





module.exports = {


  addplayListLugarSVTOP,
  getPlaylistLugarSVTOP

};
