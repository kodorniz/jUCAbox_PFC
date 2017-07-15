'use sctric'

var UserClick = require('../models/UserClick');
var jwt = require('../services/jwt');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
/*
var FriendsSchema = Schema({
  friendID: { type:Schema.ObjectId, ref:'User'},
  userID: { type:Schema.ObjectId, ref:'User'}
});
*/


function addUserClick(req,res){
  var userClick = new UserClick();

  var params = req.body;



  userClick.userIDto = params.userIDto;
  userClick.userID = params.userID;
  userClick.type="click";
  userClick.fechaClick = new Date();
  //console.log('estoy en console',new Date(),new Date()+2);
  //lugar.tipoMusica = params.tipoMusica;


        userClick.save((err,userStored)=>{
            if(err){

              res.status(500).send({message:'Error al guardar el click'});
            }else{
              if(!userStored){
                    res.status(300).send({message:'No se ha guardado el click'});
              }else{
                    res.status(200).send({userClick:userStored});
              }
            }

        });





}

function addUserMessage(req,res){
  var userClick = new UserClick();

  var params = req.body;



  userClick.userIDto = params.userIDto;
  userClick.userID = params.userID;
  userClick.type="msg";
  userClick.fechaClick = new Date();
  //console.log('estoy en console',new Date(),new Date()+2);
  //lugar.tipoMusica = params.tipoMusica;


        userClick.save((err,userStored)=>{
            if(err){

              res.status(500).send({message:'Error al guardar el click'});
            }else{
              if(!userStored){
                    res.status(300).send({message:'No se ha guardado el msg'});
              }else{
                    res.status(200).send({userClick:userStored});
              }
            }

        });





}

function getUserClickMax(req,res){

  var userID = req.params.userID;
  var userIDto = req.params.userIDto;



  UserClick.findOne({userID: userID,userIDto: userIDto,type: "click"}).sort('-fechaClick').exec(function(err,fecha){
    if(err){
        res.status(500).send({message:'Error en la petición'});
    }else{
      if(!fecha){
        res.status(404).send({message:'no existe click'});
      }else{
        res.status(200).send({fechaMax:fecha.fechaClick});
      }
    }
  })
}

function getUserMsgMax(req,res){

  var userID = req.params.userID;
  var userIDto = req.params.userIDto;



  UserClick.findOne({userID: userID,userIDto: userIDto,type: "msg"}).sort('-fechaClick').exec(function(err,fecha){
    if(err){
        res.status(500).send({message:'Error en la petición'});
    }else{
      if(!fecha){
        res.status(404).send({message:'no existe click'});
      }else{
        res.status(200).send({fechaMax:fecha.fechaClick});
      }
    }
  })
}

function getUserClickMaxAll(req,res){

  var userID = mongoose.Types.ObjectId(req.params.userID);

  var agg =
      [

          { $match:{
            userID: userID,
            type : 'click'
          }
        },

        { $group:
              {
                _id: '$userIDto',

                maxDate: { $max: '$fechaClick'}
              }

      }

    ]

    UserClick.aggregate(agg,(err,user)=>{
      if(err){
        res.status(500).send({error:err,message:'Error en la petición'});
      }else{
        if(!user){
          res.status(404).send({message:'no existe el usuario'});
        }else{
          res.status(200).send({user});
        }

      }


    });
}


function getUserMsgMaxAll(req,res){

  var userID = mongoose.Types.ObjectId(req.params.userID);

  var agg =
      [

          { $match:{
            userIDto: userID,
            type : 'msg'
          }
        },

        { $group:
              {
                _id: '$userID',

                maxDate: { $max: '$fechaClick'}
              }

      }

    ]

    UserClick.aggregate(agg,(err,user)=>{
      if(err){
        res.status(500).send({error:err,message:'Error en la petición'});
      }else{
        if(!user){
          res.status(404).send({message:'no existe el usuario'});
        }else{
          res.status(200).send({user});
        }

      }


    });
}





module.exports = {
  getUserClickMax,
  addUserClick,
  getUserClickMaxAll,
  getUserMsgMax,
  addUserMessage,
  getUserMsgMaxAll
};
