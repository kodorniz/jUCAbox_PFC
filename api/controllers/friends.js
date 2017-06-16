'use sctric'

var Friend = require('../models/friends');
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


function addFriend(req,res){
  var friend = new Friend();

  var params = req.body;



  friend.friendID = params.friendID;
  friend.userID = params.userID;
  //lugar.tipoMusica = params.tipoMusica;

  Friend.find({friendID:   friend.friendID,userID: friend.userID},(err,friendExist)=>{
    if(err){
        res.status(500).send({message:'Error en la petición'});
    }else{
      if(friendExist.length==0 || !friendExist){
        friend.save((err,friendStored)=>{
            if(err){
              console.log(err);
              res.status(500).send({message:'Error al guardar el amigo'});
            }else{
              if(!friendStored){
                    res.status(300).send({message:'No se ha guardado el amigo'});
              }else{
                    res.status(200).send({friend:friendStored});
              }
            }

        });
      }else{
        console.log(friendExist.length);
          res.status(400).send({message:'amigo ya existe'});
      }


    }


  });



}



function getFriends(req,res){

  var userID = req.params.id;
  if(req.params.page){
  var page = req.params.page;
}else{
    var page = 1;
}


  var itemsPerPage = 10;

  Friend.find({userID: userID}).paginate(page,itemsPerPage,function(err,friends,total){
    if(err){
        res.status(500).send({message:'Error en la petición'});
    }else{
      if(!friends){
        res.status(404).send({message:'no existen amigos'});
      }else{
        res.status(200).send({friends: friends,total_items: total});
      }
    }
  })
}


function deleteFriend(req,res){
//  var friendId = req.params.id;
var params = req.body;

  var friendID = params.friendID;
  var userID = params.userID;

  Friend.find({friendID: friendID,userID: userID},(err,friendRemove)=>{
    if(err){

        res.status(500).send({message:'Error en la petición'});
    }else{
      if(!friendRemove){
        res.status(404).send({message:'No existe el amigo'});
      }else{

          res.status(200).send({message:'amigo eliminado'});
      }


    }


  }).remove().exec();
}



module.exports = {


  addFriend,
  getFriends,
  deleteFriend

};
