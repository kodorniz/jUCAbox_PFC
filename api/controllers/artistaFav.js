'use sctric'

var ArtistaFav = require('../models/artistaFav');
var jwt = require('../services/jwt');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');

/*
var ArtistaSchema = Schema({
  artistaID: String,
  userID: { type:Schema.ObjectId, ref:'User'}
});
*/


function addArtistaFav(req,res){
  var artistaFav = new ArtistaFav();

  var params = req.body;



  artistaFav.artistaID = params.artistaID;
  artistaFav.userID = params.userID;
  //lugar.tipoMusica = params.tipoMusica;

  ArtistaFav.find({artistaID:   artistaFav.artistaID,userID: artistaFav.userID},(err,ArtistaFavExist)=>{
    if(err){
        res.status(500).send({message:'Error en la petición'});
    }else{
      if(ArtistaFavExist.length==0 || !ArtistaFavExist){
        artistaFav.save((err,artistaFavStored)=>{
            if(err){
              res.status(500).send({message:'Error al guardar el artista'});
            }else{
              if(!artistaFavStored){
                    res.status(300).send({message:'No se ha guardado el artista'});
              }else{
                    res.status(200).send({artistaFav:ArtistaFavExist});
              }
            }

        });
      }else{

          res.status(400).send({message:'Artista favorito ya existe'});
      }


    }


  });



}



function getArtistasFav(req,res){

  var userID = req.params.id;
  if(req.params.page){
  var page = req.params.page;
}else{
    var page = 1;
}


  var itemsPerPage = 10;

  ArtistaFav.find({userID: userID}).paginate(page,itemsPerPage,function(err,artistasFav,total){
    if(err){
        res.status(500).send({message:'Error en la petición'});
    }else{
      if(!artistasFav){
        res.status(404).send({message:'no existen artistasFav'});
      }else{
        res.status(200).send({artistasFav: artistasFav,total_items: total});
      }
    }
  })
}

function getArtistaFavID(req,res){

  var userID = req.params.id;
  var artistaID = req.params.artistaID;


  if(req.params.page){
  var page = req.params.page;
}else{
    var page = 1;
}


  var itemsPerPage = 10;

  ArtistaFav.find({userID: userID,artistaID: artistaID}).paginate(page,itemsPerPage,function(err,artistasFav,total){
    if(err){
        res.status(500).send({message:'Error en la petición'});
    }else{
      if(!artistasFav){
        res.status(404).send({message:'no existen artistasFav'});
      }else{
        res.status(200).send({artistasFav: artistasFav,total_items: total});
      }
    }
  })
}


function deleteArtistaFav(req,res){
//  var friendId = req.params.id;
var params = req.body;

  var artistaID = params.artistaID;
  var userID = params.userID;

  ArtistaFav.find({artistaID: artistaID,userID: userID},(err,artistaFavRemove)=>{
    if(err){

        res.status(500).send({message:'Error en la petición'});
    }else{
      if(!artistaFavRemove){
        res.status(404).send({message:'No existe el artista'});
      }else{

          res.status(200).send({message:'artista eliminado'});
      }


    }


  }).remove().exec();
}



module.exports = {


  addArtistaFav,
  getArtistasFav,
  deleteArtistaFav,
  getArtistaFavID

};
