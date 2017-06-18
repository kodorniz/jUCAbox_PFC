'use sctric'

var Lugar = require('../models/lugares');
var jwt = require('../services/jwt');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');



function saveLugar(req,res){
  var lugar = new Lugar();

  var params = req.body;


  lugar.userID = params.userID;
  lugar.nombre = params.nombre;
  lugar.descripcion = params.descripcion;
  lugar.img = [];
  lugar.provincia = params.provincia;
  lugar.ciudad = params.ciudad;
  lugar.direccion = params.direccion;
  //lugar.tipoMusica = params.tipoMusica;

  lugar.save((err,lugarStored)=>{
      if(err){
        res.status(500).send({message:'Error al guardar el lugar'});
      }else{
        if(!lugarStored){
              res.status(300).send({message:'No se ha guardado el lugar'});
        }else{
              res.status(200).send({lugar:lugarStored});
        }
      }

  });

}

//getLugaresNombre(termino:string,provincia:string,ciudad:string,tipoMusica:Array<IOption>)
function getLugaresNombre(req,res){
  //var lugarId = req.params.id;

  var params = req.body;


  var termino = params.termino;
  var provincia = params.provincia;
  var ciudad = params.ciudad;
  var userID = params.userID;
  var admin = params.admin;

  var tipoMusica = params.tipoMusica;
  var lugar_;
  var objeto;


  if(admin==true)

   objeto = {userID:userID,nombre: new RegExp(termino, "i"),provincia: new RegExp(provincia, "i"),ciudad: new RegExp(ciudad, "i")};

  else
   objeto = {nombre: new RegExp(termino, "i"),provincia: new RegExp(provincia, "i"),ciudad: new RegExp(ciudad, "i")}



  Lugar.find(objeto,(err,lugar)=>{
    if(err){
      res.status(500).send({message:'Error en la petición'});
    }else{
      if(!lugar){
        res.status(404).send({message:'no existe el lugar'});
      }else{
        lugar_=[];
        if(tipoMusica && tipoMusica != "undefined"){
        for(i=0;i<lugar.length;i++){

          for(j=0;j<lugar[i].tipoMusica.length;j++){
            if(lugar[i].tipoMusica[j].value==tipoMusica || lugar[i].tipoMusica == []){
              lugar_.push(lugar[i]);

              break;
            }
          }

        }
      }else{
        lugar_= lugar;
      }

        res.status(200).send({lugares: lugar_});
      }

    }


  })

}

function updateLugar(req,res){
  var lugarId = req.params.id;

  var update = req.body;

  Lugar.findByIdAndUpdate(lugarId,update,(err,lugarUpdated)=>{
        if(err){
          res.status(500).send({message:'Error de servidor: No se ha actualizado el lugar'});
        }else{
          if(!lugarUpdated){
            res.status(404).send({message:'Error de app: No se ha actualizado el lugar'});
          }else{
            res.status(200).send({message:lugarUpdated});
          }
        }
  });
}

function updateTipoMusica(req,res){
  var lugarId = req.params.id;
  var tipoMusica = [];
  var valores = req.body;

for(var val in req.body){
  //var pars = JSON.parse(valores[val]);


    tipoMusica.push(JSON.parse(valores[val]));



  }


  Lugar.findByIdAndUpdate(lugarId,{tipoMusica: tipoMusica},(err,lugarUpdated)=>{
        if(err){
          res.status(500).send({message:'Error de servidor: No se ha actualizado el lugar'});
        }else{
          if(!lugarUpdated){
            res.status(404).send({message:'Error de app: No se ha actualizado el lugar'});
          }else{
            res.status(200).send({message:lugarUpdated});
          }
        }
  });
}


function getLugar(req,res){
  var lugarId = req.params.id;
  Lugar.findById(lugarId,(err,lugar)=>{
    if(err){
      res.status(500).send({message:'Error en la petición'});
    }else{
      if(!lugar){
        res.status(404).send({message:'no existe el lugar'});
      }else{
        res.status(200).send({lugar});
      }

    }


  })
}

function getLugares(req,res){
  if(req.params.page){
  var page = req.params.page;
}else{
    var page = 1;
}


  var itemsPerPage = 10;

  Lugar.find().sort('name').paginate(page,itemsPerPage,function(err,lugares,total){
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

function uploadImage(req,res){
  var lugarId = req.params.id;
  var file_name = 'No subido...';

  if(req.files){
    var file_path = req.files.image.path;
    var file_split = file_path.split('\\');
    var file_name = file_split[file_split.length-1];
    var ext_split = file_name.split('\.');
    var file_et = ext_split[1];
    var imgs =[];
    Lugar.findById(lugarId,(err,lugar)=>{
      if(err){
        res.status(500).send({message:'Error en la petición'});
      }else{
        if(!lugar){
          res.status(404).send({message:'no existe el lugar'});
        }else{
          imgs=lugar.img;
          imgs.push(file_name);

          if(file_et == 'png' || file_et == 'jpg' || file_et == 'bmp'){
              Lugar.findByIdAndUpdate(lugarId,{img: imgs},(err,lugarUpdated)=>{
                if(err){
                  res.status(500).send({message:'Error de servidor: No se ha actualizado el lugar'});
                }else{
                  if(!lugarUpdated){
                    res.status(404).send({message:'Error de app: No se ha actualizado el lugar'});
                  }else{
                    res.status(200).send({message:lugarUpdated});
                  }
                }
              });
          }else{
              res.status(200).send({message:'formato no correcto'});
          }
        }

      }


    })





  }else{
    res.status(200).send({message:'no ha subido ninguna imagen'});
  }
}

function deleteImageFile(req,res){
  var imageFile = req.body.imageFile;
  var resolve = __dirname + '/../uploads/lugar/'
  var lugarId = req.params.id;

  fs.exists(resolve + imageFile,function(exists){
    if(exists){
      //res.sendFile(resolve + imageFile);
      Lugar.findById(lugarId,(err,lugar)=>{
        if(err){
          res.status(500).send({message:'Error en la petición'});
        }else{
          if(!lugar){
            res.status(404).send({message:'no existe el lugar'});
          }else{
            var imgs = [];

            var imgs2 = lugar.img;
            for(var i=0;i<imgs2.length;i++){
              if(imgs2[i] != imageFile){

              imgs.push(imgs2[i]);
              }
            }

            Lugar.findByIdAndUpdate(lugarId,{img: imgs},(err,lugarUpdated)=>{
                  if(err){
                    res.status(500).send({message:'Error de servidor: No se ha actualizado el lugar'});
                  }else{
                    if(!lugarUpdated){
                      res.status(404).send({message:'Error de app: No se ha actualizado el lugar'});
                    }else{
                      fs.unlink(resolve + imageFile);
                      res.status(200).send({message:lugarUpdated});
                    }
                  }
            });



          }
        }
      })
    }else{
      res.status(404).send({message:'no existe la imagen'});
    }
  })
}

function getImageFile(req,res){
  var imageFile = req.params.imageFile;

  var path = require("path");
  path.join(__dirname, '/../uploads/lugar/', imageFile)

  fs.exists(  path.join(__dirname, '/../uploads/lugar/', imageFile),function(exists){
    if(exists){

      res.sendFile(path.join(__dirname, '/../uploads/lugar/', imageFile));
    }else{
      res.status(404).send({message:'no existe la imagen'});
    }
  })
}

function deleteLugar(req,res){
  var lugarId = req.params.id;

  Lugar.findByIdAndRemove(lugarId,(err,lugarRemove)=>{
    if(err){
        res.status(500).send({message:'Error en la petición'});
    }else{
      if(!lugarRemove){
        res.status(404).send({message:'No existe el usuario'});
      }else{
          res.status(200).send({message:'Lugar eliminado'});
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

/*User.findOne({email: email.toLowerCase()},(err,User)=>{

  if(err){
    res.status(500).send({message:'Error en la peticion'});
}else{
  if(!User){
    res.status(400).send({message:'El usuario no existe'});
}else{

}

}

})

function uploadImage(req,res){
  var userId = req.params.id;
  var file_name = 'No subido...';

  if(req.files){
    var file_path = req.files.image.path;
    var file_split = file_path.split('\\');
    var file_name = file_split[file_split.length-1];
    var ext_split = file_name.split('\.');

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
/*

      }


    }


  })
}*/

module.exports = {


  saveLugar,
  updateLugar,
  getLugar,
  getLugares,
  uploadImage,
  getImageFile,
  deleteLugar,
  updateTipoMusica,
  deleteImageFile,
  getLugaresNombre

};
