'use sctric'

var LugaresFav = require('../models/lugaresFav');
var jwt = require('../services/jwt');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');

/*
var FriendsSchema = Schema({
  friendID: { type:Schema.ObjectId, ref:'User'},
  userID: { type:Schema.ObjectId, ref:'User'}
});
*/


function addLugarFav(req,res){
  var lugaresFav = new LugaresFav();

  var params = req.body;



  lugaresFav.lugarID = params.lugarID;
  lugaresFav.userID = params.userID;
  //lugar.tipoMusica = params.tipoMusica;

  LugaresFav.find({lugarID:   lugaresFav.lugarID,userID: lugaresFav.userID},(err,lugarExist)=>{
    if(err){
        res.status(500).send({message:'Error en la petición'});
    }else{
      if(lugarExist.length==0 || !lugarExist){
        lugaresFav.save((err,lugarStored)=>{
            if(err){

              res.status(500).send({message:'Error al guardar el lugar fav'});
            }else{
              if(!lugarStored){
                    res.status(300).send({message:'No se ha guardado el lugar fav'});
              }else{
                    res.status(200).send({lugarFav:lugarStored});
              }
            }

        });
      }else{
        console.log(lugarExist.length);
          res.status(400).send({message:'lugar fav ya existe'});
      }


    }


  });



}



function getLugaresFav(req,res){

  var userID = req.params.id;
  if(req.params.page){
  var page = req.params.page;
}else{
    var page = 1;
}


  var itemsPerPage = 10;

  LugaresAdmin.find({userID: userID}).paginate(page,itemsPerPage,function(err,lugares,total){
    if(err){
        res.status(500).send({message:'Error en la petición'});
    }else{
      if(!lugares){
        res.status(404).send({message:'no existen lugares'});
      }else{
        res.status(200).send({lugares: lugares,total_items: total});
      }
    }
  })
}


function deleteLugarFav(req,res){
//  var friendId = req.params.id;
var params = req.body;

  var lugarID = params.lugarID;
  var userID = params.userID;

  LugaresFav.find({lugarID: lugarID,userID: userID},(err,lugarFavRemove)=>{
    if(err){

        res.status(500).send({message:'Error en la petición'});
    }else{
      if(!lugarFavRemove){
        res.status(404).send({message:'No existe el lugar'});
      }else{

          res.status(200).send({message:'lugar eliminado'});
      }


    }


  }).remove().exec();
}





module.exports = {


  addLugarFav,
  getLugaresFav,
  deleteLugarFav

};
