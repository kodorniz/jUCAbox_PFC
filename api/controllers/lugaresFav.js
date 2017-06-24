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

          res.status(400).send({message:'lugar fav ya existe'});
      }


    }


  });



}

function getLugaresFavP(req,res){

  var userID = req.params.id;
  if(req.params.page){
  var page = req.params.page;
}else{
    var page = 1;
}


  var itemsPerPage = 1000;

  LugaresFav.find({userID: userID}).populate('lugarID').paginate(page,itemsPerPage,function(err,lugares,total){
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

function getLugaresFav(req,res){

  var userID = req.params.id;
  if(req.params.page){
  var page = req.params.page;
}else{
    var page = 1;
}


  var itemsPerPage = 1000;

  LugaresFav.find({userID: userID}).paginate(page,itemsPerPage,function(err,lugares,total){
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

function isLugaresFav(req,res){

  var userID = req.params.id;
  var lugarID = req.params.lugarID;
  if(req.params.page){
  var page = req.params.page;
}else{
    var page = 1;
}


  var itemsPerPage = 1000;

  LugaresFav.find({userID: userID,lugarID: lugarID}).populate('lugarID').paginate(page,itemsPerPage,function(err,lugares,total){
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

function deleteLugarFavAll(req,res){
//  var friendId = req.params.id;
var params = req.body;


  var lugarID = params.lugarID;


  LugaresFav.find({lugarID: lugarID},(err,lugarFavRemove)=>{
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
  deleteLugarFav,
  isLugaresFav,
  getLugaresFavP,
  deleteLugarFavAll

};
