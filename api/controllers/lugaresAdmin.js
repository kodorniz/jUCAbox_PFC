'use sctric'

var LugaresAdmin = require('../models/lugaresAdmin');
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


function addLugarAdmin(req,res){
  var lugaresAdmin = new LugaresAdmin();

  var params = req.body;



  lugaresAdmin.lugarID = params.lugarID;
  lugaresAdmin.userID = params.userID;
  //lugar.tipoMusica = params.tipoMusica;

  LugaresAdmin.find({lugarID:   lugaresAdmin.lugarID,userID: lugaresAdmin.userID},(err,lugarExist)=>{
    if(err){
        res.status(500).send({message:'Error en la petición'});
    }else{
      if(lugarExist.length==0 || !lugarExist){
        lugaresAdmin.save((err,lugarStored)=>{
            if(err){

              res.status(500).send({message:'Error al guardar el lugar Admin'});
            }else{
              if(!lugarStored){
                    res.status(300).send({message:'No se ha guardado el lugar Admin'});
              }else{
                    res.status(200).send({lugarAdmin:lugarStored});
              }
            }

        });
      }else{
        console.log(lugarExist.length);
          res.status(400).send({message:'lugar Admin ya existe'});
      }


    }


  });



}

function isLugaresAdmin(req,res){

  var userID = req.params.id;
  var lugarID = req.params.lugarID;
  if(req.params.page){
  var page = req.params.page;
}else{
    var page = 1;
}


  var itemsPerPage = 10;

  LugaresAdmin.find({userID: userID,lugarID: lugarID}).populate('lugarID').paginate(page,itemsPerPage,function(err,lugares,total){
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

function getLugaresAdmin(req,res){

  var userID = req.params.id;
  if(req.params.page){
  var page = req.params.page;
}else{
    var page = 1;
}


  var itemsPerPage = 10;

  LugaresAdmin.find({userID: userID}).populate('lugarID').paginate(page,itemsPerPage,function(err,lugares,total){
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


function deleteLugarAdmin(req,res){
//  var friendId = req.params.id;
var params = req.body;

  var lugarID = params.lugarID;
  var userID = params.userID;

  LugaresAdmin.find({lugarID: lugarID,userID: userID},(err,lugarAdminRemove)=>{
    if(err){

        res.status(500).send({message:'Error en la petición'});
    }else{
      if(!lugarAdminRemove){
        res.status(404).send({message:'No existe el lugar'});
      }else{

          res.status(200).send({message:'lugar eliminado'});
      }


    }


  }).remove().exec();
}





module.exports = {


  addLugarAdmin,
  getLugaresAdmin,
  deleteLugarAdmin,
  isLugaresAdmin

};
