'use sctric'

var TokenLugares = require('../models/tokenLugares');
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


function addTokenLugar(req,res){
  var tokenLugares = new TokenLugares();

  var params = req.body;



  tokenLugares.lugarID = params.lugarID;
  tokenLugares.token = params.token;
  //lugar.tipoMusica = params.tipoMusica;


        tokenLugares.save((err,lugarStored)=>{
            if(err){

              res.status(500).send({message:'Error al guardar el token del lugar'});
            }else{
              if(!lugarStored){
                    res.status(300).send({message:'No se ha guardado el token del lugar'});
              }else{
                    res.status(200).send({tokenLugar:lugarStored});
              }
            }

        });




}



function getTokenLugar(req,res){

  var lugarID = req.params.id;

  TokenLugares.findOne({lugarID: lugarID},function(err,tokenlugar){
    if(err){
        res.status(500).send({message:'Error en la petición'});
    }else{
      if(!tokenlugar){
        res.status(404).send({message:'no existen tokens'});
      }else{
        res.status(200).send({tokenlugar: tokenlugar});
      }
    }
  })
}


function deleteTokenLugar(req,res){
//  var friendId = req.params.id;
var params = req.body;

  var lugarID = params.lugarID;

  TokenLugares.find({lugarID: lugarID},(err,TokenRemove)=>{
    if(err){

        res.status(500).send({message:'Error en la petición'});
    }else{
      if(!TokenRemove){
        res.status(404).send({message:'No existe el token'});
      }else{

          res.status(200).send({message:'token eliminado'});
      }


    }


  }).remove().exec();
}





module.exports = {


  addTokenLugar,
  getTokenLugar,
  deleteTokenLugar

};
