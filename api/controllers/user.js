'use sctric'

var User = require('../models/user');
var jwt = require('../services/jwt');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');



function saveUser(req,res){
  var user = new User();

  //parametros de la peticion
  var params = req.body;

  //var fecha = moment(params.creationDate,'DD/MM/YYYY');


  user.userID =  params.userID;
  user.firstname = params.firstname;
  user.lastname = params.lastname;
  user.email = params.email;
  user.avatarUrl = params.avatarUrl;
  user.creationDate = params.creationDate;
  user.preferredLang = params.preferredLang;
  user.clientID = params.clientID;
  user.GlobalClientID = params.GlobalClientID;
  user.ciudad = params.ciudad;
  user.provincia = params.provincia;
  user.pais = params.pais;
  user.nickName = params.nickName;





  user.save((err,userStored)=>{
      if(err){
        console.log(err);
        res.status(500).send({message:'Error al guardar el usuario',err:err});
      }else{
        if(!userStored){
              res.status(300).send({message:'No se ha guardado el usuario'});
        }else{
              res.status(200).send({user:userStored,token: jwt.createToken(userStored)});
        }
      }

  });



}



function updateUser(req,res){
  var userId = req.params.id;

  var update = req.body;

  User.findByIdAndUpdate(userId,update,(err,userUpdated)=>{
        if(err){
          res.status(500).send({message:'Error de servidor: No se ha actualizado el usuario'});
        }else{
          if(!userUpdated){
            res.status(404).send({message:'Error de app: No se ha actualizado el usuario'});
          }else{
            res.status(200).send({message:userUpdated});
          }
        }
  });
}

/*User.findOne({email: email.toLowerCase()},(err,User)=>{

  if(err){
    res.status(500).send({message:'Error en la peticion'});
}else{
  if(!User){
    res.status(400).send({message:'El usuario no existe'});
}else{

}

}

})*/

function uploadImage(req,res){
  var userId = req.params.id;
  var file_name = 'No subido...';

  if(req.files){
    var file_path = req.files.image.path;
    var file_split = file_path.split('\\');
    var file_name = file_split[file_split.length-1];
    var ext_split = file_name.split('\.');
    var file_et = ext_split[1];

    if(file_et == 'png' || file_et == 'jpg' || file_et == 'bmp'){
        User.findByIdAndUpdate(userId,{avatarUrl: file_name},(err,userUpdated)=>{
          if(err){
            res.status(500).send({message:'Error de servidor: No se ha actualizado el usuario'});
          }else{
            if(!userUpdated){
              res.status(404).send({message:'Error de app: No se ha actualizado el usuario'});
            }else{
              res.status(200).send({message:userUpdated});
            }
          }
        });
    }else{
        res.status(200).send({message:'formato no correcto'});
    }


  }else{
    res.status(200).send({message:'no ha subido ninguna imagen'});
  }
}


function getImageFile(req,res){
  var imageFile = req.params.imageFile;
  var resolve = __dirname + '/../uploads/user/'


  fs.exists(resolve + imageFile,function(exists){
    if(exists){
      res.sendFile(resolve + imageFile);
    }else{
      res.status(404).send({message:'no existe la imagen'});
    }
  })
}

function getUser(req,res){
  var usertId = req.params.id;
  User.findById(userId,(err,user)=>{
    if(err){
      res.status(500).send({message:'Error en la petición'});
    }else{
      if(!user){
        res.status(404).send({message:'no existe el usuario'});
      }else{
        res.status(200).send({user});
      }

    }


  })
}

function getUserByID(req,res){
  var userId = req.params.id;
  User.find({userID: userId},(err,user)=>{
    if(err){
      res.status(500).send({message:'Error en la petición'});
    }else{
      if(!user){
        res.status(404).send({message:'no existe el usuario'});
      }else{
        res.status(200).send({user: user,token: jwt.createToken(user)});
      }

    }


  })
}

function getUsers(req,res){
  if(req.params.page){
  var page = req.params.page;
}else{
    var page = 1;
}


  var itemsPerPage = 10;

  User.find().sort('name').paginate(page,itemsPerPage,function(err,users,total){
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
}

function getUsersbyName(req,res){


  var params = req.body;

  //var fecha = moment(params.creationDate,'DD/MM/YYYY');


  var firstname =  params.firstname;
  var lastname = params.lastname;
  var nickName = params.nickName;

  if (!firstname)
    firstname = ''
  if (!lastname)
    lastname = ''
  if (!nickName)
    nickName = ''


    User.find({firstname: new RegExp(firstname, "i"),lastname: new RegExp(lastname, "i"),nickName: new RegExp(nickName, "i") },function(err,users){
    //User.find({nickName: new RegExp(nickName, "i") },function(err,users){
    if(err){
        res.status(500).send({message:'Error en la petición'});
    }else{
      if(!users){
        res.status(404).send({message:'no existen usuarios'});
      }else{
        res.status(200).send({users: users});
      }
    }
  })
}


// Dar de baja
function deleteUser(req,res){
  var userId = req.params.id;

  User.findByIdAndRemove(userId,(err,userRemove)=>{
    if(err){
        res.status(500).send({message:'Error en la petición'});
    }else{
      if(!userRemove){
        res.status(404).send({message:'No existe el usuario'});
      }else{

        /*
        Borrar amigos, lugares etc...

        Lugar.find({userId: userRemove._id}).remove((err,lugarRemoved)=>{

        if(err){
            res.status(500).send({message:'Error en la petición'});
        }else{
            if(!userRemove){
                res.status(404).send({message:'No existe lugar asociado'});
          }else{

        }
        }



      });

        */


      }


    }


  })
}

module.exports = {


  saveUser,
  updateUser,
  uploadImage,
  getImageFile,
  getUser,
  getUsers,
  deleteUser,
  getUserByID,
  getUsersbyName

};
