'use sctric'

var LugaresMensaje = require('../models/lugaresMensajes');
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


function addLugarMensaje(req,res){
  var lugaresMensajes = new LugaresMensaje();

  var params = req.body;



  lugaresMensajes.lugarID = params.lugarID;
  lugaresMensajes.mensaje = params.mensaje;
  lugaresMensajes.fecha = new Date();
  //lugar.tipoMusica = params.tipoMusica;

        lugaresMensajes.save((err,lugarStored)=>{
            if(err){

              res.status(500).send({message:'Error al guardar el mensaje'});
            }else{
              if(!lugarStored){
                    res.status(300).send({message:'No se ha guardado el mensaje'});
              }else{
                    res.status(200).send({lugarFav:lugarStored});
              }
            }

        });




}


function getLugaresMensaje(req,res){

  var lugarID = req.params.id;
  if(req.params.page){
  var page = req.params.page;
}else{
    var page = 1;
}


  var itemsPerPage = 1000;

  LugaresMensaje.find({lugarID: lugarID}).paginate(page,itemsPerPage,function(err,lugares,total){
    if(err){
        res.status(500).send({message:'Error en la petición'});
    }else{
      if(!lugares){
        res.status(404).send({message:'no existen mensajes'});
      }else{
        res.status(200).send({lugares: lugares,total_items: total});
      }
    }
  })
}

function getLugaresMensajes(req,res){


  if(req.params.page){
  var page = req.params.page;
}else{
    var page = 1;
}


  var itemsPerPage = 1000;

  LugaresMensaje.find().paginate(page,itemsPerPage,function(err,lugares,total){
    if(err){
        res.status(500).send({message:'Error en la petición'});
    }else{
      if(!lugares){
        res.status(404).send({message:'no existen mensajes'});
      }else{
        res.status(200).send({lugares: lugares,total_items: total});
      }
    }
  })
}





function deleteLugarMensaje(req,res){
//  var friendId = req.params.id;
var params = req.body;


  var mensajeID = params.mensajeID;


  LugaresMensaje.findById(mensajeID,(err,lugarFavRemove)=>{
    if(err){

        res.status(500).send({message:'Error en la petición'});
    }else{
      if(!lugarFavRemove){
        res.status(404).send({message:'No existe el mensaje'});
      }else{

          res.status(200).send({message:'mensaje eliminado'});
      }


    }


  }).remove().exec();
}

function deleteLugarMensajeAll(req,res){
//  var friendId = req.params.id;
var params = req.body;


  var lugarID = params.lugarID;


  LugaresMensaje.find({lugarID: lugarID},(err,lugarFavRemove)=>{
    if(err){

        res.status(500).send({message:'Error en la petición'});
    }else{
      if(!lugarFavRemove){
        res.status(404).send({message:'No existe el lugar'});
      }else{

          res.status(200).send({message:'mensajes eliminado'});
      }


    }


  }).remove().exec();
}




module.exports = {


  addLugarMensaje,
  getLugaresMensaje,
  getLugaresMensajes,
  deleteLugarMensaje,
  deleteLugarMensajeAll

};
