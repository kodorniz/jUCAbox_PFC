'use sctric'

var Log = require('../models/log');
var jwt = require('../services/jwt');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');

/*
userID: { type:Schema.ObjectId, ref:'User'},
tipoMensaje: String,
objetoMensaje: String,
verboMensaje: String,
mensaje: String,
FechaLog: Date,
url: String,
cancion: Schema.Types.Mixed
*/

function saveLog(req,res){
  var log = new Log();

  //parametros de la peticion
  var params = req.body;

  console.log('params',params);

  console.log('params.cancion',params.cancion);
  log.userID =  params.userID;
  log.tipoMensaje = params.tipoMensaje;
  log.objetoMensaje = params.objetoMensaje;
  log.verboMensaje = params.verboMensaje;
  log.mensaje = params.mensaje;
  log.FechaLog = new Date();
  log.url = params.url;
  log.cancion =  params.cancion;



  log.save((err,logStored)=>{
      if(err){
        console.log(err);
        res.status(500).send({message:'Error al guardar el log'});
      }else{
        if(!logStored){
              res.status(300).send({message:'No se ha guardado el log'});
        }else{
              res.status(200).send({log:logStored});
        }
      }

  });



}





function getLog(req,res){
  var userID = req.params.id;

  Log.find({userID:userID},(err,log,total)=>{
    if(err){
      res.status(500).send({message:'Error en la petición'});
    }else{
      if(!log){
        res.status(404).send({message:'no existe el log'});
      }else{


        res.status(200).send({log: log,total_items: total});
      }

    }
  }).sort('FechaLog')
}


/*
function getLogs(req,res){
  if(req.params.page){
  var page = req.params.page;
}else{
    var page = 1;
}


  var itemsPerPage = 10;

  Log.find().sort('name').paginate(page,itemsPerPage,function(err,users,total){
    if(err){
        res.status(500).send({message:'Error en la petición'});
    }else{
      if(!users){
        res.status(404).send({message:'no existen usuarios'});
      }else{
        res.status(200).send({users: users,total_items: total});
      }
    }
  })
}*/




module.exports = {


  saveLog,
  getLog

};
